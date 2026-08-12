// DHARMA — Cuestionario de ingreso del alumno (stepped) → escribe el perfil/persona

const NIVELES_ING = [
  ["Inicial", "Recién empiezo o vuelvo después de mucho"],
  ["Intermedio", "Entreno hace un tiempo con regularidad"],
  ["Avanzado", "Tengo experiencia y buena base"]
];

function CuestionarioIngreso({ persona, onCompletar, onCancelar }) {
  const base = persona || {};
  const [paso, setPaso] = React.useState(0);
  const [aceptaDeslinde, setAceptaDeslinde] = React.useState(!!(base.deslinde && base.deslinde.aceptado));
  const [f, setF] = React.useState({
    nombre: base.nombre || "",
    edad: base.edad || "",
    sexo: base.sexo || "",
    nivel: base.nivel || "",
    experiencia: base.experiencia || "",
    deporte: base.deporte || "",
    tipoTrabajo: base.tipoTrabajo || "",
    objetivo: base.objetivo || "",
    lesiones: (base.lesiones || []).map((l) => ({ zona: l.zona || "", detalle: l.detalle || "" })),
    doloresFrecuentes: [...(base.doloresFrecuentes || [])],
    alertas: base.alertas || "",
    planSolicitado: base.planSolicitado || ""
  });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const addLesion = () => set("lesiones", [...f.lesiones, { zona: "", detalle: "" }]);
  const updLesion = (i, patch) => set("lesiones", f.lesiones.map((l, x) => (x === i ? { ...l, ...patch } : l)));
  const delLesion = (i) => set("lesiones", f.lesiones.filter((_, x) => x !== i));
  const addDolor = () => set("doloresFrecuentes", [...f.doloresFrecuentes, ""]);
  const updDolor = (i, v) => set("doloresFrecuentes", f.doloresFrecuentes.map((d, x) => (x === i ? v : d)));
  const delDolor = (i) => set("doloresFrecuentes", f.doloresFrecuentes.filter((_, x) => x !== i));

  const pasos = [
    { titulo: "¿Quién sos?", sub: "Empecemos por lo básico." },
    { titulo: "Tu experiencia", sub: "Para ubicar tu punto de partida." },
    { titulo: "Tu objetivo", sub: "Qué querés lograr entrenando." },
    { titulo: "Tu salud", sub: "Lesiones y molestias que debamos cuidar." },
    { titulo: "Tu plan", sub: "Elegí la membresía que querés. Tu coach la activa al confirmar el pago." },
    { titulo: "Algo más", sub: "Lo que tu coach debería saber." },
    { titulo: "Deslinde de responsabilidad", sub: "Leé y aceptá para finalizar tu ingreso." }
  ];

  const puedeSeguir = () => {
    if (paso === 0) return f.nombre.trim().length > 0;
    if (paso === 1) return f.nivel.length > 0;
    return true;
  };

  const finalizar = () => {
    const limpio = {
      ...(persona || {}),
      id: (persona && persona.id) || "p" + Date.now(),
      nombre: f.nombre.trim(),
      edad: f.edad === "" ? null : Number(f.edad),
      nivel: f.nivel || "Inicial",
      experiencia: f.experiencia.trim(),
      deporte: f.deporte.trim(),
      tipoTrabajo: f.tipoTrabajo.trim(),
      sexo: f.sexo || "",
      objetivo: f.objetivo.trim(),
      deslinde: { aceptado: true, fecha: new Date().toISOString().slice(0, 10) },
      lesiones: f.lesiones.filter((l) => l.zona.trim()).map((l) => ({ zona: l.zona.trim(), detalle: (l.detalle || "").trim(), adaptacion: (persona && (persona.lesiones || []).find((x) => x.zona === l.zona) || {}).adaptacion || "" })),
      doloresFrecuentes: f.doloresFrecuentes.map((d) => d.trim()).filter(Boolean),
      alertas: f.alertas.trim(),
      planSolicitado: f.planSolicitado || "",
      planAprobado: (persona && persona.planAprobado) || false,
      metricas: (persona && persona.metricas) || [],
      asistencia: (persona && persona.asistencia) || { mes: 0, racha: 0 },
      notas: (persona && persona.notas) || [],
      clases: (persona && persona.clases) || [],
      proceso: (persona && persona.proceso) || null,
      ingresoCompleto: true
    };
    onCompletar(limpio);
  };

  const total = pasos.length;
  const esUltimo = paso === total - 1;

  return (
    <div className="cuestionario" data-screen-label="Cuestionario de ingreso">
      <div className="cuest-marco">
        <header className="cuest-cabecera">
          <div className="cuest-brand">
            <span className="brand-nombre">DHARMA</span>
            <span className="cuest-paso-num">Paso {paso + 1} de {total}</span>
          </div>
          <div className="cuest-progreso">
            {pasos.map((_, i) => <span key={i} className={"cp-seg" + (i <= paso ? " on" : "")}></span>)}
          </div>
        </header>

        <div className="cuest-cuerpo">
          <h1 className="cuest-titulo">{pasos[paso].titulo}</h1>
          <p className="cuest-sub">{pasos[paso].sub}</p>

          {paso === 0 ? (
            <div className="cuest-campos">
              <label className="campo">
                <span>¿Cómo te llamás? *</span>
                <input autoFocus value={f.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Nombre y apellido"></input>
              </label>
              <label className="campo chico">
                <span>Edad</span>
                <input type="number" min="0" value={f.edad} onChange={(e) => set("edad", e.target.value)} placeholder="—"></input>
              </label>
              <div className="campo" style={{ flexBasis: "100%" }}>
                <span>Sexo</span>
                <div className="seg">
                  {["Mujer", "Varón", "Prefiero no decirlo"].map((s) => (
                    <button key={s} type="button" className={f.sexo === s ? "activo" : ""} onClick={() => set("sexo", s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {paso === 1 ? (
            <div className="cuest-campos">
              <div className="campo">
                <span>¿Cuál es tu nivel? *</span>
                <div className="opciones-nivel">
                  {NIVELES_ING.map(([n, desc]) => (
                    <button key={n} className={"opcion-nivel" + (f.nivel === n ? " activo" : "")} onClick={() => set("nivel", n)}>
                      <span className="on-nombre">{n}</span>
                      <span className="on-desc">{desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <label className="campo">
                <span>Contanos un poco de tu experiencia</span>
                <input value={f.experiencia} onChange={(e) => set("experiencia", e.target.value)} placeholder="Ej: vengo del crossfit, paré 2 años…"></input>
              </label>
              <div className="form-fila-2">
                <label className="campo">
                  <span>¿Practicás algún deporte?</span>
                  <input value={f.deporte} onChange={(e) => set("deporte", e.target.value)} placeholder="Ej: surf, running…"></input>
                </label>
                <label className="campo">
                  <span>¿En qué trabajás?</span>
                  <input value={f.tipoTrabajo} onChange={(e) => set("tipoTrabajo", e.target.value)} placeholder="Ej: oficina, sedentario"></input>
                </label>
              </div>
            </div>
          ) : null}

          {paso === 2 ? (
            <div className="cuest-campos">
              <label className="campo">
                <span>¿Qué querés lograr?</span>
                <textarea autoFocus value={f.objetivo} rows={3} onChange={(e) => set("objetivo", e.target.value)} placeholder="Tu objetivo principal con el entrenamiento…"></textarea>
              </label>
              <div className="cuest-chips-sugeridos">
                {["Ganar fuerza", "Bajar de peso", "Mejorar postura", "Rendir en mi deporte", "Bajar el estrés", "Volver a moverme"].map((s) => (
                  <button key={s} onClick={() => set("objetivo", f.objetivo ? f.objetivo + ", " + s.toLowerCase() : s)}>{s}</button>
                ))}
              </div>
            </div>
          ) : null}

          {paso === 3 ? (
            <div className="cuest-campos">
              <div className="campo">
                <div className="campo-cab">
                  <span>¿Tenés alguna lesión?</span>
                  <button type="button" className="btn-mini" onClick={addLesion}>+ Agregar</button>
                </div>
                {f.lesiones.length === 0 ? <p className="hint">Ninguna. Si no tenés, seguí adelante.</p> : null}
                {f.lesiones.map((l, i) => (
                  <div className="sub-tarjeta" key={i}>
                    <div className="sub-fila">
                      <input value={l.zona} onChange={(e) => updLesion(i, { zona: e.target.value })} placeholder="Zona (ej: rodilla izquierda)"></input>
                      <button type="button" className="btn-icono borrar" onClick={() => delLesion(i)}><IconX></IconX></button>
                    </div>
                    <input value={l.detalle} onChange={(e) => updLesion(i, { detalle: e.target.value })} placeholder="¿Qué te pasó? (ej: menisco operado 2024)"></input>
                  </div>
                ))}
              </div>
              <div className="campo">
                <div className="campo-cab">
                  <span>¿Dolores o molestias frecuentes?</span>
                  <button type="button" className="btn-mini" onClick={addDolor}>+ Agregar</button>
                </div>
                {f.doloresFrecuentes.length === 0 ? <p className="hint">Ninguno por ahora.</p> : null}
                {f.doloresFrecuentes.map((d, i) => (
                  <div className="sub-fila" key={i}>
                    <input value={d} onChange={(e) => updDolor(i, e.target.value)} placeholder="Ej: lumbar al estar mucho de pie"></input>
                    <button type="button" className="btn-icono borrar" onClick={() => delDolor(i)}><IconX></IconX></button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {paso === 6 ? (
            <div className="cuest-campos">
              <div className="deslinde-texto">
                <p>Declaro que participo de las actividades físicas de <strong>DHARMA</strong> de manera <strong>voluntaria</strong> y que me encuentro en condiciones psicofísicas adecuadas para hacerlo.</p>
                <p>Asumo que todo entrenamiento implica riesgos inherentes y me comprometo a informar a mi entrenador cualquier lesión, dolor, condición médica o malestar, antes y durante cada sesión, así como a respetar las indicaciones y adaptaciones que se me brinden.</p>
                <p>Declaro que la información de salud que cargué en este ingreso es <strong>veraz y completa</strong>, y deslindo a DHARMA y a su equipo de toda responsabilidad por daños derivados de la omisión de datos o del incumplimiento de las pautas indicadas.</p>
              </div>
              <label className={"deslinde-check" + (aceptaDeslinde ? " on" : "")}>
                <input type="checkbox" checked={aceptaDeslinde} onChange={(e) => setAceptaDeslinde(e.target.checked)}></input>
                <span>Leí y <strong>acepto</strong> el deslinde de responsabilidad. La información declarada es verídica.</span>
              </label>
            </div>
          ) : null}

          {paso === 4 ? (
            <div className="cuest-campos">
              {(() => {
                const planes = (window.DHARMA_DATA && window.DHARMA_DATA.planes) || [];
                const categorias = [...new Set(planes.map((p) => p.categoria || "Planes"))];
                const DESCRIPCION_CAT = {
                  "Grupales": "Clases grupales en el centro: musculación, fuerza y potencia, yoga, pilates y el resto de las actividades grupales del horario. Con este plan reservás cualquiera de esas clases.",
                  "Personalizado en grupo": "Sesiones personalizadas en grupo reducido, con seguimiento y programa 100% personalizado para vos. Con este plan solo reservás las clases de personalizado (no las grupales sueltas)."
                };
                return categorias.map((cat) => (
                  <div className="campo" style={{ flexBasis: "100%" }} key={cat}>
                    <span>{cat}</span>
                    {DESCRIPCION_CAT[cat] ? <p className="cuest-cat-desc">{DESCRIPCION_CAT[cat]}</p> : null}
                    <div className="cuest-planes">
                      {planes.filter((p) => (p.categoria || "Planes") === cat).map((p) => (
                        <button type="button" key={p.id} className={"cuest-plan-op" + (f.planSolicitado === p.id ? " activo" : "")} onClick={() => set("planSolicitado", p.id)}>
                          <span className="cp-nom">{p.nombre.replace(cat + " — ", "")}</span>
                          <span className="cp-det">{p.tipo === "ilimitada" ? "Ilimitada" : p.creditos + " clases"} · ₡{(p.precio || 0).toLocaleString("es-CR")}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ));
              })()}
              {!f.planSolicitado ? <p className="hint">Podés elegir más tarde si todavía no estás seguro.</p> : null}
            </div>
          ) : null}

          {paso === 5 ? (
            <div className="cuest-campos">
              <label className="campo">
                <span>¿Algo más que tu coach deba saber?</span>
                <textarea autoFocus value={f.alertas} rows={4} onChange={(e) => set("alertas", e.target.value)} placeholder="Horarios, miedos, preferencias, condiciones médicas…"></textarea>
              </label>
              <div className="cuest-resumen">
                <div className="cr-fila"><span>Nombre</span><strong>{f.nombre || "—"}</strong></div>
                <div className="cr-fila"><span>Nivel</span><strong>{f.nivel || "—"}</strong></div>
                <div className="cr-fila"><span>Objetivo</span><strong>{f.objetivo || "—"}</strong></div>
                <div className="cr-fila"><span>Lesiones</span><strong>{f.lesiones.filter((l) => l.zona.trim()).length || "Ninguna"}</strong></div>
              </div>
            </div>
          ) : null}
        </div>

        <footer className="cuest-pie">
          {paso === 0 ? (
            <button className="btn-secundario" onClick={onCancelar}>Cancelar</button>
          ) : (
            <button className="btn-secundario" onClick={() => setPaso(paso - 1)}>← Atrás</button>
          )}
          {!esUltimo ? (
            <button className="btn-primario" disabled={!puedeSeguir()} onClick={() => setPaso(paso + 1)}>Siguiente →</button>
          ) : (
            <button className="btn-primario" disabled={!aceptaDeslinde} onClick={finalizar}>{persona && persona.ingresoCompleto ? "Guardar cambios" : "Finalizar ingreso"}</button>
          )}
        </footer>
      </div>
    </div>
  );
}

Object.assign(window, { CuestionarioIngreso });
