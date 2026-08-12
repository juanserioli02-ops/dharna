// DHARMA — Coaches individuales: reemplaza la clave compartida por un PIN por persona.
// Permite saber quién hizo cada acción (clases dadas, cambios) sin backend de usuarios.
const CLAVE_COACHES = "dharma-coaches-v1";
function coachesCargar() { try { return JSON.parse(localStorage.getItem(CLAVE_COACHES)) || []; } catch (e) { return []; } }
function coachesGuardar(lista) { try { localStorage.setItem(CLAVE_COACHES, JSON.stringify(lista)); } catch (e) {} }
window.Coaches = { cargar: coachesCargar, guardar: coachesGuardar };

/* ---------- admin: planilla semanal (quién da cada clase) + total mensual por coach, para liquidar horas ---------- */
function PlanillaCoaches({ eventosCal }) {
  const resumen = React.useMemo(() => {
    if (!window.CalendarioHelpers) return null;
    const H = window.CalendarioHelpers;
    const hoy = new Date();
    const lunes = H.lunesDe(hoy);
    const domingo = H.sumarDias(lunes, 6);
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    const ocSemana = H.ocurrenciasEnRango(eventosCal, H.isoDe(lunes), H.isoDe(domingo));
    const ocMes = H.ocurrenciasEnRango(eventosCal, H.isoDe(primerDiaMes), H.isoDe(ultimoDiaMes));
    const porDia = [0, 1, 2, 3, 4, 5, 6].map((i) => ({ dia: H.DIAS_LARGO[i], fecha: H.isoDe(H.sumarDias(lunes, i)), items: ocSemana.filter((o) => o.ocurrencia === H.isoDe(H.sumarDias(lunes, i))) }));
    const porCoachMes = H.resumenPorCoach(ocMes);
    const horas = (min) => (min / 60).toLocaleString("es-CR", { maximumFractionDigits: 1 });
    const nombreMes = H.MESES_CAL[hoy.getMonth()];
    return { porDia, porCoachMes, horas, nombreMes };
  }, [eventosCal]);
  const [tab, setTab] = React.useState("semana");
  if (!resumen) return null;
  return (
    <section className="coach-planilla">
      <div className="cp-tabs">
        <button className={"cp-tab" + (tab === "semana" ? " activo" : "")} onClick={() => setTab("semana")}>Esta semana</button>
        <button className={"cp-tab" + (tab === "mes" ? " activo" : "")} onClick={() => setTab("mes")}>Total de {resumen.nombreMes}</button>
      </div>
      {tab === "semana" ? (
        <div className="cp-semana">
          {resumen.porDia.map((d) => (
            <div className="cp-dia" key={d.fecha}>
              <span className="cp-dia-tit">{d.dia} <span className="cp-dia-fecha">{d.fecha.slice(8, 10)}</span></span>
              {d.items.length ? d.items.map((o, i) => (
                <div className="cp-fila" key={o.id + i}>
                  <span className="cp-hora">{o.inicio}</span>
                  <span className="cp-tit">{o.titulo || "Clase"}</span>
                  <span className={"cp-coach" + (o.coach ? "" : " sinasignar")}>{o.coach || "Sin asignar"}</span>
                </div>
              )) : <p className="cp-sinclases">Sin clases</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="cp-mes">
          {resumen.porCoachMes.length ? resumen.porCoachMes.map((r) => (
            <div className={"cp-mes-fila" + (r.coach === "Sin asignar" ? " sinasignar" : "")} key={r.coach}>
              <span className="cp-mes-nombre">{r.coach}</span>
              <span className="cp-mes-cant">{r.cantidad} {r.cantidad === 1 ? "clase" : "clases"}</span>
              <span className="cp-mes-horas">{resumen.horas(r.minutos)} hs</span>
            </div>
          )) : <p className="cp-sinclases">Sin clases este mes.</p>}
        </div>
      )}
    </section>
  );
}

/* ---------- admin: alta / edición de coaches ---------- */
function CoachesAdmin({ eventosCal }) {
  const [lista, setLista] = React.useState(() => coachesCargar());
  const [nuevo, setNuevo] = React.useState({ nombre: "", pin: "" });
  const [aBorrar, setABorrar] = React.useState(null);
  const guardar = (next) => { setLista(next); coachesGuardar(next); };
  const agregar = (e) => {
    e.preventDefault();
    if (!nuevo.nombre.trim() || !/^\d{4}$/.test(nuevo.pin)) return;
    guardar([...lista, { id: "co" + Date.now(), nombre: nuevo.nombre.trim(), pin: nuevo.pin, activo: true }]);
    setNuevo({ nombre: "", pin: "" });
  };
  const upd = (id, campo, val) => guardar(lista.map((c) => c.id === id ? { ...c, [campo]: val } : c));
  const confirmarBorrar = () => { guardar(lista.filter((c) => c.id !== aBorrar.id)); setABorrar(null); window.dharmaToast && window.dharmaToast("Coach eliminado", "borrado"); };

  return (
    <main className="contenido" data-screen-label="Admin — Coaches">
      <div className="encabezado-vista">
        <div><h1 className="titulo-vista">Coaches</h1><p className="subtitulo-vista">Nombre y PIN de 4 dígitos por coach — queda registrado quién hizo cada cosa.</p></div>
      </div>

      <form className="coach-alta" onSubmit={agregar}>
        <input value={nuevo.nombre} onChange={(e) => setNuevo((n) => ({ ...n, nombre: e.target.value }))} placeholder="Nombre del coach"></input>
        <input value={nuevo.pin} onChange={(e) => setNuevo((n) => ({ ...n, pin: e.target.value.replace(/\D/g, "").slice(0, 4) }))} placeholder="PIN (4 dígitos)" inputMode="numeric"></input>
        <button className="btn-primario" type="submit">+ Agregar coach</button>
      </form>

      <PlanillaCoaches eventosCal={eventosCal}></PlanillaCoaches>

      {lista.length === 0 ? (
        <div className="alumno-empty"><p>Todavía no cargaste ningún coach. Mientras tanto, la clave compartida de Coach sigue funcionando.</p></div>
      ) : (
        <div className="coach-lista">
          {lista.map((c) => (
            <div className="coach-fila" key={c.id}>
              <span className="coach-inicial">{(c.nombre || "?").trim().charAt(0).toUpperCase()}</span>
              <input value={c.nombre} onChange={(e) => upd(c.id, "nombre", e.target.value)}></input>
              <input value={c.pin} onChange={(e) => upd(c.id, "pin", e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" style={{ maxWidth: 90 }}></input>
              <button className={"coach-estado" + (c.activo ? " on" : "")} onClick={() => upd(c.id, "activo", !c.activo)}>{c.activo ? "Activo" : "Inactivo"}</button>
              <button className="coach-borrar" onClick={() => setABorrar(c)} aria-label="Eliminar"><window.IconX></window.IconX></button>
            </div>
          ))}
        </div>
      )}

      {aBorrar ? (
        <ConfirmModal titulo="Eliminar coach" texto={"¿Eliminar a " + aBorrar.nombre + "? No podrá volver a entrar con su PIN."} onCancel={() => setABorrar(null)} onOk={confirmarBorrar}></ConfirmModal>
      ) : null}
    </main>
  );
}

/* ---------- coach: sus propias horas del mes (solo lectura, filtrado a su nombre) ---------- */
function MisHorasCoach({ eventosCal, coachActual }) {
  const resumen = React.useMemo(() => {
    if (!window.CalendarioHelpers) return null;
    const H = window.CalendarioHelpers;
    const hoy = new Date();
    const lunes = H.lunesDe(hoy);
    const domingo = H.sumarDias(lunes, 6);
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    const ocSemana = H.ocurrenciasEnRango(eventosCal, H.isoDe(lunes), H.isoDe(domingo)).filter((o) => o.coach === coachActual);
    const ocMes = H.ocurrenciasEnRango(eventosCal, H.isoDe(primerDiaMes), H.isoDe(ultimoDiaMes)).filter((o) => o.coach === coachActual);
    const porDia = [0, 1, 2, 3, 4, 5, 6].map((i) => ({ dia: H.DIAS_LARGO[i], fecha: H.isoDe(H.sumarDias(lunes, i)), items: ocSemana.filter((o) => o.ocurrencia === H.isoDe(H.sumarDias(lunes, i))) }));
    const totalMin = ocMes.reduce((s, o) => s + o.minutos, 0);
    const horas = (min) => (min / 60).toLocaleString("es-CR", { maximumFractionDigits: 1 });
    const nombreMes = H.MESES_CAL[hoy.getMonth()];
    return { porDia, cantidadMes: ocMes.length, totalMin, horas, nombreMes };
  }, [eventosCal, coachActual]);
  const [tab, setTab] = React.useState("semana");
  if (!resumen) return null;
  return (
    <main className="contenido">
      <h1 className="titulo-vista">Mis horas</h1>
      <p className="subtitulo-vista">Tus clases asignadas — para llevar la cuenta de cara al pago de fin de mes.</p>
      <section className="coach-planilla">
        <div className="cp-tabs">
          <button className={"cp-tab" + (tab === "semana" ? " activo" : "")} onClick={() => setTab("semana")}>Esta semana</button>
          <button className={"cp-tab" + (tab === "mes" ? " activo" : "")} onClick={() => setTab("mes")}>Total de {resumen.nombreMes}</button>
        </div>
        {tab === "semana" ? (
          <div className="cp-semana">
            {resumen.porDia.map((d) => (
              <div className="cp-dia" key={d.fecha}>
                <span className="cp-dia-tit">{d.dia} <span className="cp-dia-fecha">{d.fecha.slice(8, 10)}</span></span>
                {d.items.length ? d.items.map((o, i) => (
                  <div className="cp-fila" key={o.id + i}>
                    <span className="cp-hora">{o.inicio}</span>
                    <span className="cp-tit">{o.titulo || "Clase"}</span>
                  </div>
                )) : <p className="cp-sinclases">Sin clases</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="cp-mes">
            <div className="cp-mes-fila">
              <span className="cp-mes-nombre">{coachActual}</span>
              <span className="cp-mes-cant">{resumen.cantidadMes} {resumen.cantidadMes === 1 ? "clase" : "clases"}</span>
              <span className="cp-mes-horas">{resumen.horas(resumen.totalMin)} hs</span>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

Object.assign(window, { CoachesAdmin, MisHorasCoach });

/* ---------- buscador global: personas, clases, ejercicios ---------- */
function BuscadorGlobal({ personas, clases, ejercicios, onPersona, onClase, onEjercicio }) {
  const [abierto, setAbierto] = React.useState(false);
  const [q, setQ] = React.useState("");
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (abierto && ref.current) ref.current.focus();
  }, [abierto]);
  React.useEffect(() => {
    const onKey = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setAbierto(true); } if (e.key === "Escape") setAbierto(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const norm = (s) => (s || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const qn = norm(q);
  const resPersonas = qn.length >= 2 ? (personas || []).filter((p) => norm(p.nombre).includes(qn)).slice(0, 6) : [];
  const resClases = qn.length >= 2 ? (clases || []).filter((c) => norm(c.nombre).includes(qn)).slice(0, 6) : [];
  const resEjercicios = qn.length >= 2 ? (ejercicios || []).filter((e) => norm(e.nombre).includes(qn)).slice(0, 6) : [];
  const hayResultados = resPersonas.length || resClases.length || resEjercicios.length;
  const cerrar = () => { setAbierto(false); setQ(""); };

  return (
    <>
      <button className="buscador-btn" onClick={() => setAbierto(true)} title="Buscar (Ctrl/Cmd+K)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <span className="buscador-btn-txt">Buscar</span>
        <span className="buscador-btn-kbd">⌘K</span>
      </button>
      {abierto ? (
        <div className="mb-overlay" onClick={cerrar}>
          <div className="buscador-modal mb-modal" onClick={(e) => e.stopPropagation()}>
            <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar personas, clases, ejercicios…" className="buscador-input"></input>
            {qn.length < 2 ? <p className="buscador-hint">Escribí al menos 2 letras.</p> : !hayResultados ? <p className="buscador-hint">Sin resultados para "{q}".</p> : (
              <div className="buscador-resultados">
                {resPersonas.length ? (
                  <div className="buscador-grupo">
                    <span className="buscador-grupo-tit">Personas</span>
                    {resPersonas.map((p) => <button key={p.id} className="buscador-item" onClick={() => { onPersona(p.id); cerrar(); }}>{p.nombre}</button>)}
                  </div>
                ) : null}
                {resClases.length ? (
                  <div className="buscador-grupo">
                    <span className="buscador-grupo-tit">Clases</span>
                    {resClases.map((c) => <button key={c.id} className="buscador-item" onClick={() => { onClase(c.id); cerrar(); }}>{c.nombre}</button>)}
                  </div>
                ) : null}
                {resEjercicios.length ? (
                  <div className="buscador-grupo">
                    <span className="buscador-grupo-tit">Ejercicios</span>
                    {resEjercicios.map((e) => <button key={e.id} className="buscador-item" onClick={() => { onEjercicio(e.id); cerrar(); }}>{e.nombre}</button>)}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

Object.assign(window, { BuscadorGlobal });
