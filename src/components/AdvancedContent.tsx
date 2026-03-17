import EditableField from "./EditableField";
import EjercicioIA from "./EjercicioIA";

export default function AdvancedContent() {
  return (
    <div className="advanced-section animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="adv-divider" id="adv">
        <div className="adv-divider-icon">⬡</div>
        <div>
          <h2>Bloque Avanzado — Para developers y power users</h2>
          <p>MCP · Skills · Guardrails · Agentes · Flujos de trabajo profesionales con IA</p>
        </div>
      </div>

      <div className="alert info">
        <strong>ℹ️ Nota:</strong> Este bloque asume que ya usás herramientas de IA en tu flujo de trabajo y querés llevar la integración a un nivel profesional. No es necesario haber hecho los bloques anteriores.
      </div>

      {/* ── ADV 1: MCP ─────────────────────────── */}
      <div className="bloque-header">
        <div className="bloque-num bg-amber">⬡</div>
        <div>
          <h2>MCP — Model Context Protocol <span className="adv-badge">Avanzado</span></h2>
          <span className="tiempo">⏱ ~25 min · El estándar que conecta la IA con el mundo real</span>
        </div>
      </div>

      <div className="card amber">
        <h3>¿Qué es MCP y por qué importa?</h3>
        <p>MCP es un protocolo abierto creado por Anthropic (2024) que estandariza cómo los modelos de IA se conectan con herramientas, APIs y fuentes de datos externas.</p>
        <p style={{ marginTop: "8px" }}>Antes de MCP cada integración era ad-hoc. Con MCP, cualquier herramienta que implemente el protocolo puede ser usada por cualquier cliente compatible (Claude, Cursor, Zed, etc.).</p>
        <ul style={{ marginTop: "10px" }}>
          <li>Es como USB para la IA: un estándar universal de conexión.</li>
          <li>Permite que Claude lea tu filesystem, ejecute código, consulte tu base de datos, llame APIs propias.</li>
          <li>Ya existe un ecosistema de servidores MCP públicos: GitHub, Postgres, Figma, Slack, Google Drive, y más.</li>
        </ul>
      </div>

      <div className="flujo" style={{ gap: "6px", marginBottom: "20px" }}>
        <div className="flujo-step">
          <div className="icon">🧠</div>
          <div className="nombre">Claude / LLM</div>
          <div className="desc">Cliente MCP</div>
        </div>
        <div className="flujo-arrow">→</div>
        <div className="flujo-step highlight">
          <div className="icon">⬡</div>
          <div className="nombre">MCP Protocol</div>
          <div className="desc">JSON-RPC 2.0</div>
        </div>
        <div className="flujo-arrow">→</div>
        <div className="flujo-step">
          <div className="icon">🔧</div>
          <div className="nombre">MCP Server</div>
          <div className="desc">Tu herramienta</div>
        </div>
        <div className="flujo-arrow">→</div>
        <div className="flujo-step">
          <div className="icon">🗄️</div>
          <div className="nombre">Recursos</div>
          <div className="desc">DB · API · Files</div>
        </div>
      </div>

      <div className="code-block">
        <div className="code-block-label">Estructura de un servidor MCP simple <span>TypeScript</span></div>
        <pre>{`// Un servidor MCP expone tres cosas:
// 1. Tools    → acciones que la IA puede ejecutar
// 2. Resources → datos que la IA puede leer
// 3. Prompts  → templates predefinidos

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({ name: "mi-servidor", version: "1.0.0" });

// Definir una herramienta
server.tool(
  "buscar_cliente",
  { id: z.string().describe("ID del cliente") },
  async ({ id }) => {
    const cliente = await db.clientes.findById(id);
    return { content: [{ type: "text", text: JSON.stringify(cliente) }] };
  }
);`}</pre>
      </div>

      <div className="ejercicio adv">
        <div className="ejercicio-tag tech">🔬 Ejercicio avanzado</div>
        <h3>Mapeá tus integraciones MCP</h3>
        <p>¿Qué herramientas o datos de tu proyecto podrían exponerse como un servidor MCP?</p>
        <EditableField 
          id="mcp_integrations" 
          label="Herramientas / datos que podría conectar vía MCP:" 
          placeholder="Ej: Mi base de datos de Neon, el repo de GitHub, la API de Mercado Pago..."
        />
        <EditableField 
          id="mcp_use_case" 
          label="Caso de uso concreto que me ahorraría tiempo:" 
          placeholder="Ej: Que Claude lea mis migrations de Prisma y me sugiera índices faltantes..."
        />
        <EjercicioIA ejercicioId="adv" />
      </div>

      <hr />

      {/* ── ADV 2: SKILLS Y REGLAS ──────────────── */}
      <div className="bloque-header">
        <div className="bloque-num bg-purple">⬡</div>
        <div>
          <h2>Skills y archivos de reglas <span className="adv-badge">Avanzado</span></h2>
          <span className="tiempo">⏱ ~25 min · Guardrails, AI_CONTEXT, flujo de trabajo reproducible</span>
        </div>
      </div>

      <div className="card purple">
        <h3>El problema que resuelven</h3>
        <p>Cada vez que abrís una nueva conversación con un LLM, empieza desde cero. No sabe qué stack usás, qué convenciones tenés, qué está prohibido, cómo querés que responda. Los archivos de reglas resuelven esto de forma sistemática.</p>
        <ul style={{ marginTop: "10px" }}>
          <li>Documentan las decisiones del proyecto de forma que cualquier IA (o persona) pueda retomar el trabajo.</li>
          <li>Reducen la fricción: no repetís las mismas instrucciones en cada prompt.</li>
          <li>Hacen el flujo reproducible y colaborativo.</li>
        </ul>
      </div>

      <div className="code-block">
        <div className="code-block-label">guardrails.md — ejemplo real <span>Markdown</span></div>
        <pre>{`# AI Guardrails — Reglas para modelos en este proyecto

## Stack técnico
- Framework: Next.js 15 + TypeScript
- ORM: Prisma + Neon (PostgreSQL)
- Auth: NextAuth v5
- Package manager: bun (NUNCA npm ni npx)
- Deploy: Vercel

## Convenciones de código
- Todo el código y los comentarios en inglés
- Nombres de archivos: kebab-case
- Componentes: PascalCase
- Sin console.log en producción (usar logger)

## Lo que NO podés hacer
- No generes archivos si no te lo pido explícitamente
- No cambies el schema de Prisma sin mostrarme el diff primero
- No uses \`any\` en TypeScript
- No instales dependencias sin consultarme`}</pre>
      </div>

      <div className="code-block">
        <div className="code-block-label">AI_CONTEXT.md — contexto del proyecto <span>Markdown</span></div>
        <pre>{`# Contexto del proyecto para modelos de IA

## ¿Qué es este proyecto?
Zona Canchas — SaaS B2B para automatizar reservas de canchas de pádel en Argentina.
Multi-tenant. Cada club es un tenant con su propia configuración.

## Estado actual
- Schema de Prisma: ✅ completo y migrado
- Auth (NextAuth v5): ✅ funcionando
- Reservas: 🚧 en desarrollo
- WhatsApp bot: 📋 planificado`}</pre>
      </div>

      <div className="card">
        <h3>📁 Estructura de archivos recomendada</h3>
        <ul>
          <li><code>.ai/rules/guardrails.md</code> → Reglas duras que la IA no puede violar</li>
          <li><code>docs/AI_CONTEXT.md</code> → Estado actual del proyecto, decisiones técnicas</li>
          <li><code>docs/architecture.md</code> → Diagrama de arquitectura y justificaciones</li>
          <li><code>.cursorrules</code> o <code>.clinerules</code> → Reglas específicas por editor</li>
        </ul>
      </div>

      <div className="ejercicio adv">
        <div className="ejercicio-tag tech">🔬 Ejercicio avanzado</div>
        <h3>Escribí tu propio guardrails.md</h3>
        <p>Pensá en un proyecto tuyo actual. ¿Qué reglas necesitaría saber una IA (o un dev nuevo) para no romper nada?</p>
        <EditableField id="adv_stack" label="Stack técnico del proyecto:" placeholder="Framework, ORM, auth, deploy..." />
        <EditableField id="adv_convenciones" label="Convenciones de código:" placeholder="Nombres de archivos, idioma, patrones..." />
        <EditableField id="adv_no_hacer" label="Lo que la IA NO puede hacer sin consultarte:" placeholder="Modificar el schema, instalar deps..." />
        <EjercicioIA ejercicioId="adv" />
      </div>

      <hr />

      {/* ── ADV 3: FLUJO CLAUDE + GEMINI ───────── */}
      <div className="bloque-header">
        <div className="bloque-num bg-teal">⬡</div>
        <div>
          <h2>Flujo de trabajo Claude + Gemini <span className="adv-badge">Avanzado</span></h2>
          <span className="tiempo">⏱ ~20 min · Cómo combinar modelos según sus fortalezas</span>
        </div>
      </div>

      <div className="card">
        <h3>¿Por qué usar más de un modelo?</h3>
        <p>Cada modelo tiene fortalezas distintas. Combinarlos de forma estratégica da mejores resultados que usar uno solo para todo.</p>
        <ul style={{ marginTop: "8px" }}>
          <li><strong>Claude:</strong> Razonamiento profundo, documentos largos, decisiones de arquitectura.</li>
          <li><strong>Gemini:</strong> Ejecución rápida, generación de código en iteraciones cortas.</li>
          <li><strong>GPT-4o:</strong> Multimodal (imagen + texto), ecosistema de plugins.</li>
        </ul>
      </div>

      <div className="code-block">
        <div className="code-block-label">Regla de oro del flujo <span>Principio</span></div>
        <pre>{`# Siempre planificá antes de ejecutar

1. Claude (planificación):
   {"\""}Necesito implementar X. Analizá el contexto y decime el orden.{"\""}

2. Documentar el plan → actualizar AI_CONTEXT.md

3. Gemini (ejecución):
   {"\""}Implementá paso 1 del plan. Sin salirte del plan.{"\""}

4. Claude (revisión):
   {"\""}Revisá este código contra nuestras convenciones.{"\""}`}</pre>
      </div>

      <hr />

      {/* ── ADV 4: AGENTES IA ───────────────────── */}
      <div className="bloque-header">
        <div className="bloque-num bg-green">⬡</div>
        <div>
          <h2>Agentes IA y automatización <span className="adv-badge">Avanzado</span></h2>
          <span className="tiempo">⏱ ~20 min</span>
        </div>
      </div>

      <div className="card green">
        <h3>¿Qué es un agente IA?</h3>
        <p>Un agente es una IA que puede tomar decisiones y ejecutar acciones de forma autónoma para cumplir un objetivo.</p>
        <ul style={{ marginTop: "8px" }}>
          <li><strong>LLM simple:</strong> Preguntás → Responde.</li>
          <li><strong>Agente:</strong> Objetivo → planifica, ejecuta herramientas, itera.</li>
          <li>Usa herramientas: búsqueda web, código, APIs, DB.</li>
        </ul>
      </div>

      <hr />

      {/* ── ADV 5: IA EN PROYECTOS PROPIOS ─────── */}
      <div className="bloque-header">
        <div className="bloque-num bg-navy">⬡</div>
        <div>
          <h2>IA en proyectos SaaS y APIs <span className="adv-badge">Avanzado</span></h2>
          <span className="tiempo">⏱ ~20 min · Patrones de integración para productos reales</span>
        </div>
      </div>

      <div className="card blue">
        <h3>Patrones de integración más comunes</h3>
        <ul>
          <li><strong>Chat embebido:</strong> Asistente con contexto de tu producto.</li>
          <li><strong>Generación de contenido:</strong> Crear resúmenes o reportes.</li>
          <li><strong>RAG:</strong> Búsqueda semántica sobre tus propios registros.</li>
          <li><strong>Extracción estructurada:</strong> Parsear emails a objetos JSON.</li>
        </ul>
      </div>

      <div className="code-block">
        <div className="code-block-label">Extracción estructurada <span>TypeScript</span></div>
        <pre>{`// Parsear un mensaje a una reserva estructurada
const reserva = await ai.generateJSON({
  model: 'gpt-4o',
  schema: ReservaSchema,
  prompt: 'Extraé la info de este mensaje...'
});`}</pre>
      </div>
    </div>
  );
}
