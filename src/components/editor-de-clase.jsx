// DHARMA — Editor de clase (crear / editar): metadata + sesiones + bloques
const ICONOS_CLASE = ["fuerza", "potencia", "movilidad", "respiracion", "resistencia", "yoga", "natacion", "surf"];
const NIVELES_CLASE = ["Todos los niveles", "Inicial", "Inicial / Intermedio", "Intermedio", "Intermedio / Avanzado", "Avanzado"];

function nuevaClaseVacia(seccionId, subseccion) {
  return {
    id: "clase" + Date.now(),
    nombre: "", descripcion: "", nivel: "Todos los niveles", duracion: 60,
    horarios: "", coach: "", icono: "fuerza", seccion: seccionId, subseccion: subseccion || "",
    inscriptos: [], custom: true,
    sesiones: [{ id: "A", nombre: "Sesión 1", foco: "", bloques: [] }]
  };
}

function ClaseEditor({ clase, secciones, subsecciones, onNuevaSubseccion, modo, onGuardar, onCancelar }) {
  const [c, setC] = React.useState(() => JSON.parse(JSON.stringify(clase)));
  const [ses, setSes] = React.useState(0);
  const set = (k, v) => setC((p) => ({ ...p, [k]: v }));
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  // Blindaje: mientras el editor de una clase está abierto, avisamos a la raíz de la app
  // para que NO fuerce un remount total si llega una sincronización de otro dispositivo —
  // ese remount reiniciaba este formulario y perdía todo lo que se estaba escribiendo,
  // incluso justo antes de tocar Guardar.
  React.useEffect(() => {
    window.__dharmaEditorAbierto = (window.__dharmaEditorAbierto || 0) + 1;
    return () => {
      window.__dharmaEditorAbierto = Math.max(0, (window.__dharmaEditorAbierto || 1) - 1);
      if (window.__dharmaEditorAbierto === 0) { try { window.dispatchEvent(new Event("dharma-editor-cerrado")); } catch (e) {} }
    };
  }, []);

  // sub-secciones de la sección elegida (gestionadas + en uso)
  const subDeSeccion = [...new Set((subsecciones || []).filter((s) => s && s.seccion === c.seccion).map((s) => s.nombre))];
  const opcionesSub = (c.subseccion && !subDeSeccion.includes(c.subseccion)) ? [...subDeSeccion, c.subseccion] : subDeSeccion;
  const elegirSub = (val) => {
    if (val === "__nueva") {
      const nombre = window.prompt("Nombre de la nueva sub-sección (ej: Fuerza y Potencia, Levantamiento Olímpico)");
      if (nombre && nombre.trim()) { if (onNuevaSubseccion) onNuevaSubseccion(c.seccion, nombre.trim()); set("subseccion", nombre.trim()); }
    } else {
      set("subseccion", val);
    }
  };

  const sesionActiva = c.sesiones[0] || { foco: "", bloques: [] };
  const updSesion = (i, patch) => set("sesiones", [{ ...(c.sesiones[0] || { id: "A", nombre: c.nombre || "Clase", foco: "", bloques: [] }), ...patch }]);
  const addSesion = () => {
    const n = c.sesiones.length;
    const id = String.fromCharCode(65 + n);
    setC((p) => ({ ...p, sesiones: [...p.sesiones, { id, nombre: "Sesión " + (n + 1), foco: "", bloques: [] }] }));
    setSes(n);
  };
  const delSesion = (i) => {
    if (c.sesiones.length <= 1) return;
    setC((p) => ({ ...p, sesiones: p.sesiones.filter((_, x) => x !== i) }));
    setSes((s) => Math.max(0, s - (i <= s ? 1 : 0)));
  };

  const valido = c.nombre.trim().length > 0;
  const guardar = () => {
    if (!valido) return;
    const limpio = {
      ...c,
      nombre: c.nombre.trim(),
      descripcion: c.descripcion.trim(),
      subseccion: (c.subseccion || "").trim(),
      coach: c.coach.trim() || "—",
      horarios: c.horarios.trim() || "A definir",
      duracion: Number(c.duracion) || 0,
      sesiones: c.sesiones.map((s) => ({ ...s, nombre: s.nombre.trim() || "Sesión", bloques: s.bloques || [] }))
    };
    onGuardar(limpio);
  };

  return (
    <main className="contenido" data-screen-label={modo === "nuevo" ? "Nueva clase" : "Editar clase"}>
      <button className="volver" onClick={onCancelar}>← Cancelar</button>

      <header className="cabecera-editor">
        <h1>{modo === "nuevo" ? "Nueva clase" : "Editar clase"}</h1>
        <div className="ce-acciones">
          <button className="btn-secundario" onClick={onCancelar}>Cancelar</button>
          <button className="btn-primario" disabled={!valido} onClick={guardar}>{modo === "nuevo" ? "Crear clase" : "Guardar cambios"}</button>
        </div>
      </header>

      <section className="ce-metadata">
        <div className="form-fila-2">
          <label className="campo grande">
            <span>Nombre de la clase *</span>
            <input value={c.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Ej: Clase 1, Mardelplata…"></input>
          </label>
          <label className="campo">
            <span>Sección</span>
            <select value={c.seccion} onChange={(e) => set("seccion", e.target.value)}>
              {secciones.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
            </select>
          </label>
        </div>

        <label className="campo">
          <span>Sub-sección <em className="campo-hint">— agrupa clases dentro de la sección</em></span>
          <select className="select-subseccion" value={c.subseccion || ""} onChange={(e) => elegirSub(e.target.value)}>
            <option value="">— Sin sub-sección —</option>
            {opcionesSub.map((n, i) => <option key={i} value={n}>{n}</option>)}
            <option value="__nueva">+ Nueva sub-sección…</option>
          </select>
        </label>

        <label className="campo">
          <span>Descripción</span>
          <textarea value={c.descripcion} rows={2} onChange={(e) => set("descripcion", e.target.value)} placeholder="Para qué es la clase, a quién apunta…"></textarea>
        </label>

        <div className="ce-meta-grid">
          <label className="campo">
            <span>Nivel</span>
            <select value={c.nivel} onChange={(e) => set("nivel", e.target.value)}>
              {NIVELES_CLASE.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <label className="campo chico">
            <span>Duración (min)</span>
            <input type="number" min="0" value={c.duracion} onChange={(e) => set("duracion", e.target.value)}></input>
          </label>
          <label className="campo">
            <span>Horarios</span>
            <input value={c.horarios} onChange={(e) => set("horarios", e.target.value)} placeholder="Ej: Lun · Mié — 18:00"></input>
          </label>
          <label className="campo chico">
            <span>Coach</span>
            <input value={c.coach} onChange={(e) => set("coach", e.target.value)} placeholder="Nombre"></input>
          </label>
        </div>

        <div className="campo">
          <span>Tipo / ícono de la clase</span>
          <div className="ce-iconos">
            {ICONOS_CLASE.map((ic) => (
              <button key={ic} className={"ce-icono" + (c.icono === ic ? " activo" : "")} onClick={() => set("icono", ic)} title={ic}>
                <IconoCat tipo={ic} size={22}></IconoCat>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="ce-sesiones-cab">
        <h2 className="ce-subtitulo">Entrenamiento</h2>
      </div>

      <section className="ce-sesion-edit">
        <label className="campo">
          <span>Foco de la clase</span>
          <textarea value={sesionActiva.foco} rows={2} onChange={(e) => updSesion(0, { foco: e.target.value })} placeholder="Objetivo o consigna principal de la clase…"></textarea>
        </label>

        <EditorBloques bloques={sesionActiva.bloques} onChange={(bloques) => updSesion(0, { bloques })}></EditorBloques>
      </section>
    </main>
  );
}

Object.assign(window, { ClaseEditor, nuevaClaseVacia, ICONOS_CLASE });
