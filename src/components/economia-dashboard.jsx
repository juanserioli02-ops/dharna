// DHARMA — Economía: dashboard financiero para el head coach (clave propia, aparte del rol admin).
function EconomiaGate({ onOk }) {
  const [clave, setClave] = React.useState("");
  const [error, setError] = React.useState("");
  const intentar = (e) => {
    e.preventDefault();
    const c = (window.DHARMA_CLAVES || {}).ECONOMIA;
    if (clave === c) { try { sessionStorage.setItem("dharma-economia-desbloqueada", "1"); } catch (er) {} onOk(); return; }
    setError("Clave incorrecta.");
  };
  return (
    <main className="contenido eco-gate">
      <form className="eco-gate-form" onSubmit={intentar}>
        <h2>Economía</h2>
        <p>Sección con información financiera del centro. Ingresá la clave para continuar.</p>
        <label className="campo"><span>Clave</span><input type="password" value={clave} onChange={(e) => setClave(e.target.value)} autoFocus required></input></label>
        {error ? <p className="login-error">{error}</p> : null}
        <button className="btn-primario ancho" type="submit">Entrar</button>
      </form>
    </main>
  );
}

function EconomiaBarra({ label, valor, max, color }) {
  const pct = max > 0 ? Math.max(2, Math.round((valor / max) * 100)) : 0;
  return (
    <div className="eco-barra-fila">
      <span className="eco-barra-label">{label}</span>
      <div className="eco-barra-track"><div className="eco-barra-fill" style={{ width: pct + "%", background: color || "var(--acento)" }}></div></div>
      <span className="eco-barra-val">${valor.toLocaleString("es-CR")}</span>
    </div>
  );
}

function EconomiaDashboard({ personas, socios }) {
  const [tick, setTick] = React.useState(0);
  const [subiendo, setSubiendo] = React.useState(false);
  const [errorArchivo, setErrorArchivo] = React.useState("");
  const datos = React.useMemo(() => window.Economia.leer(), [tick]);
  const inputRef = React.useRef(null);

  const onArchivo = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setSubiendo(true); setErrorArchivo("");
    try { await window.Economia.procesarArchivo(file); setTick((t) => t + 1); window.dharmaToast && window.dharmaToast("Excel importado: " + file.name, "ok"); }
    catch (err) { setErrorArchivo("No se pudo leer el archivo. ¿Es el .xlsx del balance?"); }
    setSubiendo(false);
    e.target.value = "";
  };

  const meses = datos ? datos.caja.meses : [];
  const ultimoConDatos = React.useMemo(() => {
    if (!datos) return 0;
    for (let i = meses.length - 1; i >= 0; i--) { if ((datos.caja.ingresos.total[i] || 0) > 0 || (datos.caja.gastos.total[i] || 0) > 0) return i; }
    return meses.length - 1;
  }, [datos]);
  const [mesIdx, setMesIdx] = React.useState(null);
  const idxActivo = mesIdx == null ? ultimoConDatos : mesIdx;
  const mesActivo = meses[idxActivo];

  // ---- membresías y altas/bajas: EN VIVO desde Personas, nunca del Excel ----
  const planes = (() => { try { return JSON.parse(localStorage.getItem("dharma-planes-v1")) || window.DHARMA_DATA.planes || []; } catch (e) { return window.DHARMA_DATA.planes || []; } })();
  const activos = (personas || []).filter((p) => p.activo !== false);
  const conteoEstado = { activa: 0, porvencer: 0, vencida: 0, sinplan: 0, sincreditos: 0 };
  activos.forEach((p) => {
    const sub = socios[p.id];
    const plan = window.Membresia ? window.Membresia.planDe(planes, sub) : null;
    const est = window.Membresia ? window.Membresia.estado(sub, plan).key : "sinplan";
    conteoEstado[est] = (conteoEstado[est] || 0) + 1;
  });
  const mesesRecientes = React.useMemo(() => {
    const hoy = new Date();
    const arr = [];
    for (let i = 5; i >= 0; i--) { const d = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1); arr.push({ y: d.getFullYear(), m: d.getMonth(), label: d.toLocaleDateString("es-CR", { month: "short", year: "2-digit" }) }); }
    return arr;
  }, []);
  const altasPorMes = mesesRecientes.map(({ y, m }) => activos.filter((p) => { const s = socios[p.id]; if (!s || !s.inicio) return false; const d = new Date(s.inicio + "T00:00:00"); return d.getFullYear() === y && d.getMonth() === m; }).length);
  const bajasPorMes = mesesRecientes.map(({ y, m }) => activos.filter((p) => { const s = socios[p.id]; if (!s || !s.vencimiento) return false; const plan = window.Membresia.planDe(planes, s); const vencida = window.Membresia.estado(s, plan).key === "vencida"; if (!vencida) return false; const d = new Date(s.vencimiento + "T00:00:00"); return d.getFullYear() === y && d.getMonth() === m; }).length);

  if (!datos) {
    return (
      <main className="contenido" data-screen-label="Economía">
        <div className="encabezado-vista"><div><h1 className="titulo-vista">Economía</h1><p className="subtitulo-vista">Subí el Excel de balance del centro para ver el dashboard.</p></div></div>
        <div className="eco-upload-vacio">
          <input ref={inputRef} type="file" accept=".xlsx" style={{ display: "none" }} onChange={onArchivo}></input>
          <button className="btn-primario" disabled={subiendo} onClick={() => inputRef.current.click()}>{subiendo ? "Procesando…" : "Subir Excel (.xlsx)"}</button>
          {errorArchivo ? <p className="login-error">{errorArchivo}</p> : null}
        </div>
        <EconomiaMembresias conteoEstado={conteoEstado} activos={activos.length}></EconomiaMembresias>
      </main>
    );
  }

  const ingresoMes = mesActivo ? datos.caja.ingresos.total[idxActivo] : 0;
  const gastoMes = mesActivo ? datos.caja.gastos.total[idxActivo] : 0;
  const balance = ingresoMes - gastoMes;
  const dharmaMes = mesActivo ? window.Economia.totalDharmaEnMes(socios, mesActivo.serial) : { total: 0, cantidad: 0 };
  const gastosCategoria = mesActivo ? window.Economia.gastosPorCategoriaEnMes(datos, mesActivo.serial) : [];
  const ingresosCategoria = datos.resumen.porCategoria.map((c) => ({ nombre: c.nombre, monto: c.valores[idxActivo] || 0 })).filter((c) => c.monto > 0).sort((a, b) => b.monto - a.monto);
  const maxTrend = Math.max(1, ...datos.caja.meses.slice(-6).map((m, i, arr) => Math.max(datos.caja.ingresos.total[datos.caja.meses.length - arr.length + i], datos.caja.gastos.total[datos.caja.meses.length - arr.length + i])));
  const ultimos6 = datos.caja.meses.slice(-6);
  const sueldosMes = datos.sueldos.porProfesor.map((p) => ({ nombre: p.nombre, monto: p.valores[idxActivo] || 0 })).filter((p) => p.monto > 0);
  const horasMes = mesActivo ? window.Economia.horasPorProfesorEnMes(datos, mesActivo.serial) : [];
  const profesoresMes = (() => {
    const nombres = new Set([...sueldosMes.map((p) => p.nombre), ...horasMes.map((p) => p.nombre)]);
    return [...nombres].map((nombre) => ({
      nombre,
      monto: (sueldosMes.find((p) => p.nombre === nombre) || {}).monto || 0,
      horas: (horasMes.find((p) => p.nombre === nombre) || {}).total || 0,
      porActividad: (horasMes.find((p) => p.nombre === nombre) || {}).porActividad || {}
    })).sort((a, b) => b.monto - a.monto);
  })();

  return (
    <main className="contenido" data-screen-label="Economía">
      <div className="encabezado-vista">
        <div><h1 className="titulo-vista">Economía</h1><p className="subtitulo-vista">Actualizado {new Date(datos.subidoEn).toLocaleDateString("es-CR")} · {datos.nombreArchivo}</p></div>
        <div className="eco-acciones">
          <select className="eco-select-mes" value={idxActivo} onChange={(e) => setMesIdx(Number(e.target.value))}>
            {meses.map((m, i) => <option key={i} value={i}>{m.label}{i === ultimoConDatos ? " (más reciente)" : ""}</option>)}
          </select>
          <input ref={inputRef} type="file" accept=".xlsx" style={{ display: "none" }} onChange={onArchivo}></input>
          <button className="btn-secundario" disabled={subiendo} onClick={() => inputRef.current.click()}>{subiendo ? "Procesando…" : "Actualizar Excel"}</button>
        </div>
      </div>

      <div className="eco-kpis">
        <div className="eco-kpi"><span className="eco-kpi-lbl">Ingresos del mes</span><span className="eco-kpi-val ok">${ingresoMes.toLocaleString("es-CR")}</span></div>
        <div className="eco-kpi"><span className="eco-kpi-lbl">Gastos del mes</span><span className="eco-kpi-val bad">${gastoMes.toLocaleString("es-CR")}</span></div>
        <div className="eco-kpi"><span className="eco-kpi-lbl">Balance neto</span><span className={"eco-kpi-val " + (balance >= 0 ? "ok" : "bad")}>{balance >= 0 ? "+" : ""}${balance.toLocaleString("es-CR")}</span></div>
        <div className="eco-kpi"><span className="eco-kpi-lbl">Efectivo vs banco (ingresos)</span><span className="eco-kpi-val">${(datos.caja.ingresos.efectivo[idxActivo] || 0).toLocaleString("es-CR")} <small>efvo.</small> / ${((datos.caja.ingresos.lafise[idxActivo] || 0) + (datos.caja.ingresos.oneLat[idxActivo] || 0)).toLocaleString("es-CR")} <small>banco</small></span></div>
      </div>

      <section className="eco-check">
        <div className="eco-check-cab">
          <h3 className="mp-subtit">Excel vs. registro de Dharma — {mesActivo ? mesActivo.label : ""}</h3>
          <span className="eco-check-nota">El Excel está en dólares; los pagos de Dharma se cargan en colones (₡) — quedan aparte, no se restan entre sí.</span>
        </div>
        <div className="eco-check-filas">
          <div className="eco-check-fila"><span>Excel (USD)</span><b>${ingresoMes.toLocaleString("es-CR")}</b></div>
          <div className="eco-check-fila"><span>Dharma ({dharmaMes.cantidad} pago{dharmaMes.cantidad === 1 ? "" : "s"}, CRC)</span><b>{window.Membresia ? window.Membresia.money(dharmaMes.total) : "₡" + dharmaMes.total.toLocaleString("es-CR")}</b></div>
        </div>
        <p className="eco-check-nota">Para comparar ambos vas a necesitar el tipo de cambio del mes (pendiente: conversión automática al cargar recibos en dólares).</p>
      </section>

      <section className="eco-seccion">
        <h3 className="mp-subtit">Tendencia — últimos {ultimos6.length} meses</h3>
        <div className="eco-trend">
          {ultimos6.map((m, i) => {
            const globalIdx = datos.caja.meses.length - ultimos6.length + i;
            const ing = datos.caja.ingresos.total[globalIdx], gas = datos.caja.gastos.total[globalIdx];
            return (
              <div className="eco-trend-col" key={i}>
                <div className="eco-trend-barras">
                  <div className="eco-trend-barra ing" style={{ height: Math.max(3, Math.round((ing / maxTrend) * 100)) + "%" }} title={"Ingresos: $" + ing}><span className="eco-trend-val">${(ing / 1000).toFixed(ing >= 100000 ? 0 : 1)}k</span></div>
                  <div className="eco-trend-barra gas" style={{ height: Math.max(3, Math.round((gas / maxTrend) * 100)) + "%" }} title={"Gastos: $" + gas}><span className="eco-trend-val">${(gas / 1000).toFixed(gas >= 100000 ? 0 : 1)}k</span></div>
                </div>
                <span className="eco-trend-label">{m.label}</span>
              </div>
            );
          })}
        </div>
        <div className="eco-trend-leyenda"><span><i className="ing"></i>Ingresos</span><span><i className="gas"></i>Gastos</span></div>
      </section>

      <div className="eco-cols">
        <section className="eco-seccion">
          <h3 className="mp-subtit">Ingresos por categoría — {mesActivo ? mesActivo.label : ""}</h3>
          {ingresosCategoria.length ? ingresosCategoria.map((c) => <EconomiaBarra key={c.nombre} label={c.nombre} valor={c.monto} max={ingresosCategoria[0].monto} color="var(--teal)"></EconomiaBarra>) : <p className="eco-vacio">Sin datos ese mes.</p>}
        </section>
        <section className="eco-seccion">
          <h3 className="mp-subtit">Gastos por categoría — {mesActivo ? mesActivo.label : ""}</h3>
          {gastosCategoria.length ? gastosCategoria.map((c) => <EconomiaBarra key={c.nombre} label={c.nombre} valor={c.monto} max={gastosCategoria[0].monto} color="var(--naranja, #E84D23)"></EconomiaBarra>) : <p className="eco-vacio">Sin datos ese mes.</p>}
        </section>
      </div>

      {profesoresMes.length ? (
        <section className="eco-seccion">
          <h3 className="mp-subtit">Horas y sueldos por profesor — {mesActivo ? mesActivo.label : ""}</h3>
          <div className="eco-profes">
            {profesoresMes.map((p) => (
              <div className="eco-profe-fila" key={p.nombre}>
                <div className="eco-profe-cab">
                  <span className="eco-profe-nombre">{p.nombre}</span>
                  <span className="eco-profe-horas">{p.horas}h</span>
                  <span className="eco-profe-monto">${p.monto.toLocaleString("es-CR")}</span>
                </div>
                {Object.keys(p.porActividad).length ? <div className="eco-profe-detalle">{Object.entries(p.porActividad).sort((a, b) => b[1] - a[1]).map(([act, h]) => act + " (" + h + "h)").join(" · ")}</div> : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <EconomiaMembresias conteoEstado={conteoEstado} activos={activos.length}></EconomiaMembresias>

      <section className="eco-seccion">
        <h3 className="mp-subtit">Altas y bajas — últimos 6 meses (en vivo, de Personas)</h3>
        <div className="eco-trend">
          {mesesRecientes.map((m, i) => {
            const maxAB = Math.max(1, ...altasPorMes, ...bajasPorMes);
            return (
              <div className="eco-trend-col" key={i}>
                <div className="eco-trend-barras">
                  <div className="eco-trend-barra ing" style={{ height: Math.max(3, Math.round((altasPorMes[i] / maxAB) * 100)) + "%" }} title={"Altas: " + altasPorMes[i]}></div>
                  <div className="eco-trend-barra gas" style={{ height: Math.max(3, Math.round((bajasPorMes[i] / maxAB) * 100)) + "%" }} title={"Bajas: " + bajasPorMes[i]}></div>
                </div>
                <span className="eco-trend-label">{m.label}</span>
              </div>
            );
          })}
        </div>
        <div className="eco-trend-leyenda"><span><i className="ing"></i>Altas</span><span><i className="gas"></i>Bajas</span></div>
      </section>
    </main>
  );
}

function EconomiaMembresias({ conteoEstado, activos }) {
  return (
    <section className="eco-seccion">
      <h3 className="mp-subtit">Membresías (en vivo)</h3>
      <div className="eco-memb-grid">
        <div className="eco-memb-chip"><span className="n">{activos}</span><span className="l">Alumnos activos</span></div>
        <div className="eco-memb-chip ok"><span className="n">{conteoEstado.activa || 0}</span><span className="l">Con plan activo</span></div>
        <div className="eco-memb-chip warn"><span className="n">{conteoEstado.porvencer || 0}</span><span className="l">Por vencer</span></div>
        <div className="eco-memb-chip bad"><span className="n">{conteoEstado.vencida || 0}</span><span className="l">Vencidos</span></div>
        <div className="eco-memb-chip"><span className="n">{conteoEstado.sinplan || 0}</span><span className="l">Sin plan</span></div>
        <div className="eco-memb-chip bad"><span className="n">{conteoEstado.sincreditos || 0}</span><span className="l">Sin créditos</span></div>
      </div>
    </section>
  );
}

function EconomiaVista({ personas, socios }) {
  const [desbloqueada, setDesbloqueada] = React.useState(() => { try { return sessionStorage.getItem("dharma-economia-desbloqueada") === "1"; } catch (e) { return false; } });
  if (!desbloqueada) return <EconomiaGate onOk={() => setDesbloqueada(true)}></EconomiaGate>;
  return <EconomiaDashboard personas={personas} socios={socios}></EconomiaDashboard>;
}

Object.assign(window, { EconomiaVista });
