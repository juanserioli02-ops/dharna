// DHARMA — Sala de personalizados: proyecta varias rutinas (Proceso) al mismo tiempo,
// pantalla dividida, con un selector arriba por cada "pantalla" para cambiar de alumno
// sin salir de la vista. Pensado para 2 (o hasta 4) personalizados entrenando juntos.

const MULTI_MAX = 4;

function MultiPersonalizados({ personas, onSalir }) {
  const conProceso = personas.filter((p) => p.proceso && p.proceso.sesiones && p.proceso.sesiones.length);
  const [pantallaCompleta, setPantallaCompleta] = React.useState(false);
  const [slots, setSlots] = React.useState(() => {
    const iniciales = conProceso.slice(0, 2).map((p) => p.id);
    while (iniciales.length < 2 && iniciales.length < conProceso.length) iniciales.push(conProceso[iniciales.length].id);
    return iniciales.length ? iniciales : [null, null];
  });

  const setSlot = (i, personaId) => setSlots((s) => s.map((x, j) => (j === i ? personaId : x)));
  const addSlot = () => { if (slots.length >= MULTI_MAX) return; setSlots((s) => [...s, null]); };
  const delSlot = (i) => { if (slots.length <= 1) return; setSlots((s) => s.filter((_, j) => j !== i)); };

  const claseGrid = slots.length === 1 ? "g1" : slots.length === 2 ? "g2" : slots.length === 3 ? "g3" : "g4";

  return (
    <main className={"contenido multi-main" + (pantallaCompleta ? " pantalla-completa" : "")} data-screen-label="Sala de personalizados">
      <header className="multi-cab">
        {!pantallaCompleta ? <button className="volver" onClick={onSalir}>← Personas</button> : null}
        <div className="multi-cab-fila">
          <h1>Sala de personalizados</h1>
          <button className="btn-pantalla-completa" onClick={() => setPantallaCompleta((v) => !v)}>
            {pantallaCompleta ? "✕ Salir de pantalla completa" : "⛶ Pantalla completa"}
          </button>
        </div>
        {!pantallaCompleta ? <p className="multi-sub">Varias rutinas en simultáneo. Elegí quién va en cada pantalla; cambiá de alumno sin salir de acá.</p> : null}
      </header>

      <div className="multi-selectores">
        {slots.map((sid, i) => (
          <SelectorSlot
            key={i}
            valor={sid}
            personas={conProceso}
            usados={slots}
            onCambiar={(id) => setSlot(i, id)}
            onQuitar={slots.length > 1 ? () => delSlot(i) : null}
          ></SelectorSlot>
        ))}
        {slots.length < MULTI_MAX ? (
          <button className="multi-agregar" onClick={addSlot}>+ Agregar rutina</button>
        ) : null}
      </div>

      <div className={"multi-grid " + claseGrid}>
        {slots.map((sid, i) => (
          <PanelRutina key={i} persona={conProceso.find((p) => p.id === sid)}></PanelRutina>
        ))}
      </div>
    </main>
  );
}

function SelectorSlot({ valor, personas, usados, onCambiar, onQuitar }) {
  return (
    <div className="multi-selector">
      <select value={valor || ""} onChange={(e) => onCambiar(e.target.value || null)}>
        <option value="">— Elegir alumno —</option>
        {personas.map((p) => (
          <option key={p.id} value={p.id} disabled={usados.includes(p.id) && p.id !== valor}>{p.nombre}</option>
        ))}
      </select>
      {onQuitar ? <button className="multi-quitar" onClick={onQuitar} title="Quitar pantalla">✕</button> : null}
    </div>
  );
}

function PanelRutina({ persona }) {
  const [ses, setSes] = React.useState(0);
  const [sem, setSem] = React.useState(0);

  if (!persona) {
    return <div className="multi-panel vacio">Elegí un alumno arriba para esta pantalla.</div>;
  }
  const proc = window.normalizarProceso(persona.proceso);
  const sesiones = proc.sesiones;
  const sIdx = Math.min(ses, sesiones.length - 1);
  const sActual = sesiones[sIdx];
  const nSem = proc.semanas;
  const semIdx = Math.min(sem, nSem - 1);

  return (
    <div className="multi-panel">
      <div className="multi-panel-cab">
        <span className="multi-panel-nombre">{persona.nombre}</span>
        <div className="multi-panel-controles">
          {sesiones.length > 1 ? (
            <select className="multi-mini-sel" value={sIdx} onChange={(e) => setSes(Number(e.target.value))}>
              {sesiones.map((s, i) => <option key={i} value={i}>{s.nombre || "Sesión " + (i + 1)}</option>)}
            </select>
          ) : <span className="multi-panel-sesion">{sActual.nombre}</span>}
          <select className="multi-mini-sel" value={semIdx} onChange={(e) => setSem(Number(e.target.value))}>
            {Array.from({ length: nSem }).map((_, i) => <option key={i} value={i}>Semana {i + 1}</option>)}
          </select>
        </div>
      </div>
      <div className="multi-panel-cuerpo">
        {sActual.bloques.map((b, bi) => (
          <div className="multi-bloque" key={bi}>
            <div className="multi-bloque-nombre">{b.nombre}</div>
            <div className="multi-items">
              {b.items.map((it, ii) => {
                const s = (it.semanas && it.semanas[semIdx]) || {};
                if (!s.sxr && !it.ej) return null;
                return (
                  <div className="multi-item" key={ii}>
                    <span className="multi-item-ej">{it.ej}</span>
                    <span className="multi-item-dosis">{s.sxr}{s.kg ? " · " + s.kg : ""}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { MultiPersonalizados });
