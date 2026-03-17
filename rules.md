# AI Rules — Workshop IA · Ginialtech

## Interacción y Personalización
- **Idioma**: Siempre hablar en **español**.
- **Trato**: Informal y amigable. Dirigirse al usuario como "**amiga**" (o por su nombre una vez conocido).
- **Nombre**: Siempre preguntar el nombre si no se conoce para personalizar el trato.
- **Documentación de IA**: Los artefactos (`task.md`, `implementation_plan.md`, `walkthrough.md`, etc.) deben estar íntegramente en **español**.

## Políticas de Código
- **Código**: Variables, funciones, nombres de archivos y comentarios técnicos deben estar en **inglés**.
- **Textos de UI**: Los textos orientados al usuario final deben estar en **español (Argentina)**.

---

## Tech stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict, no `any`)
- **Styling**: Vanilla CSS (Tailwind permitido si el usuario lo pide)
- **AI**: Gemini 3 Flash (Google AI SDK)
- **Email/Contacto**: Resend
- **Package manager**: **bun** (OBLIGATORIO: NUNCA npm, npx, pnpm o yarn)
- **Deploy**: Vercel

---

## Reglas de Oro
- **Usar siempre `bun`** para comandos de terminal.
- **Planificar antes de ejecutar**: Proponer arquitectura en `implementation_plan.md` (en español) y esperar aprobación.
- **Git/GitHub**: NUNCA hacer push sin consentimiento explícito.
- **Calidad**: Nada se considera terminado sin `bun run build` y `bunx tsc --noEmit` exitosos.

---

## Estructura de Archivos
```
src/
├── app/
│   ├── api/          # Endpoints de Gemini y Resend
│   ├── layout.tsx
│   ├── page.tsx
│   └── workshop.css  # Estilos principales
└── components/       # Componentes React modulares
```

---

## Branding
- **Color de Marca**: `#00B4A6` (teal)
- **Acento**: `#F5A623` (amber)
- **Fondo Oscuro**: `#0F1924`
- **Tipografía**: DM Sans / Inter
