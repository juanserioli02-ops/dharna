// DHARMA — Estudio: manuales formativos para coaches.
// Landing (biblioteca de manuales) + Lector. El render de cada bloque
// vive en BloqueEstudio (vocabulario fijo → coherencia visual garantizada).

const EstudioCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-11"></path></svg>
);

/* ---------- render de un bloque de contenido ---------- */
function BloqueEstudio({ b }) {
  switch (b.tipo) {
    case "titulo": return <h3>{b.texto}</h3>;
    case "texto": return <p className={b.intro ? "intro" : ""}>{b.texto}</p>;
    case "clave": return (
      <div className="bk-clave"><div className="lbl">Concepto clave</div><p>{b.texto}</p></div>
    );
    case "lista": return (
      <ul className="bk-lista">{(b.items || []).map((x, i) => <li key={i}>{x}</li>)}</ul>
    );
    case "pasos": return (
      <ol className="bk-pasos">{(b.items || []).map((x, i) => <li key={i}><span className="paso-txt"><b>{x.titulo}</b> {x.texto}</span></li>)}</ol>
    );
    case "cita": return (
      <blockquote className="bk-cita"><div className="txt">“{b.texto}”</div>{b.autor ? <div className="autor">— {b.autor}</div> : null}</blockquote>
    );
    case "imagen": return (
      <figure className="bk-imagen"><image-slot id={b.slot} shape="rounded" radius="2" placeholder="Arrastrá una imagen"></image-slot>{b.epigrafe ? <figcaption className="cap">{b.epigrafe}</figcaption> : null}</figure>
    );
    case "video": return (
      <div className="bk-video"><div className="marco"><span className="play"><IconPlay size={22}></IconPlay></span></div>{b.epigrafe ? <div className="cap">{b.epigrafe}</div> : null}</div>
    );
    case "tabla": return (
      <div className="bk-tabla"><table><thead><tr>{(b.columnas || []).map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
        <tbody>{(b.filas || []).map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table></div>
    );
    case "resumen": return (
      <div className="bk-resumen"><div className="lbl">Para recordar</div><ul>{(b.items || []).map((x, i) => <li key={i}><EstudioCheck></EstudioCheck>{x}</li>)}</ul></div>
    );
    case "regla": return (
      <div className="bk-regla">
        <div className="bk-regla-num">Regla #{b.numero}</div>
        <div className="bk-regla-txt">“{b.texto}”</div>
        {b.autor ? <div className="bk-regla-autor">— {b.autor}</div> : null}
      </div>
    );
    case "preguntas": return <BloquePreguntasInteractivo b={b}></BloquePreguntasInteractivo>;
    default: return null;
  }
}

/* ---------- LANDING: biblioteca de manuales ---------- */
function Estudio({ manuales, categorias, onAbrir, onNuevo, onEditar, onEliminar, soloLectura }) {
  const [busqueda, setBusqueda] = React.useState("");
  const [menu, setMenu] = React.useState(null);
  const catDe = (id) => categorias.find((c) => c.id === id) || categorias[0] || { nombre: "—", color: "#489DA3" };
  const q = busqueda.trim().toLowerCase();
  const filtrados = q ? manuales.filter((m) => (m.titulo + " " + (m.descripcion || "")).toLowerCase().includes(q)) : manuales;
  const totalMin = manuales.reduce((s, m) => s + (m.modulos || []).reduce((a, mo) => a + (mo.lectura || 0), 0), 0);

  const marcaEstilo = window.DHARMA_MARCA ? { "--dharma-iso-white": "url(" + window.DHARMA_MARCA.isotipoNegro + ")" } : undefined;

  return (
    <main className="contenido" data-screen-label="Estudio — Manuales">
      <div className="est-hero" style={marcaEstilo}>
        <div className="et-eyebrow">Formación interna</div>
        <h1>Estudio</h1>
        <p className="et-sub">Manuales formativos para el equipo de coaches.</p>
        <div className="et-stats">
          <div className="et-stat"><div className="n">{manuales.length}</div><div className="l">Manuales</div></div>
          <div className="et-stat"><div className="n">{categorias.length}</div><div className="l">Categorías</div></div>
          <div className="et-stat"><div className="n">{totalMin}′</div><div className="l">De lectura</div></div>
        </div>
      </div>

      <div className="encabezado-vista" style={{ marginBottom: 22 }}>
        <div><h2 className="seccion-titulo" style={{ fontSize: 22 }}>Todos los manuales</h2></div>
        <div className="acciones-vista" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <label className="buscador">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>
            <input type="search" placeholder="Buscar manual…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}></input>
          </label>
          {soloLectura ? null : <button className="btn-primario" onClick={onNuevo}>+ Nuevo manual</button>}
        </div>
      </div>

      {categorias.map((cat) => {
        const lista = filtrados.filter((m) => m.categoria === cat.id);
        if (!lista.length) return null;
        return (
          <section className="biblio-seccion" key={cat.id}>
            <div className="seccion-cab">
              <div className="seccion-titulo-wrap">
                <h2 className="seccion-titulo">{cat.nombre}</h2>
                <span className="seccion-conteo">{lista.length}</span>
              </div>
            </div>
            <div className="est-grilla">
              {lista.map((m) => {
                const mins = (m.modulos || []).reduce((a, mo) => a + (mo.lectura || 0), 0);
                return (
                  <article key={m.id} className="est-tarjeta" style={{ "--cat": catDe(m.categoria).color }} onClick={() => onAbrir(m.id)} data-screen-label={"Manual — " + m.titulo}>
                    <div className="est-tarjeta-cuerpo">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <span className="est-tag">{catDe(m.categoria).nombre}</span>
                        <div className="est-menu-wrap" style={{ position: "relative" }}>
                          {soloLectura ? null : (<React.Fragment>
                          <button className="btn-icono" title="Opciones" onClick={(e) => { e.stopPropagation(); setMenu(menu === m.id ? null : m.id); }}><IconMenu></IconMenu></button>
                          {menu === m.id ? (
                            <div className="card-menu" onClick={(e) => e.stopPropagation()}>
                              <button onClick={() => { setMenu(null); onEditar(m.id); }}>Editar manual</button>
                              <div className="card-menu-sep"></div>
                              <button className="peligro" onClick={() => { setMenu(null); onEliminar(m.id); }}><IconX></IconX> Eliminar</button>
                            </div>
                          ) : null}
                          </React.Fragment>)}
                        </div>
                      </div>
                      <h3>{m.titulo}</h3>
                      <p className="est-desc">{m.descripcion}</p>
                    </div>
                    <div className="est-tarjeta-pie">
                      <span>{(m.modulos || []).length} módulos</span><span className="sep">·</span><span>{mins}′</span>
                      <span className="autor">{m.autor || "—"}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      {filtrados.length === 0 ? (
        <div className="seccion-vacia" style={{ marginTop: 8 }}>
          {q ? "No hay manuales que coincidan con la búsqueda." : "Todavía no hay manuales. Creá el primero."}
        </div>
      ) : null}
    </main>
  );
}

/* ---------- LECTOR ---------- */
function ManualLector({ manual, categorias, onVolver, onEditar, onProyectar }) {
  const m = manual;
  const cat = categorias.find((c) => c.id === m.categoria) || categorias[0] || { nombre: "—", color: "#489DA3" };
  const mods = m.modulos || [];
  const [activo, setActivo] = React.useState(0);
  const refs = React.useRef([]);
  const totalMin = mods.reduce((a, mo) => a + (mo.lectura || 0), 0);

  React.useEffect(() => { window.scrollTo(0, 0); }, [m.id]);
  React.useEffect(() => {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) setActivo(Number(e.target.dataset.idx)); });
    }, { rootMargin: "-80px 0px -65% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, [mods.length]);
  React.useEffect(() => {
    const nodes = refs.current.filter(Boolean);
    // marcar para animar SOLO los módulos que arrancan fuera de vista; los visibles quedan tal cual
    nodes.forEach((n) => { if (n.getBoundingClientRect().top > window.innerHeight * 0.9) n.classList.add("animar"); });
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.06 });
    nodes.forEach((n) => io.observe(n));
    // red de seguridad: pase lo que pase, nada queda oculto
    const t = setTimeout(() => nodes.forEach((n) => n.classList.add("visible")), 1500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [mods.length, m.id]);
  const ir = (i) => { const el = refs.current[i]; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" }); };

  return (
    <main className="contenido" data-screen-label={"Manual — " + m.titulo}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <button className="volver" onClick={onVolver}><IconChevronL size="0.9em"></IconChevronL> Estudio</button>
        <div style={{ display: "flex", gap: 10 }}>
          {onProyectar ? <button className="btn-proyectar-manual" onClick={() => onProyectar(m.id)}><IconPlay size={14}></IconPlay> Proyectar charla</button> : null}
          {onEditar ? <button className="btn-editar-clase" onClick={() => onEditar(m.id)}>Editar manual</button> : null}
        </div>
      </div>
      <header className="man-cabecera" style={{ "--cat": cat.color }}>
        <div>
          <span className="tag">{cat.nombre}</span>
          <h1>{m.titulo}</h1>
          <p className="man-sub">{m.descripcion}</p>
          <div className="man-meta">
            <span className="chip">{mods.length} módulos</span>
            <span className="chip">{totalMin}′ de lectura</span>
            <span className="chip">Autor · {m.autor || "—"}</span>
            {m.actualizado ? <span className="chip">Act. {m.actualizado}</span> : null}
          </div>
        </div>
        <image-slot id={"est-cover-" + m.id} className="man-cover" shape="rounded" radius="2" placeholder="Portada"></image-slot>
      </header>

      <div className="man-cuerpo">
        <nav className="man-toc">
          <div className="toc-titulo">Módulos</div>
          <ol>
            {mods.map((mod, i) => (
              <li key={i}><button className={i === activo ? "activo" : ""} onClick={() => ir(i)}><span className="toc-nombre">{mod.titulo}</span></button></li>
            ))}
          </ol>
          <div className="toc-prog">
            <div className="barra"><span style={{ width: (mods.length ? (activo + 1) / mods.length * 100 : 0) + "%" }}></span></div>
            <div className="lbl">Módulo {activo + 1} de {mods.length}</div>
          </div>
        </nav>

        <div className="man-lectura">
          {mods.map((mod, i) => (
            <section className="man-modulo" key={i} data-idx={i} ref={(el) => (refs.current[i] = el)}>
              <div className="man-modulo-cab">
                <span className="man-modulo-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="man-modulo-tit"><h2>{mod.titulo}</h2>{mod.lectura ? <div className="lectura">{mod.lectura}′ de lectura</div> : null}</div>
              </div>
              {(mod.bloques || []).map((b, j) => <BloqueEstudio b={b} key={j}></BloqueEstudio>)}
              <div className="man-pager" style={{ marginTop: 40 }}>
                {i > 0 ? <button onClick={() => ir(i - 1)}><span className="dir">← Anterior</span><span className="nom">{mods[i - 1].titulo}</span></button> : <button disabled></button>}
                {i < mods.length - 1 ? <button className="sig" onClick={() => ir(i + 1)}><span className="dir">Siguiente →</span><span className="nom">{mods[i + 1].titulo}</span></button> : <button className="sig" disabled></button>}
              </div>
            </section>
          ))}
          <QuizCierre manual={m}></QuizCierre>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { Estudio, ManualLector, BloqueEstudio });
