// DHARMA — Evaluación física: peso, altura, IMC + pruebas (nombre/resultado), con historial

const HOY_EV = () => new Date().toISOString().slice(0, 10);
const fmtFechaEv = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return d + " " + (meses[Number(m) - 1] || "") + " " + y.slice(2);
};
const calcIMC = (peso, altura) => {
  const p = parseFloat(peso), a = parseFloat(altura) / 100;
  if (!p || !a) return null;
  return p / (a * a);
};
const catIMC = (imc) => {
  if (imc == null) return { txt: "—", cls: "" };
  if (imc < 18.5) return { txt: "Bajo peso", cls: "imc-bajo" };
  if (imc < 25) return { txt: "Saludable", cls: "imc-ok" };
  if (imc < 30) return { txt: "Sobrepeso", cls: "imc-alto" };
  return { txt: "Obesidad", cls: "imc-alto" };
};

function EvaluacionFisica({ persona, onGuardar }) {
  const evals = (persona.evaluaciones || []).slice().sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  const [form, setForm] = React.useState(null); // null | objeto en edición

  const nuevoForm = () => {
    const ult = evals[0];
    setForm({ id: "ev" + Date.now(), fecha: HOY_EV(), peso: "", altura: (ult && ult.altura) || "", pruebas: [], nuevo: true });
  };
  const editar = (ev) => setForm({ ...ev, pruebas: (ev.pruebas || []).map((p) => ({ ...p })) });
  const cancelar = () => setForm(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const addPrueba = () => setForm((f) => ({ ...f, pruebas: [...f.pruebas, { nombre: "", resultado: "" }] }));
  const updPrueba = (i, k, v) => setForm((f) => ({ ...f, pruebas: f.pruebas.map((p, x) => (x === i ? { ...p, [k]: v } : p)) }));
  const delPrueba = (i) => setForm((f) => ({ ...f, pruebas: f.pruebas.filter((_, x) => x !== i) }));

  const guardar = () => {
    const limpio = {
      id: form.id,
      fecha: form.fecha,
      peso: form.peso,
      altura: form.altura,
      pruebas: form.pruebas.filter((p) => p.nombre.trim()).map((p) => ({ nombre: p.nombre.trim(), resultado: p.resultado.trim() }))
    };
    const base = (persona.evaluaciones || []).filter((e) => e.id !== limpio.id);
    onGuardar({ ...persona, evaluaciones: [...base, limpio] });
    setForm(null);
  };
  const borrar = (id) => {
    onGuardar({ ...persona, evaluaciones: (persona.evaluaciones || []).filter((e) => e.id !== id) });
    setForm(null);
  };

  // nombres de pruebas usados antes, para sugerir
  const pruebasPrevias = [...new Set(evals.flatMap((e) => (e.pruebas || []).map((p) => p.nombre)))];

  const actual = evals[0];
  const prev = evals[1];
  const imcActual = actual ? calcIMC(actual.peso, actual.altura) : null;
  const cat = catIMC(imcActual);
  const deltaPeso = (actual && prev && actual.peso && prev.peso) ? (parseFloat(actual.peso) - parseFloat(prev.peso)) : null;

  return (
    <div className="eval-wrap">
      {/* resumen actual */}
      {actual ? (
        <div className="eval-resumen">
          <div className="eval-kpi">
            <span className="ek-label">Peso actual</span>
            <span className="ek-valor">{actual.peso || "—"}<em>kg</em></span>
            {deltaPeso != null ? <span className={"ek-delta" + (deltaPeso > 0 ? " sube" : deltaPeso < 0 ? " baja" : "")}>{deltaPeso > 0 ? "+" : ""}{deltaPeso.toFixed(1)} kg vs anterior</span> : null}
          </div>
          <div className="eval-kpi">
            <span className="ek-label">Altura</span>
            <span className="ek-valor">{actual.altura || "—"}<em>cm</em></span>
          </div>
          <div className="eval-kpi">
            <span className="ek-label">IMC</span>
            <span className="ek-valor">{imcActual ? imcActual.toFixed(1) : "—"}</span>
            {imcActual ? <span className={"ek-cat " + cat.cls}>{cat.txt}</span> : null}
          </div>
          <div className="eval-kpi medicion">
            <span className="ek-label">Última medición</span>
            <span className="ek-fecha-grande">{fmtFechaEv(actual.fecha)}</span>
            <button className="btn-mini" onClick={nuevoForm}>+ Nueva evaluación</button>
          </div>
        </div>
      ) : (
        <div className="eval-vacia">
          <p>Todavía no hay evaluaciones físicas de {persona.nombre.split(" ")[0]}. Registrá peso, altura y las pruebas que quieras seguir en el tiempo.</p>
          <button className="btn-primario" onClick={nuevoForm}>+ Primera evaluación</button>
        </div>
      )}

      {/* historial */}
      {evals.length > 0 ? (
        <div className="eval-historial">
          <div className="eval-hist-cab">
            <h4>Historial de evaluaciones</h4>
            {actual ? <button className="btn-secundario chico" onClick={nuevoForm}>+ Nueva</button> : null}
          </div>
          {evals.map((ev) => {
            const imc = calcIMC(ev.peso, ev.altura);
            const c = catIMC(imc);
            return (
              <div className="eval-tarjeta" key={ev.id}>
                <div className="et-cab">
                  <span className="et-fecha">{fmtFechaEv(ev.fecha)}</span>
                  <div className="et-datos">
                    <span><strong>{ev.peso || "—"}</strong> kg</span>
                    <span><strong>{ev.altura || "—"}</strong> cm</span>
                    {imc ? <span className={"et-imc " + c.cls}>IMC {imc.toFixed(1)} · {c.txt}</span> : null}
                  </div>
                  <button className="btn-icono" title="Editar" onClick={() => editar(ev)}>✎</button>
                </div>
                {(ev.pruebas && ev.pruebas.length > 0) ? (
                  <div className="et-pruebas">
                    {ev.pruebas.map((p, i) => (
                      <div className="et-prueba" key={i}>
                        <span className="etp-nombre">{p.nombre}</span>
                        <span className="etp-resultado">{p.resultado || "—"}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}

      {/* editor (modal) */}
      {form ? (
        <div>
          <div className="telon" onClick={cancelar}></div>
          <div className="mini-modal eval-modal">
            <header className="evento-modal-cab">
              <h3>{form.nuevo ? "Nueva evaluación" : "Editar evaluación"}</h3>
            </header>
            <div className="eval-modal-cuerpo">
              <div className="form-fila-2">
                <label className="campo"><span>Fecha</span><input type="date" value={form.fecha} onChange={(e) => set("fecha", e.target.value)}></input></label>
                <div></div>
              </div>
              <div className="form-fila-2">
                <label className="campo"><span>Peso (kg)</span><input type="number" inputMode="decimal" value={form.peso} onChange={(e) => set("peso", e.target.value)} placeholder="72"></input></label>
                <label className="campo"><span>Altura (cm)</span><input type="number" inputMode="decimal" value={form.altura} onChange={(e) => set("altura", e.target.value)} placeholder="168"></input></label>
              </div>
              {calcIMC(form.peso, form.altura) ? (
                <div className="eval-imc-preview">
                  IMC estimado: <strong>{calcIMC(form.peso, form.altura).toFixed(1)}</strong> · {catIMC(calcIMC(form.peso, form.altura)).txt}
                </div>
              ) : null}

              <div className="campo">
                <div className="campo-cab">
                  <span>Pruebas / tests</span>
                  <button type="button" className="btn-mini" onClick={addPrueba}>+ Agregar prueba</button>
                </div>
                {form.pruebas.length === 0 ? <p className="hint">Ej: Plancha, Test de Cooper, Salto vertical, Dominadas máximas…</p> : null}
                {form.pruebas.map((p, i) => (
                  <div className="eval-prueba-fila" key={i}>
                    <input list="dharma-pruebas-prev" value={p.nombre} onChange={(e) => updPrueba(i, "nombre", e.target.value)} placeholder="Nombre de la prueba"></input>
                    <input value={p.resultado} onChange={(e) => updPrueba(i, "resultado", e.target.value)} placeholder="Resultado (ej: 2:30 · 58 cm · 12 reps)"></input>
                    <button className="btn-icono borrar" onClick={() => delPrueba(i)}><IconX></IconX></button>
                  </div>
                ))}
                {pruebasPrevias.length > 0 ? (
                  <datalist id="dharma-pruebas-prev">
                    {pruebasPrevias.map((n, i) => <option key={i} value={n}></option>)}
                  </datalist>
                ) : null}
              </div>
            </div>
            <div className="evento-pie">
              {!form.nuevo ? <button className="btn-secundario peligro" onClick={() => borrar(form.id)}>Eliminar</button> : <span></span>}
              <div className="evento-pie-der">
                <button className="btn-secundario" onClick={cancelar}>Cancelar</button>
                <button className="btn-primario" disabled={!form.peso && !form.altura && form.pruebas.length === 0} onClick={guardar}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

Object.assign(window, { EvaluacionFisica });
