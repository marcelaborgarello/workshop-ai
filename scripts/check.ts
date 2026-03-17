#!/usr/bin/env bun
// scripts/check.ts
// Code quality checker — Workshop IA · Ginialtech

import { readdirSync, readFileSync, statSync } from "fs";
import { join, extname, relative } from "path";

// ── Config ────────────────────────────────────────────────
const ROOT = process.cwd();
const SRC  = join(ROOT, "src");
const MAX_LINES = 200;

const COLORS = {
  reset:  "\x1b[0m",
  red:    "\x1b[31m",
  yellow: "\x1b[33m",
  green:  "\x1b[32m",
  cyan:   "\x1b[36m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
};

const c = (color: keyof typeof COLORS, text: string) =>
  `${COLORS[color]}${text}${COLORS.reset}`;

// ── Types ─────────────────────────────────────────────────
interface Issue {
  file: string;
  line?: number;
  rule: string;
  detail: string;
  severity: "error" | "warn";
}

// ── File walker ───────────────────────────────────────────
function walkFiles(dir: string, exts: string[]): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    if (["node_modules", ".next", "dist", ".git"].includes(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full, exts));
    } else if (exts.includes(extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

// ── Checks ────────────────────────────────────────────────
const issues: Issue[] = [];
const files = walkFiles(SRC, [".ts", ".tsx"]);

for (const file of files) {
  const rel     = relative(ROOT, file);
  const content = readFileSync(file, "utf-8");
  const lines   = content.split("\n");

  // 1. Archivos de más de 200 líneas
  if (lines.length > MAX_LINES) {
    issues.push({
      file: rel,
      rule: "max-lines",
      detail: `${lines.length} líneas (máx ${MAX_LINES})`,
      severity: "warn",
    });
  }

  lines.forEach((line, i) => {
    const n = i + 1;
    const trimmed = line.trim();

    // 2. Uso de `any` en TypeScript
    if (/:\s*any\b/.test(line) || /as\s+any\b/.test(line) || /<any>/.test(line)) {
      // ignorar comentarios
      if (!trimmed.startsWith("//") && !trimmed.startsWith("*")) {
        issues.push({
          file: rel, line: n,
          rule: "no-any",
          detail: trimmed.slice(0, 80),
          severity: "error",
        });
      }
    }

    // 3. Imports de npm en lugar de bun (lockfile references in code)
    if (/\bnpm\s+(install|add|run|i)\b/.test(line) || /exec.*npm\b/.test(line)) {
      issues.push({
        file: rel, line: n,
        rule: "no-npm",
        detail: trimmed.slice(0, 80),
        severity: "error",
      });
    }

    // 4. console.log en el código
    if (/console\.(log|warn|error|info|debug)\(/.test(line)) {
      if (!trimmed.startsWith("//")) {
        issues.push({
          file: rel, line: n,
          rule: "no-console",
          detail: trimmed.slice(0, 80),
          severity: "warn",
        });
      }
    }

    // 5. Funciones sin tipos explícitos en parámetros
    // Detecta: function foo(param) o (param) => sin tipo
    const funcNoType =
      /function\s+\w+\s*\(([^)]+)\)/.exec(line) ||
      /(?:const|let)\s+\w+\s*=\s*(?:async\s*)?\(([^)]+)\)\s*=>/.exec(line);

    if (funcNoType) {
      const params = funcNoType[1];
      // Si algún parámetro no tiene ":" ni es vacío ni es solo "..." ni rest
      const hasUntypedParam = params
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p && p !== "" && !p.startsWith("//"))
        .some(
          (p) =>
            !p.includes(":") &&
            !p.startsWith("...") &&
            !p.startsWith("{") &&
            p !== "_"
        );

      if (hasUntypedParam && !trimmed.startsWith("//")) {
        issues.push({
          file: rel, line: n,
          rule: "explicit-types",
          detail: trimmed.slice(0, 80),
          severity: "warn",
        });
      }
    }
  });

  // 6. Componentes que usan hooks/eventos sin "use client"
  const hasHooks =
    /\buseState\b|\buseEffect\b|\buseRef\b|\buseCallback\b|\buseMemo\b/.test(content);
  const hasEventHandlers = /onClick|onChange|onSubmit|onInput/.test(content);
  const hasUseClient = /^['"']use client['"']/m.test(content);

  if ((hasHooks || hasEventHandlers) && !hasUseClient) {
    issues.push({
      file: rel,
      rule: "missing-use-client",
      detail: hasHooks
        ? "Usa hooks de React sin 'use client'"
        : "Usa event handlers sin 'use client'",
      severity: "error",
    });
  }
}

// ── Report ────────────────────────────────────────────────
console.log("\n" + c("bold", "🔍 Ginialtech Code Checker") + c("dim", " — Workshop IA\n"));

if (issues.length === 0) {
  console.log(c("green", "✅ Todo limpio. Sin issues encontrados.\n"));
  process.exit(0);
}

// Agrupar por regla
const byRule: Record<string, Issue[]> = {};
for (const issue of issues) {
  (byRule[issue.rule] ??= []).push(issue);
}

const ruleLabels: Record<string, string> = {
  "max-lines":        "📏 Archivos largos (> 200 líneas)",
  "no-any":           "🚨 Uso de `any` en TypeScript",
  "no-npm":           "📦 Referencias a npm (usar bun)",
  "no-console":       "🖨️  console.log en el código",
  "explicit-types":   "🏷️  Funciones sin tipos explícitos",
  "missing-use-client":"⚡ Falta 'use client'",
};

let errors = 0;
let warns  = 0;

for (const [rule, ruleIssues] of Object.entries(byRule)) {
  console.log(c("bold", ruleLabels[rule] ?? rule));

  for (const issue of ruleIssues) {
    const loc  = issue.line ? `:${issue.line}` : "";
    const icon = issue.severity === "error" ? c("red", "✖") : c("yellow", "⚠");
    const file = c("cyan", `${issue.file}${loc}`);
    console.log(`  ${icon} ${file}`);
    console.log(c("dim", `      ${issue.detail}`));
    issue.severity === "error" ? errors++ : warns++;
  }
  console.log();
}

// Summary
console.log(c("bold", "─── Resumen ───────────────────────────────"));
if (errors > 0) console.log(c("red",    `  ✖ ${errors} error(es) — bloqueantes`));
if (warns  > 0) console.log(c("yellow", `  ⚠ ${warns}  advertencia(s) — revisar`));
console.log();

process.exit(errors > 0 ? 1 : 0);
