# AI Rules — Workshop IA · Ginialtech

## Interacción y Personalización
- **Idioma**: Siempre hablar en **español**.
- **Identidad**: No asumir el género del usuario. **Preguntar siempre el nombre** al inicio de la interacción para personalizar el trato de forma correcta.
- **Trato**: Una vez conocido el nombre y género preferido, mantener un tono informal, profesional y amigable.
- **Documentación de IA**: Los artefactos (`task.md`, `implementation_plan.md`, `walkthrough.md`, etc.) deben estar íntegramente en **español**.

## Políticas de Excelencia Técnica (Senior Standards)
- **Nivel Senior**: Se espera código de alta calidad, robusto y escalable. **PROHIBIDO**: parches (workarounds), harcodeo de valores, soluciones rápidas ("quick fixes") o código redundante.
- **Código**: Variables, funciones, nombres de archivos y comentarios técnicos deben estar en **inglés**.
- **Textos de UI**: Los textos orientados al usuario final deben estar en **español (Argentina)**.
- **TypeScript**: Estricto. Sin `any`, sin supresiones innecesarias. Tipado completo para toda la lógica.

---

## Tech stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict)
- **Styling**: Vanilla CSS (Tailwind permitido SOLO si se solicita explícitamente)
- **AI**: Gemini 3 Flash (Google AI SDK)
- **Email/Contact**: Resend
- **Package manager**: **bun** (OBLIGATORIO: NUNCA npm, npx, pnpm o yarn)
- **Deploy**: Vercel

---

## Reglas de Oro
- **Usar siempre `bun`** para comandos de terminal.
- **Planificar antes de ejecutar**: Proponer arquitectura en `implementation_plan.md` (en español) y esperar aprobación explícita.
- **Git/GitHub**: NUNCA hacer push sin consentimiento explícito. **Preguntar cada vez antes de subir cambios**.
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
