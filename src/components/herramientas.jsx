// DHARMA — Herramientas: Conversor, Calculadora de RM, Registro de cargas, contenedor

const LB_POR_KG = 2.2046226218;

/* ============================ CONVERSOR lb ↔ kg ============================ */
function Conversor() {
  const [kg, setKg] = React.useState("20");
  const [lb, setLb] = React.useState((20 * LB_POR_KG).toFixed(1));

  const desdeKg = (v) => {
    setKg(v);
    const n = parseFloat(v);
    setLb(Number.isFinite(n) ? (n * LB_POR_KG).toFixed(1) : "");
  };
  const desdeLb = (v) => {
    setLb(v);
    const n = parseFloat(v);
    setKg(Number.isFinite(n) ? (n / LB_POR_KG).toFixed(1) : "");
  };

  return (
    <div className="herr-conversor">
      <div className="conv-fila">
        <label className="conv-campo">
          <span>Kilogramos</span>
          <div className="conv-input">
            <input type="number" value={kg} onChange={(e) => desdeKg(e.target.value)}></input>
            <em>kg</em>
          </div>
        </label>
        <div className="conv-iguales">=</div>
        <label className="conv-campo">
          <span>Libras</span>
          <div className="conv-input">
            <input type="number" value={lb} onChange={(e) => desdeLb(e.target.value)}></input>
            <em>lb</em>
          </div>
        </label>
      </div>
      <div className="conv-atajos">
        {[20, 40, 45, 60, 100].map((k) => (
          <button key={k} onClick={() => desdeKg(String(k))}>{k} kg</button>
        ))}
      </div>
      <p className="conv-nota">1 kg = {LB_POR_KG.toFixed(4)} lb · 1 lb = {(1 / LB_POR_KG).toFixed(4)} kg</p>
    </div>
  );
}

/* ============================ CALCULADORA DE RM ============================ */
const RPE_OPC = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6];
const PCTS = [100, 95, 90, 85, 80, 75, 70, 65, 60];

function redondea(v, paso) { return Math.round(v / paso) * paso; }

function Calc1RM() {
  const [peso, setPeso] = React.useState("60");
  const [reps, setReps] = React.useState("5");
  const [escala, setEscala] = React.useState("rpe"); // rpe | rir
  const [rpe, setRpe] = React.useState(8);
  const [rir, setRir] = React.useState(2);
  const [redondeo, setRedondeo] = React.useState(2.5);

  const p = parseFloat(peso), r = parseInt(reps, 10);
  const rirEfectivo = escala === "rpe" ? (10 - rpe) : rir;
  const repsAlFallo = (Number.isFinite(r) ? r : 0) + rirEfectivo;
  const valido = Number.isFinite(p) && p > 0 && Number.isFinite(r) && r > 0 && repsAlFallo > 0;
  const rm = valido ? p * (1 + repsAlFallo / 30) : null; // Epley

  return (
    <div className="herr-rm">
      <div className="rm-form">
        <div className="form-fila-2">
          <label className="campo">
            <span>Peso utilizado (kg)</span>
            <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)}></input>
          </label>
          <label className="campo">
            <span>Repeticiones</span>
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)}></input>
          </label>
        </div>

        <div className="campo">
          <span>Escala de esfuerzo</span>
          <div className="seg">
            <button className={escala === "rpe" ? "activo" : ""} onClick={() => setEscala("rpe")}>RPE (esfuerzo)</button>
            <button className={escala === "rir" ? "activo" : ""} onClick={() => setEscala("rir")}>RIR (reps en reserva)</button>
          </div>
        </div>

        {escala === "rpe" ? (
          <label className="campo">
            <span>RPE — {rpe} <em className="campo-hint">({10 - rpe} reps en reserva)</em></span>
            <div className="chips-opc">
              {RPE_OPC.map((v) => (
                <button key={v} className={rpe === v ? "activo" : ""} onClick={() => setRpe(v)}>{v}</button>
              ))}
            </div>
          </label>
        ) : (
          <label className="campo">
            <span>RIR — {rir} reps en reserva</span>
            <div className="chips-opc">
              {[0, 1, 2, 3, 4, 5].map((v) => (
                <button key={v} className={rir === v ? "activo" : ""} onClick={() => setRir(v)}>{v}</button>
              ))}
            </div>
          </label>
        )}

        <label className="campo">
          <span>Redondeo</span>
          <div className="seg chico">
            {[1, 2.5, 5].map((v) => (
              <button key={v} className={redondeo === v ? "activo" : ""} onClick={() => setRedondeo(v)}>{v} kg</button>
            ))}
          </div>
        </label>
      </div>

      <div className="rm-resultado">
        {valido ? (
          <>
            <div className="rm-grande">
              <span className="rm-valor">{redondea(rm, redondeo)}</span>
              <span className="rm-unidad">kg</span>
            </div>
            <div className="rm-sub">1RM estimado · {repsAlFallo} reps al fallo (Epley)</div>
            <table className="rm-tabla">
              <thead>
                <tr><th>%</th><th>Peso</th><th>≈ reps</th></tr>
              </thead>
              <tbody>
                {PCTS.map((pct) => {
                  const w = rm * pct / 100;
                  const repsAprox = Math.max(1, Math.round(30 * (rm / w - 1)));
                  return (
                    <tr key={pct} className={pct === 100 ? "destacado" : ""}>
                      <td>{pct}%</td>
                      <td>{redondea(w, redondeo)} kg</td>
                      <td>{pct === 100 ? 1 : repsAprox}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <p className="rm-vacio">Completá peso, repeticiones y esfuerzo para estimar el 1RM y la tabla de porcentajes.</p>
        )}
      </div>
    </div>
  );
}

/* ============================ REGISTRO DE CARGAS ============================ */
const CLAVE_CARGAS = "dharma-cargas-v1";
const HOY_ISO = () => new Date().toISOString().slice(0, 10);
const fmtFecha = (iso) => {
  const [y, m, d] = iso.split("-");
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return d + " " + (meses[Number(m) - 1] || "") + " " + y.slice(2);
};

function RegistroCargas({ personas }) {
  const [registros, setRegistros] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(CLAVE_CARGAS)) || []; } catch (e) { return []; }
  });
  const guardar = (next) => {
    setRegistros(next);
    try { localStorage.setItem(CLAVE_CARGAS, JSON.stringify(next)); } catch (e) {}
  };

  const [f, setF] = React.useState({ clienteId: personas[0] ? personas[0].id : "", ejercicio: "", fecha: HOY_ISO(), reps: "", peso: "", rpe: 8 });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const [filtroCliente, setFiltroCliente] = React.useState("todos");

  const agregar = () => {
    if (!f.ejercicio.trim() || !f.peso || !f.reps) return;
    const cli = personas.find((p) => p.id === f.clienteId);
    const reg = {
      id: "c" + Date.now(),
      clienteId: f.clienteId,
      clienteNombre: cli ? cli.nombre : "General",
      ejercicio: f.ejercicio.trim(),
      fecha: f.fecha,
      reps: Number(f.reps),
      peso: Number(f.peso),
      rpe: f.rpe
    };
    guardar([reg, ...registros]);
    set("ejercicio", ""); set("reps", ""); set("peso", "");
  };
  const borrar = (id) => {
    if (!window.confirm("¿Eliminar este registro? No se puede deshacer.")) return;
    const frescos = (() => { try { return JSON.parse(localStorage.getItem(CLAVE_CARGAS)) || []; } catch (e) { return registros; } })();
    guardar(frescos.filter((r) => r.id !== id));
    window.dharmaToast && window.dharmaToast("Registro eliminado", "ok");
  };

  const filtrados = (filtroCliente === "todos" ? registros : registros.filter((r) => r.clienteId === filtroCliente))
    .slice().sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

  // PR por cliente+ejercicio (mayor peso)
  const prs = {};
  registros.forEach((r) => {
    const k = r.clienteId + "|" + (r.ejercicio || "").toLowerCase();
    if (!prs[k] || r.peso > prs[k]) prs[k] = r.peso;
  });

  return (
    <div className="herr-cargas">
      <div className="cargas-form">
        <h4>Registrar carga</h4>
        <div className="cargas-grid-form">
          <label className="campo">
            <span>Cliente</span>
            <select value={f.clienteId} onChange={(e) => set("clienteId", e.target.value)}>
              {personas.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
          </label>
          <label className="campo">
            <span>Ejercicio</span>
            <input value={f.ejercicio} onChange={(e) => set("ejercicio", e.target.value)} placeholder="Ej: Sentadilla"></input>
          </label>
          <label className="campo">
            <span>Fecha</span>
            <input type="date" value={f.fecha} onChange={(e) => set("fecha", e.target.value)}></input>
          </label>
          <label className="campo chico">
            <span>Reps</span>
            <input type="number" value={f.reps} onChange={(e) => set("reps", e.target.value)} placeholder="5"></input>
          </label>
          <label className="campo chico">
            <span>Peso (kg)</span>
            <input type="number" value={f.peso} onChange={(e) => set("peso", e.target.value)} placeholder="50"></input>
          </label>
          <label className="campo chico">
            <span>RPE</span>
            <select value={f.rpe} onChange={(e) => set("rpe", Number(e.target.value))}>
              {RPE_OPC.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
        </div>
        <button className="btn-primario" disabled={!f.ejercicio.trim() || !f.peso || !f.reps} onClick={agregar}>+ Registrar</button>
      </div>

      <div className="cargas-historial">
        <div className="cargas-cab">
          <h4>Historial</h4>
          <select className="filtro-cliente" value={filtroCliente} onChange={(e) => setFiltroCliente(e.target.value)}>
            <option value="todos">Todos los clientes</option>
            {personas.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </div>
        {filtrados.length === 0 ? (
          <p className="rm-vacio">Sin registros todavía. Cargá la primera marca arriba.</p>
        ) : (
          <table className="tabla-cargas">
            <thead>
              <tr>
                <th>Fecha</th>
                {filtroCliente === "todos" ? <th>Cliente</th> : null}
                <th>Ejercicio</th>
                <th>Serie</th>
                <th>RPE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((r) => {
                const esPR = prs[r.clienteId + "|" + (r.ejercicio || "").toLowerCase()] === r.peso;
                return (
                  <tr key={r.id}>
                    <td className="celda-fecha">{fmtFecha(r.fecha)}</td>
                    {filtroCliente === "todos" ? <td>{r.clienteNombre}</td> : null}
                    <td className="celda-ej">{r.ejercicio}{esPR ? <span className="badge-pr">PR</span> : null}</td>
                    <td className="celda-serie"><strong>{r.reps}</strong> × <strong>{r.peso}</strong> kg</td>
                    <td className="celda-rpe">{r.rpe}</td>
                    <td><button className="btn-icono borrar" onClick={() => borrar(r.id)}><IconX></IconX></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ============================ CONTENEDOR ============================ */
const HERRAMIENTAS = [
  ["cronometro", "Cronómetro", "Tabata · AMRAP · EMOM · For Time"],
  ["conversor", "Conversor", "Libras ↔ Kilos"],
  ["rm", "Calculadora RM", "1RM por esfuerzo (RPE / RIR)"],
  ["cargas", "Registro de cargas", "Marcas por cliente"]
];

function Herramientas({ personas, tab, onTab }) {
  const activa = HERRAMIENTAS.some(([id]) => id === tab) ? tab : "cronometro";
  return (
    <main className="contenido" data-screen-label="Herramientas">
      <div className="encabezado-vista">
        <div>
          <h1 className="titulo-vista">Herramientas</h1>
          <p className="subtitulo-vista">Utilidades de coaching para usar antes y durante la clase.</p>
        </div>
      </div>

      <div className="herr-tabs">
        {HERRAMIENTAS.map(([id, nombre, desc]) => (
          <button key={id} className={"herr-tab" + (activa === id ? " activo" : "")} onClick={() => onTab(id)}>
            <span className="ht-nombre">{nombre}</span>
            <span className="ht-desc">{desc}</span>
          </button>
        ))}
      </div>

      <div className="herr-panel" data-screen-label={"Herramienta — " + activa}>
        {activa === "cronometro" ? <Cronometro></Cronometro> : null}
        {activa === "conversor" ? <Conversor></Conversor> : null}
        {activa === "rm" ? <Calc1RM></Calc1RM> : null}
        {activa === "cargas" ? <RegistroCargas personas={personas}></RegistroCargas> : null}
      </div>
    </main>
  );
}

Object.assign(window, { Conversor, Calc1RM, RegistroCargas, Herramientas });
