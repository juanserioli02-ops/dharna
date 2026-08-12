// DHARMA — Seguimiento del alumno: registro de cargas, wellness (con alertas) y ciclo menstrual

const HOY = () => new Date().toISOString().slice(0, 10);
const MESES_AB = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const fFecha = (iso) => { if (!iso) return "—"; const [y, m, d] = iso.split("-"); return d + " " + (MESES_AB[Number(m) - 1] || "") + " " + y.slice(2); };
const diasEntre = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
const prom = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;

/* ---------- ALERTAS DE WELLNESS (reutilizable por coach) ---------- */
function calcularAlertasWellness(wellness) {
  if (!wellness || wellness.length === 0) return { alertas: [], ultima: null };
  const ord = [...wellness].sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  const u = ord[0];
  const previos = ord.slice(1, 8);
  const avg = (k) => prom(previos.map((e) => Number(e[k])).filter((x) => !isNaN(x)));
  const alertas = [];
  const sue = Number(u.sueno);
  if (!isNaN(sue)) {
    const a = avg("sueno");
    if (sue < 6) alertas.push({ nivel: "alta", texto: "Durmió poco (" + sue + " h)" });
    else if (a != null && sue <= a - 1.5) alertas.push({ nivel: "media", texto: "Sueño por debajo de su media" });
  }
  const chequear = (k, label, dir) => {
    const v = Number(u[k]); if (isNaN(v)) return;
    const a = avg(k);
    if (dir === "bajo") {
      if (v <= 2) alertas.push({ nivel: "media", texto: label + " baja/o" });
      else if (a != null && v <= a - 1.5) alertas.push({ nivel: "media", texto: label + " por debajo de su media" });
    } else {
      if (v >= 4) alertas.push({ nivel: v >= 5 ? "alta" : "media", texto: label + " alto" });
      else if (a != null && v >= a + 1.5) alertas.push({ nivel: "media", texto: label + " sobre su media" });
    }
  };
  chequear("energia", "Energía", "bajo");
  chequear("animo", "Ánimo", "bajo");
  chequear("dolor", "Dolor muscular", "alto");
  chequear("estres", "Estrés", "alto");
  return { alertas, ultima: u };
}

/* ============================================================
   HUB DE SEGUIMIENTO
   ============================================================ */
function AlumnoSeguimiento({ persona, onGuardar, tab, onTab }) {
  const seg = [["wellness", "Bienestar", "Check-in diario"]];
  if (persona.sexo === "Mujer") seg.push(["ciclo", "Ciclo", "Registro menstrual"]);
  const herr = [["cronometro", "Cronómetro", "Tabata · AMRAP · EMOM"], ["conversor", "Conversor", "Libras ↔ Kilos"], ["rm", "Calculadora RM", "Tu 1RM estimado"]];
  const idsValidos = [...seg, ...herr].map(([id]) => id);
  const activa = idsValidos.includes(tab) ? tab : "wellness";

  const TabBtn = ([id, nombre, desc]) => (
    <button key={id} className={"herr-tab" + (activa === id ? " activo" : "")} onClick={() => onTab(id)}>
      <span className="ht-nombre">{nombre}</span>
      <span className="ht-desc">{desc}</span>
    </button>
  );

  return (
    <main className="contenido alumno-contenido" data-screen-label="Alumno — Mi espacio">
      <h1 className="titulo-vista">Mi espacio</h1>

      <div className="seg-grupo-label">Seguimiento</div>
      <div className="herr-tabs seg-tabs">{seg.map(TabBtn)}</div>

      <div className="seg-grupo-label">Herramientas</div>
      <div className="herr-tabs seg-tabs">{herr.map(TabBtn)}</div>

      <div className="seg-contenido">
        {activa === "wellness" ? <Wellness persona={persona} onGuardar={onGuardar}></Wellness> : null}
        {activa === "ciclo" && persona.sexo === "Mujer" ? <Ciclo persona={persona} onGuardar={onGuardar}></Ciclo> : null}
        {activa === "cronometro" ? <div className="herr-panel"><Cronometro></Cronometro></div> : null}
        {activa === "conversor" ? <div className="herr-panel"><Conversor></Conversor></div> : null}
        {activa === "rm" ? <div className="herr-panel"><Calc1RM></Calc1RM></div> : null}
      </div>
    </main>
  );
}

/* ---------- REGISTRO DE CARGAS (personal) — RETIRADO: ver migrarCargasViejas en seguimiento.jsx ---------- */

/* ---------- WELLNESS (check-in + alertas) ---------- */
const ESCALA_5 = [1, 2, 3, 4, 5];
function Escala({ valor, onChange, etiquetas, invertido }) {
  const ref = React.useRef(null);
  const v = Number(valor) || 0;
  const pct = v ? ((v - 1) / 4) * 100 : 0;
  const setFromX = (clientX) => {
    const r = ref.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    onChange(Math.round(ratio * 4) + 1);
  };
  const onDown = (e) => {
    e.preventDefault();
    setFromX(e.clientX);
    const move = (ev) => setFromX(ev.clientX);
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const bueno = invertido ? (6 - v) : v; // 5 = mejor
  const color = !v ? "#7C8086" : bueno >= 4 ? "#489DA3" : bueno === 3 ? "#6EC5D1" : "#E84D23";
  return (
    <div className="escala-bar-wrap">
      <div className={"escala-bar" + (v ? "" : " vacia")} ref={ref} onPointerDown={onDown} role="slider" aria-valuenow={v} aria-valuemin={1} aria-valuemax={5}>
        <div className="escala-fill" style={{ width: pct + "%", background: color }}></div>
        {ESCALA_5.map((n) => (
          <span key={n} className={"escala-tick" + (v && n <= v ? " on" : "")} style={{ left: ((n - 1) / 4 * 100) + "%" }}></span>
        ))}
        <div className="escala-thumb" style={{ left: pct + "%", background: v ? color : "#FFFFFF", borderColor: color }}>{v || "·"}</div>
      </div>
      {etiquetas ? <div className="escala-leyenda"><span>{etiquetas[0]}</span><span>{etiquetas[1]}</span></div> : null}
    </div>
  );
}

function Sparkline({ datos, invertido, color }) {
  if (datos.length < 2) return null;
  const w = 280, h = 44, pad = 4;
  const vals = datos.map((d) => d.v);
  const min = 1, max = 5;
  const x = (i) => pad + (i / (datos.length - 1)) * (w - pad * 2);
  const y = (v) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const pts = vals.map((v, i) => x(i) + "," + y(v)).join(" ");
  const bueno = invertido ? (6 - vals[vals.length - 1]) : vals[vals.length - 1];
  const c = color || (bueno >= 4 ? "#489DA3" : bueno === 3 ? "#6EC5D1" : "#E84D23");
  return (
    <svg className="wtrend-svg" viewBox={"0 0 " + w + " " + h} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
      {vals.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={i === vals.length - 1 ? 3 : 1.6} fill={c}></circle>)}
    </svg>
  );
}

function TendenciaWellness({ wellness }) {
  const ord = [...wellness].sort((a, b) => (a.fecha < b.fecha ? 1 : -1)).slice(0, 14).reverse();
  const campos = [["suenoCal", "Sueño", false], ["energia", "Energía", false], ["animo", "Ánimo", false], ["dolor", "Dolor muscular", true], ["estres", "Estrés", true]];
  const conDatos = campos.filter(([k]) => ord.some((w) => w[k]));
  if (conDatos.length === 0) return null;
  return (
    <div className="herr-panel">
      <h4>Tu tendencia (últimos {ord.length} check-ins)</h4>
      <div className="wtrend-lista">
        {conDatos.map(([k, label, inv]) => {
          const datos = ord.filter((w) => w[k]).map((w) => ({ v: Number(w[k]) }));
          return (
            <div className="wtrend-fila" key={k}>
              <span className="wtrend-label">{label}</span>
              <Sparkline datos={datos} invertido={inv}></Sparkline>
              <span className="wtrend-actual">{datos[datos.length - 1].v}/5</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Wellness({ persona, onGuardar }) {
  const wellness = persona.wellness || [];
  const hoyReg = wellness.find((w) => w.fecha === HOY());
  const [f, setF] = React.useState(hoyReg || { fecha: HOY(), sueno: "", energia: "", animo: "", dolor: "", estres: "", notas: "" });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const guardar = () => {
    const otras = wellness.filter((w) => w.fecha !== f.fecha);
    onGuardar({ ...persona, wellness: [{ ...f }, ...otras] });
  };
  const completo = f.sueno !== "" && f.energia && f.animo;

  const { alertas } = calcularAlertasWellness(wellness);
  const hist = [...wellness].sort((a, b) => (a.fecha < b.fecha ? 1 : -1)).slice(0, 7);

  return (
    <div className="wellness">
      {alertas.length > 0 ? (
        <div className="wellness-alertas">
          <span className="wa-titulo"><IconoAlerta size={13}></IconoAlerta> Alertas</span>
          <div className="wa-chips">
            {alertas.map((a, i) => <span key={i} className={"wa-chip " + a.nivel}>{a.texto}</span>)}
          </div>
        </div>
      ) : null}

      <div className="herr-panel wellness-form">
        <h4>{hoyReg ? "Tu check-in de hoy" : "¿Cómo amaneciste hoy?"}</h4>
        <div className="wf-fila">
          <label className="wf-campo">
            <span>Horas de sueño</span>
            <div className="ap-input-kg"><input inputMode="decimal" value={f.sueno} placeholder="—" onChange={(e) => set("sueno", e.target.value)}></input><em>h</em></div>
          </label>
        </div>
        <div className="wf-escalas">
          <div className="wf-escala"><span>¿Cómo dormiste?</span><Escala valor={f.suenoCal} onChange={(v) => set("suenoCal", v)} etiquetas={["muy mal", "muy bien"]}></Escala></div>
          <div className="wf-escala"><span>Energía</span><Escala valor={f.energia} onChange={(v) => set("energia", v)} etiquetas={["agotado", "pleno"]}></Escala></div>
          <div className="wf-escala"><span>Ánimo</span><Escala valor={f.animo} onChange={(v) => set("animo", v)} etiquetas={["bajo", "alto"]}></Escala></div>
          <div className="wf-escala"><span>Dolor muscular</span><Escala valor={f.dolor} onChange={(v) => set("dolor", v)} etiquetas={["nada", "mucho"]} invertido={true}></Escala></div>
          <div className="wf-escala"><span>Estrés</span><Escala valor={f.estres} onChange={(v) => set("estres", v)} etiquetas={["nada", "mucho"]} invertido={true}></Escala></div>
        </div>
        <label className="campo"><span>Notas (opcional)</span><input value={f.notas} onChange={(e) => set("notas", e.target.value)} placeholder="¿Algo para contar?"></input></label>
        <button className="btn-primario" disabled={!completo} onClick={guardar}>{hoyReg ? "Actualizar check-in" : "Guardar check-in"}</button>
      </div>

      {hist.length > 0 ? (
        <div className="herr-panel">
          <h4>Últimos días</h4>
          <div className="wellness-hist">
            {hist.map((w, i) => (
              <div className="wh-fila" key={i}>
                <span className="wh-fecha">{fFecha(w.fecha)}</span>
                <span className="wh-dato"><em>Sueño</em>{w.sueno || "—"}h</span>
                <span className="wh-dato"><em>Energía</em>{w.energia || "—"}</span>
                <span className="wh-dato"><em>Ánimo</em>{w.animo || "—"}</span>
                <span className="wh-dato"><em>Dolor</em>{w.dolor || "—"}</span>
                <span className="wh-dato"><em>Estrés</em>{w.estres || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <TendenciaWellness wellness={wellness}></TendenciaWellness>
    </div>
  );
}

/* ---------- CICLO MENSTRUAL ---------- */
const SINTOMAS = ["Cólicos", "Cansancio", "Dolor de cabeza", "Hinchazón", "Cambios de ánimo", "Antojos", "Dolor lumbar"];
const FLUJOS = ["Ligero", "Medio", "Abundante"];

function Ciclo({ persona, onGuardar }) {
  const ciclo = persona.ciclo || [];
  const [f, setF] = React.useState({ fechaInicio: HOY(), sintomas: [], flujo: "Medio", notas: "" });
  const setSintoma = (s) => setF((p) => ({ ...p, sintomas: p.sintomas.includes(s) ? p.sintomas.filter((x) => x !== s) : [...p.sintomas, s] }));

  const registrar = () => {
    const reg = { id: "ci" + Date.now(), ...f };
    onGuardar({ ...persona, ciclo: [reg, ...ciclo] });
    setF({ fechaInicio: HOY(), sintomas: [], flujo: "Medio", notas: "" });
  };
  const borrar = (id) => onGuardar({ ...persona, ciclo: ciclo.filter((c) => c.id !== id) });

  const ord = [...ciclo].sort((a, b) => (a.fechaInicio < b.fechaInicio ? 1 : -1));
  const largos = [];
  for (let i = 0; i < ord.length - 1; i++) largos.push(diasEntre(ord[i + 1].fechaInicio, ord[i].fechaInicio));
  const largoProm = largos.length ? Math.round(prom(largos)) : null;
  const ultimo = ord[0];
  const diaActual = ultimo ? diasEntre(ultimo.fechaInicio, HOY()) + 1 : null;
  const proxima = ultimo && largoProm ? new Date(new Date(ultimo.fechaInicio).getTime() + largoProm * 86400000).toISOString().slice(0, 10) : null;

  return (
    <div className="ciclo">
      {ultimo ? (
        <div className="ciclo-resumen">
          <div className="cr-card"><span className="crc-num">{diaActual}</span><span className="crc-lbl">Día del ciclo</span></div>
          <div className="cr-card"><span className="crc-num">{largoProm || "—"}</span><span className="crc-lbl">Largo promedio</span></div>
          <div className="cr-card"><span className="crc-num">{proxima ? fFecha(proxima) : "—"}</span><span className="crc-lbl">Próximo estimado</span></div>
        </div>
      ) : null}

      <div className="herr-panel">
        <h4>Registrar inicio de período</h4>
        <div className="form-fila-2">
          <label className="campo"><span>Fecha de inicio</span><input type="date" value={f.fechaInicio} onChange={(e) => setF((p) => ({ ...p, fechaInicio: e.target.value }))}></input></label>
          <label className="campo"><span>Flujo</span>
            <div className="seg">{FLUJOS.map((fl) => <button key={fl} type="button" className={f.flujo === fl ? "activo" : ""} onClick={() => setF((p) => ({ ...p, flujo: fl }))}>{fl}</button>)}</div>
          </label>
        </div>
        <div className="campo">
          <span>Síntomas</span>
          <div className="ciclo-sintomas">
            {SINTOMAS.map((s) => <button key={s} type="button" className={"sintoma-chip" + (f.sintomas.includes(s) ? " activo" : "")} onClick={() => setSintoma(s)}>{s}</button>)}
          </div>
        </div>
        <label className="campo"><span>Notas (opcional)</span><input value={f.notas} onChange={(e) => setF((p) => ({ ...p, notas: e.target.value }))} placeholder="Cómo te sentís…"></input></label>
        <button className="btn-primario" onClick={registrar}>+ Registrar</button>
      </div>

      {ord.length > 0 ? (
        <div className="herr-panel">
          <h4>Historial</h4>
          <div className="ciclo-hist">
            {ord.map((c) => (
              <div className="ch-fila" key={c.id}>
                <span className="ch-fecha">{fFecha(c.fechaInicio)}</span>
                <span className="ch-flujo">{c.flujo}</span>
                <span className="ch-sintomas">{c.sintomas.length ? c.sintomas.join(" · ") : "Sin síntomas"}</span>
                <button className="btn-icono borrar" onClick={() => borrar(c.id)}><IconX></IconX></button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <p className="ciclo-privado">🔒 Esta información es privada y te ayuda a vos y a tu coach a planificar mejor tu entrenamiento.</p>
    </div>
  );
}

/* ---------- migración: las cargas viejas (persona.cargas, en libras) pasan una sola vez
   al sistema de PRs (kg) la primera vez que se calcula el progreso, para no perder nada
   al retirar la pantalla vieja de "Cargas" ---------- */
function migrarCargasViejas(persona) {
  const viejas = persona.cargas || [];
  if (!viejas.length) return;
  const yaMigrado = (() => { try { return JSON.parse(localStorage.getItem("dharma-cargas-migradas-v1") || "[]"); } catch (e) { return []; } })();
  if (yaMigrado.includes(persona.id)) return;
  const kgDeLb = (lb) => Math.round(lb * 0.453592 * 10) / 10;
  viejas.forEach((r) => {
    window.Gamif.agregarPR(persona.id, { ejercicio: r.ejercicio, pilar: "fuerza", peso: kgDeLb(r.peso), reps: r.reps, comentario: "Migrado del registro anterior (RPE " + r.rpe + ")", fechaForzada: r.fecha });
  });
  try { localStorage.setItem("dharma-cargas-migradas-v1", JSON.stringify([...yaMigrado, persona.id])); } catch (e) {}
}

Object.assign(window, { AlumnoSeguimiento, calcularAlertasWellness, migrarCargasViejas });
