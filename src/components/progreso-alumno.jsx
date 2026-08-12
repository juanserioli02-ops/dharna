// DHARMA — Progreso del alumno: 1 puntaje total + 4 pilares + registro de marcas personales (PRs).
const PR_UNIDADES = { fuerza: "kg / reps / m / cm", movilidad: "seg / reps" };

function MarcaForm({ form, setForm, onGuardar, onCancelar, compacto }) {
  const set = (k, v) => setForm({ ...form, [k]: v });
  const series = form.series || [{ peso: "", reps: "" }];
  const setSerie = (i, k, v) => { const next = series.slice(); next[i] = { ...next[i], [k]: v }; setForm({ ...form, series: next }); };
  const agregarSerie = () => setForm({ ...form, series: [...series, { peso: "", reps: "" }] });
  const quitarSerie = (i) => setForm({ ...form, series: series.filter((_, idx) => idx !== i) });
  const nombreFinal = form.ejercicio === "__libre" ? form.ejercicioLibre : form.ejercicio;
  const hayAlMenosUna = series.some((s) => s.reps !== "" && s.reps != null);
  const listo = nombreFinal && hayAlMenosUna;
  return (
    <div className={compacto ? "pg-form" : "pg-form"}>
      <div className="pg-form-fila">
        <select value={form.ejercicio === "__libre" ? "" : form.ejercicio} onChange={(e) => setForm({ ...form, ejercicio: e.target.value, ejercicioLibre: "", pilar: window.Gamif.EJ_OFICIALES[e.target.value] || form.pilar })}>
          <option value="">Elegí un ejercicio de la tabla oficial…</option>
          {Object.keys(window.Gamif.EJ_OFICIALES).map((ej) => <option key={ej} value={ej}>{ej}</option>)}
        </select>
      </div>
      <div className="pg-form-fila">
        <span className="pg-form-o">o escribí el nombre del ejercicio</span>
      </div>
      <div className="pg-form-fila">
        <input placeholder="Nombre del ejercicio" value={form.ejercicioLibre || ""} onChange={(e) => setForm({ ...form, ejercicioLibre: e.target.value, ejercicio: e.target.value ? "__libre" : "" })}></input>
        {form.ejercicio === "__libre" ? (
          <select value={form.pilar} onChange={(e) => set("pilar", e.target.value)}>
            <option value="fuerza">Fuerza y potencia</option>
            <option value="movilidad">Movilidad y control</option>
          </select>
        ) : null}
      </div>

      <div className="pg-form-series">
        <span className="pg-form-series-lbl">Series</span>
        {series.map((s, i) => (
          <div className="pg-form-fila pg-form-fila-doble pg-form-serie" key={i}>
            <span className="pg-serie-num">{i + 1}</span>
            <input type="number" step="0.5" placeholder="Peso (kg) — vacío si es sin peso" value={s.peso} onChange={(e) => setSerie(i, "peso", e.target.value)}></input>
            <input type="number" placeholder="Reps / seg" value={s.reps} onChange={(e) => setSerie(i, "reps", e.target.value)}></input>
            {series.length > 1 ? <button type="button" className="pg-serie-quitar" onClick={() => quitarSerie(i)}>✕</button> : null}
          </div>
        ))}
        <button type="button" className="btn-secundario pg-serie-agregar" onClick={agregarSerie}>+ Agregar serie</button>
      </div>

      <div className="pg-form-fila">
        <input placeholder="Comentario (opcional)" value={form.comentario || ""} onChange={(e) => set("comentario", e.target.value)}></input>
      </div>
      <div className="pg-form-acciones">
        <button className="btn-secundario" onClick={onCancelar}>Cancelar</button>
        <button className="btn-primario" disabled={!listo} onClick={onGuardar}>Guardar marca</button>
      </div>
    </div>
  );
}

/* ---------- registrar marca: se usa igual desde Progreso (inline) y desde Inicio (modal) ---------- */
function guardarMarcaDesdeForm(personaId, form) {
  const nombreFinal = form.ejercicio === "__libre" ? form.ejercicioLibre : form.ejercicio;
  if (!nombreFinal) return null;
  const series = (form.series || []).filter((s) => s.reps !== "" && s.reps != null);
  if (!series.length) return null;
  let algunPR = false;
  series.forEach((s, i) => {
    const r = window.Gamif.agregarPR(personaId, { ejercicio: nombreFinal, pilar: form.pilar, peso: s.peso, reps: s.reps, comentario: form.comentario, serie: series.length > 1 ? i + 1 : null });
    if (r.esPR) algunPR = true;
  });
  return { esPR: algunPR, cantidad: series.length };
}

function RegistrarCargaModal({ personaId, onCerrar, onGuardado }) {
  const [form, setForm] = React.useState({ ejercicio: "", pilar: "fuerza", series: [{ peso: "", reps: "" }] });
  const guardar = () => {
    const r = guardarMarcaDesdeForm(personaId, form);
    if (!r) return;
    window.dharmaToast && window.dharmaToast(r.esPR ? "¡Nuevo PR! +25 pts" : "Marca registrada +5 pts" + (r.cantidad > 1 ? " × " + r.cantidad + " series" : ""), "ok");
    onGuardado && onGuardado();
    onCerrar();
  };
  return (
    <div className="mb-overlay" onClick={onCerrar}>
      <div className="mb-modal chico" onClick={(e) => e.stopPropagation()}>
        <header className="mb-modal-cab">
          <div><div className="mb-modal-eyebrow">Registro rápido</div><h2>Registrar una carga</h2></div>
          <button className="btn-icono" onClick={onCerrar}>✕</button>
        </header>
        <div className="mb-modal-cuerpo">
          <MarcaForm form={form} setForm={setForm} onGuardar={guardar} onCancelar={onCerrar}></MarcaForm>
        </div>
      </div>
    </div>
  );
}

function ProgresoAlumno({ persona }) {
  const [tick, setTick] = React.useState(0);
  const [verGuia, setVerGuia] = React.useState(false);
  const reservas = React.useMemo(() => (window.Reservas ? window.Reservas.dePersona(window.Reservas.cargar(), persona.id) : []), [tick]);
  const socios = React.useMemo(() => { try { return JSON.parse(localStorage.getItem("dharma-socios-v1")) || {}; } catch (e) { return {}; } }, [tick]);
  const g = window.Gamif.calcular(persona, { reservas, socios });
  const [form, setForm] = React.useState(null); // { ejercicio, pilar, series, comentario }
  const [expandido, setExpandido] = React.useState(null);

  React.useEffect(() => {
    if (window.migrarCargasViejas) window.migrarCargasViejas(persona);
  }, []);

  const guardarPR = () => {
    const r = guardarMarcaDesdeForm(persona.id, form);
    if (!r) return;
    window.dharmaToast && window.dharmaToast(r.esPR ? "¡Nuevo PR! +25 pts" : "Marca registrada +5 pts" + (r.cantidad > 1 ? " × " + r.cantidad + " series" : ""), "ok");
    setForm(null);
    setTick((t) => t + 1);
  };

  const pilaresOrden = ["constancia", "compromiso", "fuerza", "movilidad"];
  const NIVEL_ICONO = { guerrero: "\u2694\ufe0f", ninja: "\ud83e\udd77", mago: "\ud83e\uddd9", maestro: "\ud83c\udfc6" };
  const SUBNIVEL_COLOR = { Bronce: "#B08D57", Plata: "#9CA3AF", Oro: "#D4A72C" };

  return (
    <main className="contenido alumno-contenido" data-screen-label="Alumno — Progreso">
      <div className="encabezado-vista" style={{ marginBottom: 10 }}>
        <p className="subtitulo-vista" style={{ marginTop: 0 }}>Un puntaje compuesto por 4 pilares — mide qué tan completo es tu progreso.</p>
        <button className="gb-ayuda-suelta" onClick={() => setVerGuia(true)} title="¿Cómo funciona?">?</button>
      </div>

      <div className="pg-resumen">
        <div className="pg-medalla">{NIVEL_ICONO[g.nivel] || g.nivel.slice(0, 2).toUpperCase()}</div>
        <div className="pg-nivel-info">
          <div className="pg-nivel-nombre">{window.Gamif.cap(g.nivel)} <span className="pg-tier" style={{ background: (SUBNIVEL_COLOR[g.subnivel] || "rgba(247,248,250,0.15)") + "33", color: SUBNIVEL_COLOR[g.subnivel] || "inherit" }}>{g.subnivel}</span></div>
          <div className="pg-nivel-sub">{g.siguiente ? "Para " + window.Gamif.cap(g.siguiente) + ": foco en " + window.Gamif.PILARES[g.pilarMasDebil].nombre.toLowerCase() : "Nivel máximo alcanzado"}</div>
        </div>
        <div className="pg-total">{g.total}<span>puntos totales</span></div>
      </div>

      {g.siguiente && !g.listoParaSubir ? (
        <div className="pg-meta-siguiente">
          <span className="pg-meta-ico">🎯</span>
          <span>Necesitás <b>{g.umbral}</b> pts en <b>cada uno</b> de los 4 pilares para pasar a <b>{g.siguiente}</b>. Hoy tu pilar más bajo es <b>{window.Gamif.PILARES[g.pilarMasDebil].nombre}</b> con {g.minimoPilar} — te faltan <b>{g.umbral - g.minimoPilar} pts</b> ahí.</span>
        </div>
      ) : null}

      <div className="pg-pilares">
        {pilaresOrden.map((k) => {
          const p = window.Gamif.PILARES[k];
          const val = g.pilares[k];
          const pct = g.umbral ? Math.min(100, Math.round((val / g.umbral) * 100)) : 100;
          const esDebil = g.pilarMasDebil === k && g.siguiente;
          return (
            <div className={"pg-pilar" + (esDebil ? " pg-pilar-debil" : "")} key={k}>
              <div className="pg-pilar-lbl"><span><i className="pg-dot" style={{ background: p.color }}></i>{p.nombre}{esDebil ? <span className="pg-foco">tu foco hoy</span> : null}</span><span className="n">{val}{g.umbral ? " / " + g.umbral : ""}</span></div>
              <div className="pg-barra"><div className="pg-barra-fill" style={{ width: pct + "%", background: p.color }}></div></div>
            </div>
          );
        })}
      </div>
      {g.listoParaSubir ? <div className="pg-listo">✓ Alcanzaste el mínimo en los 4 pilares para {g.siguiente} — tu coach confirma el cambio de nivel en el próximo testeo.</div> : null}
      {verGuia ? <window.GamifGuiaModal onCerrar={() => setVerGuia(false)}></window.GamifGuiaModal> : null}

      <div className="pg-cab-marcas">
        <h4 className="mp-subtit" style={{ marginBottom: 0 }}>Mis marcas personales</h4>
        <button className="btn-primario" onClick={() => setForm({ ejercicio: "", pilar: "fuerza", series: [{ peso: "", reps: "" }] })}>+ Nueva marca</button>
      </div>

      {form ? <MarcaForm form={form} setForm={setForm} onGuardar={guardarPR} onCancelar={() => setForm(null)}></MarcaForm> : null}

      {g.prs.length === 0 ? (
        <div className="alumno-empty"><p>Todavía no registraste ninguna marca personal.</p></div>
      ) : (
        <div className="pg-ej-grid">
          {Object.entries(g.prs.reduce((acc, pr) => { (acc[pr.ejercicio] = acc[pr.ejercicio] || []).push(pr); return acc; }, {}))
            .sort((a, b) => b[1][b[1].length - 1].fecha.localeCompare(a[1][a[1].length - 1].fecha))
            .map(([nombre, entradas]) => {
              const ord = entradas.slice().sort((a, b) => a.fecha.localeCompare(b.fecha));
              const ultima = ord[ord.length - 1];
              const usaPeso = ord.some((p) => p.peso != null);
              const serie = ord.filter((p) => p.peso != null || p.reps != null).map((p) => usaPeso ? (p.peso || 0) : (p.reps || 0));
              const abierto = expandido === nombre;
              const mostrarValor = (p) => p.peso != null ? p.peso + "kg × " + p.reps : p.reps != null ? p.reps + " reps/seg" : p.valor || "—";
              return (
                <div className="pg-ej-card" key={nombre}>
                  <button className="pg-ej-cab" onClick={() => setExpandido(abierto ? null : nombre)}>
                    <span className="pg-ej-pilar-dot" style={{ background: window.Gamif.PILARES[ultima.pilar].color }}></span>
                    <span className="pg-ej-nombre">{nombre}</span>
                    <span className="pg-ej-chevron">{abierto ? "⌃" : "⌄"}</span>
                  </button>
                  <MiniSparkline valores={serie}></MiniSparkline>
                  <div className="pg-ej-ultimo">
                    <span>Último: {mostrarValor(ultima)}</span>
                    {ultima.esPR ? <span className="pg-ej-pr-badge">🏆 PR</span> : null}
                    <span className="pg-ej-fecha">{ultima.fecha}</span>
                  </div>
                  {abierto ? (
                    <div className="pg-ej-historial">
                      {ord.slice().reverse().map((p) => (
                        <div className="pg-ej-hist-fila" key={p.id}>
                          <span>{p.fecha}{p.serie ? <em className="pg-ej-serie-tag"> · serie {p.serie}</em> : null}</span>
                          <span>{mostrarValor(p)}</span>
                          {p.esPR ? <span className="pg-ej-pr-badge chico">PR</span> : null}
                          {p.comentario ? <span className="pg-ej-hist-comentario">{p.comentario}</span> : null}
                          <button type="button" className="pg-ej-borrar" title="Eliminar este registro" onClick={() => { if (window.confirm("¿Eliminar este registro? No se puede deshacer.")) { window.Gamif.eliminarPR(persona.id, p.id); setTick((t) => t + 1); } }}>✕</button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
        </div>
      )}
    </main>
  );
}

function MiniSparkline({ valores }) {
  if (!valores || valores.length < 2) return <div className="pg-spark-vacio">Registrá otra marca para ver tu evolución</div>;
  const w = 240, h = 48, pad = 6;
  const min = Math.min(...valores), max = Math.max(...valores);
  const rango = max - min || 1;
  const pts = valores.map((v, i) => {
    const x = pad + (i / (valores.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / rango) * (h - pad * 2);
    return x + "," + y;
  });
  return (
    <svg className="pg-spark" viewBox={"0 0 " + w + " " + h} preserveAspectRatio="none">
      <polyline points={pts.join(" ")} fill="none" stroke="var(--acento)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
      {pts.map((p, i) => { const [x, y] = p.split(","); return <circle key={i} cx={x} cy={y} r="2.5" fill="var(--acento)"></circle>; })}
    </svg>
  );
}

window.ProgresoAlumno = ProgresoAlumno;
window.RegistrarCargaModal = RegistrarCargaModal;
