// DHARMA — Estudio: capa interactiva de preguntas.
// - Reflexión: "Revelar respuesta" (si hay respuesta modelo).
// - Opción múltiple / V-F: feedback inmediato (correcto/incorrecto + porqué).
// - Quiz de cierre: junta todas las preguntas de opción múltiple del manual y las puntúa.
// Modelo de datos retrocompatible: un item puede ser string o { q, respuesta } o { q, opciones, correcta, explicacion }.

const { useState: useStateQ } = React;

function normPregunta(item) {
  if (typeof item === "string") return { q: item, tipo: "abierta" };
  if (Array.isArray(item.opciones) && item.opciones.length) {
    return { q: item.q || item.texto || "", tipo: "opcion", opciones: item.opciones, correcta: item.correcta ?? 0, explicacion: item.explicacion || "" };
  }
  return { q: item.q || item.texto || "", tipo: "abierta", respuesta: item.respuesta || "" };
}

const QCheck = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-11"></path></svg>;
const QCross = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="18" y1="6" x2="6" y2="18"></line></svg>;

/* ---------- una pregunta interactiva (dentro del flujo de lectura) ---------- */
function PreguntaInteractiva({ item, n }) {
  const p = normPregunta(item);
  const [abierto, setAbierto] = useStateQ(false);    // reflexión: respuesta revelada
  const [elegida, setElegida] = useStateQ(null);      // opción seleccionada

  if (p.tipo === "opcion") {
    const respondida = elegida !== null;
    return (
      <li className="pq-item">
        <div className="pq-enunciado">{p.q}</div>
        <div className="pq-opciones">
          {p.opciones.map((op, i) => {
            const esCorrecta = i === p.correcta;
            const cls = !respondida ? "" : esCorrecta ? "ok" : (i === elegida ? "mal" : "atenuada");
            return (
              <button key={i} className={"pq-op " + cls} disabled={respondida} onClick={() => setElegida(i)}>
                <span className="pq-op-marca">{respondida && esCorrecta ? <QCheck></QCheck> : respondida && i === elegida ? <QCross></QCross> : String.fromCharCode(65 + i)}</span>
                <span className="pq-op-txt">{op}</span>
              </button>
            );
          })}
        </div>
        {respondida ? (
          <div className={"pq-feedback " + (elegida === p.correcta ? "ok" : "mal")}>
            <strong>{elegida === p.correcta ? "Correcto." : "No exactamente."}</strong>
            {p.explicacion ? " " + p.explicacion : (elegida !== p.correcta ? " La respuesta correcta es " + p.opciones[p.correcta] + "." : "")}
          </div>
        ) : null}
      </li>
    );
  }

  // reflexión
  return (
    <li className="pq-item">
      <div className="pq-enunciado">{p.q}</div>
      {p.respuesta ? (
        abierto ? (
          <div className="pq-respuesta"><div className="lbl">Respuesta sugerida</div>{p.respuesta}</div>
        ) : (
          <button className="pq-revelar" onClick={() => setAbierto(true)}>Revelar respuesta</button>
        )
      ) : <div className="pq-reflexion">Pregunta de reflexión — conversala con tu mentor.</div>}
    </li>
  );
}

/* ---------- bloque de preguntas (reemplaza el render estático) ---------- */
function BloquePreguntasInteractivo({ b }) {
  const items = b.items || [];
  const hayOpcion = items.some((it) => typeof it === "object" && Array.isArray(it.opciones));
  return (
    <div className="bk-preguntas interactivo">
      <div className="lbl">{b.titulo || "Para pensar"}{hayOpcion ? <span className="pq-hint">Elegí una opción</span> : null}</div>
      <ol className="pq-lista">
        {items.map((it, i) => <PreguntaInteractiva item={it} n={i + 1} key={i}></PreguntaInteractiva>)}
      </ol>
    </div>
  );
}

/* ---------- quiz de cierre: junta todas las de opción múltiple del manual ---------- */
function recolectarQuiz(manual) {
  const out = [];
  (manual.modulos || []).forEach((mod) => {
    (mod.bloques || []).forEach((bl) => {
      if (bl.tipo === "preguntas") {
        (bl.items || []).forEach((it) => {
          if (typeof it === "object" && Array.isArray(it.opciones) && it.opciones.length) {
            out.push({ ...normPregunta(it), modulo: mod.titulo });
          }
        });
      }
    });
  });
  return out;
}

function QuizCierre({ manual, onCompletar }) {
  const preguntas = React.useMemo(() => recolectarQuiz(manual), [manual.id]);
  const [respuestas, setRespuestas] = useStateQ({});   // idx -> opción elegida
  const [enviado, setEnviado] = useStateQ(false);
  if (!preguntas.length) return null;

  const total = preguntas.length;
  const contestadas = Object.keys(respuestas).length;
  const aciertos = preguntas.reduce((s, p, i) => s + (respuestas[i] === p.correcta ? 1 : 0), 0);
  const pct = Math.round((aciertos / total) * 100);
  const aprobado = pct >= 70;

  const enviar = () => { setEnviado(true); if (onCompletar) onCompletar({ aciertos, total, pct }); window.scrollTo({ top: document.querySelector(".quiz-cierre").getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" }); };
  const reiniciar = () => { setRespuestas({}); setEnviado(false); };

  return (
    <section className="quiz-cierre" data-screen-label="Quiz de cierre">
      <div className="quiz-cab">
        <span className="quiz-eyebrow">Autoevaluación</span>
        <h2>Quiz de cierre</h2>
        <p>{total} preguntas para confirmar que el material quedó claro. Necesitás 70% para aprobar.</p>
      </div>

      {enviado ? (
        <div className={"quiz-resultado " + (aprobado ? "ok" : "mal")}>
          <div className="quiz-score">{aciertos}<span>/{total}</span></div>
          <div className="quiz-score-info">
            <div className="quiz-pct">{pct}%</div>
            <div className="quiz-msg">{aprobado ? "¡Aprobado! Dominás el material." : "Repasá los módulos marcados y volvé a intentarlo."}</div>
          </div>
        </div>
      ) : null}

      <ol className="quiz-preguntas">
        {preguntas.map((p, i) => {
          const elegida = respuestas[i];
          return (
            <li key={i} className={"quiz-q" + (enviado ? (elegida === p.correcta ? " ok" : " mal") : "")}>
              <div className="quiz-q-cab">
                <span className="quiz-q-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="quiz-q-mod">{p.modulo}</div>
                  <div className="quiz-q-txt">{p.q}</div>
                </div>
              </div>
              <div className="quiz-opciones">
                {p.opciones.map((op, j) => {
                  let cls = elegida === j ? "sel" : "";
                  if (enviado) cls = j === p.correcta ? "ok" : (j === elegida ? "mal" : "atenuada");
                  return (
                    <button key={j} className={"quiz-op " + cls} disabled={enviado} onClick={() => setRespuestas((r) => ({ ...r, [i]: j }))}>
                      <span className="quiz-op-marca">{enviado && j === p.correcta ? <QCheck></QCheck> : enviado && j === elegida ? <QCross></QCross> : String.fromCharCode(65 + j)}</span>
                      <span>{op}</span>
                    </button>
                  );
                })}
              </div>
              {enviado && p.explicacion ? <div className={"quiz-exp " + (elegida === p.correcta ? "ok" : "mal")}>{p.explicacion}</div> : null}
            </li>
          );
        })}
      </ol>

      <div className="quiz-acciones">
        {enviado ? (
          <button className="btn-secundario" onClick={reiniciar}>Reintentar</button>
        ) : (
          <button className="btn-primario" disabled={contestadas < total} onClick={enviar}>
            {contestadas < total ? "Faltan " + (total - contestadas) + " de " + total : "Ver resultado"}
          </button>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { PreguntaInteractiva, BloquePreguntasInteractivo, QuizCierre, recolectarQuiz, normPregunta });
