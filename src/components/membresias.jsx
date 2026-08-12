// DHARMA — Membresías: planes, socios (suscripción por persona), créditos, vencimientos y pagos.
// Expone helpers a window.Membresia para que la Agenda descuente créditos al reservar.

const MB_MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
function mbHoyISO() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function mbFmt(iso) { if (!iso) return "—"; const [y, m, d] = iso.split("-"); return Number(d) + " " + MB_MESES[Number(m) - 1] + " " + y.slice(2); }
function mbDiasHasta(iso) { if (!iso) return 0; const a = new Date(iso + "T00:00:00"); const b = new Date(mbHoyISO() + "T00:00:00"); return Math.round((a - b) / 86400000); }
function mbSumarDias(iso, dias) { const d = new Date((iso || mbHoyISO()) + "T00:00:00"); d.setDate(d.getDate() + dias); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function mbMoney(n) { return "₡" + (n || 0).toLocaleString("es-CR"); }

function mbPlanDe(planes, sub) { return sub && planes.find((p) => p.id === sub.planId); }
function mbVigente(sub) { return !!sub && sub.vencimiento >= mbHoyISO(); }
function mbCongelada(sub) { return !!(sub && sub.congelado); }
function mbCreditoDisp(sub, plan) { if (!sub || !plan) return false; if (mbCongelada(sub)) return false; if (plan.tipo === "ilimitada") return true; return (sub.creditos || 0) > 0; }
function mbEstado(sub, plan) {
  if (!sub || !plan) return { key: "sinplan", label: "Sin plan", cls: "sinplan" };
  if (mbCongelada(sub)) return { key: "congelada", label: "Congelada hasta " + mbFmt(sub.congelado.hasta), cls: "congelada" };
  if (!mbVigente(sub)) return { key: "vencida", label: "Vencida", cls: "vencida" };
  if (plan.tipo !== "ilimitada" && (sub.creditos || 0) <= 0) return { key: "sincreditos", label: "Sin créditos", cls: "sincreditos" };
  const d = mbDiasHasta(sub.vencimiento);
  if (d <= 7) return { key: "porvencer", label: "Vence en " + d + "d", cls: "porvencer" };
  return { key: "activa", label: "Activa", cls: "activa" };
}
function mbPuedeReservar(sub, plan) {
  if (!sub || !plan) return { ok: false, motivo: "Sin plan activo" };
  if (mbCongelada(sub)) return { ok: false, motivo: "Membresía congelada hasta " + mbFmt(sub.congelado.hasta) };
  if (!mbVigente(sub)) return { ok: false, motivo: "Plan vencido" };
  if (plan.tipo !== "ilimitada" && (sub.creditos || 0) <= 0) return { ok: false, motivo: "Sin créditos disponibles" };
  return { ok: true };
}
function mbConsumir(socios, pid) { const s = socios[pid]; if (!s || s.creditos == null) return socios; return { ...socios, [pid]: { ...s, creditos: Math.max(0, (s.creditos || 0) - 1) } }; }
function mbDevolver(socios, pid) { const s = socios[pid]; if (!s || s.creditos == null) return socios; return { ...socios, [pid]: { ...s, creditos: (s.creditos || 0) + 1 } }; }

// congelar: pausa la membresía por `dias` — no cuenta contra el vencimiento mientras está congelada.
function mbCongelar(socios, pid, dias) {
  const s = socios[pid]; if (!s) return socios;
  const hoy = mbHoyISO();
  return { ...socios, [pid]: { ...s, congelado: { desde: hoy, dias, hasta: mbSumarDias(hoy, dias) } } };
}
// descongelar manual (antes de que se cumplan los días): extiende el vencimiento solo por los días ya transcurridos congelada.
function mbDescongelar(socios, pid) {
  const s = socios[pid]; if (!s || !s.congelado) return socios;
  const dias = Math.max(0, Math.round((new Date(mbHoyISO() + "T00:00:00") - new Date(s.congelado.desde + "T00:00:00")) / 86400000));
  const { congelado, ...resto } = s;
  return { ...socios, [pid]: { ...resto, vencimiento: mbSumarDias(s.vencimiento, dias) } };
}
// auto-reactivación: al cargar la app, cualquier congelamiento cuyo plazo ya venció se resuelve solo,
// sumando al vencimiento la cantidad de días que estuvo congelada (sin que el admin tenga que acordarse).
function mbAplicarCongelamientosVencidos(socios) {
  const hoy = mbHoyISO();
  let cambio = false;
  const next = { ...socios };
  Object.keys(socios).forEach((pid) => {
    const s = socios[pid];
    if (s && s.congelado && s.congelado.hasta <= hoy) {
      const { congelado, ...resto } = s;
      next[pid] = { ...resto, vencimiento: mbSumarDias(s.vencimiento, s.congelado.dias) };
      cambio = true;
    }
  });
  return cambio ? next : socios;
}
// ajuste manual directo de fecha/créditos (admin) — para pagos que llegaron un día distinto al de siempre.
function mbAjustar(socios, pid, cambios) {
  const s = socios[pid]; if (!s) return socios;
  return { ...socios, [pid]: { ...s, ...cambios } };
}

window.Membresia = { planDe: mbPlanDe, vigente: mbVigente, congelada: mbCongelada, creditoDisp: mbCreditoDisp, estado: mbEstado, puedeReservar: mbPuedeReservar, consumir: mbConsumir, devolver: mbDevolver, congelar: mbCongelar, descongelar: mbDescongelar, aplicarCongelamientosVencidos: mbAplicarCongelamientosVencidos, ajustar: mbAjustar, hoyISO: mbHoyISO, sumarDias: mbSumarDias, fmt: mbFmt, money: mbMoney };

/* ---------- modal asignar / renovar plan ---------- */
function PlanModal({ persona, planes, subActual, onGuardar, onCerrar }) {
  // si el plan guardado ya no existe (plan eliminado/renombrado), arrancamos en un
  // plan válido en vez de conservar un id huérfano que se volvería a guardar sin querer.
  // si el alumno pidió un plan desde su cuestionario de ingreso, lo preseleccionamos (aprobar pago).
  const planIdInicial = (subActual && planes.some((p) => p.id === subActual.planId)) ? subActual.planId
    : (persona.planSolicitado && planes.some((p) => p.id === persona.planSolicitado)) ? persona.planSolicitado
    : planes[0].id;
  const [planId, setPlanId] = React.useState(planIdInicial);
  const [registrarPago, setRegistrarPago] = React.useState(true);
  const [metodo, setMetodo] = React.useState("Efectivo");
  const plan = planes.find((p) => p.id === planId) || planes[0];
  const [monto, setMonto] = React.useState(plan.precio);
  React.useEffect(() => { const p = planes.find((x) => x.id === planId); if (p) setMonto(p.precio); }, [planId]);
  const categorias = [...new Set(planes.map((p) => p.categoria || "Planes"))];

  const guardar = () => {
    const inicio = mbHoyISO();
    const sub = {
      planId, inicio, vencimiento: mbSumarDias(inicio, plan.dias),
      creditos: plan.tipo === "ilimitada" ? null : plan.creditos,
      pagos: subActual?.pagos ? [...subActual.pagos] : []
    };
    if (registrarPago) sub.pagos.push({ fecha: inicio, monto: Number(monto) || 0, metodo, concepto: plan.nombre, saldo: (Number(monto) || 0) - plan.precio });
    onGuardar(sub);
  };
  const diferencia = (Number(monto) || 0) - plan.precio;

  return (
    <div className="mb-overlay" onClick={onCerrar}>
      <div className="mb-modal" onClick={(e) => e.stopPropagation()}>
        <header className="mb-modal-cab">
          <div>
            <div className="mb-modal-eyebrow">{subActual ? "Renovar / cambiar plan" : "Asignar membresía"}</div>
            <h2>{persona.nombre}</h2>
          </div>
          <button className="btn-icono" onClick={onCerrar}><IconX></IconX></button>
        </header>

        <div className="mb-modal-cuerpo">
          {categorias.map((cat) => (
            <div key={cat} className="mb-cat-grupo">
              <div className="mb-cat-tit">{cat}</div>
              <div className="mb-planes">
                {planes.filter((p) => (p.categoria || "Planes") === cat).map((p) => (
                  <button key={p.id} className={"mb-plan-op" + (planId === p.id ? " on" : "")} style={{ "--cat": p.color }} onClick={() => setPlanId(p.id)}>
                    <div className="mb-plan-nom">{p.nombre.replace(cat + " — ", "")}</div>
                    <div className="mb-plan-det">{p.tipo === "ilimitada" ? "Ilimitada" : p.creditos + " clases"} · {p.dias} días</div>
                    <div className="mb-plan-precio">{mbMoney(p.precio)}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <label className="mb-check"><input type="checkbox" checked={registrarPago} onChange={(e) => setRegistrarPago(e.target.checked)}></input> Registrar el pago ahora</label>
          {registrarPago ? (
            <div className="mb-pago-fila">
              <label className="campo"><span>Monto</span><input type="number" value={monto} onChange={(e) => setMonto(e.target.value)}></input></label>
              {diferencia !== 0 ? (
                <span className={"mb-saldo-aviso" + (diferencia < 0 ? " deudor" : " favor")}>
                  {diferencia < 0 ? "Saldo deudor: " + mbMoney(Math.abs(diferencia)) : "Saldo a favor: " + mbMoney(diferencia)}
                </span>
              ) : null}
              <label className="campo"><span>Método</span>
                <select value={metodo} onChange={(e) => setMetodo(e.target.value)}>
                  <option>Efectivo</option><option>Transferencia</option><option>Tarjeta</option><option>SINPE Móvil</option>
                </select>
              </label>
            </div>
          ) : null}
        </div>

        <footer className="mb-modal-pie">
          <button className="btn-secundario" onClick={onCerrar}>Cancelar</button>
          <button className="btn-primario" onClick={guardar}>{subActual ? "Renovar plan" : "Asignar plan"}</button>
        </footer>
      </div>
    </div>
  );
}

/* ---------- editor de planes (crear / editar / borrar) ---------- */
function PlanesEditorModal({ planes, config, onConfig, onGuardar, onCerrar }) {
  const [lista, setLista] = React.useState(() => planes.map((p) => ({ ...p })));
  const upd = (id, campo, val) => setLista((arr) => arr.map((p) => (p.id === id ? { ...p, [campo]: val } : p)));
  const borrar = (id) => { if (window.confirm("¿Eliminar este plan? Los socios que ya lo tengan asignado no se ven afectados.")) setLista((arr) => arr.filter((p) => p.id !== id)); };
  const agregar = () => setLista((arr) => [...arr, { id: "plan" + Date.now(), nombre: "Nuevo plan", categoria: arr[arr.length - 1]?.categoria || "Grupales", tipo: "creditos", creditos: 8, dias: 30, precio: 0, color: "#489DA3" }]);
  const guardar = () => { onGuardar(lista); onCerrar(); };

  return (
    <div className="mb-overlay" onClick={onCerrar}>
      <div className="mb-modal grande" onClick={(e) => e.stopPropagation()}>
        <header className="mb-modal-cab">
          <div><div className="mb-modal-eyebrow">Configuración</div><h2>Editar planes</h2></div>
          <button className="btn-icono" onClick={onCerrar}><IconX></IconX></button>
        </header>
        <div className="mb-modal-cuerpo">
          {lista.map((p) => (
            <div className="pe-fila" key={p.id}>
              <input className="pe-nombre" value={p.nombre} onChange={(e) => upd(p.id, "nombre", e.target.value)}></input>
              <input className="pe-cat" value={p.categoria || ""} placeholder="Categoría" onChange={(e) => upd(p.id, "categoria", e.target.value)}></input>
              <select className="pe-tipo" value={p.tipo} onChange={(e) => upd(p.id, "tipo", e.target.value)}>
                <option value="creditos">Créditos</option>
                <option value="ilimitada">Ilimitada</option>
              </select>
              {p.tipo === "creditos" ? (
                <input className="pe-num" type="number" min="1" value={p.creditos || ""} placeholder="Clases" onChange={(e) => upd(p.id, "creditos", Number(e.target.value) || 0)}></input>
              ) : <span className="pe-num pe-inf">∞</span>}
              <input className="pe-num" type="number" min="1" value={p.dias} placeholder="Días" onChange={(e) => upd(p.id, "dias", Number(e.target.value) || 30)}></input>
              <div className="pe-precio-wrap"><span>₡</span><input className="pe-precio" type="number" min="0" value={p.precio} onChange={(e) => upd(p.id, "precio", Number(e.target.value) || 0)}></input></div>
              <input className="pe-color" type="color" value={p.color} onChange={(e) => upd(p.id, "color", e.target.value)}></input>
              <button className="pe-borrar" onClick={() => borrar(p.id)} title="Eliminar plan">✕</button>
            </div>
          ))}
          <button className="pe-agregar" onClick={agregar}>+ Agregar plan</button>
          {config && onConfig ? (
            <div className="mb-config" style={{ marginTop: 4 }}>
              <div className="mb-config-tit">Política de cancelación</div>
              <label className="mb-config-fila">
                <span>Si cancela con menos de</span>
                <input type="number" min="0" value={config.antelacionCancelacion} onChange={(e) => onConfig({ ...config, antelacionCancelacion: Number(e.target.value) || 0 })}></input>
                <span>minutos de antelación, pierde la clase (se descuenta el crédito igual).</span>
              </label>
            </div>
          ) : null}
        </div>
        <footer className="mb-modal-pie">
          <button className="btn-secundario" onClick={onCerrar}>Cancelar</button>
          <button className="btn-primario" onClick={guardar}>Guardar planes</button>
        </footer>
      </div>
    </div>
  );
}

/* ---------- sección Alumnos (membresías + gestión de cuentas) ---------- */
function Membresias({ personas, planes, socios, onGuardarSocio, config, onConfig, onGuardarPlanes, onToggleActivo, onEliminarPersona }) {
  const [modal, setModal] = React.useState(null); // persona
  const [pagosDe, setPagosDe] = React.useState(null); // persona
  const [busqueda, setBusqueda] = React.useState("");
  const [editarPlanes, setEditarPlanes] = React.useState(false);
  const [verInactivos, setVerInactivos] = React.useState(false);
  const [soloSinPlan, setSoloSinPlan] = React.useState(false);
  const [soloPendientes, setSoloPendientes] = React.useState(false);

  const activas = personas.filter((p) => p.activo !== false);
  const inactivas = personas.filter((p) => p.activo === false);
  const base = verInactivos ? inactivas : activas;

  const filas = base.map((p) => {
    const sub = socios[p.id];
    const plan = mbPlanDe(planes, sub);
    const pendienteAprobacion = !sub && p.planSolicitado && planes.some((pl) => pl.id === p.planSolicitado);
    return { p, sub, plan, est: mbEstado(sub, plan), pendienteAprobacion };
  });
  const q = busqueda.trim().toLowerCase();
  let visibles = q ? filas.filter((f) => f.p.nombre.toLowerCase().includes(q)) : filas;
  if (soloSinPlan) visibles = visibles.filter((f) => f.est.key === "sinplan");
  if (soloPendientes) visibles = visibles.filter((f) => f.pendienteAprobacion);

  const cont = (k) => filas.filter((f) => f.est.key === k).length;
  const porVencer = filas.filter((f) => f.est.key === "porvencer").length;
  const activos = filas.filter((f) => f.est.key === "activa" || f.est.key === "porvencer").length;
  const pendientes = filas.filter((f) => f.pendienteAprobacion).length;

  const eliminar = (p) => {
    if (!window.confirm("¿Eliminar definitivamente a " + p.nombre + "? Esto borra su cuenta, rutina y pagos. No se puede deshacer.\n\nSi preferís conservar su historial, cerrá esto y usá \"Desactivar\" en su lugar.")) return;
    onEliminarPersona(p.id);
    window.dharmaToast && window.dharmaToast("Alumno eliminado", "borrado");
  };

  return (
    <main className="contenido" data-screen-label="Alumnos">
      <div className="est-hero ag-hero">
        <div className="et-eyebrow">Gestión de socios</div>
        <h1>Alumnos</h1>
        <p className="et-sub">Planes, créditos, vencimientos y pagos.</p>
      </div>

      <div className="mb-resumen">
        <button className={"mb-stat click" + (!soloSinPlan && !soloPendientes ? " on" : "")} onClick={() => { setSoloSinPlan(false); setSoloPendientes(false); }}><div className="n">{activos}</div><div className="l">Activos</div></button>
        <div className="mb-stat warn"><div className="n">{porVencer}</div><div className="l">Por vencer (≤7d)</div></div>
        <div className="mb-stat danger"><div className="n">{cont("vencida")}</div><div className="l">Vencidos</div></div>
        <button className={"mb-stat click" + (soloSinPlan ? " on" : "")} onClick={() => { setSoloSinPlan((v) => !v); setSoloPendientes(false); }}><div className="n">{cont("sinplan")}</div><div className="l">Sin plan</div></button>
        {pendientes ? (
          <button className={"mb-stat pend" + (soloPendientes ? " on" : "")} onClick={() => { setSoloPendientes((v) => !v); setSoloSinPlan(false); }}><div className="n">{pendientes}</div><div className="l">Pendientes de pago</div></button>
        ) : null}
      </div>

      <div className="encabezado-vista" style={{ marginBottom: 16 }}>
        <h2 className="seccion-titulo" style={{ fontSize: 20 }}>{verInactivos ? "Alumnos desactivados" : "Socios"}</h2>
        <div className="acciones-vista" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <label className="buscador">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>
            <input type="search" placeholder="Buscar socio…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}></input>
          </label>
          <button className="btn-secundario" onClick={() => setVerInactivos((v) => !v)}>{verInactivos ? "Ver activos" : "Ver desactivados (" + inactivas.length + ")"}</button>
          <button className="btn-secundario" onClick={() => setEditarPlanes(true)}>Editar planes</button>
        </div>
      </div>

      <div className="mb-tabla">
        <div className="mb-tabla-cab">
          <span>Socio</span><span>Plan</span><span>Créditos</span><span>Vence</span><span>Estado</span><span></span>
        </div>
        {visibles.map(({ p, sub, plan, est, pendienteAprobacion }) => (
          <div className={"mb-fila" + (p.activo === false ? " inactiva" : "")} key={p.id}>
            <span className="mb-socio"><Avatar persona={p} size={34}></Avatar><span>{p.nombre}</span></span>
            <span className="mb-plan">
              {plan ? <span className="mb-plan-chip" style={{ "--cat": plan.color }}><span className="dot"></span>{plan.nombre}</span>
                : (sub ? <span className="mb-sin mb-huerfano" title="El plan que tenía asignado ya no existe en la lista de planes">Plan eliminado</span>
                : (pendienteAprobacion ? <span className="mb-pend-chip">Pidió: {planes.find((pl) => pl.id === p.planSolicitado)?.nombre}</span> : <span className="mb-sin">—</span>))}
            </span>
            <span className="mb-cred">{!plan ? "—" : plan.tipo === "ilimitada" ? "∞" : <><b>{sub.creditos}</b>/{plan.creditos}</>}</span>
            <span className="mb-vence">{plan && sub ? mbFmt(sub.vencimiento) : "—"}</span>
            <span><span className={"mb-badge " + est.cls}>{est.label}</span></span>
            <span className="mb-acciones">
              {p.activo === false ? (
                <button className="btn-mini" onClick={() => onToggleActivo(p.id, true)}>Reactivar</button>
              ) : (
                <>
                  <button className={"btn-mini" + (pendienteAprobacion ? " aprobar" : "")} onClick={() => setModal(p)}>{pendienteAprobacion ? "Aprobar pago" : plan ? "Renovar" : "Asignar"}</button>
                  {sub && (sub.pagos || []).length ? <button className="btn-mini ghost" onClick={() => setPagosDe(p)}>Pagos</button> : null}
                  <div className="mb-menu-wrap">
                    <details className="mb-menu">
                      <summary>⋯</summary>
                      <div className="mb-menu-op">
                        <button onClick={() => onToggleActivo(p.id, false)}>Desactivar</button>
                        <button className="peligro" onClick={() => eliminar(p)}>Eliminar definitivamente</button>
                      </div>
                    </details>
                  </div>
                </>
              )}
            </span>
          </div>
        ))}
        {visibles.length === 0 ? <div className="seccion-vacia">{verInactivos ? "No hay alumnos desactivados." : "No hay socios que coincidan."}</div> : null}
      </div>

      <div className="mb-config">
        <div className="mb-config-tit">Política de cancelación</div>
        <label className="mb-config-fila">
          <span>Si cancela con menos de</span>
          <input type="number" min="0" value={config.antelacionCancelacion} onChange={(e) => onConfig({ ...config, antelacionCancelacion: Number(e.target.value) || 0 })}></input>
          <span>minutos de antelación, pierde la clase (se descuenta el crédito igual).</span>
        </label>
      </div>

      {modal ? (
        <PlanModal persona={modal} planes={planes} subActual={socios[modal.id]} onCerrar={() => setModal(null)}
          onGuardar={(sub) => { onGuardarSocio(modal.id, sub); setModal(null); window.dharmaToast && window.dharmaToast("Membresía actualizada: " + modal.nombre, "ok"); }}></PlanModal>
      ) : null}

      {pagosDe ? (
        <div className="mb-overlay" onClick={() => setPagosDe(null)}>
          <div className="mb-modal chico" onClick={(e) => e.stopPropagation()}>
            <header className="mb-modal-cab"><div><div className="mb-modal-eyebrow">Historial de pagos</div><h2>{pagosDe.nombre}</h2></div><button className="btn-icono" onClick={() => setPagosDe(null)}><IconX></IconX></button></header>
            <div className="mb-modal-cuerpo">
              {(socios[pagosDe.id]?.pagos || []).length === 0 ? <div className="seccion-vacia">Sin pagos registrados.</div> : (
                <div className="mb-pagos">
                  {socios[pagosDe.id].pagos.slice().reverse().map((pg, i) => (
                    <div className="mb-pago" key={i}><span className="f">{mbFmt(pg.fecha)}</span><span className="c">{pg.concepto}</span><span className="m">{mbMoney(pg.monto)}</span><span className="met">{pg.metodo}</span>{pg.saldo ? <span className={"mb-saldo-chip" + (pg.saldo < 0 ? " deudor" : " favor")}>{pg.saldo < 0 ? "Debe " + mbMoney(Math.abs(pg.saldo)) : "A favor " + mbMoney(pg.saldo)}</span> : null}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {editarPlanes ? (
        <PlanesEditorModal planes={planes} onCerrar={() => setEditarPlanes(false)} onGuardar={(nuevos) => { onGuardarPlanes(nuevos); window.dharmaToast && window.dharmaToast("Planes actualizados", "ok"); }}></PlanesEditorModal>
      ) : null}
    </main>
  );
}

/* ---------- ajustar membresía: cambiar fecha de vencimiento a mano, o congelar por viaje ---------- */
function AjustarMembresiaModal({ persona, sub, onCerrar, onGuardar }) {
  const [vencimiento, setVencimiento] = React.useState(sub.vencimiento || mbHoyISO());
  const [creditos, setCreditos] = React.useState(sub.creditos != null ? sub.creditos : "");
  const [diasCongelar, setDiasCongelar] = React.useState(15);
  const congelada = mbCongelada(sub);

  const guardarFecha = () => {
    onGuardar(mbAjustar({ [persona.id]: sub }, persona.id, { vencimiento, creditos: sub.creditos != null ? Number(creditos) || 0 : sub.creditos })[persona.id]);
    window.dharmaToast && window.dharmaToast("Membresía ajustada: " + persona.nombre, "ok");
    onCerrar();
  };
  const congelar = () => {
    if (!diasCongelar || diasCongelar <= 0) return;
    onGuardar(mbCongelar({ [persona.id]: sub }, persona.id, Number(diasCongelar))[persona.id]);
    window.dharmaToast && window.dharmaToast("Membresía congelada " + diasCongelar + " días — se reactiva sola", "ok");
    onCerrar();
  };
  const descongelar = () => {
    onGuardar(mbDescongelar({ [persona.id]: sub }, persona.id)[persona.id]);
    window.dharmaToast && window.dharmaToast("Membresía reactivada: " + persona.nombre, "ok");
    onCerrar();
  };

  return (
    <div className="mb-overlay" onClick={onCerrar}>
      <div className="mb-modal chico" onClick={(e) => e.stopPropagation()}>
        <header className="mb-modal-cab">
          <div><div className="mb-modal-eyebrow">Ajustar membresía</div><h2>{persona.nombre}</h2></div>
          <button className="btn-icono" onClick={onCerrar}><IconX></IconX></button>
        </header>
        <div className="mb-modal-cuerpo">
          {congelada ? (
            <div className="am-congelada-aviso">
              <span>Congelada desde el {mbFmt(sub.congelado.desde)}, se reactiva sola el {mbFmt(sub.congelado.hasta)}.</span>
              <button className="btn-secundario" onClick={descongelar}>Reactivar ahora</button>
            </div>
          ) : (
            <>
              <div className="am-bloque">
                <div className="am-bloque-tit">Corregir fecha de vencimiento</div>
                <p className="am-bloque-desc">Para cuando el pago llegó otro día y el vencimiento no coincide.</p>
                <div className="am-fila">
                  <label className="campo"><span>Vence</span><input type="date" value={vencimiento} onChange={(e) => setVencimiento(e.target.value)}></input></label>
                  {sub.creditos != null ? <label className="campo"><span>Créditos</span><input type="number" min="0" value={creditos} onChange={(e) => setCreditos(e.target.value)}></input></label> : null}
                </div>
                <button className="btn-primario" onClick={guardarFecha}>Guardar fecha</button>
              </div>
              <div className="am-bloque">
                <div className="am-bloque-tit">Congelar por viaje</div>
                <p className="am-bloque-desc">Pausa la membresía: no cuenta contra el vencimiento. Se reactiva sola al cumplirse los días, sumándolos al vencimiento.</p>
                <div className="am-fila">
                  <label className="campo"><span>Días</span><input type="number" min="1" value={diasCongelar} onChange={(e) => setDiasCongelar(e.target.value)}></input></label>
                </div>
                <button className="btn-secundario" onClick={congelar}>Congelar {diasCongelar || 0} días</button>
              </div>
            </>
          )}
        </div>
        <footer className="mb-modal-pie">
          <button className="btn-secundario" onClick={onCerrar}>Cerrar</button>
        </footer>
      </div>
    </div>
  );
}

Object.assign(window, { Membresias, PlanModal, AjustarMembresiaModal });

/* ---------- plan secundario: segunda membresía en paralelo, EXCEPCIONAL para un alumno puntual
   (ej: personalizado + grupal a la vez). Vive aparte de "socios" y de las reservas automáticas
   — no toca el descuento de créditos de reservas ni el de nadie más; el admin lo suma/resta a mano
   cuando la persona asiste a esa actividad. Cero riesgo para el resto de la app. ---------- */
function PlanSecundario({ persona, planes, onGuardarPersona }) {
  const ps = persona.planSecundario;
  const [activando, setActivando] = React.useState(false);
  const [nombre, setNombre] = React.useState("");
  const [creditos, setCreditos] = React.useState(12);
  const [vencimiento, setVencimiento] = React.useState(mbSumarDias(mbHoyISO(), 30));

  const activar = () => {
    if (!nombre.trim()) return;
    onGuardarPersona({ ...persona, planSecundario: { nombre: nombre.trim(), creditos: Number(creditos) || 0, vencimiento } });
    window.dharmaToast && window.dharmaToast("Plan secundario activado: " + nombre, "ok");
    setActivando(false); setNombre("");
  };
  const ajustar = (delta) => {
    const next = Math.max(0, (ps.creditos || 0) + delta);
    onGuardarPersona({ ...persona, planSecundario: { ...ps, creditos: next } });
  };
  const quitar = () => {
    if (!window.confirm("¿Quitar el plan secundario de " + persona.nombre + "?")) return;
    onGuardarPersona({ ...persona, planSecundario: null });
  };

  return (
    <div className="am-bloque" style={{ marginTop: 18 }}>
      <div className="am-bloque-tit">Plan secundario en paralelo <em className="campo-hint">— excepcional, ej. grupal además de personalizado</em></div>
      {ps ? (
        <>
          <p className="am-bloque-desc">{ps.nombre} · vence {mbFmt(ps.vencimiento)}</p>
          <div className="am-fila" style={{ alignItems: "center" }}>
            <button className="btn-secundario" onClick={() => ajustar(-1)}>−1</button>
            <strong style={{ fontSize: 18, minWidth: 34, textAlign: "center" }}>{ps.creditos}</strong>
            <button className="btn-secundario" onClick={() => ajustar(1)}>+1</button>
            <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>créditos — restá 1 cuando asiste</span>
          </div>
          <button className="btn-secundario peligro" style={{ marginTop: 8 }} onClick={quitar}>Quitar plan secundario</button>
        </>
      ) : activando ? (
        <>
          <div className="am-fila">
            <label className="campo"><span>Nombre del plan</span><input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Grupal 12 sesiones"></input></label>
            <label className="campo"><span>Créditos</span><input type="number" min="0" value={creditos} onChange={(e) => setCreditos(e.target.value)}></input></label>
            <label className="campo"><span>Vence</span><input type="date" value={vencimiento} onChange={(e) => setVencimiento(e.target.value)}></input></label>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-primario" disabled={!nombre.trim()} onClick={activar}>Activar</button>
            <button className="btn-secundario" onClick={() => setActivando(false)}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <p className="am-bloque-desc">Este descuento es manual — no se conecta a las reservas automáticas, para no afectar al resto de la app.</p>
          <button className="btn-secundario" onClick={() => setActivando(true)}>+ Activar plan secundario</button>
        </>
      )}
    </div>
  );
}
Object.assign(window, { PlanSecundario });
