Workshop de IA — Ginialtech
Página interactiva del Workshop de Inteligencia Artificial de Ginialtech. Incluye guía del participante, ejercicios con IA en vivo y bloque avanzado para developers.
Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS
Gemini 3 Flash — ejercicios interactivos con IA
Resend — envío de feedback y contacto por email
Vercel — deploy

> [!IMPORTANT]
> **Notas para Agentes de IA / LLMs**: Si estás trabajando en este repositorio, es obligatorio leer primero el archivo [rules.md](rules.md). Allí se encuentran las directrices de personalización (trato con Marcela), estándares técnicos nivel Senior y políticas de idioma del proyecto.

Setup
bash
bun install
cp .env.example .env.local
bun dev

## Variables de entorno
GOOGLE_API_KEY=     # Google AI Studio
RESEND_API_KEY=     # resend.com

## Scripts
bash
bun dev              # desarrollo (puerto 3002)
bun run build        # build de producción
bun run check        # verificación de calidad de código
bunx tsc --noEmit    # chequeo de tipos

## Estructura
src/
├── app/
│   ├── api/
│   │   ├── ejercicio/   # Gemini Flash streaming
│   │   ├── contact/     # Resend email (Contacto)
│   │   └── feedback/    # Resend email (Feedback)
│   ├── page.tsx
│   └── workshop.css
└── components/
    ├── Header.tsx       # Navegación y logo
    ├── Footer.tsx       # Contacto real con Resend
    ├── WorkshopGuide.tsx
    ├── AdvancedContent.tsx
    ├── AdvancedToggle.tsx
    ├── EditableField.tsx
    ├── Checklist.tsx
    ├── FeedbackStars.tsx
    ├── FeedbackForm.tsx # Validación obligatoria
    └── EjercicioIA.tsx  # Markdown + Limpieza reactiva

## Deploy
Vercel. Variables de entorno en Settings → Environment Variables.