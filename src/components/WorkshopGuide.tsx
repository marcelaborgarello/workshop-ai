import EditableField from "./EditableField";
import Checklist from "./Checklist";
import FinalCTA from "./FinalCTA";
import AdvancedToggle from "./AdvancedToggle";
import EjercicioIA from "./EjercicioIA";
import TermsModal from "./TermsModal";

export default function WorkshopGuide() {
  return (
    <div className="workshop-container">
      <TermsModal />
      {/* ── HEADER ─────────────────────────────── */}
      <div className="header">
        <div className="header-inner">
          <div className="header-tag">Guía del Participante</div>
          <h1>Workshop de <span>Inteligencia Artificial</span></h1>
          <p className="sub">Del uso cotidiano al dominio profesional</p>
          <p className="brand">✦ Un recurso de <strong>Ginialtech</strong></p>
          <div className="header-meta">
            <div className="meta-pill">⏱ <strong>Medio día</strong></div>
            <div className="meta-pill">🎯 Todos los niveles</div>
            <div className="meta-pill">🔬 Incluye <strong>Bloque Avanzado</strong></div>
          </div>
        </div>
      </div>

      <div className="container">

        {/* ── ÍNDICE ───────────────────────────────── */}
        <div className="indice">
          <h3>Contenido</h3>
          <div className="indice-grid">
            <a href="#b1"><span className="dot"></span>01 · Cómo funciona la IA</a>
            <a href="#b4"><span className="dot"></span>04 · IA y desarrollo</a>
            <a href="#b2"><span className="dot"></span>02 · Prompt Engineering</a>
            <a href="#b5"><span className="dot"></span>05 · Ética y uso responsable</a>
            <a href="#b3"><span className="dot"></span>03 · IA en tu trabajo</a>
            <a href="#glosario"><span className="dot"></span>Glosario de términos</a>
            <a href="#recursos"><span className="dot"></span>Recursos y links</a>
            <a href="#adv" className="adv"><span className="dot"></span>⬡ Bloque Avanzado: MCP, Skills, Agentes</a>

          </div>
        </div>

        {/* ── B1: CÓMO FUNCIONA ════════ */}
        <div className="bloque-header" id="b1">
          <div className="bloque-num bg-teal">01</div>
          <div>
            <h2>Cómo funciona la IA</h2>
            <span className="tiempo">⏱ ~45 min · Teoría + analogías + preguntas</span>
          </div>
        </div>

        <div className="concepto-grid">
          <div className="concepto">
            <div className="concepto-term">LLM — Large Language Model</div>
            <p>Modelo entrenado con enormes volúmenes de texto que aprende a predecir la siguiente palabra. No entiende, predice. El comportamiento inteligente emerge de esa predicción a escala masiva.</p>
          </div>
          <div className="concepto">
            <div className="concepto-term">Tokens</div>
            <p>La IA no trabaja con palabras sino con fragmentos llamados tokens. 1 token ≈ ¾ de palabra en inglés.</p>
          </div>
          <div className="concepto">
            <div className="concepto-term">Parámetros</div>
            <p>Los {"\""}pesos{"\""} del modelo, ajustados durante el entrenamiento. GPT-4 tiene estimados ~1.8 billones.</p>
          </div>
          <div className="concepto">
            <div className="concepto-term">RLHF</div>
            <p>Reinforcement Learning from Human Feedback. Personas califican respuestas para que la IA sea útil y segura.</p>
          </div>
        </div>

        <div className="card">
          <h3>🧠 La analogía del autocomplete</h3>
          <ul>
            <li>Tu teclado sugiere la próxima palabra. La IA hace lo mismo, pero entrenada con casi todo el texto del mundo.</li>
            <li>No {"\""}sabe{"\""} nada. Calcula probabilidades de qué texto sigue al tuyo.</li>
            <li>De esa predicción emergen capacidades inesperadas: razonamiento, código, creatividad.</li>
          </ul>
        </div>

        <div className="ejercicio">
          <div className="ejercicio-tag">✏️ Ejercicio 1 · 5 min</div>
          <h3>¿Qué sabías y qué era mito?</h3>
          <p>Anotá dos cosas que creías sobre la IA y que este bloque confirmó o desmintió:</p>
          <EditableField id="b1_confirmado" label="Confirmado:" placeholder="Ej: Que la IA en realidad no entiende el lenguaje como nosotros..." />
          <EditableField id="b1_desmitificado" label="Desmitificado:" placeholder="Ej: Creía que la IA tenía memoria entre conversaciones..." />
          <EjercicioIA ejercicioId="b1" />
        </div>

        <hr />

        {/* ── B2: PROMPT ENGINEERING ═══ */}
        <div className="bloque-header" id="b2">
          <div className="bloque-num bg-amber">02</div>
          <div>
            <h2>Prompt Engineering</h2>
            <span className="tiempo">⏱ ~45 min · Teoría + práctica</span>
          </div>
        </div>

        <p style={{ marginBottom: "18px", color: "#3A4A5A" }}>Un buen prompt tiene cinco componentes. Cuantos más incluyas, mejor el resultado.</p>

        <div className="prompt-grid">
          <div className="prompt-part">
            <div className="prompt-part-header" style={{ background: "#00B4A6" }}>ROL</div>
            <div className="prompt-part-body">
              <div className="label">¿Quién es la IA para vos?</div>
              <div className="example">{"\""}Sos una experta en comunicación corporativa...{"\""}</div>
            </div>
          </div>
          <div className="prompt-part">
            <div className="prompt-part-header" style={{ background: "#5B8DB8", color: "white" }}>CONTEXTO</div>
            <div className="prompt-part-body">
              <div className="label">¿Qué situación hay que entender?</div>
              <div className="example">{"\""}Trabajo en una empresa de logística de 50 personas...{"\""}</div>
            </div>
          </div>
          <div className="prompt-part">
            <div className="prompt-part-header" style={{ background: "#F5A623" }}>TAREA</div>
            <div className="prompt-part-body">
              <div className="label">¿Qué hacés concretamente?</div>
              <div className="example">{"\""}Redactá un email formal para comunicar el cambio...{"\""}</div>
            </div>
          </div>
          <div className="prompt-part">
            <div className="prompt-part-header" style={{ background: "#7FB069", color: "white" }}>FORMATO</div>
            <div className="prompt-part-body">
              <div className="label">¿Cómo querés el output?</div>
              <div className="example">{"\""}En bullet points, máx 5 ítems, tono amigable.{"\""}</div>
            </div>
          </div>
          <div className="prompt-part">
            <div className="prompt-part-header" style={{ background: "#C5738A", color: "white" }}>RESTRICCIONES</div>
            <div className="prompt-part-body">
              <div className="label">¿Qué NO querés?</div>
              <div className="example">{"\""}No uses palabras en inglés. No supongas nada.{"\""}</div>
            </div>
          </div>
        </div>

        <div className="card amber">
          <h3>🔧 Técnicas que multiplican el resultado</h3>
          <ul>
            <li><strong>Chain of Thought:</strong> {"\""}Pensá paso a paso antes de responder.{"\""}</li>
            <li><strong>Few-Shot:</strong> Mostrale ejemplos antes de pedir.</li>
            <li><strong>Iteración activa:</strong> Refiná en turnos.</li>
          </ul>
        </div>

        <div className="ejercicio">
          <div className="ejercicio-tag">✏️ Ejercicio 2 · 15 min</div>
          <h3>El desafío del prompt</h3>
          <p>Tomá este prompt pobre y reescribilo con las 5 partes.</p>
          <p style={{ marginTop: "8px", fontStyle: "italic", opacity: 0.7 }}>❌ Prompt original: <strong>{"\""}Haceme un resumen del mercado de IA.{"\""}</strong></p>
          <p className="text-sm text-slate-400 mb-3">
            Completá con tu propio prompt usando las 5 partes. Ejemplo (podés copiarlo y editarlo):
          </p>
          <div className="p-4 bg-[#1A2E3D]/40 border border-[#7B5EA7]/20 rounded-xl mb-4 text-[13px] text-slate-300 leading-relaxed font-mono whitespace-pre-wrap shadow-inner">
{`[ROL] Experto en marketing tecnológico
[CONTEXTO] Trabajo en una startup que busca inversión
[TAREA] Resumí las tendencias clave del mercado de IA en 2025
[FORMATO] 5 viñetas, máximo 100 palabras cada una
[RESTRICCIONES] Evitá tecnicismos, usá tono ejecutivo`}
          </div>
          <EditableField
            id="b2_mejorado"
            label="Tu prompt mejorado (usá las 5 partes):"
            rows={6}
            placeholder=""
          />
          <EjercicioIA ejercicioId="b2" />
        </div>

        <hr />

        {/* ── B3: IA EN EL TRABAJO ═════ */}
        <div className="bloque-header" id="b3">
          <div className="bloque-num bg-green">03</div>
          <div>
            <h2>IA en tu trabajo diario</h2>
            <span className="tiempo">⏱ ~45 min · Demo en vivo + ejercicio</span>
          </div>
        </div>

        <div className="tabla-wrap">
          <table>
            <thead>
              <tr>
                <th>Herramienta</th>
                <th>Para qué sirve</th>
                <th>Precio</th>
                <th>Nivel</th>
              </tr>
            </thead>
            <tbody>
               <tr><td><a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">Gemini</a></td><td>Ecosistema Google, ventanas de contexto masivas y visión</td><td><span className="badge badge-freemium">Gratis / Pro</span></td><td>Todos</td></tr>
               <tr><td><a href="https://chat.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">ChatGPT</a></td><td>Redacción, análisis de datos, código y modo de voz</td><td><span className="badge badge-freemium">Gratis / Plus</span></td><td>Todos</td></tr>
               <tr><td><a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">Claude</a></td><td>Documentos largos, razonamiento y precisión excepcional</td><td><span className="badge badge-freemium">Gratis / Pro</span></td><td>Todos</td></tr>
               <tr><td><a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">Perplexity</a></td><td>Búsqueda con fuentes verificadas y navegación web activa</td><td><span className="badge badge-freemium">Gratis / Pro</span></td><td>Todos</td></tr>
               <tr><td><a href="https://chat.deepseek.com/" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">DeepSeek</a></td><td>Razonamiento lógico potente (R1) y código de alto nivel</td><td><span className="badge badge-free">Gratis</span></td><td>Todos / Devs</td></tr>
               <tr><td><a href="https://x.ai" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">Grok</a></td><td>Acceso a datos de X (Twitter) en tiempo real</td><td><span className="badge badge-freemium">Gratis / Premium</span></td><td>Todos</td></tr>
               <tr><td><a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">GitHub Copilot</a></td><td>Autocompletar código y generar tests unitarios</td><td><span className="badge badge-paid">Pago (Individual / Business)</span></td><td>Devs</td></tr>
            </tbody>
          </table>
          <p className="text-[11px] text-slate-500 mt-2 px-4 italic">
            * DeepSeek es gratuito, con opciones de pago para uso por API. Verificar en su web oficial.
          </p>
        </div>

        <div className="ejercicio">
          <h3>¿Qué tarea haría yo con IA esta semana?</h3>
          <p className="text-sm text-slate-500 mb-6">
            (Ej: redactar agenda, resumir artículos, generar ideas para un newsletter, organizar mi bandeja de entrada...)
          </p>

          <div className="mb-6">
            <h4 className="text-[11px] font-black text-[#7B5EA7] uppercase tracking-[0.2em] mb-4">
              MIS 3 TAREAS CANDIDATAS:
            </h4>
            <div className="space-y-3">
              <EditableField id="b3_tarea1" placeholder="Tarea 1..." rows={1} />
              <EditableField id="b3_tarea2" placeholder="Tarea 2..." rows={1} />
              <EditableField id="b3_tarea3" placeholder="Tarea 3..." rows={1} />
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-black text-[#7B5EA7] uppercase tracking-[0.2em] mb-4">
              TAREA QUE ELEGÍ Y SU PROMPT:
            </h4>
            <EditableField 
              id="b3_prompt" 
              placeholder="Escribí acá el prompt para la tarea que elegiste..." 
              rows={4} 
            />
          </div>
          <EjercicioIA ejercicioId="b3" />
        </div>

        <hr />

        {/* ── B4: CÓDIGO ════════════════ */}
        <div className="bloque-header" id="b4">
          <div className="bloque-num bg-blue">04</div>
          <div>
            <h2>IA y desarrollo de software</h2>
            <span className="tiempo">⏱ ~30 min · Demo en vivo</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
          <div className="card blue">
            <h3>💻 Para developers</h3>
            <ul>
              <li>Autocompletar funciones (Copilot, Cursor)</li>
              <li>Generar tests unitarios automáticamente</li>
              <li>Refactorizar código legado</li>
            </ul>
          </div>
          <div className="card amber">
            <h3>🙋 Para no-developers</h3>
            <ul>
              <li>Scripts de automatización simples</li>
              <li>Fórmulas complejas de Excel / Sheets</li>
              <li>Automatizar la creación de informes en Sheets</li>
            </ul>
          </div>
        </div>

        <div className="ejercicio">
          <div className="ejercicio-tag">✏️ Ejercicio 4 · 5 min</div>
          <h3>Sacate las dudas con la IA</h3>
          <p className="mb-4">Aprovechá a preguntarle a Gemini cualquier duda que te haya quedado sobre cómo usar la IA en tu trabajo o sobre lo que vimos en la demo.</p>
          <EditableField id="b4_pregunta" label="Mi pregunta o duda:" placeholder="Por ejemplo: ¿Cómo le pido a la IA que no invente datos en un informe?..." rows={3} />
          <EjercicioIA ejercicioId="b4" />
        </div>

        <hr />

        {/* ── B5: ÉTICA ═════════════════ */}
        <div className="bloque-header" id="b5">
          <div className="bloque-num bg-pink">05</div>
          <div>
            <h2>Ética, sesgos y uso responsable</h2>
            <span className="tiempo">⏱ ~30 min · Debate + reflexión</span>
          </div>
        </div>

        <div className="card pink">
          <h3>⚠️ Riesgos que tenés que conocer</h3>
          <ul>
            <li><strong>Alucinaciones:</strong> La IA inventa datos con total confianza.</li>
            <li><strong>Sesgos:</strong> Hereda sesgos de los datos humanos.</li>
            <li><strong>Privacidad:</strong> No ingreses datos sensibles ni secretos.</li>
          </ul>
        </div>

        <Checklist
          title="Mi checklist de uso responsable"
          items={[
            { id: "check_verificar", text: "Verifico los datos importantes antes de usarlos" },
            { id: "check_privacidad", text: "No comparto datos confidenciales con IAs externas" },
            { id: "check_codigo", text: "Reviso el código generado antes de producir" },
            { id: "check_transparencia", text: "Soy transparente sobre el uso de asistentes IA" },
          ]}
        />

        <hr />

        {/* ── GLOSARIO ────────────────────────────── */}
        <div className="bloque-header" id="glosario">
          <div className="bloque-num bg-teal">📖</div>
          <div>
            <h2>Glosario de términos IA</h2>
            <span className="tiempo">Referencia rápida para llevar</span>
          </div>
        </div>

        <div className="glosario-grid">
          <div className="glosario-item"><div className="glosario-term">LLM</div><div className="glosario-def">Modelo de lenguaje de gran escala. Base de ChatGPT.</div></div>
          <div className="glosario-item"><div className="glosario-term">Token</div><div className="glosario-def">Fragmento de texto (≈ ¾ de palabra).</div></div>
          <div className="glosario-item"><div className="glosario-term">Prompt</div><div className="glosario-def">La instrucción o pregunta que le das a la IA.</div></div>
          <div className="glosario-item"><div className="glosario-term">Agente IA</div><div className="glosario-def">IA que puede tomar acciones de forma autónoma.</div></div>
        </div>

        <hr />

        {/* ── BLOQUE AVANZADO (TOGGLE) ── */}
        <AdvancedToggle />

        <hr />

        <FinalCTA />

        <hr />

        {/* ── PRÓXIMOS PASOS ════════════ */}
        <div className="card" style={{ borderLeftColor: "var(--teal)", background: "var(--dark)" }}>
          <h3 style={{ color: "var(--white)" }}>🎯 Tus próximos pasos concretos</h3>
          <ul>
            <li style={{ color: "var(--offW)" }}><strong style={{ color: "var(--teal)" }}>Esta semana:</strong> Probá un prompt con las 5 partes en una tarea real.</li>
            <li style={{ color: "var(--offW)" }}><strong style={{ color: "var(--teal)" }}>Este mes:</strong> Identificá 3 tareas repetitivas y acelerálas.</li>
            <li style={{ color: "var(--offW)" }}><strong style={{ color: "var(--amber)" }}>Si sos developer:</strong> Creá tu guardrails.md en el próximo proyecto.</li>
          </ul>
        </div>

        <hr />

        {/* ── RECURSOS ────────────────────────────── */}
        <div className="bloque-header" id="recursos">
          <div className="bloque-num bg-teal">🔗</div>
          <div>
            <h2>Recursos y links</h2>
            <span className="tiempo">Para seguir aprendiendo</span>
          </div>
        </div>

        <div className="recursos-grid">
          <div className="recurso-box">
            <h4>📚 CURSOS</h4>
            <ul>
              <li><a href="https://www.deeplearning.ai/" target="_blank" rel="noopener noreferrer">DeepLearning.AI</a></li>
              <li><a href="https://grow.google/ai-essentials/" target="_blank" rel="noopener noreferrer">Google AI Essentials</a></li>
            </ul>
          </div>
          <div className="recurso-box">
            <h4>📡 NEWSLETTERS</h4>
            <ul>
              <li><a href="https://www.therundown.ai/" target="_blank" rel="noopener noreferrer">The Rundown AI</a></li>
              <li><a href="https://tldr.tech/ai" target="_blank" rel="noopener noreferrer">TLDR AI</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
