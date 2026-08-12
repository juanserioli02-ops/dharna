// DHARMA — Economía: importa el .xlsx de balance/gastos del centro y arma un dashboard.
// Parser de XLSX 100% en el navegador (zip + inflate + XML), sin librerías externas —
// la app tiene que seguir funcionando offline. Se sube el archivo entero cada vez que
// se actualiza (reemplaza todo lo anterior). Todo lo demás (membresías, altas/bajas)
// sale en vivo de los datos reales de Personas — nunca del Excel.
const ECO_CLAVE = "dharma-economia-v1";
const ECO_MESES_NOMBRE = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function ecoLeer() { try { const v = JSON.parse(localStorage.getItem(ECO_CLAVE)); return v || null; } catch (e) { return null; } }
function ecoGuardar(v) { try { localStorage.setItem(ECO_CLAVE, JSON.stringify(v)); } catch (e) {} }

function ecoSerialAFecha(serial) {
  // fecha base de Excel: 1899-12-30 (para no chocar con el bug del año bisiesto 1900)
  const ms = Math.round((Number(serial) - 25569) * 86400 * 1000);
  return new Date(ms);
}
function ecoLabelMes(serial) { const d = ecoSerialAFecha(serial); return ECO_MESES_NOMBRE[d.getUTCMonth()] + " " + d.getUTCFullYear(); }

/* ---------- parser ZIP + inflate (mínimo, solo lo que necesita un .xlsx) ---------- */
function ecoU32(a, o) { return a[o] | (a[o + 1] << 8) | (a[o + 2] << 16) | (a[o + 3] << 24); }
function ecoU16(a, o) { return a[o] | (a[o + 1] << 8); }

async function ecoDescomprimirXlsx(arrayBuffer) {
  const buf = new Uint8Array(arrayBuffer);
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i--) { if (buf[i] === 0x50 && buf[i + 1] === 0x4b && buf[i + 2] === 0x05 && buf[i + 3] === 0x06) { eocd = i; break; } }
  if (eocd < 0) throw new Error("Archivo no reconocido como .xlsx");
  const cdOffset = ecoU32(buf, eocd + 16);
  const cdCount = ecoU16(buf, eocd + 10);
  let p = cdOffset;
  const entries = [];
  for (let i = 0; i < cdCount; i++) {
    if (ecoU32(buf, p) !== 0x02014b50) break;
    const compMethod = ecoU16(buf, p + 10);
    const compSize = ecoU32(buf, p + 20);
    const nameLen = ecoU16(buf, p + 28);
    const extraLen = ecoU16(buf, p + 30);
    const commentLen = ecoU16(buf, p + 32);
    const localHeaderOffset = ecoU32(buf, p + 42);
    const name = new TextDecoder().decode(buf.slice(p + 46, p + 46 + nameLen));
    entries.push({ name, compMethod, compSize, localHeaderOffset });
    p += 46 + nameLen + extraLen + commentLen;
  }
  async function extraer(nombre) {
    const e = entries.find((x) => x.name === nombre);
    if (!e) return null;
    const lp = e.localHeaderOffset;
    const lNameLen = ecoU16(buf, lp + 26);
    const lExtraLen = ecoU16(buf, lp + 28);
    const dataStart = lp + 30 + lNameLen + lExtraLen;
    const raw = buf.slice(dataStart, dataStart + e.compSize);
    if (e.compMethod === 0) return new TextDecoder().decode(raw);
    const ds = new DecompressionStream("deflate-raw");
    const stream = new Blob([raw]).stream().pipeThrough(ds);
    const out = await new Response(stream).arrayBuffer();
    return new TextDecoder().decode(out);
  }
  return { extraer, entries };
}

function ecoColIdx(col) { let n = 0; for (const c of col) n = n * 26 + (c.charCodeAt(0) - 64); return n - 1; }

function ecoParsearHoja(xml, sst) {
  if (!xml) return [];
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const filas = [...doc.getElementsByTagName("row")];
  const grilla = [];
  for (const fila of filas) {
    const ri = parseInt(fila.getAttribute("r"), 10) - 1;
    const celdas = [...fila.getElementsByTagName("c")];
    const arr = [];
    for (const c of celdas) {
      const ref = c.getAttribute("r");
      const m = ref.match(/[A-Z]+/);
      if (!m) continue;
      const ci = ecoColIdx(m[0]);
      const t = c.getAttribute("t");
      const vNode = c.getElementsByTagName("v")[0];
      const isNode = c.getElementsByTagName("is")[0];
      let val = "";
      if (t === "s" && vNode) val = sst[parseInt(vNode.textContent, 10)] || "";
      else if (t === "str" && vNode) val = vNode.textContent;
      else if (t === "inlineStr" && isNode) val = [...isNode.getElementsByTagName("t")].map((tt) => tt.textContent).join("");
      else if (vNode) val = vNode.textContent;
      arr[ci] = val;
    }
    grilla[ri] = arr;
  }
  return grilla;
}

const ECO_HOJAS = { resumen: "xl/worksheets/sheet1.xml", caja: "xl/worksheets/sheet2.xml", sueldos: "xl/worksheets/sheet3.xml", horas: "xl/worksheets/sheet4.xml", precios: "xl/worksheets/sheet5.xml", ingresosServ: "xl/worksheets/sheet7.xml", ingresosProd: "xl/worksheets/sheet8.xml", gastos: "xl/worksheets/sheet9.xml", egresos: "xl/worksheets/sheet10.xml" };

/* ---------- extractores por hoja ---------- */
// Resumen: fila1 = meses (serial) desde col1; filas 3.. = categoría + valores por mes; fila3 = total
function ecoExtraerResumen(g) {
  if (!g[1]) return { meses: [], porCategoria: [], totalPorMes: [] };
  const meses = [];
  for (let c = 1; c < g[1].length; c++) { if (g[1][c]) meses.push({ col: c, serial: g[1][c], label: ecoLabelMes(g[1][c]) }); }
  const totalPorMes = meses.map((m) => Number(g[3] && g[3][m.col]) || 0);
  const porCategoria = [];
  for (let r = 4; r < g.length; r++) {
    const fila = g[r]; if (!fila || !fila[0]) continue;
    if (/^gastos totales$/i.test(fila[0].toString().trim())) break; // fin de la sección de ingresos; lo que sigue es el desglose de gastos/egresos
    porCategoria.push({ nombre: fila[0], valores: meses.map((m) => Number(fila[m.col]) || 0) });
  }
  return { meses, totalPorMes, porCategoria };
}

// Control de caja: fila1 desde col2 = meses; ingresos totales fila3, efectivo fila4, one fila5, lafise fila6; gastos totales fila10, efectivo fila11, lafise fila12
function ecoExtraerCaja(g) {
  if (!g[1]) return { meses: [], ingresos: {}, gastos: {} };
  const meses = [];
  for (let c = 2; c < g[1].length; c++) { if (g[1][c]) meses.push({ col: c, serial: g[1][c], label: ecoLabelMes(g[1][c]) }); }
  const fila = (idx) => meses.map((m) => Number(g[idx] && g[idx][m.col]) || 0);
  return {
    meses,
    ingresos: { total: fila(3), efectivo: fila(4), oneLat: fila(5), lafise: fila(6) },
    gastos: { total: fila(10), efectivo: fila(11), lafise: fila(12) }
  };
}

// Sueldos: bloques por profesor — fila con SOLO el nombre en col0 (el resto de la fila vacía),
// seguida de filas "Hora ..." y una fila "Total" con los montos por mes.
function ecoExtraerSueldos(g) {
  if (!g[2]) return { meses: [], porProfesor: [] };
  const meses = [];
  for (let c = 2; c < g[2].length; c++) { if (g[2][c]) meses.push({ col: c, serial: g[2][c], label: ecoLabelMes(g[2][c]) }); }
  const filaVacia = (fila, saltarIdx) => !fila || fila.every((v, i) => i === saltarIdx || v === undefined || v === null || v.toString().trim() === "");
  const porProfesor = [];
  let actual = null;
  for (let r = 4; r < g.length; r++) {
    const fila = g[r] || [];
    const c0 = (fila[0] || "").toString().trim();
    if (!c0) { continue; }
    if (c0 === "Total" && actual) { porProfesor.push({ nombre: actual, valores: meses.map((m) => Number(fila[m.col]) || 0) }); actual = null; continue; }
    if (!c0.startsWith("Hora") && c0 !== "Total" && filaVacia(fila, 0)) { actual = c0; }
  }
  return { meses, porProfesor };
}

// Horas profes (log crudo): col0 Mes, col3 Profesor/a, col4 Actividad, col5 Horas trabajadas
function ecoExtraerHoras(g) {
  const filas = [];
  for (let r = 1; r < g.length; r++) {
    const f = g[r]; if (!f || !f[3] || f[5] === undefined || f[5] === "") continue;
    const horas = Number(f[5]); if (!horas) continue;
    filas.push({ mes: Number(f[0]), profesor: f[3], actividad: f[4] || "Sin actividad", horas });
  }
  return filas;
}

// Gastos (log crudo): col0 Mes, col4 Monto, col5 Método de pago, col6 Categoría
function ecoExtraerGastos(g) {
  const filas = [];
  for (let r = 1; r < g.length; r++) {
    const f = g[r]; if (!f || f[4] === undefined || f[4] === "" || f[0] === undefined || f[0] === "") continue;
    const monto = Number(f[4]); if (!monto) continue;
    filas.push({ mes: Number(f[0]), monto, metodo: f[5] || "Otro", categoria: f[6] || "Sin categoría", proveedor: f[8] || "" });
  }
  return filas;
}

async function ecoProcesarArchivo(file) {
  const buf = await file.arrayBuffer();
  const { extraer } = await ecoDescomprimirXlsx(buf);
  const sharedXml = await extraer("xl/sharedStrings.xml");
  let sst = [];
  if (sharedXml) {
    const sdoc = new DOMParser().parseFromString(sharedXml, "text/xml");
    sst = [...sdoc.getElementsByTagName("si")].map((si) => [...si.getElementsByTagName("t")].map((t) => t.textContent).join(""));
  }
  const grillas = {};
  for (const [clave, ruta] of Object.entries(ECO_HOJAS)) { grillas[clave] = ecoParsearHoja(await extraer(ruta), sst); }
  const resumen = ecoExtraerResumen(grillas.resumen);
  const caja = ecoExtraerCaja(grillas.caja);
  const sueldos = ecoExtraerSueldos(grillas.sueldos);
  const horasLog = ecoExtraerHoras(grillas.horas);
  const gastosLog = ecoExtraerGastos(grillas.gastos);
  const categoriasGastos = [...new Set(gastosLog.map((f) => f.categoria))];
  const datos = { subidoEn: new Date().toISOString(), nombreArchivo: file.name, resumen, caja, sueldos, horasLog, gastosLog, categoriasGastos };
  ecoGuardar(datos);
  return datos;
}

// gastos por categoría dentro de un mes (índice de mes en caja.meses, matcheado por número "Mes" del log = col+1 del serial... el log usa el número de mes calendario 1-12)
function ecoGastosPorCategoriaEnMes(datos, mesSerial) {
  if (!datos) return [];
  const mesNum = ecoSerialAFecha(mesSerial).getUTCMonth() + 1;
  const porCat = {};
  datos.gastosLog.forEach((f) => { if (f.mes === mesNum) porCat[f.categoria] = (porCat[f.categoria] || 0) + f.monto; });
  return Object.entries(porCat).map(([nombre, monto]) => ({ nombre, monto })).sort((a, b) => b.monto - a.monto);
}

// horas trabajadas por profesor (y por actividad) dentro de un mes
function ecoHorasPorProfesorEnMes(datos, mesSerial) {
  if (!datos) return [];
  const mesNum = ecoSerialAFecha(mesSerial).getUTCMonth() + 1;
  const porProf = {};
  (datos.horasLog || []).forEach((f) => {
    if (f.mes !== mesNum) return;
    if (!porProf[f.profesor]) porProf[f.profesor] = { nombre: f.profesor, total: 0, porActividad: {} };
    porProf[f.profesor].total += f.horas;
    porProf[f.profesor].porActividad[f.actividad] = (porProf[f.profesor].porActividad[f.actividad] || 0) + f.horas;
  });
  return Object.values(porProf).sort((a, b) => b.total - a.total);
}

// registro propio: suma los pagos que ya se cargan en Personas → Membresías (fuente de verdad
// interna) para el mes calendario del serial dado — para comparar contra el Excel del centro.
function ecoTotalDharmaEnMes(socios, mesSerial) {
  if (!socios) return { total: 0, cantidad: 0 };
  const d = ecoSerialAFecha(mesSerial);
  const anio = d.getUTCFullYear(), mes = d.getUTCMonth();
  let total = 0, cantidad = 0;
  Object.values(socios).forEach((sub) => {
    (sub.pagos || []).forEach((pg) => {
      const f = new Date(pg.fecha + "T00:00:00");
      if (f.getUTCFullYear() === anio && f.getUTCMonth() === mes) { total += Number(pg.monto) || 0; cantidad++; }
    });
  });
  return { total, cantidad };
}

window.Economia = {
  CLAVE: ECO_CLAVE, leer: ecoLeer, procesarArchivo: ecoProcesarArchivo, gastosPorCategoriaEnMes: ecoGastosPorCategoriaEnMes, horasPorProfesorEnMes: ecoHorasPorProfesorEnMes, labelMes: ecoLabelMes, totalDharmaEnMes: ecoTotalDharmaEnMes
};
