# AI Rules — Workshop IA · Ginialtech

## Project overview
Static Next.js site to publish the "Workshop de Inteligencia Artificial" by Ginialtech.
Includes an interactive HTML participant guide and downloadable files (PPTX + PDF).

---

## Tech stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Package manager: **bun** (NEVER npm, npx, or yarn)
- Deploy: Vercel
- Repo: GitHub (private)

---

## Hard rules — never break these

- Always use `bun` — `bun add`, `bun run`, `bun install`
- All code and comments in **English**
- No `any` in TypeScript — use proper types or `unknown`
- No `console.log` in production code
- No new dependencies without asking first
- Do not modify the participant guide HTML internal styles — they are intentional
- Do not generate files unless explicitly asked

---

## File structure
```
/
├── public/
│   └── downloads/
│       ├── workshop-ia.pptx
│       └── workshop-ia.pdf
├── src/
│   └── app/
│       ├── layout.tsx
│       └── page.tsx
├── .ai/
│   └── rules.md          ← this file
├── AI_CONTEXT.md
└── ...
```

---

## Workflow
1. **Plan before executing** — show the file structure and approach, wait for confirmation
2. Implement in small steps, not everything at once
3. After each step, summarize what was done and what comes next

---

## Branding
- Project name: **Workshop de IA — Ginialtech**
- Brand color: `#00B4A6` (teal)
- Accent: `#F5A623` (amber)
- Background dark: `#0F1924`
- Font: DM Sans (already loaded in the HTML guide)
- Do not override the guide's internal CSS

---

## Out of scope
- No database
- No authentication
- No CMS
- No i18n
- No analytics (unless asked)
