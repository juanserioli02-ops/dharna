// DHARMA — generador de rutina individual + formulario de perfil

/* ====================================================================
   RUTINA INDIVIDUAL (mismo formato de bloques que las clases)
   ==================================================================== */
function RutinaIndividual({ persona, onGuardar, onProyectar }) {
  const vacio = { nombre: "Rutina individual", objetivo: "", bloques: [] };
  const [r, setR] = React.useState(
    persona.rutina && persona.rutina.bloques ? persona.rutina : vacio
  );
  const commit = (next) => { setR(next); onGuardar(next); };

  const setCampo = (k, v) => commit({ ...r, [k]: v });
  const addBloque = () => commit({ ...r, bloques: [...r.bloques, { nombre: "Nuevo bloque", duracion: 10, items: [{ ej: "", dosis: "" }] }] });
  const updBloque = (i, patch) => commit({ ...r, bloques: r.bloques.map((b, x) => (x === i ? { ...b, ...patch } : b)) });
  const delBloque = (i) => commit({ ...r, bloques: r.bloques.filter((_, x) => x !== i) });
  const addItem = (i) => updBloque(i, { items: [...r.bloques[i].items, { ej: "", dosis: "" }] });
  const updItem = (i, j, patch) => updBloque(i, { items: r.bloques[i].items.map((it, x) => (x === j ? { ...it, ...patch } : it)) });
  const delItem = (i, j) => updBloque(i, { items: r.bloques[i].items.filter((_, x) => x !== j) });

  const total = r.bloques.reduce((a, b) => a + (Number(b.duracion) || 0), 0);
  const hayBloques = r.bloques.length > 0;

  return (
    <div className="rutina-wrap">
      <div className="rutina-cabecera">
        <div className="rc-campos">
          <input
            className="inp-titulo"
            value={r.nombre}
            placeholder="Nombre de la rutina"
            onChange={(e) => setCampo("nombre", e.target.value)}
          ></input>
          <textarea
            className="inp-area"
            value={r.objetivo}
            placeholder="Objetivo de la rutina (opcional) — ej: construir fuerza sin estresar la rodilla…"
            rows={2}
            onChange={(e) => setCampo("objetivo", e.target.value)}
          ></textarea>
        </div>
        <div className="rc-acciones">
          <span className="rc-total">{total}′ totales</span>
          <button className="btn-pizarra chico" disabled={!hayBloques} onClick={onProyectar}>▶ Proyectar</button>
        </div>
      </div>

      {!hayBloques ? (
        <div className="rutina-vacia">
          <p>Todavía no hay bloques. Armá la rutina de {persona.nombre.split(" ")[0]} con el mismo formato de las clases grupales.</p>
          <button className="btn-primario" onClick={addBloque}>+ Agregar primer bloque</button>
        </div>
      ) : (
        <div className="rutina-bloques">
          {r.bloques.map((b, i) => (
            <div className="bloque editable" key={i}>
              <div className="bloque-cabecera edit">
                <span className="bloque-num">{String(i + 1).padStart(2, "0")}</span>
                <input
                  className="inp-bloque-nombre"
                  value={b.nombre}
                  placeholder="Nombre del bloque"
                  onChange={(e) => updBloque(i, { nombre: e.target.value })}
                ></input>
                <span className="inp-dur-wrap">
                  <input
                    className="inp-dur"
                    type="number"
                    min="0"
                    value={b.duracion}
                    onChange={(e) => updBloque(i, { duracion: e.target.value === "" ? "" : Number(e.target.value) })}
                  ></input>′
                </span>
                <button className="btn-icono borrar" title="Eliminar bloque" onClick={() => delBloque(i)}><IconX></IconX></button>
              </div>

              <div className="items-edit">
                {b.items.map((it, j) => (
                  <div className="item-edit" key={j}>
                    <div className="item-campos">
                      <window.EjAutocomplete valor={it.ej} onCambiar={(v) => updItem(i, j, { ej: v })}></window.EjAutocomplete>
                      <input
                        className="inp-nota"
                        value={it.nota || ""}
                        placeholder="Nota / aclaración (opcional)"
                        onChange={(e) => updItem(i, j, { nota: e.target.value })}
                      ></input>
                    </div>
                    <input
                      className="inp-dosis"
                      value={it.dosis}
                      placeholder="4×8"
                      onChange={(e) => updItem(i, j, { dosis: e.target.value })}
                    ></input>
                    <button className="btn-icono borrar" title="Eliminar ejercicio" onClick={() => delItem(i, j)}><IconX></IconX></button>
                  </div>
                ))}
                <button className="btn-agregar-item" onClick={() => addItem(i)}>+ Ejercicio</button>
              </div>
            </div>
          ))}
          <button className="btn-agregar-bloque" onClick={addBloque}>+ Agregar bloque</button>
        </div>
      )}
    </div>
  );
}

/* ====================================================================
   FORMULARIO DE PERFIL (crear / editar)
   ==================================================================== */
const NIVELES_PERFIL = ["Inicial", "Intermedio", "Avanzado"];

function PersonaForm({ modo, persona, grupos, onNuevoGrupo, onCerrar, onGuardar }) {
  const base = persona ? { ...persona, nombre: persona.nombre || "", edad: persona.edad != null ? persona.edad : "", nivel: persona.nivel || "Inicial", experiencia: persona.experiencia || "", objetivo: persona.objetivo || "", tipoTrabajo: persona.tipoTrabajo || "", deporte: persona.deporte || "", lesiones: persona.lesiones || [], doloresFrecuentes: persona.doloresFrecuentes || [], alertas: persona.alertas || "", email: persona.email || "", telefono: persona.telefono || "" } : {
    nombre: "", edad: "", nivel: "Inicial", experiencia: "", objetivo: "",
    tipoTrabajo: "", deporte: "", grupo: null, lesiones: [], doloresFrecuentes: [], alertas: "", email: "", telefono: ""
  };
  const [f, setF] = React.useState({
    ...base,
    grupo: base.grupo || "",
    lesiones: (base.lesiones || []).map((l) => ({ ...l })),
    doloresFrecuentes: [...(base.doloresFrecuentes || [])]
  });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const crearGrupo = () => {
    const nombre = window.prompt("Nombre del nuevo grupo (ej: Juveniles, Personalizados)");
    if (nombre && nombre.trim()) { const id = onNuevoGrupo(nombre.trim()); set("grupo", id); }
  };

  React.useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") onCerrar(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onCerrar]);

  const addLesion = () => set("lesiones", [...f.lesiones, { zona: "", detalle: "", adaptacion: "" }]);
  const updLesion = (i, patch) => set("lesiones", f.lesiones.map((l, x) => (x === i ? { ...l, ...patch } : l)));
  const delLesion = (i) => set("lesiones", f.lesiones.filter((_, x) => x !== i));
  const addDolor = () => set("doloresFrecuentes", [...f.doloresFrecuentes, ""]);
  const updDolor = (i, v) => set("doloresFrecuentes", f.doloresFrecuentes.map((d, x) => (x === i ? v : d)));
  const delDolor = (i) => set("doloresFrecuentes", f.doloresFrecuentes.filter((_, x) => x !== i));

  const guardar = () => {
    if (!f.nombre.trim()) return;
    const limpio = {
      ...(persona || {}),
      id: (persona && persona.id) || "p" + Date.now(),
      nombre: (f.nombre || "").trim(),
      edad: f.edad === "" ? null : Number(f.edad),
      nivel: f.nivel,
      experiencia: (f.experiencia || "").trim(),
      objetivo: (f.objetivo || "").trim(),
      tipoTrabajo: (f.tipoTrabajo || "").trim(),
      deporte: (f.deporte || "").trim(),
      grupo: f.grupo || null,
      lesiones: (f.lesiones || []).filter((l) => (l.zona || "").trim()).map((l) => ({ zona: l.zona.trim(), detalle: (l.detalle || "").trim(), adaptacion: (l.adaptacion || "").trim() })),
      doloresFrecuentes: (f.doloresFrecuentes || []).map((d) => (d || "").trim()).filter(Boolean),
      alertas: (f.alertas || "").trim(),
      email: (f.email || "").trim().toLowerCase(),
      telefono: (f.telefono || "").trim(),
      metricas: (persona && persona.metricas) || [],
      asistencia: (persona && persona.asistencia) || { mes: 0, racha: 0 },
      notas: (persona && persona.notas) || [],
      clases: (persona && persona.clases) || [],
      rutina: (persona && persona.rutina) || null
    };
    onGuardar(limpio);
  };

  return (
    <div>
      <div className="telon" onClick={onCerrar}></div>
      <aside className="form-panel" data-screen-label={modo === "nuevo" ? "Nuevo perfil" : "Editar perfil"}>
        <header className="form-cabecera">
          <h2>{modo === "nuevo" ? "Nuevo perfil" : "Editar perfil"}</h2>
          <button className="cerrar" onClick={onCerrar} aria-label="Cerrar"><IconX></IconX></button>
        </header>

        <div className="form-cuerpo">
          <div className="form-fila-2">
            <label className="campo grande">
              <span>Nombre y apellido *</span>
              <input value={f.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Ej: Camila Torres"></input>
            </label>
            <label className="campo chico">
              <span>Edad</span>
              <input type="number" min="0" value={f.edad} onChange={(e) => set("edad", e.target.value)} placeholder="—"></input>
            </label>
          </div>

          <div className="form-fila-2">
            <label className="campo">
              <span>Mail (para que pueda entrar a su app)</span>
              <input type="email" value={f.email || ""} onChange={(e) => set("email", e.target.value)} placeholder="nombre@mail.com"></input>
            </label>
            <label className="campo">
              <span>Teléfono</span>
              <input value={f.telefono || ""} onChange={(e) => set("telefono", e.target.value)} placeholder="Ej: 8888-8888"></input>
            </label>
          </div>

          <div className="form-fila-2">
            <label className="campo">
              <span>Experiencia / nivel</span>
              <div className="seg">
                {NIVELES_PERFIL.map((n) => (
                  <button key={n} type="button" className={f.nivel === n ? "activo" : ""} onClick={() => set("nivel", n)}>{n}</button>
                ))}
              </div>
            </label>
            <label className="campo">
              <span>Experiencia (detalle)</span>
              <input value={f.experiencia} onChange={(e) => set("experiencia", e.target.value)} placeholder="Ej: 3 años, viene del crossfit"></input>
            </label>
          </div>

          <div className="form-fila-2">
            <label className="campo">
              <span>Grupo</span>
              <div className="grupo-select">
                <select value={f.grupo} onChange={(e) => set("grupo", e.target.value)}>
                  <option value="">Sin grupo</option>
                  {(grupos || []).map((g) => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                </select>
                <button type="button" className="btn-mini" onClick={crearGrupo}>+ Nuevo</button>
              </div>
            </label>
            <label className="campo">
              <span>Objetivos</span>
              <input value={f.objetivo} onChange={(e) => set("objetivo", e.target.value)} placeholder="Ej: ganar fuerza y mejorar postura"></input>
            </label>
          </div>

          <div className="form-fila-2">
            <label className="campo">
              <span>Tipo de trabajo</span>
              <input value={f.tipoTrabajo} onChange={(e) => set("tipoTrabajo", e.target.value)} placeholder="Ej: oficina, sedentario"></input>
            </label>
            <label className="campo">
              <span>Deporte que practica</span>
              <input value={f.deporte} onChange={(e) => set("deporte", e.target.value)} placeholder="Ej: surf recreativo"></input>
            </label>
          </div>

          <div className="campo">
            <div className="campo-cab">
              <span>Lesiones y adaptaciones</span>
              <button type="button" className="btn-mini" onClick={addLesion}>+ Agregar</button>
            </div>
            {f.lesiones.length === 0 ? <p className="hint">Sin lesiones registradas.</p> : null}
            {f.lesiones.map((l, i) => (
              <div className="sub-tarjeta" key={i}>
                <div className="sub-fila">
                  <input value={l.zona} onChange={(e) => updLesion(i, { zona: e.target.value })} placeholder="Zona (ej: rodilla izq.)"></input>
                  <button type="button" className="btn-icono borrar" onClick={() => delLesion(i)}><IconX></IconX></button>
                </div>
                <input value={l.detalle} onChange={(e) => updLesion(i, { detalle: e.target.value })} placeholder="Detalle (ej: menisco operado 2024)"></input>
                <input value={l.adaptacion} onChange={(e) => updLesion(i, { adaptacion: e.target.value })} placeholder="Adaptación (ej: sin saltos, sentadilla a cajón)"></input>
              </div>
            ))}
          </div>

          <div className="campo">
            <div className="campo-cab">
              <span>Dolores frecuentes</span>
              <button type="button" className="btn-mini" onClick={addDolor}>+ Agregar</button>
            </div>
            {f.doloresFrecuentes.length === 0 ? <p className="hint">Ninguno registrado.</p> : null}
            {f.doloresFrecuentes.map((d, i) => (
              <div className="sub-fila" key={i}>
                <input value={d} onChange={(e) => updDolor(i, e.target.value)} placeholder="Ej: lumbar al estar mucho de pie"></input>
                <button type="button" className="btn-icono borrar" onClick={() => delDolor(i)}><IconX></IconX></button>
              </div>
            ))}
          </div>

          <label className="campo">
            <span>Alertas u observaciones</span>
            <textarea value={f.alertas} rows={3} onChange={(e) => set("alertas", e.target.value)} placeholder="Notas importantes para cualquier entrenador…"></textarea>
          </label>
        </div>

        <footer className="form-pie">
          <button className="btn-secundario" onClick={onCerrar}>Cancelar</button>
          <button className="btn-primario" disabled={!f.nombre.trim()} onClick={guardar}>
            {modo === "nuevo" ? "Crear perfil" : "Guardar cambios"}
          </button>
        </footer>
      </aside>
    </div>
  );
}

Object.assign(window, { RutinaIndividual, PersonaForm });
