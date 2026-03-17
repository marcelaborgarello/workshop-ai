import EditableField from "./EditableField";
import Checklist from "./Checklist";
import FeedbackForm from "./FeedbackForm";
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
            <div className="meta-pill">👥 <strong>Grupo mixto</strong> · todos los niveles</div>
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
            <a href="#adv" className="adv"><span className="dot"></span>⬡ Bloque Avanzado: MCP, Skills, Agentes</a>
            <a href="#recursos"><span className="dot"></span>Recursos y links</a>
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
          <div className="ejercicio-tag">✏️ Ejercicio 1 · Individual · 5 min</div>
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
            <span className="tiempo">⏱ ~45 min · Teoría + práctica grupal</span>
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
          <div className="ejercicio-tag">✏️ Ejercicio 2 · Parejas · 15 min</div>
          <h3>El desafío del prompt</h3>
          <p>Tomá este prompt pobre y reescribilo con las 5 partes.</p>
          <p style={{ marginTop: "8px", fontStyle: "italic", opacity: 0.7 }}>❌ Prompt original: <strong>{"\""}Haceme un resumen del mercado de IA.{"\""}</strong></p>
          <EditableField
            id="b2_mejorado"
            label="Tu prompt mejorado (usá las 5 partes):"
            rows={6}
            placeholder="[ROL] Sos un/a...\n[CONTEXTO] Trabajo en...\n[TAREA] Necesito que...\n[FORMATO] Respondé en...\n[RESTRICCIONES] No..."
          />
          <EjercicioIA ejercicioId="b2" />
        </div>

        <hr />

        {/* ── B3: IA EN EL TRABAJO ═════ */}
        <div className="bloque-header" id="b3">
          <div className="bloque-num bg-green">03</div>
          <div>
            <h2>IA en tu trabajo diario</h2>
            <span className="tiempo">⏱ ~45 min · Demo en vivo + ejercicio grupal</span>
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
              <tr><td>ChatGPT</td><td>Redacción, análisis, código, brainstorming</td><td><span className="badge badge-freemium">Freemium</span></td><td>Todos</td></tr>
              <tr><td>Claude</td><td>Documentos largos, razonamiento, análisis profundo</td><td><span className="badge badge-freemium">Freemium</span></td><td>Todos</td></tr>
              <tr><td>Perplexity</td><td>Búsqueda con fuentes verificadas, investigación</td><td><span className="badge badge-freemium">Freemium</span></td><td>Todos</td></tr>
              <tr><td>GitHub Copilot</td><td>Autocompletar código, generar tests</td><td><span className="badge badge-paid">Pago</span></td><td>Devs</td></tr>
            </tbody>
          </table>
        </div>

        <div className="ejercicio">
          <div className="ejercicio-tag">✏️ Ejercicio 3 · Grupal · 15 min</div>
          <h3>¿Qué tarea haría yo con IA esta semana?</h3>
          <EditableField id="b3_tareas" label="Mis 3 tareas candidatas:" placeholder="1. ...\n2. ...\n3. ..." rows={3} />
          <EditableField id="b3_prompt" label="La que elegí y el prompt que armé:" placeholder="Prompt para la tarea elegida..." rows={4} />
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
              <li>Consultas SQL en lenguaje natural</li>
            </ul>
          </div>
        </div>

        <div className="ejercicio">
          <div className="ejercicio-tag">✏️ Notas de la demo</div>
          <h3>Generación de código en vivo</h3>
          <EditableField id="b4_prompt" label="Prompt usado:" placeholder="Anotá el prompt..." />
          <EditableField id="b4_observado" label="Lo que más me llamó la atención:" placeholder="Observaciones..." />
          <EjercicioIA ejercicioId="b4" />
        </div>

        <hr />

        {/* ── B5: ÉTICA ═════════════════ */}
        <div className="bloque-header" id="b5">
          <div className="bloque-num bg-pink">05</div>
          <div>
            <h2>Ética, sesgos y uso responsable</h2>
            <span className="tiempo">⏱ ~30 min · Debate + reflexión grupal</span>
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

        {/* ── FEEDBACK ────────────────────────────── */}
        <div className="bloque-header">
          <div className="bloque-num bg-pink">★</div>
          <div>
            <h2>Feedback del workshop</h2>
            <span className="tiempo">Ayudanos a mejorar</span>
          </div>
        </div>

        <FeedbackForm />

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
