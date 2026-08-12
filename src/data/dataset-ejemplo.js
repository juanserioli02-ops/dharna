// DHARMA — datos de ejemplo (gestión interna, fase 1)
// DATASET DE PRUEBA: 1 clase + 1 cliente, para iterar sin tocar info real.

window.DHARMA_DATA = {
  personas: [
      { id: "p_evo_ro_fernandez_119", nombre: "Ro Fernandez", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_ari_puente_124", nombre: "Ari Puente", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_belu_medina_125", nombre: "Belu Medina", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_dai_valverde_porras_129", nombre: "Dai Valverde Porras", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_luna_martinez_133", nombre: "Luna Martinez", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_nacho_holst_135", nombre: "Nacho Holst", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_omri_goren_136", nombre: "Omri Goren", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_facu_gorosito_137", nombre: "Facu Gorosito", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_nico_lescano_143", nombre: "Nico Lescano", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_maqui_fioretti_145", nombre: "Maqui Fioretti", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_seba_tabak_156", nombre: "Seba Tabak", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_cami_ferrari_157", nombre: "Cami Ferrari", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_mai_bartozetti_165", nombre: "Mai Bartozetti", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_natalia_diaz_167", nombre: "Natalia Diaz", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_aura_dinarte_170", nombre: "Aura Dinarte", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_maruchi_perez_175", nombre: "Maruchi Perez", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_sol_soaje_177", nombre: "Sol Soaje", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_lea_tucs_184", nombre: "Lea Tucs", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_soledad_garcia_201", nombre: "Soledad Garcia", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_juani_alberti_212", nombre: "Juani Alberti", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_vicky_luna_216", nombre: "Vicky Luna", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_meli_cittadella_351", nombre: "Meli Cittadella", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_cata_monti_373", nombre: "Cata Monti", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_vicky_maffrand_381", nombre: "Vicky Maffrand", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    { id: "p_evo_augusto_pollo_421", nombre: "Augusto Pollo", activo: true, ingresoCompleto: true, nivel: "Inicial", grupo: null, clases: [] },
    {
      id: "p1", nombre: "Cliente de prueba", nivel: "Intermedio", sexo: "Mujer",
      objetivo: "Ganar fuerza general y mejorar postura",
      edad: 34, experiencia: "2 años entrenando · antes pilates",
      tipoTrabajo: "Diseñadora — escritorio, muchas horas sentada",
      deporte: "Trekking los fines de semana",
      doloresFrecuentes: ["Cervical y trapecios al final del día"],
      alertas: "Cuidar volumen sobre la rodilla operada. Muy constante y autoexigente.",
      lesiones: [
        { zona: "Rodilla izquierda", detalle: "Menisco operado (2024)", adaptacion: "Sin saltos · sentadilla a cajón" }
      ],
      metricas: [
        { nombre: "Sentadilla", valor: "72 kg", delta: "+6 kg este mes" },
        { nombre: "Peso muerto", valor: "88 kg", delta: "+4 kg este mes" }
      ],
      asistencia: { mes: 11, racha: 4 },
      grupo: "g_personalizados",
      wellness: [
        { fecha: "2026-06-12", sueno: "7.5", suenoCal: 4, energia: 4, animo: 4, dolor: 2, estres: 2, notas: "" },
        { fecha: "2026-06-11", sueno: "7", suenoCal: 4, energia: 4, animo: 4, dolor: 2, estres: 2, notas: "" },
        { fecha: "2026-06-10", sueno: "8", suenoCal: 5, energia: 4, animo: 5, dolor: 1, estres: 2, notas: "" }
      ],
      notas: [
        { fecha: "03 Jun", texto: "Muy buena técnica en bisagra de cadera. Subir carga en peso muerto la próxima semana." },
        { fecha: "21 May", texto: "Molestia leve en rodilla al bajar profundo: mantener sentadilla a cajón 2 semanas más." }
      ],
      clases: ["fyp_mardelplata"],
      proceso: {
        nombre: "Proceso — Fuerza + cuidado de rodilla",
        objetivo: "Construir fuerza de tren inferior sin estresar la rodilla operada, y descargar la cervical. Bloque de 4 semanas con descarga en la semana 4.",
        semanas: 4,
        sesiones: [
          {
            nombre: "Sesión 1 — Tren inferior",
            bloques: [
              {
                nombre: "Core / Activación",
                items: [
                  { codigo: "A", ej: "Gato bueno gato malo con banda", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] },
                  { codigo: "B", ej: "90/90 a extensión", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] },
                  { codigo: "C", ej: "Sentadilla lateral con clavas", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Fuerza / Potencia",
                items: [
                  { codigo: "A1", ej: "Sentadilla a cajón", semanas: [{ sxr: "4x6", kg: "50", rpe: "8" }, { sxr: "4x6", kg: "55", rpe: "8" }, { sxr: "4x5", kg: "", rpe: "" }, { sxr: "3x5", kg: "", rpe: "" }] },
                  { codigo: "A2", ej: "Peso muerto rumano c/ mancuernas", semanas: [{ sxr: "4x8", kg: "40", rpe: "7.5" }, { sxr: "4x8", kg: "44", rpe: "8" }, { sxr: "4x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "B1", ej: "Empuje de cadera (hip thrust)", semanas: [{ sxr: "3x10", kg: "60", rpe: "8" }, { sxr: "3x10", kg: "65", rpe: "8" }, { sxr: "3x8", kg: "", rpe: "" }, { sxr: "3x8", kg: "", rpe: "" }] },
                  { codigo: "B2", ej: "Remo en anillas", semanas: [{ sxr: "3x10", kg: "", rpe: "7" }, { sxr: "3x10", kg: "", rpe: "7" }, { sxr: "3x10", kg: "", rpe: "" }, { sxr: "3x10", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Auxiliar",
                items: [
                  { codigo: "A1", ej: "Face pull con banda", semanas: [{ sxr: "3x15", kg: "", rpe: "" }, { sxr: "3x15", kg: "", rpe: "" }, { sxr: "3x15", kg: "", rpe: "" }, { sxr: "3x15", kg: "", rpe: "" }] },
                  { codigo: "B1", ej: "Plancha lateral", semanas: [{ sxr: "3x30s", kg: "", rpe: "" }, { sxr: "3x35s", kg: "", rpe: "" }, { sxr: "3x40s", kg: "", rpe: "" }, { sxr: "3x40s", kg: "", rpe: "" }] }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      id: "p_gonzalo_ovies", nombre: "Gonzalo Ovies", email: "gonzaovies@gmail.com", edad: 32, nivel: "Inicial", ingresoCompleto: true, activo: true, grupo: "g_personalizados",
      clases: [],
      proceso: {
        nombre: "Proceso — Gonzalo Ovies", objetivo: "", semanas: 4,
        sesiones: [
          {
            id: "S1", nombre: "Sesión 1",
            bloques: [
              {
                nombre: "Core / Activación",
                items: [
                  { codigo: "A", ej: "Gato bueno gato malo con banda", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "3" }] },
                  { codigo: "B", ej: "Seguir el dedo un pie", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "3" }] },
                  { codigo: "C", ej: "Giros de cabeza ojos cerrados", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "3" }] }
                ]
              },
              {
                nombre: "Fuerza / Potencia",
                items: [
                  { codigo: "A1", ej: "Landmine anti rotación split", semanas: [{ sxr: "2x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "3" }] },
                  { codigo: "B1", ej: "Sentadilla Zercher (antebrazo)", semanas: [{ sxr: "3x4", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "3" }] },
                  { codigo: "B2", ej: "Dominada sentadilla TRX", semanas: [{ sxr: "3x5", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "3" }] },
                  { codigo: "C1", ej: "Empuje vertical 1 mano parado", semanas: [{ sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "3" }] },
                  { codigo: "C2", ej: "Sentadilla lateral deslizador peso abajo", semanas: [{ sxr: "3x6", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Auxiliar",
                items: [
                  { codigo: "A1", ej: "Peso muerto un pie asistido", semanas: [{ sxr: "3x6", kg: "45l", rpe: "" }, { sxr: "2x10", kg: "", rpe: "" }, { sxr: "2x10", kg: "", rpe: "" }, { sxr: "2x10", kg: "", rpe: "3" }] },
                  { codigo: "B1", ej: "Empuje en puente mancuernas", semanas: [{ sxr: "3x8", kg: "35l", rpe: "" }, { sxr: "2x10", kg: "", rpe: "" }, { sxr: "2x10", kg: "", rpe: "" }, { sxr: "2x10", kg: "", rpe: "3" }] }
                ]
              }
            ]
          },
          {
            id: "S2", nombre: "Sesión 2",
            bloques: [
              {
                nombre: "Core / Activación",
                items: [
                  { codigo: "A", ej: "Técnica peso muerto con bastón", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "3" }, { sxr: "2x8", kg: "", rpe: "3" }, { sxr: "2x8", kg: "", rpe: "3" }] },
                  { codigo: "B", ej: "Perro pasa pesa", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "3" }, { sxr: "2x8", kg: "", rpe: "3" }, { sxr: "2x8", kg: "", rpe: "3" }] },
                  { codigo: "C", ej: "Plancha lateral dinámica 2 niveles", semanas: [{ sxr: "2x10", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "3" }, { sxr: "2x8", kg: "", rpe: "3" }, { sxr: "2x8", kg: "", rpe: "3" }] }
                ]
              },
              {
                nombre: "Fuerza / Potencia",
                items: [
                  { codigo: "A1", ej: "Transporte granjero hexagonal", semanas: [{ sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }] },
                  { codigo: "A2", ej: "Remo en puente TRX", semanas: [{ sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }] },
                  { codigo: "B1", ej: "Peso muerto dividido mancuerna", semanas: [{ sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }] },
                  { codigo: "B2", ej: "Empuje en puente mancuernas", semanas: [{ sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }] },
                  { codigo: "C1", ej: "Sentadilla explosiva landmine", semanas: [{ sxr: "3x8", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }] }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      id: "p_alin", nombre: "Alin", grupo: "g_personalizados",
      objetivo: "Estética - Salud",
      clases: [],
      proceso: {
        nombre: "Proceso — Alin", objetivo: "", semanas: 4,
        sesiones: [
          {
            id: "S1", nombre: "Sesión 1",
            bloques: [
              {
                nombre: "Core / Activación",
                items: [
                  { codigo: "A", ej: "TRX plank roll out", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] },
                  { codigo: "B", ej: "Bicho muerto 1 pie con disco", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] },
                  { codigo: "C", ej: "Plancha lateral dinámica 2 niveles", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Fuerza / Potencia",
                items: [
                  { codigo: "A1", ej: "Sentadilla búlgara mancuerna", semanas: [{ sxr: "4x8", kg: "40-50l", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "A2", ej: "Remo una mano TRX", semanas: [{ sxr: "2x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "B1", ej: "Hip thrust", semanas: [{ sxr: "3x4", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "B2", ej: "Press de hombro una mano sentada", semanas: [{ sxr: "3x5", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "C1", ej: "Abducción de cadera", semanas: [{ sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "C2", ej: "Rodillas al pecho en barra combinado", semanas: [{ sxr: "3x6", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Auxiliar",
                items: [
                  { codigo: "A1", ej: "Abducción de cadera sentado con banda", semanas: [{ sxr: "3x6", kg: "", rpe: "" }, { sxr: "2x10", kg: "", rpe: "" }, { sxr: "2x10", kg: "", rpe: "" }, { sxr: "2x10", kg: "", rpe: "" }] }
                ]
              }
            ]
          },
          {
            id: "S2", nombre: "Sesión 2",
            bloques: [
              {
                nombre: "Core / Activación",
                items: [
                  { codigo: "A", ej: "Perro volador", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "3" }, { sxr: "2x8", kg: "", rpe: "3" }, { sxr: "2x8", kg: "", rpe: "" }] },
                  { codigo: "B", ej: "Transporte combinado mesero + valija", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "3" }, { sxr: "2x8", kg: "", rpe: "3" }, { sxr: "2x8", kg: "", rpe: "" }] },
                  { codigo: "C", ej: "Sentadilla lateral cosaca", semanas: [{ sxr: "2x10", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "3" }, { sxr: "2x8", kg: "", rpe: "3" }, { sxr: "2x8", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Fuerza / Potencia",
                items: [
                  { codigo: "A", ej: "Podio bajada cruzada", semanas: [{ sxr: "4x6/8", kg: "", rpe: "" }, { sxr: "4x8", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "A2", ej: "Dominada asistida con banda", semanas: [{ sxr: "4x5/6", kg: "", rpe: "" }, { sxr: "4x5/6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "B1", ej: "Peso muerto convencional con barra", semanas: [{ sxr: "4x8", kg: "105L", rpe: "" }, { sxr: "4x8", kg: "115L", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "B2", ej: "Fuerza de brazo", semanas: [{ sxr: "4x6", kg: "", rpe: "" }, { sxr: "4x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "3" }, { sxr: "3x6", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Auxiliar",
                items: [
                  { codigo: "A1", ej: "Sentadilla a 1 pierna con pelota suiza", semanas: [{ sxr: "3x8", kg: "", rpe: "" }, { sxr: "2x10", kg: "", rpe: "3" }, { sxr: "2x10", kg: "", rpe: "3" }, { sxr: "2x10", kg: "", rpe: "" }] },
                  { codigo: "B1", ej: "Sumo con mancuerna", semanas: [{ sxr: "3x12", kg: "", rpe: "" }, { sxr: "2x10", kg: "", rpe: "3" }, { sxr: "2x10", kg: "", rpe: "3" }, { sxr: "2x10", kg: "", rpe: "" }] }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      id: "p_dani_hollander", nombre: "Dani Hollander", grupo: "g_personalizados",
      clases: [],
      proceso: {
        nombre: "Proceso — Dani Hollander", objetivo: "", semanas: 4,
        sesiones: [
          {
            id: "S1", nombre: "Sesión 1",
            bloques: [
              {
                nombre: "Core / Activación",
                items: [
                  { codigo: "A", ej: "Respiración 90 grados en pared", semanas: [{ sxr: "1x10", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] },
                  { codigo: "B", ej: "Respiración váscula de pelvis en pared", semanas: [{ sxr: "1x10", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] },
                  { codigo: "C", ej: "Respiración 90 grados pared elevando pelvis", semanas: [{ sxr: "1x10", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Fuerza / Potencia",
                items: [
                  { codigo: "A1", ej: "Bicho muerto con banda a 1 pie", semanas: [{ sxr: "2x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "A2", ej: "Transporte combinado mesero + valija", semanas: [{ sxr: "2x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "B1", ej: "Remo en puente TRX", semanas: [{ sxr: "4x8", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "B2", ej: "Peso muerto dividido mancuerna", semanas: [{ sxr: "4x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "C1", ej: "Sentadilla trap", semanas: [{ sxr: "4x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "C2", ej: "Fuerza de brazo 3 niveles iniciales", semanas: [{ sxr: "4x6", kg: "", rpe: "" }] }
                ]
              }
            ]
          },
          {
            id: "S2", nombre: "Sesión 2",
            bloques: [
              {
                nombre: "Core / Activación",
                items: [
                  { codigo: "A", ej: "Respiración 90 grados en pared", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] },
                  { codigo: "B", ej: "Respiración váscula de pelvis en pared", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] },
                  { codigo: "C", ej: "Respiración 90 grados pared elevando pelvis", semanas: [{ sxr: "2x10", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Fuerza / Potencia",
                items: [
                  { codigo: "A", ej: "Caminata en puente", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "A2", ej: "Bicho muerto con pelota suiza", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "B1", ej: "Sumo con mancuerna", semanas: [{ sxr: "4x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "B2", ej: "Empuje vertical 1 mano + mano en la pared arrodillado", semanas: [{ sxr: "4x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "C1", ej: "Remo gorila", semanas: [{ sxr: "4x8", kg: "", rpe: "" }, { sxr: "4x8", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "C2", ej: "Sentadilla pelota suiza 2x1", semanas: [{ sxr: "4x6", kg: "", rpe: "" }, { sxr: "4x6", kg: "", rpe: "" }] }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      id: "p_tomas_king", nombre: "Tomas King", grupo: "g_personalizados",
      clases: [],
      proceso: {
        nombre: "Proceso — Tomas King", objetivo: "", semanas: 4,
        sesiones: [
          {
            id: "M2D1", nombre: "Mes 2 · Día 1",
            bloques: [
              {
                nombre: "Bloque A",
                items: [
                  { codigo: "A1", ej: "Respiracion 90° con bloque", semanas: [{ sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] },
                  { codigo: "A2", ej: "Vascula pelvis con bloque", semanas: [{ sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] },
                  { codigo: "A3", ej: "Rotacion torax doble bloque", semanas: [{ sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque B",
                items: [
                  { codigo: "B1", ej: "Colgado barra 1mano + compresion", semanas: [{ sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] },
                  { codigo: "B2", ej: "Clavas vuelta al mundo 1pie", semanas: [{ sxr: "1x10", kg: "6k", rpe: "" }, { sxr: "1x10", kg: "10k", rpe: "" }, { sxr: "1x10", kg: "10k", rpe: "" }, { sxr: "1x10", kg: "10k", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque C",
                items: [
                  { codigo: "C1", ej: "Cambio de cadera + paso adelante clava", semanas: [{ sxr: "2x5", kg: "10k", rpe: "" }, { sxr: "2x5", kg: "10k", rpe: "" }, { sxr: "2x5", kg: "10k", rpe: "" }, { sxr: "2x5", kg: "10k", rpe: "" }] },
                  { codigo: "C2", ej: "Perro volador rodillas al aire", semanas: [{ sxr: "2x5", kg: "", rpe: "" }, { sxr: "2x5", kg: "", rpe: "" }, { sxr: "2x5", kg: "", rpe: "" }, { sxr: "2x5", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque D",
                items: [
                  { codigo: "D1", ej: "Iso catch estocada", semanas: [{ sxr: "3x2", kg: "95l", rpe: "" }, { sxr: "2x3", kg: "95l", rpe: "" }, { sxr: "3x3", kg: "95l", rpe: "" }, { sxr: "3x3", kg: "95l", rpe: "" }] },
                  { codigo: "D2", ej: "Lanzamiento rotacional 1mano 180", semanas: [{ sxr: "3x5", kg: "5k", rpe: "" }, { sxr: "2x5", kg: "8k", rpe: "" }, { sxr: "3x6", kg: "8k", rpe: "" }, { sxr: "3x6", kg: "8k", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque E",
                items: [
                  { codigo: "E1", ej: "Salto sentadilla trap bar", semanas: [{ sxr: "2x2", kg: "95l", rpe: "" }, { sxr: "3x3", kg: "95l", rpe: "" }, { sxr: "3x3", kg: "95l", rpe: "" }, { sxr: "2x3", kg: "105l", rpe: "" }] },
                  { codigo: "E2", ej: "Salto asistido banda cmj", semanas: [{ sxr: "2x5", kg: "", rpe: "" }, { sxr: "3x4", kg: "", rpe: "" }, { sxr: "3x5", kg: "", rpe: "" }, { sxr: "2x5", kg: "", rpe: "" }] },
                  { codigo: "E3", ej: "Push up a step", semanas: [{ sxr: "2x4", kg: "", rpe: "" }, { sxr: "3x4", kg: "", rpe: "" }, { sxr: "3x4", kg: "", rpe: "" }, { sxr: "2x4", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque F",
                items: [
                  { codigo: "F1", ej: "Bajada podio lateral", semanas: [{ sxr: "3x4", kg: "8k", rpe: "" }, { sxr: "3x5", kg: "8k", rpe: "" }, { sxr: "3x6", kg: "8k", rpe: "" }, { sxr: "3x4", kg: "8k", rpe: "" }] },
                  { codigo: "F2", ej: "Remo 1mano trx acostado", semanas: [{ sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }] },
                  { codigo: "F3", ej: "Press 1mano", semanas: [{ sxr: "3x6", kg: "50l", rpe: "" }, { sxr: "3x6", kg: "50l", rpe: "" }, { sxr: "3x6", kg: "50l", rpe: "" }, { sxr: "3x6", kg: "50l", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque G",
                items: [
                  { codigo: "G1", ej: "Curl isquio deslizador", semanas: [{ sxr: "2x6", kg: "", rpe: "" }, { sxr: "2x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "2x6", kg: "", rpe: "" }] },
                  { codigo: "G2", ej: "Copenague", semanas: [{ sxr: "2x15\"", kg: "", rpe: "" }, { sxr: "2x15\"", kg: "", rpe: "" }, { sxr: "2x15\"", kg: "", rpe: "" }, { sxr: "2x15\"", kg: "", rpe: "" }] }
                ]
              }
            ]
          },
          {
            id: "M2D2", nombre: "Mes 2 · Día 2",
            bloques: [
              {
                nombre: "Bloque A",
                items: [
                  { codigo: "A1", ej: "Respiracion 90° con bloque", semanas: [{ sxr: "1x30\"", kg: "", rpe: "" }, { sxr: "1x30\"", kg: "", rpe: "" }, { sxr: "1x30\"", kg: "", rpe: "" }, { sxr: "1x30\"", kg: "", rpe: "" }] },
                  { codigo: "A2", ej: "Vascula pelvis con bloque", semanas: [{ sxr: "1x20", kg: "", rpe: "" }, { sxr: "1x20", kg: "", rpe: "" }, { sxr: "1x20", kg: "", rpe: "" }, { sxr: "1x20", kg: "", rpe: "" }] },
                  { codigo: "A3", ej: "Rotacion torax doble bloque", semanas: [{ sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque B",
                items: [
                  { codigo: "B1", ej: "Colgado 1m trx/ barra + compresion", semanas: [{ sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] },
                  { codigo: "B2", ej: "Respiracion con banda pared bilateral abajo", semanas: [{ sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque C",
                items: [
                  { codigo: "C1", ej: "Lanzamiento pecho sentadilla lateral", semanas: [{ sxr: "2x5", kg: "6k", rpe: "" }, { sxr: "2x6", kg: "4k", rpe: "" }, { sxr: "2x6", kg: "4k", rpe: "" }, { sxr: "2x6", kg: "6k", rpe: "" }] },
                  { codigo: "C2", ej: "Caida + salto lateral 1p1p", semanas: [{ sxr: "2x4", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque D",
                items: [
                  { codigo: "D", ej: "Cargada rotacional", semanas: [{ sxr: "3x3", kg: "20l", rpe: "" }, { sxr: "3x3", kg: "20l", rpe: "" }, { sxr: "3x3", kg: "20l", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque F",
                items: [
                  { codigo: "F1", ej: "Trap", semanas: [{ sxr: "3x3", kg: "105", rpe: "" }, { sxr: "4x3", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "F2", ej: "Dominada", semanas: [{ sxr: "3x4", kg: "8k", rpe: "" }, { sxr: "4x5", kg: "13k", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque G",
                items: [
                  { codigo: "G1", ej: "sentadilla lateral deslizador", semanas: [{ sxr: "3x5", kg: "20+30", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "G2", ej: "lanzamiento al piso intensivo rotacional", semanas: [{ sxr: "3x4", kg: "8", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque H",
                items: [
                  { codigo: "H", ej: "Tumbado lado izquierdo rolo + respi", semanas: [{ sxr: "1x8", kg: "", rpe: "" }, { sxr: "1x8", kg: "", rpe: "" }, { sxr: "1x8", kg: "", rpe: "" }, { sxr: "1x8", kg: "", rpe: "" }] }
                ]
              }
            ]
          },
          {
            id: "M3D1", nombre: "Mes 3 · Día 1",
            bloques: [
              {
                nombre: "Bloque A",
                items: [
                  { codigo: "A1", ej: "Respiracion 90° con bloque", semanas: [{ sxr: "1x30\"", kg: "", rpe: "" }, { sxr: "1x30\"", kg: "", rpe: "" }, { sxr: "1x30\"", kg: "", rpe: "" }, { sxr: "1x30\"", kg: "", rpe: "" }] },
                  { codigo: "A2", ej: "Vascula pelvis con bloque", semanas: [{ sxr: "1x20", kg: "", rpe: "" }, { sxr: "1x20", kg: "", rpe: "" }, { sxr: "1x20", kg: "", rpe: "" }, { sxr: "1x20", kg: "", rpe: "" }] },
                  { codigo: "A3", ej: "Rotacion torax doble bloque", semanas: [{ sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque B",
                items: [
                  { codigo: "B1", ej: "Clava 1mano", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] },
                  { codigo: "B2", ej: "Plancha triple", semanas: [{ sxr: "2x8", kg: "10l", rpe: "" }, { sxr: "2x8", kg: "10l", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque C",
                items: [
                  { codigo: "C1", ej: "Salto 2p1p", semanas: [{ sxr: "2x6", kg: "", rpe: "" }, { sxr: "2x6", kg: "", rpe: "" }, { sxr: "2x10", kg: "3k", rpe: "" }, { sxr: "2x10", kg: "3k", rpe: "" }] },
                  { codigo: "C2", ej: "Lanzamiento Rotac Corto de frente", semanas: [{ sxr: "2x8", kg: "10l", rpe: "" }, { sxr: "2x8", kg: "", rpe: "" }, { sxr: "2x10", kg: "3k", rpe: "" }, { sxr: "2x10", kg: "3k", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque D",
                items: [
                  { codigo: "D", ej: "Cargada", semanas: [{ sxr: "3x4", kg: "30k", rpe: "" }, { sxr: "3x4", kg: "40k", rpe: "" }, { sxr: "3x5", kg: "40k", rpe: "" }, { sxr: "4x4", kg: "50k", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque E",
                items: [
                  { codigo: "E1", ej: "Push up box", semanas: [{ sxr: "3x5", kg: "", rpe: "" }, { sxr: "3x5", kg: "", rpe: "" }, { sxr: "3x5", kg: "", rpe: "" }, { sxr: "xxx", kg: "", rpe: "" }] },
                  { codigo: "E2", ej: "Salto deep", semanas: [{ sxr: "3x5", kg: "", rpe: "" }, { sxr: "3x4", kg: "", rpe: "" }, { sxr: "3x5", kg: "", rpe: "" }, { sxr: "xxx", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque F",
                items: [
                  { codigo: "F1", ej: "Sentadilla Frontal", semanas: [{ sxr: "3x5", kg: "45k", rpe: "" }, { sxr: "3x5", kg: "45k", rpe: "" }, { sxr: "3x5", kg: "50k ", rpe: "" }, { sxr: "3x4", kg: "65", rpe: "" }] },
                  { codigo: "F2", ej: "Pull up", semanas: [{ sxr: "3x5", kg: "", rpe: "" }, { sxr: "3x6", kg: "5k", rpe: "" }, { sxr: "3x6", kg: "5k", rpe: "" }, { sxr: "3x6", kg: "8k", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque G",
                items: [
                  { codigo: "G1", ej: "Peso muerto 1p asistido", semanas: [{ sxr: "3x6", kg: "20k", rpe: "" }, { sxr: "3x6", kg: "28k", rpe: "" }, { sxr: "3x6", kg: "32k", rpe: "" }, { sxr: "3x6", kg: "32k", rpe: "" }] },
                  { codigo: "G2", ej: "Fuerza de brazo banda + disco", semanas: [{ sxr: "3x6", kg: "15k", rpe: "" }, { sxr: "3x6", kg: "20k", rpe: "" }, { sxr: "3x6", kg: "25k banda negra", rpe: "" }, { sxr: "3x6", kg: "20k banda violeta", rpe: "" }] }
                ]
              }
            ]
          },
          {
            id: "M3D2", nombre: "Mes 3 · Día 2",
            bloques: [
              {
                nombre: "Bloque A",
                items: [
                  { codigo: "A1", ej: "Respiracion 90° con bloque", semanas: [{ sxr: "1x30\"", kg: "", rpe: "" }, { sxr: "1x30\"", kg: "", rpe: "" }, { sxr: "1x30\"", kg: "", rpe: "" }, { sxr: "1x30\"", kg: "", rpe: "" }] },
                  { codigo: "A2", ej: "Vascula pelvis con bloque", semanas: [{ sxr: "1x20", kg: "", rpe: "" }, { sxr: "1x20", kg: "", rpe: "" }, { sxr: "1x20", kg: "", rpe: "" }, { sxr: "1x20", kg: "", rpe: "" }] },
                  { codigo: "A3", ej: "Rotacion torax doble bloque", semanas: [{ sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque B",
                items: [
                  { codigo: "B1", ej: "Remo 1mano trx + empuje H mc", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] },
                  { codigo: "B2", ej: "Sissy pared", semanas: [{ sxr: "2x8", kg: "10l", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }, { sxr: "1x10", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque C",
                items: [
                  { codigo: "C1", ej: "Landmine sentadilla lateral", semanas: [{ sxr: "2x6", kg: "", rpe: "" }, { sxr: "2x10", kg: "", rpe: "" }, { sxr: "2x10", kg: "3k", rpe: "" }, { sxr: "2x10", kg: "3k", rpe: "" }] },
                  { codigo: "C2", ej: "Anti rotacion landmine", semanas: [{ sxr: "2x8", kg: "10l", rpe: "" }, { sxr: "2x10", kg: "", rpe: "" }, { sxr: "2x10", kg: "3k", rpe: "" }, { sxr: "2x10", kg: "3k", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque D",
                items: [
                  { codigo: "D1", ej: "Landmine Sentadilla explosiva", semanas: [{ sxr: "3x5", kg: "", rpe: "" }, { sxr: "3x4", kg: "", rpe: "" }, { sxr: "3x3", kg: "60l", rpe: "" }, { sxr: "3x4", kg: "", rpe: "" }] },
                  { codigo: "D2", ej: "Salto 1pie vallas", semanas: [{ sxr: "3x11", kg: "", rpe: "" }, { sxr: "3x4", kg: "", rpe: "" }, { sxr: "3x4", kg: "", rpe: "" }, { sxr: "3x4", kg: "", rpe: "" }] },
                  { codigo: "D3", ej: "Lanz combinado pecho rotacion", semanas: [{ sxr: "3x6", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque F",
                items: [
                  { codigo: "F1", ej: "Peso muerto convencional", semanas: [{ sxr: "3x5", kg: "", rpe: "" }, { sxr: "3x5", kg: "-", rpe: "" }, { sxr: "3x5", kg: "-", rpe: "" }, { sxr: "4x5", kg: "5/8/8/8", rpe: "" }] },
                  { codigo: "F2", ej: "Empuje vertical 1m", semanas: [{ sxr: "3x5", kg: "", rpe: "" }, { sxr: "3x6", kg: "", rpe: "" }, { sxr: "3x6", kg: "50l", rpe: "" }, { sxr: "4x6", kg: "50l", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque G",
                items: [
                  { codigo: "G1", ej: "sentadilla lateral deslizador", semanas: [{ sxr: "3x6", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "G2", ej: "Remo 1mano /Remo pendllay", semanas: [{ sxr: "3x6", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque H",
                items: [
                  { codigo: "H1", ej: "Flexion de cadera kb", semanas: [{ sxr: "2x8", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "H2", ej: "Caminta granjero", semanas: [{ sxr: "2", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      id: "p_rob", nombre: "Rob", grupo: "g_personalizados",
      objetivo: "Fuerza y Acondicionamiento",
      clases: [],
      proceso: {
        nombre: "Proceso — Rob", objetivo: "Fuerza y Acondicionamiento", semanas: 4,
        sesiones: [
          {
            id: "D1", nombre: "Día 1",
            bloques: [
              {
                nombre: "Bloque A",
                items: [
                  { codigo: "A1", ej: "Seguir el dedo un pie", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "A1", ej: "Empuje antebrazo suiza + banda", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque B",
                items: [
                  { codigo: "B", ej: "Estocada cruzada a grulla suiza", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "B", ej: "Piramide suiza", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque C",
                items: [
                  { codigo: "C", ej: "Leñador sentadilla lateral suiza", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "C", ej: "Empuje antebrazo suiza + banda", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque D",
                items: [
                  { codigo: "D", ej: "Bajada podio lateral", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "D", ej: "Empuje mc banco + step", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque E",
                items: [
                  { codigo: "E", ej: "Remo 2 manos TRX + puente", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "E", ej: "Flexión de cadera con kettlebell", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque F",
                items: [
                  { codigo: "F", ej: "Lanzamiento", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              }
            ]
          },
          {
            id: "D2", nombre: "Día 2",
            bloques: [
              {
                nombre: "Bloque A",
                items: [
                  { codigo: "A1", ej: "90° respiración en pared", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "A2", ej: "Inversión en antebrazos", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque B",
                items: [
                  { codigo: "B", ej: "Pallof con paso lateral", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "B", ej: "Paso frontal + banda anti-extensión", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "B", ej: "Caminata con MB + KB", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque C",
                items: [
                  { codigo: "C", ej: "Lanzamiento en un pie", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "C", ej: "Lanzamiento rotacional", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "C", ej: "Salto lateral 1 pie / 2 pies", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              },
              {
                nombre: "Bloque D",
                items: [
                  { codigo: "D", ej: "Sentadilla lateral", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] },
                  { codigo: "D", ej: "Remo 1 mano banda + bíceps + press hombro", semanas: [{ sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }, { sxr: "", kg: "", rpe: "" }] }
                ]
              }
            ]
          }
        ]
      }
    },

    // ---- alumnos importados del formulario de ingreso (INGRESO DHARMA TAMARINDO.xlsx) ----
    // ingresoCompleto:true porque ya llenaron el formulario real; sin plan asignado (se asigna al aprobar el pago).
    { id: "exl1", nombre: "Agustin Ascaneo", email: "agus.ascaneo@gmail.com", telefono: "", edad: 31, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl2", nombre: "Ariadna Puente Calvino", email: "ariadna.puentecr@gmail.com", telefono: "", edad: 32, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl3", nombre: "Neyen Vidalle", email: "naluneyenvidalle@gmail.com", telefono: "", edad: 30, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl4", nombre: "Tomas Grimalt", email: "tomasgrimaltoruez@gmail.com", telefono: "", edad: 34, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl5", nombre: "Ari Pereyra", email: "ariadnapereyraa@gmail.com", telefono: "", edad: 31, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl6", nombre: "Selene Rodriguez", email: "selerodriguez27@gmail.com", telefono: "", edad: 29, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl7", nombre: "Mariana Suarez De Stefano", email: "mariana.suarezds@gmail.com", telefono: "", edad: 43, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl8", nombre: "Carola Villalobo", email: "cvillalobom@gmail.com", telefono: "", edad: 32, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl9", nombre: "Nicolás Elgart", email: "nicoelgartla12@gmail.com", telefono: "", edad: 31, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl10", nombre: "Carola Valverde Porras", email: "dahia.valverde@gmail.com", telefono: "", edad: 40, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl11", nombre: "Ricardo Poyatos", email: "poyatosricardo@gmail.com", telefono: "", edad: 42, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl12", nombre: "Vir Aguilera", email: "aguileravir0@gmail.com", telefono: "", edad: 39, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl13", nombre: "Ignacio Holst", email: "nacho.personal.cr@gmail.com", telefono: "", edad: 47, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl14", nombre: "Lina Martinez", email: "lunilu.martinez@gmail.com", telefono: "", edad: 32, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl15", nombre: "Belen Medina", email: "velen.n@hotmail.com", telefono: "", edad: 35, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl16", nombre: "Facundo Gorosito", email: "facugorosito4@gmail.com", telefono: "", edad: 31, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl17", nombre: "Omri Daniel Goren", email: "danielgoren94@gmail.com", telefono: "", edad: 31, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl18", nombre: "Juan Cruz Barsamian", email: "juanbarsamian@gmail.com", telefono: "", edad: 32, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl19", nombre: "Rocio Bidegain", email: "r.bidegain22@gmail.com", telefono: "", edad: 34, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl20", nombre: "Pedro Muschietti", email: "peter.muschietti@gmail.com", telefono: "", edad: 34, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl22", nombre: "JUAN PABLO Tricarico", email: "tricaj@hotmail.com", telefono: "", edad: 43, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl23", nombre: "Nicolas Lescano", email: "lescano.nico@gmail.com", telefono: "", edad: 50, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl24", nombre: "Marco Suarez", email: "marcoantoniosuarez@gmail.com", telefono: "", edad: 45, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl25", nombre: "Maquita Fioretti", email: "fiirettimaquita@gmail.com", telefono: "", edad: 31, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl26", nombre: "Gerardo Álvarez", email: "soygerardoalvarez@gmail.com", telefono: "", edad: 35, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl28", nombre: "Juan Pedro Pezzali", email: "juanpezzalicr@gmail.com", telefono: "", edad: 37, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl30", nombre: "Kim Araya", email: "arayavilla0392@gmail.com", telefono: "+506 86149188", edad: 33, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl31", nombre: "Claudia Alfaro", email: "malditoescorpion24@gmail.com", telefono: "86062871", edad: 53, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl32", nombre: "Ezequiel Barreda", email: "barretats@gmail.com", telefono: "+50670925614", edad: 32, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl33", nombre: "Camila Ferrari", email: "camilaferrari832@gmail.com", telefono: "", edad: 35, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl34", nombre: "Julian Rojas", email: "americalatent@gmail.com", telefono: "506 8616 8728", edad: 36, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl37", nombre: "Mailen Bartozzetti", email: "mailen.bartozzetti@gmail.com", telefono: "+5492236876144", edad: 31, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl38", nombre: "Bernardo Catuogno", email: "bernardocatuogno@gmail.com", telefono: "+50671408221", edad: 24, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl39", nombre: "Aura Dinarte Graeff", email: "auradinartegraeff@gmail.com", telefono: "(+506)85055510", edad: 25, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl40", nombre: "José D. Arias", email: "josed3099@gmail.com", telefono: "+506 85035445", edad: 27, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl41", nombre: "Maria Perez", email: "mariperez_05@hotmail.com", telefono: "542355696314", edad: 36, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl42", nombre: "Kevin Rakita", email: "rakitakevin@gmail.com", telefono: "+5492257533810", edad: 33, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl43", nombre: "Valentina Perez", email: "valentinaperez2702@gmail.com", telefono: "+34 674475287", edad: 37, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl44", nombre: "Sol Soaje pinto", email: "solsoaje@outlook.es", telefono: "+5491124094295", edad: 33, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl45", nombre: "Gerónimo Solavagione", email: "geronimosolavagione98@gmail.com", telefono: "+50671916132", edad: 27, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl46", nombre: "Emanuel Montheil", email: "montheil15@outlook.com", telefono: "+5492617015531", edad: 28, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl47", nombre: "Roser Castillo pelegri", email: "roser_155@hotmail.com", telefono: "+34643976850", edad: 38, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl48", nombre: "Leandro Cepeda", email: "cepedaleandroezequiel@gmail.com", telefono: "86157311", edad: 39, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl49", nombre: "Elias Tobia", email: "surfaslifetherapy@gmail.com", telefono: "Elias_tobia@hotmail.com", edad: 40, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl50", nombre: "Wenceslao Mendioroz nogaro", email: "wenceslaomendioroz@hotmail.com", telefono: "85330515", edad: 51, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl51", nombre: "Rocio Charlier", email: "rociocharlier08@gmail.com", telefono: "542235797152", edad: 29, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl52", nombre: "Olivia Guayta", email: "oliviaguayta@hotmail.com", telefono: "+506 72861451", edad: 29, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl53", nombre: "Elena Polleschi", email: "elenampolleschi@gmail.com", telefono: "+54 9 11 28423821", edad: 20, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl55", nombre: "Danielle Hollander", email: "daniellehollander@gmail.com", telefono: "89229000", edad: 42, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl56", nombre: "Soledad Garcia Acosta", email: "garcia-sole21@hotmail.com", telefono: "50671684026", edad: 39, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl57", nombre: "Juan Gutierrez", email: "juanconegutierrez88@gmail.com", telefono: "50684410489", edad: 38, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl58", nombre: "maria mir bertone", email: "mariamirbertone@gmail.com", telefono: "+5491165182424", edad: 32, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl59", nombre: "Abigail Coleiro", email: "coleiroabigaileliana@gmail.com", telefono: "+5492246517818", edad: 29, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl60", nombre: "Francisco Naranja", email: "frannaranja7@gmail.com", telefono: "+5492236340902", edad: 27, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl61", nombre: "Raquel Picado", email: "raquel.pia15@gmail.com", telefono: "506 83395238", edad: 29, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl62", nombre: "Juan Ignacio Alberti", email: "albertijuanignacio@gmail.com", telefono: "+506 63868866", edad: 29, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl63", nombre: "Malakai Martinez", email: "mpsmalakai11@gmail.com", telefono: "83594410", edad: 25, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl64", nombre: "Camila Giraudo", email: "giraudocamila96@gmail.com", telefono: "+54 9 2291524413", edad: 30, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl65", nombre: "Victoria Luna", email: "victorialunabv@gmail.com", telefono: "", edad: 29, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl66", nombre: "Adrien Harang", email: "harangadrien1@gmail.com", telefono: "+50672555388", edad: 41, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl67", nombre: "Arianna Valdelomar", email: "arivalde31@gmail.com", telefono: "+506 87102375", edad: 26, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl68", nombre: "Julieta Negri", email: "julirubiolo@gmail.com", telefono: "+54 2235193677", edad: 27, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl69", nombre: "Mariano Carrera Muñoz", email: "nanocarreramunoz@gmail.com", telefono: "50661688349", edad: 14, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl70", nombre: "Luna Sanzo", email: "sanzoluna@gmail.com", telefono: "5491131731003", edad: 31, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl71", nombre: "ISABELLA AYRE", email: "bellaayre11@gmail.com", telefono: "+17202924475", edad: 17, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl72", nombre: "Pol Rigabert", email: "polrigabert@hotmail.com", telefono: "+34667998638", edad: 34, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl73", nombre: "Lucía Medina", email: "m.luciame@gmail.com", telefono: "", edad: 31, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl74", nombre: "Lucia Cristi", email: "cristilucia836@gmail.com", telefono: "8973 6034", edad: 0, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl75", nombre: "Tatiana Barbosa", email: "barbosa.tatiana1212@gmail.com", telefono: "71382992", edad: 31, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl76", nombre: "Maria Jose Abugattas", email: "majoah96@gmail.com", telefono: "+51 989014170", edad: 29, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl77", nombre: "Nasser Abugattas", email: "nasserabugattas@gmail.com", telefono: "+51 944418989", edad: 22, nivel: "Inicial", experiencia: "", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl79", nombre: "Nina Myndlis", email: "ninamyndlis@icloud.com", telefono: "+54 9 11 37024767", edad: 27, nivel: "Inicial", experiencia: "0-6 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Contractura cronica hombro-servicales","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl80", nombre: "Javiera Mora", email: "javieramora@gmail.com", telefono: "60535315", edad: 41, nivel: "Inicial", experiencia: "0-6 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"A veces dolor de espalda","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl81", nombre: "Alin Ohana", email: "faithleen@hotmail.com", telefono: "50685062238", edad: 43, nivel: "Inicial", experiencia: "No tengo", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl82", nombre: "Guillermo Taglioni", email: "guillermotaglioni@gmail.com", telefono: "+50671993831", edad: 28, nivel: "Inicial", experiencia: "6-12 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Lesión en rodilla derecha","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl83", nombre: "Antonio Lange", email: "antoniolange76@gmail.com", telefono: "±54 3518180372", edad: 26, nivel: "Inicial", experiencia: "6-12 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Cirugia en fractura de disco tibial","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl84", nombre: "Camila Millan", email: "camilamillan1996@gmail.com", telefono: "91165334839", edad: 30, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl85", nombre: "Melisa Cittadella", email: "meli.cittadella@gmail.com", telefono: "", edad: 39, nivel: "Inicial", experiencia: "6-12 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Tensión crónica en cuello lado izquierdo, que a veces afecta hombro. Sensibilidad rodilla izquierda, la tengo que tratar con cuidado. Ningun diagnostico pero duele ante flexiones muy profundas principalmente junto a aperturas de cadera.","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl86", nombre: "Marcela Cabaleiro", email: "fliacr@yahoo.com.ar", telefono: "(506) 84262684", edad: 51, nivel: "Inicial", experiencia: "No tengo", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Operación rodilla izquierda hace casi dos años","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl87", nombre: "Miranda Crespo", email: "mirucrespo2015@gmail.com", telefono: "72640247", edad: 23, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Nada","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl88", nombre: "Leilani Embree", email: "leilaniembree20@gmail.com", telefono: "61772019", edad: 29, nivel: "Inicial", experiencia: "0-6 meses", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl89", nombre: "David Ballesteros", email: "davibq@gmail.com", telefono: "+50687232811", edad: 35, nivel: "Inicial", experiencia: "No tengo", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl90", nombre: "Sofia De Mauricio", email: "sofidemauricio@gmail.com", telefono: "+54 11 69730825", edad: 24, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl91", nombre: "Maria Carossella", email: "maria.carossella@gmail.com", telefono: "+5492494006773", edad: 33, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl92", nombre: "Mariel Marmorato", email: "marielyoga.ser@hotmail.com", telefono: "506 85916236", edad: 61, nivel: "Inicial", experiencia: "No tengo", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Tendinitis bíceps derecho - espasmo en probador redondo izquierdo - tensión lumbar sacroilíaca si sobrecargo el área","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl93", nombre: "Catalina Monti", email: "monti.catalinar@gmail.com", telefono: "+50686257709", edad: 34, nivel: "Inicial", experiencia: "6-12 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Ganglion en muñeca","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl94", nombre: "Leandro Van Megroot", email: "lvanmegroot@gmail.com", telefono: "+50671299552", edad: 36, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"No, nada","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl95", nombre: "Christian Boos", email: "christianboos@gmail.com", telefono: "8702-8407", edad: 46, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Mi debilidad abdomen y piernas","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl96", nombre: "Miguel Calderon", email: "dreamsurfcr@gmail.com", telefono: "88345886", edad: 36, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl97", nombre: "Victoria Maffrand", email: "vmaffrand@gmail.com", telefono: "+50660042399", edad: 40, nivel: "Inicial", experiencia: "No tengo", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl98", nombre: "Miguel Sánchez Polini", email: "miguelasp@gmail.com", telefono: "+50688331214", edad: 41, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Nada actualmente","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl99", nombre: "Melina Ciatti", email: "melinaciatti@gmail.com", telefono: "+5491160443868", edad: 32, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl100", nombre: "Andrey Montoya", email: "jeysurflifestyle@gmail.com", telefono: "+506 87558602", edad: 26, nivel: "Inicial", experiencia: "No tengo", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Rodillas y hombros / ahora mismo estan “fuertes”","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl101", nombre: "oscar Leal", email: "donkukoukoku04@gmail.com", telefono: "+50688001069", edad: 30, nivel: "Inicial", experiencia: "No tengo", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl102", nombre: "Yerson Leal", email: "gerson-1609@hotmail.com", telefono: "+50683028624", edad: 27, nivel: "Inicial", experiencia: "0-6 meses", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl103", nombre: "María Pilar Alfonso", email: "pilar.alfonso@mi.unc.edu.ar", telefono: "+5493584831238", edad: 26, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Hernia discal S1-L5","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl104", nombre: "Daniel Pato", email: "cldanielpato@gmail.com", telefono: "83779582", edad: 43, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Falta de meñiscos rodilla derecha","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl105", nombre: "Monica Del Río", email: "delriomonica46@gmail.com", telefono: "86222909", edad: 67, nivel: "Inicial", experiencia: "No tengo", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Rodilla","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl106", nombre: "Maria Jose RUIZ ESCOBAR", email: "mariajoseruizescobar875@gmail.com", telefono: "506 8317-4444", edad: 46, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Tendinitis aguda en hombros y codos, incomodidad de espalda baja por desplazamiento L5 y S1","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl107", nombre: "Damián Szafirsztein", email: "damiansza@gmail.com", telefono: "50688717317", edad: 51, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
    { id: "exl108", nombre: "Andrea Garrote", email: "andreagt92@hotmail.com", telefono: "+50688569157", edad: 33, nivel: "Inicial", experiencia: "Mas de 12 meses", sexo: "", objetivo: "", lesiones: [{"zona":"General","detalle":"Recientemente tendinitis de quervain","adaptacion":""}], doloresFrecuentes: [], alertas: "", grupo: "g_personalizados", activo: true, ingresoCompleto: true, metricas: [], asistencia: { mes: 0, racha: 0 }, notas: [], clases: [], proceso: null },
  ],

  clases: [
    {
      id: "fyp_mardelplata", nombre: "FYP 1 — Mar del Plata", icono: "fuerza",
      descripcion: "Fuerza y Potencia · día de base bilateral. Patrones de sentadilla, bisagra, tracción y empuje. Full body, adaptable por nivel — todos pueden hacerla.",
      nivel: "Todos los niveles", duracion: 55,
      horarios: "Lun · Mié · Vie",
      coach: "Equipo DHARMA",
      inscriptos: ["p1"],
      sesiones: [
        {
          id: "A", nombre: "Mar del Plata",
          foco: "Base bilateral. Conciencia, control y profundidad antes que carga. Potencia con SNC fresco y luego fuerza en patrones. Se adapta por nivel.",
          bloques: [
            {
              nombre: "Preparación", duracion: 8,
              items: [
                { ej: "Respiración 360° en cuadrupedia", dosis: "2×6 resp", nota: "costillas y abdomen, sin perder neutro" },
                { ej: "Bird-dog (perro de muestra)", dosis: "2×6 c/l", nota: "pausa 2 s arriba" },
                { ej: "Sentadilla manos en la cabeza + rotación", dosis: "2×6" }
              ]
            },
            {
              nombre: "Activación", duracion: 6,
              items: [
                { ej: "Locomoción: oso adelante/atrás + cangrejo", dosis: "2 vueltas" },
                { ej: "Pogos en el lugar → desplazados", dosis: "3×15 s", nota: "rebote corto, tobillo rígido" }
              ]
            },
            {
              nombre: "Juegos", duracion: 6,
              items: [
                { ej: "Espejo en parejas: uno guía, el otro copia desplazamientos", dosis: "2×40 s" },
                { ej: "Robar la bola (en parejas)", dosis: "3×30 s", nota: "reacción y cambios de apoyo" }
              ]
            },
            {
              nombre: "Principal — Alta velocidad", duracion: 13,
              niveles: ["GUERRERO", "NINJA", "MAGO", "MAESTRO"],
              dosisGlobal: "6–10 reps",
              items: [
                { comun: "EMOM 12′ — min impar levantamiento / min par salto", nota: "explosivo y técnico; con SNC fresco. Bajá la carga si cae la velocidad" },
                { variantes: ["Swing con KB a la altura del pecho", "Swing con KB ruso", "Swing con KB americano", "Cargada con mancuernas"] },
                { variantes: ["Salto a cajón bajo", "Salto a cajón", "Salto a cajón alto", "Salto a cajón + caída a sentadilla"] }
              ]
            },
            {
              nombre: "Principal — Alta intensidad", duracion: 15,
              niveles: ["GUERRERO", "NINJA", "MAGO", "MAESTRO"],
              dosisGlobal: "5–8 reps",
              items: [
                { comun: "AMRAP 15′ — máximas vueltas", nota: "5 a 8 reps por ejercicio · calidad sobre velocidad · elegí tu nivel" },
                { variantes: ["Sentadilla copa", "Sentadilla goblet pesada", "Sentadilla frontal con mancuernas", "Sentadilla frontal con barra"] },
                { variantes: ["Remo en anillas", "Remo en anillas pies adelantados", "Remo en anillas pies elevados", "Remo en anillas con pausa"] },
                { variantes: ["Flexión a banco", "Flexión", "Flexión pies elevados", "Flexión arquera (cargo un brazo)"] },
                { variantes: ["Puente de glúteos 2 piernas", "Puente de glúteos 1 pierna", "Peso muerto rumano con KB", "Peso muerto rumano con mancuernas"] }
              ]
            },
            {
              nombre: "Cierre — Respiración y vuelta a la calma", duracion: 7,
              items: [
                { ej: "Puente subibaja con respiración (inhalo 6 · sostengo 3 · exhalo 6)", dosis: "5 ciclos" },
                { ej: "Postura de niño con respiración nasal", dosis: "2 min" },
                { ej: "Estiramiento de cadena posterior", dosis: "2 min" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "fyp_tamarindo", nombre: "FYP 2 — Tamarindo", icono: "fuerza",
      descripcion: "Fuerza y Potencia · día unilateral y plano frontal. Zancadas, empujes y tracciones a una mano, anti-rotación de core. Full body, adaptable por nivel.",
      nivel: "Todos los niveles", duracion: 55,
      horarios: "Lun · Mié · Vie",
      coach: "Equipo DHARMA",
      inscriptos: [],
      sesiones: [
        {
          id: "A", nombre: "Tamarindo",
          foco: "Trabajo unilateral y plano frontal. Equilibrar lado fuerte y débil, anti-rotación de core. Bisagra como básico del día. Se adapta por nivel.",
          bloques: [
            {
              nombre: "Preparación", duracion: 8,
              items: [
                { ej: "Respiración costal lateral en decúbito", dosis: "2×6 c/l" },
                { ej: "Pallof press con banda (anti-rotación)", dosis: "2×8 c/l", nota: "no dejes que el tronco rote" },
                { ej: "Sentadilla lateral a trípode", dosis: "2×5 c/l" }
              ]
            },
            {
              nombre: "Activación", duracion: 6,
              items: [
                { ej: "Patinador (skater) en el lugar", dosis: "3×20 s", nota: "control del aterrizaje" },
                { ej: "Cangrejo + break dance", dosis: "2 vueltas" }
              ]
            },
            {
              nombre: "Juegos", duracion: 6,
              items: [
                { ej: "Pulseada de pie (en parejas)", dosis: "3×30 s", nota: "base firme, anti-rotación real" },
                { ej: "Tocar rodillas / hombros (en parejas)", dosis: "3×30 s" }
              ]
            },
            {
              nombre: "Principal — Alta velocidad", duracion: 12,
              niveles: ["GUERRERO", "NINJA", "MAGO", "MAESTRO"],
              dosisGlobal: "8–12 reps",
              items: [
                { comun: "EMOM 12′ — 2 estaciones (lanzamiento + salto lateral)", nota: "explosivo y controlado; recibí con piernas blandas" },
                { variantes: ["Lanzamiento de balón al piso", "Slam de balón", "Slam con salto", "Slam rotacional"] },
                { variantes: ["Paso lateral amplio", "Patinador (skater)", "Patinador con toque", "Patinador con salto amplio"] }
              ]
            },
            {
              nombre: "Principal — Alta intensidad", duracion: 16,
              niveles: ["GUERRERO", "NINJA", "MAGO", "MAESTRO"],
              dosisGlobal: "8–10 reps",
              items: [
                { comun: "3 rondas — 8 a 10 reps (por lado en los unilaterales) · descanso 60″", nota: "el peso muerto va primero y pesado; el resto unilateral cuidando el lado débil" },
                { variantes: ["Peso muerto con KB", "Peso muerto rumano con mancuernas", "Peso muerto convencional con barra", "Peso muerto a déficit con barra"] },
                { variantes: ["Zancada estática", "Zancada caminando", "Zancada búlgara", "Zancada búlgara con salto"] },
                { variantes: ["Press de suelo a 1 mano", "Press de pie a 1 mano", "Push press a 1 mano", "Push press a 1 mano pesado"] },
                { variantes: ["Remo a 1 mano con apoyo", "Remo gorila a 1 mano", "Remo renegado", "Remo renegado con pausa"] }
              ]
            },
            {
              nombre: "Cierre — Respiración y vuelta a la calma", duracion: 7,
              items: [
                { ej: "Piernas a la pared / invertida — respiración 90°", dosis: "3 min" },
                { ej: "Estiramiento de flexores de cadera (zancada baja)", dosis: "2 min c/l" },
                { ej: "Respiración nasal en silencio", dosis: "2 min" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "fyp_pipa", nombre: "FYP 3 — Pipa", icono: "fuerza",
      descripcion: "Fuerza y Potencia · día rotacional y de potencia. Rotaciones de core, transporte de cargas y trabajo metabólico jugado. Más dinámico, siempre adaptable por nivel.",
      nivel: "Todos los niveles", duracion: 55,
      horarios: "Lun · Mié · Vie",
      coach: "Equipo DHARMA",
      inscriptos: [],
      sesiones: [
        {
          id: "A", nombre: "Pipa",
          foco: "Rotación, potencia y transporte. Raquis estable bajo carga rotacional, condición metabólica jugada. Ni sentadilla ni peso muerto como básico — día de potencia. Se adapta por nivel.",
          bloques: [
            {
              nombre: "Preparación", duracion: 8,
              items: [
                { ej: "Respiración con activación de transverso (hollow suave)", dosis: "2×20 s" },
                { ej: "Rotación torácica en cuadrupedia (enhebrar la aguja)", dosis: "2×6 c/l" },
                { ej: "Rotación trípode arcoíris", dosis: "2×5 c/l" }
              ]
            },
            {
              nombre: "Activación", duracion: 6,
              items: [
                { ej: "Capoeira + patada cruzada", dosis: "2×40 s" },
                { ej: "Volantazos con pesa (rotación de cadera)", dosis: "3×20 s" }
              ]
            },
            {
              nombre: "Juegos", duracion: 6,
              items: [
                { ej: "Pases de balón medicinal a la pared en parejas", dosis: "3×30 s", nota: "transferir desde las caderas" },
                { ej: "Girar al compañero (lucha suave de control)", dosis: "3×30 s" }
              ]
            },
            {
              nombre: "Principal — Alta velocidad", duracion: 14,
              niveles: ["GUERRERO", "NINJA", "MAGO", "MAESTRO"],
              dosisGlobal: "5/8 reps",
              items: [
                { comun: "AMRAP 12′ × 5/8 reps — couplet de potencia rotacional", nota: "explosivo, raquis estable; calidad sobre cantidad" },
                { variantes: ["Leñador con balón", "Leñador con balón y paso", "Lanzamiento rotacional a la pared", "Lanzamiento rotacional con salto"] },
                { variantes: ["Salto en largo", "Salto en largo reactivo", "Salto en largo + sprint 5 m", "Salto en largo con recepción a sentadilla"] }
              ]
            },
            {
              nombre: "Principal — Alta intensidad", duracion: 14,
              niveles: ["GUERRERO", "NINJA", "MAGO", "MAESTRO"],
              dosisGlobal: "6–8 reps",
              items: [
                { comun: "AMRAP 14′ — máximas vueltas", nota: "raquis estable en las rotaciones · elegí tu nivel" },
                { variantes: ["Sentadilla zercher liviana", "Sentadilla zercher", "Sentadilla zercher pesada", "Sentadilla zercher + paso"] },
                { variantes: ["Press landmine a 2 manos", "Press landmine a 1 mano", "Press landmine en zancada", "Push press landmine"] },
                { variantes: ["Dominada asistida con banda", "Dominada asistida con banda fina", "Dominada estricta", "Dominada estricta con lastre"] },
                { variantes: ["Farmer carry", "Farmer carry 1 mano (maleta)", "Front rack carry", "Overhead carry"] }
              ]
            },
            {
              nombre: "Cierre — Respiración y vuelta a la calma", duracion: 7,
              items: [
                { ej: "Respiración en caja (4-4-4-4)", dosis: "3 min" },
                { ej: "Torsión espinal en el piso", dosis: "2 min c/l" },
                { ej: "Postura de paloma (cadera)", dosis: "2 min c/l" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mus_nuevayork", nombre: "MUS 1 — Nueva York", icono: "fuerza",
      descripcion: "Musculación · full body de máximas vueltas. Foco estético-estructural: tensión y volumen. El nivel se regula con peso para llegar a tu RPE, no por variantes.",
      nivel: "Todos los niveles", duracion: 55,
      horarios: "Mar · Jue",
      coach: "Equipo DHARMA",
      inscriptos: [],
      sesiones: [
        {
          id: "A", nombre: "Nueva York",
          foco: "Composición corporal e hipertrofia full body. Buscar tensión y calidad de repetición; cada uno regula el peso para alcanzar su RPE.",
          bloques: [
            {
              nombre: "Preparación y activación", duracion: 10,
              items: [
                { ej: "Gato bueno / malo con banda", dosis: "40\" × 10\"" },
                { ej: "Perro pasa pesa", dosis: "40\" × 10\"" },
                { ej: "Peso muerto + sentadilla con pelota", dosis: "40\" × 10\"" },
                { ej: "Sentadilla isométrica sacando pies", dosis: "40\" × 10\"" },
                { ej: "Colgarse de la barra", dosis: "40\" × 10\"" }
              ]
            },
            {
              nombre: "Principal — Máximas vueltas 25′", duracion: 25,
              items: [
                { ej: "Esfuerzo por nivel (RPE)", dosis: "G 5.5–6.5 · N 6.5–7.5 · M 7.5–8.5 · Mº 8–9.5", nota: "8–12 reps por ejercicio · regulá el peso para llegar a tu RPE" },
                { ej: "Hip thrust", dosis: "8–12" },
                { ej: "Aperturas con mancuernas", dosis: "8–12" },
                { ej: "Estocada", dosis: "8–12 c/l" },
                { ej: "Rodillas al pecho", dosis: "8–12" },
                { ej: "Remo", dosis: "8–12" }
              ]
            },
            {
              nombre: "Auxiliar — Aduana", duracion: 10,
              items: [
                { ej: "Bíceps", dosis: "20" },
                { ej: "Sentadilla sumo punta de pie", dosis: "30" },
                { ej: "Tríceps / fondos", dosis: "20" },
                { ej: "Aperturas de cadera de pie o acostado", dosis: "30" },
                { ej: "Vuelos laterales", dosis: "20" }
              ]
            },
            {
              nombre: "Cierre — Respiración y vuelta a la calma", duracion: 6,
              items: [
                { ej: "Gato bueno / malo", dosis: "30\"" },
                { ej: "Respiración lateral", dosis: "30\"" },
                { ej: "Hipopresivo", dosis: "5 reps" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mus_buenosaires", nombre: "MUS 2 — Buenos Aires", icono: "fuerza",
      descripcion: "Musculación · series descendentes 12-10-8. Foco estético-estructural full body con pelota y mancuernas. El nivel se regula con peso, series y reps.",
      nivel: "Todos los niveles", duracion: 55,
      horarios: "Mar · Jue",
      coach: "Equipo DHARMA",
      inscriptos: [],
      sesiones: [
        {
          id: "A", nombre: "Buenos Aires",
          foco: "Hipertrofia full body en series descendentes: subimos el peso a medida que bajan las reps. Tensión y control.",
          bloques: [
            {
              nombre: "Preparación y activación", duracion: 10,
              items: [
                { ej: "Elevación de cadera con aductores y pelota", dosis: "1×10" },
                { ej: "Bicho muerto + flexión con pelota", dosis: "1×10" },
                { ej: "Rotación de tronco en plancha lateral con pelota", dosis: "1×10 c/l" },
                { ej: "Paso atrás + vuelta al mundo con pelota", dosis: "1×10" }
              ]
            },
            {
              nombre: "Principal — 12·10·8 (límite 15′)", duracion: 20,
              items: [
                { ej: "Esfuerzo por nivel (RPE)", dosis: "G 5.5–6.5 · N 6.5–7.5 · M 7.5–8.5 · Mº 8–9.5", nota: "subí el peso a medida que bajan las reps (12 → 10 → 8)" },
                { ej: "Sentadilla", dosis: "12·10·8" },
                { ej: "Press de suelo con mancuernas", dosis: "12·10·8" },
                { ej: "Vuelos frontales", dosis: "12·10·8" },
                { ej: "Remo vertical", dosis: "12·10·8" },
                { ej: "Bajada de podio", dosis: "12·10·8 c/l" },
                { ej: "Patada de glúteos", dosis: "12·10·8 c/l" }
              ]
            },
            {
              nombre: "Cierre — Respiración y vuelta a la calma", duracion: 8,
              items: [
                { ej: "Bebé feliz + panqueque", dosis: "10" },
                { ej: "Packing (respiración con compresión)", dosis: "30\" · 40\" · 50\"" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mus_roma", nombre: "MUS 3 — Roma", icono: "fuerza",
      descripcion: "Musculación · dos couplets 12-10-8. Foco estético-estructural con énfasis en piernas y empuje/tracción. El nivel se regula con peso, series y reps.",
      nivel: "Todos los niveles", duracion: 55,
      horarios: "Mar · Jue",
      coach: "Equipo DHARMA",
      inscriptos: [],
      sesiones: [
        {
          id: "A", nombre: "Roma",
          foco: "Hipertrofia organizada en dos couplets de series descendentes. Tensión, calidad y control del tempo.",
          bloques: [
            {
              nombre: "Preparación y activación", duracion: 10,
              items: [
                { ej: "Rotación trípode arcoíris", dosis: "30\" × 10\"" },
                { ej: "Plancha lateral codo-rodilla alternado", dosis: "30\" × 10\"" },
                { ej: "Estocada punta de pie", dosis: "30\" × 10\"" },
                { ej: "Estocada toco cielo / toco tierra", dosis: "30\" × 10\"" },
                { ej: "Plancha 8 apoyos", dosis: "30\" × 10\"" },
                { ej: "Fuerza de brazo con escápulas", dosis: "30\" × 10\"" }
              ]
            },
            {
              nombre: "Principal A — couplet 12·10·8 (12′)", duracion: 12,
              items: [
                { ej: "Esfuerzo por nivel (RPE)", dosis: "G 5.5–6.5 · N 6.5–7.5 · M 7.5–8.5 · Mº 8–9.5", nota: "alterná los 3 ejercicios; subí peso a medida que bajan las reps" },
                { ej: "Peso muerto pies divididos", dosis: "12·10·8 c/l" },
                { ej: "Press plano", dosis: "12·10·8" },
                { ej: "Giros rusos", dosis: "12·10·8" }
              ]
            },
            {
              nombre: "Principal B — couplet 12·10·8 (12′)", duracion: 12,
              items: [
                { ej: "Remo doble mancuerna", dosis: "12·10·8" },
                { ej: "Sentadilla lateral", dosis: "12·10·8 c/l" },
                { ej: "Talones a la cola (curl de isquios)", dosis: "12·10·8" }
              ]
            },
            {
              nombre: "Auxiliar — Escalera 8·10·12", duracion: 8,
              items: [
                { ej: "Apertura de caderas con banda", dosis: "8·10·12" },
                { ej: "Plancha lateral subibaja", dosis: "8·10·12 c/l" },
                { ej: "Abdominal codo-rodilla", dosis: "8·10·12" }
              ]
            },
            {
              nombre: "Cierre — Respiración y vuelta a la calma", duracion: 6,
              items: [
                { ej: "Packing 30\" + vaciado 10\"", dosis: "3 ciclos" },
                { ej: "Estiramientos sentado: rotación · flexión lateral · extensión · flexión", dosis: "4 min" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "esp_competencias", nombre: "Mini competencias y testeos", icono: "fuerza",
      descripcion: "Clase especial de aniversario en salón (Cuaderno 1). Mini-competencias de entrada en calor, competencia en parejas por estaciones (uno ejecuta, el otro mide), bloque de fuerza con testeos de máximos y cierre con apneas.",
      nivel: "Todos los niveles", duracion: 55,
      horarios: "Especial · Miércoles",
      coach: "Equipo DHARMA",
      inscriptos: [],
      sesiones: [
        {
          id: "A", nombre: "Mini competencias y testeos",
          foco: "Día de juego y medición. Buscamos máximos y récords personales en un clima competitivo y sano. Registrá los resultados: son la línea de base para comparar más adelante.",
          bloques: [
            {
              nombre: "Mini-competencia — Juegos de entrada en calor", duracion: 10,
              items: [
                { ej: "Pelota de tenis — dinámicas de agilidad y reacción", dosis: "2–3 rondas", nota: "en parejas o pequeños grupos; subí el ritmo de a poco" },
                { ej: "Puntería — lanzamientos a un aro", dosis: "varios intentos", nota: "aro de básquet o adaptado; cuenta aciertos" },
                { ej: "Desafío de conos — variación del juego de la caja", dosis: "2 rondas", nota: "conos como objetivos a derribar / acertar" }
              ]
            },
            {
              nombre: "Competencia en parejas — 5 estaciones", duracion: 20,
              items: [
                { ej: "Formato", dosis: "de a dos", nota: "un alumno ejecuta y el compañero mide/controla; luego rotan" },
                { ej: "Estación 1 · Salto — salto en alto con tiza", dosis: "3 intentos", nota: "se registran y miden los 3 intentos; vale el mejor" },
                { ej: "Estación 2 · Empuje — fuerza de brazos o pop ups", dosis: "máx en 30\"", nota: "máxima cantidad de repeticiones estrictas" },
                { ej: "Estación 3 · Lanzamientos — de potencia al piso", dosis: "máx en 30\"", nota: "cuenta la cantidad; foco en potencia" },
                { ej: "Estación 4 · Tracción — pasamanos", dosis: "máx en 30\"", nota: "cantidad de pasamanos recorridos" },
                { ej: "Estación 5 · Resistencia — colgado / transporte", dosis: "tiempo total", nota: "tiempo total colgados o transporte específico" }
              ]
            },
            {
              nombre: "Bloque principal de fuerza — testeos de máximos", duracion: 18,
              items: [
                { ej: "Cargada (clean) — peso máximo", dosis: "1 RM", nota: "búsqueda progresiva del máximo; técnica primero" },
                { ej: "Dominada — máximas repeticiones", dosis: "máx", nota: "peso corporal estricto" },
                { ej: "Pistols — máximo por pierna", dosis: "máx c/l", nota: "alternativa / escalado: skater squat" }
              ]
            },
            {
              nombre: "Cierre de clase", duracion: 7,
              items: [
                { ej: "Apneas máximas", dosis: "3–4 intentos", nota: "control mental y respiración post-esfuerzo; nunca al límite ni en el agua" }
              ]
            }
          ]
        }
      ]
    }
  ],

  // ---- ESTUDIO: formación interna de coaches ----
  // categorias fijas (mantienen la línea visual; cada una tiene color de marca)
  estudioCategorias: [
    { id: "fundamentos", nombre: "Fundamentos", color: "#489DA3" },
    { id: "metodologia", nombre: "Metodología", color: "#E84D23" },
    { id: "anatomia", nombre: "Anatomía", color: "#6EC5D1" },
    { id: "protocolos", nombre: "Protocolos", color: "#000000" }
  ],
  // un manual real: "El camino del profe — Módulo 1"
  manuales: [
    {
      id: "man_tecnica_carrera", categoria: "metodologia",
      titulo: "Técnica de carrera",
      descripcion: "Cómo corremos rápido: fundamentos físicos, prioridades técnicas y ángulos de referencia, cues de coaching para acelerar y para velocidad, la progresión de drills y la metodología ALTIS para estructurar la sesión.",
      autor: "DHARMA", actualizado: "Jun 2026", visibleAlumnos: false,
      modulos: [
        {
          id: "mod1", titulo: "Fundamentos: por qué corremos rápido", lectura: 6,
          bloques: [
            { tipo: "texto", intro: true, texto: "Correr rápido es, antes que nada, un problema de física: aplicar la mayor fuerza posible contra el suelo, en la dirección correcta y en el menor tiempo. Toda la técnica que sigue existe para que eso ocurra mejor." },
            { tipo: "titulo", texto: "Las tres leyes de Newton aplicadas a la carrera" },
            { tipo: "pasos", items: [
              { titulo: "Inercia.", texto: "Un cuerpo en reposo sigue en reposo y uno en movimiento sigue igual, salvo que actúe una fuerza. Arrancar y frenar cuesta: por eso la partida y los frenos se entrenan aparte." },
              { titulo: "Fuerza.", texto: "La aceleración es proporcional a la fuerza aplicada e inversamente proporcional a la masa. Más fuerza al suelo (con la misma masa) = más aceleración." },
              { titulo: "Acción y reacción.", texto: "Cuando empujás el suelo, el suelo te empuja a vos con la misma fuerza en sentido opuesto. No corrés moviendo las piernas en el aire: corrés empujando el piso." }
            ] },
            { tipo: "clave", texto: "Aceleración = Fuerza / Masa  ·  Fuerza = Masa × Aceleración. Para ir más rápido necesitás aplicar más fuerza contra el suelo en menos tiempo." },
            { tipo: "regla", numero: 1, texto: "Corré contra el suelo, no contra el aire" }
          ]
        },
        {
          id: "mod2", titulo: "Prioridades técnicas y ángulos de referencia", lectura: 7,
          bloques: [
            { tipo: "texto", intro: true, texto: "Estas son las prioridades técnicas sobre las que ponemos foco al observar y corregir una carrera. No se corrigen todas a la vez: una o dos por vez." },
            { tipo: "lista", items: ["Acción de brazos", "Acción de piernas", "Postura", "Partida", "Primer paso", "Toe off / contacto"] },
            { tipo: "titulo", texto: "Ángulos de referencia (grados)" },
            { tipo: "tabla", columnas: ["Articulación", "Partida", "Primer paso", "Toe off / contacto"], filas: [
              ["Rodilla delantera", "90–93", "—", "menor a 90"],
              ["Rodilla trasera", "130–135", "69–79", "160"],
              ["Cadera", "90–95", "—", "—"],
              ["Tobillo delantero (tibia/suelo)", "—", "38–43", "—"],
              ["Tobillo trasero", "—", "—", "generar fuerza horizontal"]
            ] },
            { tipo: "clave", texto: "En la aceleración los ángulos son más cerrados y el cuerpo está inclinado: el objetivo es proyectar fuerza hacia adelante (horizontal), no hacia arriba." },
            { tipo: "regla", numero: 2, texto: "En la aceleración, generá fuerza horizontal" }
          ]
        },
        {
          id: "mod3", titulo: "Cues de coaching: acelerar vs. velocidad", lectura: 6,
          bloques: [
            { tipo: "texto", intro: true, texto: "Acelerar y correr a máxima velocidad son fases distintas y se couchean distinto. En la aceleración mandamos el cuerpo hacia adelante y empujamos atrás; en velocidad máxima buscamos postura alta, tijeras amplias y frecuencia." },
            { tipo: "tabla", columnas: ["Coucheo de ACELERACIÓN", "Coucheo de VELOCIDAD"], filas: [
              ["Dejate caer adelante: sentí la presión en los pies como si te fueras a caer", "Hacete lo más largo posible, como si te tiraran de la cabeza hacia el cielo"],
              ["Presioná atrás y mové brazos y piernas agresivamente", "Muslos hacia arriba y adelante: mantené los muslos frente a las caderas"],
              ["Generá grandes tijeras: usá todo tu rango de movimiento", "Generá grandes tijeras: usá todo tu rango de movimiento"],
              ["Tobillos tensos y fuertes: tirá de los pies hacia las rodillas", "Tobillos tensos para contactar"],
              ["Levantá el cuerpo y la cabeza mientras acelerás, como un avión que despega", "Usá los brazos agresivamente"]
            ] },
            { tipo: "clave", texto: "Aceleración = caer y empujar atrás (vector horizontal, ángulos cerrados). Velocidad = postura alta, muslos al frente y frecuencia (vector más vertical)." }
          ]
        },
        {
          id: "mod4", titulo: "La progresión de drills", lectura: 8,
          bloques: [
            { tipo: "texto", intro: true, texto: "Cada familia de técnica se entrena como una progresión: de lo más controlado y lento a lo más dinámico, impredecible y específico. La lógica es siempre la misma: primero entender la posición, después aplicarla con ritmo, después bajo perturbación." },
            { tipo: "titulo", texto: "Familias de técnica" },
            { tipo: "lista", items: ["Frenos (desaceleración y control)", "Postural", "Lineal", "Lateral", "Cruzado", "Girar y arrancar", "Drive de rodilla", "Acción de brazos", "Stiffness de tobillo"] },
            { tipo: "titulo", texto: "Cómo escalar dentro de una familia" },
            { tipo: "pasos", items: [
              { titulo: "Wall drill iso.", texto: "Contra la pared, sostener la posición. Entender la postura sin desplazamiento." },
              { titulo: "Wall drill dinámico.", texto: "Misma posición pero con cambio de pierna y ritmo." },
              { titulo: "Piso (control).", texto: "Llevar la posición al desplazamiento real, lento y controlado." },
              { titulo: "Piso (ritmo).", texto: "Subir la frecuencia y la intensidad manteniendo la forma." },
              { titulo: "En parejas / con carga.", texto: "Inclinado, con banda, disco o lanzamiento: agregar resistencia y estímulo externo." },
              { titulo: "Combinado y caos.", texto: "Encadenar patrones y agregar imprevisibilidad (estímulos, oposición) para acercarlo al deporte." }
            ] },
            { tipo: "resumen", items: ["iso = isométrico (sostener la posición)", "wall drill = drill contra la pared", "caos = estímulo impredecible / reactivo", "L = lineal · MD = multidirección"] }
          ]
        },
        {
          id: "mod5", titulo: "Metodología ALTIS: estructurar la sesión", lectura: 8,
          bloques: [
            { tipo: "texto", intro: true, texto: "Una sesión de velocidad y técnica se ordena en cinco partes que van de lo general a lo específico, con foco en la aceleración y el aprendizaje motor." },
            { tipo: "tabla", columnas: ["Parte", "Foco", "Contenido"], filas: [
              ["1 · Pilares", "Aceleración", "Masaje, dinámicos y movilidad"],
              ["2 · Preparación del movimiento", "Aceleración", "Minibanda, lineal y lateral, estiramiento dinámico"],
              ["3 · Pliometría", "Aceleración", "Dirección, lineal vertical y horizontal, doble contacto. Tipos: jump, bound, hop"],
              ["4 · Técnica (10–15 min)", "Aprendizaje motor", "Intro a nuevos aprendizajes, aplicación e integración de movimientos"],
              ["5 · Frecuencia", "Velocidad", "Recobro alto, alta intensidad, ejecución completa"]
            ] },
            { tipo: "titulo", texto: "Pautas de dosificación (velocidad)" },
            { tipo: "lista", items: ["1–2 veces por semana (45–60 min)", "Distancias: 5–30 (± 5) metros", "Reps: 4–8 (± 2)", "Series: 1–2", "Descanso: reps menos de 5 min · series menos de 8 min", "Énfasis: alta intensidad, ejecución completa, recobro alto"] },
            { tipo: "cita", texto: "Tomate al menos dos días entre sesiones. El entrenamiento de velocidad es de los más intensos que podés hacer: la recuperación adecuada entre sesiones es clave.", autor: "ALTIS" },
            { tipo: "regla", numero: 3, texto: "Velocidad: con sistema nervioso fresco y descanso pleno" },
            { tipo: "preguntas", titulo: "Para cerrar el manual", items: [
              { q: "¿Por qué corrés más rápido aplicando fuerza al suelo?", opciones: ["Porque las piernas se mueven más rápido en el aire", "Por la 3ra ley de Newton: el suelo te devuelve la fuerza que le aplicás"], correcta: 1, explicacion: "Acción y reacción: la fuerza horizontal que generás contra el piso es la que te impulsa hacia adelante." },
              { q: "En la fase de aceleración, ¿hacia dónde dirigís la fuerza y cómo está el cuerpo?", opciones: ["Hacia arriba, con el cuerpo erguido", "Hacia adelante (horizontal), con el cuerpo inclinado y ángulos cerrados"], correcta: 1, explicacion: "Aceleración = caer adelante y empujar atrás. La postura alta y las tijeras son de la fase de velocidad máxima." },
              { q: "¿Cuál es la lógica para escalar un drill de técnica?", respuesta: "De lo controlado a lo caótico: wall drill iso, wall drill dinámico, piso control, piso ritmo, en parejas o con carga, y finalmente combinado y caos (impredecible)." },
              { q: "¿Cada cuánto y a qué distancias se entrena la velocidad según ALTIS?", respuesta: "1–2 veces por semana (45–60 min), distancias de 5–30 m, 4–8 reps, 1–2 series, con descanso amplio. Siempre con el sistema nervioso fresco y al menos dos días entre sesiones." }
            ] }
          ]
        }
      ]
    },
    {
      id: "man_camino_1", categoria: "fundamentos",
      titulo: "El camino del profe — Módulo 1",
      descripcion: "Bienvenido al equipo. Filosofía y enfoque, conceptos fundamentales sobre salud, enseñanza-aprendizaje y entrenamiento.",
      autor: "DHARMA", actualizado: "May 2026", visibleAlumnos: false,
      modulos: [
        {
          id: "mod1", titulo: "Filosofía y enfoque", lectura: 6,
          bloques: [
            { tipo: "texto", intro: true, texto: "Acá vas a encontrar información fundamental sobre nuestra filosofía y enfoque: conceptos sobre salud, enseñanza-aprendizaje y entrenamiento. Es el punto de partida para todo profe del equipo." },
            { tipo: "clave", texto: "Nuestra misión: ayudar a las personas a sentirse mejor, mejorar su rendimiento y alcanzar sus objetivos." },
            { tipo: "titulo", texto: "El enfoque DHARMA" },
            { tipo: "pasos", items: [
              { titulo: "Humano.", texto: "Biopsicosocial. Todo conectado." },
              { titulo: "Sistema.", texto: "Principios claros, procesos sistematizados." },
              { titulo: "Enfoque.", texto: "La persona como centro." }
            ] },
            { tipo: "regla", numero: 1, texto: "No hacer daño", autor: "Dan John" }
          ]
        },
        {
          id: "mod2", titulo: "El cuerpo es un sistema", lectura: 8,
          bloques: [
            { tipo: "texto", intro: true, texto: "Un sistema es un conjunto de partes que se entrelazan y cumplen una función. Para entender al cuerpo —y a la persona— hay que pensar en sistemas complejos." },
            { tipo: "titulo", texto: "Las 7 propiedades de los sistemas complejos" },
            { tipo: "pasos", items: [
              { titulo: "Emergencia.", texto: "El todo es más que la suma de las partes." },
              { titulo: "Retroalimentación.", texto: "Las acciones vuelven al origen en forma de círculo. Positiva: activan/potencian. Negativa: frenan." },
              { titulo: "No linealidad.", texto: "La relación entre causa y efecto no es lineal. El efecto mariposa." },
              { titulo: "Caos.", texto: "Comportamiento sensible y difícil de predecir." },
              { titulo: "Auto-organización.", texto: "El sistema se organiza y reorganiza a sí mismo. No hay un jefe." },
              { titulo: "Interconexión.", texto: "Todo afecta y es afectado por todo." },
              { titulo: "Adaptabilidad.", texto: "El sistema se adapta a los estímulos que recibe." }
            ] },
            { tipo: "clave", texto: "El cuerpo es un sistema: sus partes se afectan entre sí de manera dinámica y no lineal, se organiza y se retroalimenta. Su 'todo' es más que la suma de las partes." },
            { tipo: "titulo", texto: "Enfoque biopsicosocial — las 4 patas de la mesa" },
            { tipo: "lista", items: ["Sueño", "Nutrición", "Emociones", "Entreno"] },
            { tipo: "texto", texto: "El equilibrio es lo que define a la mesa. Si una pata falla, el sistema lo siente." },
            { tipo: "regla", numero: 2, texto: "Contexto manda" },
            { tipo: "preguntas", titulo: "Concepto clave — no linealidad", items: [
              { q: "Si la persona durmió mal, ¿la carga del día debería ser la misma?", opciones: ["Sí, el plan no se toca", "No, el estado de hoy modifica el estímulo óptimo"], correcta: 1, explicacion: "No linealidad: el mismo input no da el mismo output. El descanso, la hidratación y el ánimo cambian la respuesta al entrenamiento." },
              { q: "Si estás deshidratado, ¿tu fuerza es igual?", opciones: ["Sí, la fuerza es independiente del estado", "No, el rendimiento cae con la deshidratación"], correcta: 1, explicacion: "El cuerpo es un sistema interconectado: una pata de la mesa afecta a todas las demás." }
            ] }
          ]
        },
        {
          id: "mod3", titulo: "Principios sobre métodos", lectura: 9,
          bloques: [
            { tipo: "regla", numero: 3, texto: "Principios sobre métodos" },
            { tipo: "texto", intro: true, texto: "Principios y métodos no son equivalentes ni tienen el mismo peso. Confundirlos es uno de los errores más comunes al programar." },
            { tipo: "tabla", columnas: ["Principios", "Métodos"], filas: [
              ["Universales", "Específicos"],
              ["Permanentes", "Variables"],
              ["No negociables", "Negociables"],
              ["Garantizan resultados", "Contexto-dependientes"]
            ] },
            { tipo: "clave", texto: "La adherencia es el principio que hace posible todos los demás." },
            { tipo: "titulo", texto: "Los principios del entrenamiento" },
            { tipo: "pasos", items: [
              { titulo: "Sobrecarga progresiva.", texto: "Sin desafío no hay mejora. Aumentar gradualmente peso, repeticiones, volumen, intensidad y/o dificultad. El estímulo óptimo desafía pero es accesible." },
              { titulo: "Especificidad.", texto: "Se mejora lo que se entrena. El cuerpo se adapta de forma específica al estímulo que recibe y repite." },
              { titulo: "Individualidad.", texto: "Cada persona es un mundo: experiencia, genética, hábitos, objetivos, nutrición, descanso, gestión emocional. No todos respondemos igual." },
              { titulo: "Adaptación.", texto: "Lo que ayer era óptimo hoy puede ser deficiente. El estímulo debe cambiar para mantenerse óptimo: muy fácil no genera cambio, muy difícil aumenta el riesgo de lesión." },
              { titulo: "Reversibilidad.", texto: "Lo que no se estimula se pierde. Cuanto más tiempo hayas construido la base, más fácil la recuperás. Por eso la adherencia es crucial." },
              { titulo: "Variabilidad.", texto: "Hacer siempre lo mismo aburre a la mente y estanca al cuerpo. Variar ejercicios y métodos rompe mesetas. No es cambiar todo el tiempo solo por cambiar." }
            ] },
            { tipo: "cita", texto: "¿Esfuerzo x2 = resultado x2?", autor: "Para reflexionar" },
            { tipo: "preguntas", titulo: "Para pensar", items: [
              { q: "¿Qué principio te parece el más importante?", respuesta: "No hay una única respuesta, pero la adherencia es el principio que hace posibles a todos los demás: sin constancia, ninguno de los otros principios llega a expresarse." },
              { q: "Si una clase grupal no cuenta con estrategias para regular la intensidad, ¿qué principio se pone más en riesgo?", opciones: ["Especificidad", "Individualidad", "Variabilidad"], correcta: 1, explicacion: "Sin formas de regular la intensidad, todos reciben el mismo estímulo: se pierde la individualidad (cada persona responde distinto)." },
              { q: "Verdadero o falso: 'El principio de especificidad significa que hay que imitar el deporte en el gimnasio porque solo se mejora lo que se entrena.'", opciones: ["Verdadero", "Falso"], correcta: 1, explicacion: "Falso. Especificidad no es copiar el gesto deportivo: es desarrollar las cualidades que el deporte demanda. Imitar el gesto con carga suele aumentar el riesgo sin mejorar la performance." }
            ] }
          ]
        },
        {
          id: "mod4", titulo: "Poblaciones y segmentación", lectura: 8,
          bloques: [
            { tipo: "regla", numero: 4, texto: "El entrenamiento es para todos, pero no para todos igual" },
            { tipo: "titulo", texto: "Los cuadrantes de Dan John" },
            { tipo: "tabla", columnas: ["Cuadrante", "Cualidades", "Intensidad", "Ejemplo"], filas: [
              ["I", "Pocas", "Baja", "Salud y bienestar — base amplia y consistencia"],
              ["II", "Muchas", "Baja", "Niños / Ed. física — desarrollo multilateral"],
              ["III", "Pocas", "Alta", "Powerlifters / velocistas — alta especificidad técnica"],
              ["IV", "Muchas", "Alta", "Combate / rugby — mayor demanda de planificación"]
            ] },
            { tipo: "titulo", texto: "Las tres grandes poblaciones" },
            { tipo: "pasos", items: [
              { titulo: "Salud y bienestar.", texto: "Sentirse mejor, vida activa, prevención. Foco: adherencia, movilidad, fuerza funcional, autonomía." },
              { titulo: "Rendimiento deportivo.", texto: "Mejorar la performance competitiva. Foco: especificidad, análisis de demandas, reducir riesgo de lesiones." },
              { titulo: "Estética corporal.", texto: "Mejorar la relación masa grasa/muscular. Foco: sobrecarga progresiva, balance calórico, gestión de emociones y estrés." }
            ] },
            { tipo: "titulo", texto: "Sub-divisiones" },
            { tipo: "lista", items: ["Edad y contexto", "Experiencia, nivel y estado actual", "Tipo de deporte", "Nivel de competencia", "Gustos y preferencias"] },
            { tipo: "preguntas", titulo: "Para pensar", items: [
              { q: "¿Qué objetivo es para todos?", opciones: ["La estética", "El rendimiento deportivo", "La salud"], correcta: 2, explicacion: "La salud es transversal: sin salud, tarde o temprano se cae el rendimiento y la estética." },
              { q: "¿El entrenamiento es el mismo si mi fin es estética o rendimiento deportivo? ¿Por qué?", respuesta: "No. Aunque comparten principios, cambian las prioridades: la estética prioriza el balance calórico y la sobrecarga progresiva; el rendimiento prioriza la especificidad y el análisis de las demandas del deporte." },
              { q: "Verdadero o falso: 'Si no tenés salud, en algún momento dejarás de tener rendimiento.'", opciones: ["Verdadero", "Falso"], correcta: 0, explicacion: "Verdadero. La salud es la base que sostiene el rendimiento en el tiempo." }
            ] }
          ]
        },
        {
          id: "mod5", titulo: "Coaching y rol del entrenador", lectura: 9,
          bloques: [
            { tipo: "titulo", texto: "El rol del entrenador" },
            { tipo: "lista", items: ["Educar", "Programar", "Guiar y acompañar", "Analizar"] },
            { tipo: "titulo", texto: "Buenas costumbres" },
            { tipo: "pasos", items: [
              { titulo: "Preguntar y escuchar.", texto: "'¿Cómo estás?' — y escuchar de verdad la respuesta." },
              { titulo: "Honestidad ante la duda.", texto: "Decir 'no sé' o 'lo voy a buscar'." },
              { titulo: "Derivar.", texto: "Si nos excede, derivar o pedir ayuda." },
              { titulo: "Informar sin juzgar.", texto: "Informar sin emitir juicio de valor." },
              { titulo: "Estudiar el entorno.", texto: "Observar antes de hablar o corregir." }
            ] },
            { tipo: "regla", numero: 5, texto: "Lo que decís importa; cómo y cuándo lo decís, mucho más" },
            { tipo: "titulo", texto: "2 balas — máximo 2 correcciones por movimiento" },
            { tipo: "tabla", columnas: ["Nivel de error", "Qué hacer"], filas: [
              ["Riesgo de seguridad", "Detener · corregir · continuar"],
              ["Técnico significativo", "1–2 correcciones, dejar ejecutar"],
              ["Técnico menor", "Tolerar, feedback al final"]
            ] },
            { tipo: "clave", texto: "Exceso de correcciones: sobrecarga cognitiva, pérdida de confianza, bloqueo motor." },
            { tipo: "titulo", texto: "Canales de información" },
            { tipo: "lista", items: ["Vista", "Oído", "Tacto", "Kinestésico"] },
            { tipo: "texto", texto: "No abusar de un solo canal." },
            { tipo: "clave", texto: "No es solo un ejercicio. Lo que la persona siente, escucha, cree que puede y puede está atravesado por su experiencia previa, su confianza y sus creencias." },
            { tipo: "regla", numero: 6, texto: "Evaluar costo / beneficio" },
            { tipo: "preguntas", titulo: "Antes de programar, preguntate", items: ["¿Cuál es el potencial beneficio?", "¿Cuál es el potencial costo?"] },
            { tipo: "preguntas", titulo: "Para cerrar el módulo", items: [
              { q: "¿Cuál es la diferencia entre principios y métodos?", respuesta: "Los principios son universales, permanentes y no negociables (garantizan resultados). Los métodos son específicos, variables y negociables (dependen del contexto). Los métodos sirven a los principios, no al revés." },
              { q: "¿Qué significa enfoque biopsicosocial?", respuesta: "Entender a la persona como un sistema donde lo biológico, lo psicológico y lo social se entrelazan. Las 'cuatro patas de la mesa': sueño, nutrición, emociones y entreno." },
              { q: "¿Cuál es tu rol y cuáles NO son tus responsabilidades?", respuesta: "Tu rol: educar, programar, guiar y acompañar, analizar. No te corresponde diagnosticar, tratar lesiones ni dar indicaciones médicas o nutricionales que exceden tu formación: ahí se deriva." },
              { q: "¿Ante qué tipo de error vale la pena frenar la ejecución?", opciones: ["Cualquier error técnico", "Solo un error con riesgo de seguridad", "Nunca se frena"], correcta: 1, explicacion: "Solo se frena ante un riesgo de seguridad. El error técnico significativo se corrige con 1–2 indicaciones; el menor se tolera y se da feedback al final." },
              { q: "¿Cuántos canales de recepción de información existen?", opciones: ["Dos: vista y oído", "Cuatro: vista, oído, tacto y kinestésico", "Uno: la vista"], correcta: 1, explicacion: "Cuatro canales. Ninguno es 'mejor': la clave es no abusar de uno solo y adaptarse a cómo aprende cada persona." },
              { q: "Cuando una persona ejecuta, ¿'piensa' solo en la técnica?", opciones: ["Sí, solo en la técnica", "No, también en su confianza, experiencia y creencias"], correcta: 1, explicacion: "No es solo un ejercicio: lo que la persona siente, cree que puede y efectivamente puede está atravesado por su experiencia previa." }
            ] }
          ]
        }
      ]
    },
    {
      id: "man_levantamiento", categoria: "metodologia",
      titulo: "Levantamiento olímpico",
      descripcion: "Charla técnica: fundamentos, impacto fisiológico y aplicación al entrenamiento. Historia, fisiología, derivados y técnica.",
      autor: "DHARMA", actualizado: "May 2026", visibleAlumnos: false,
      modulos: [
        {
          id: "mod1", titulo: "Qué es y de dónde viene", lectura: 5,
          bloques: [
            { tipo: "texto", intro: true, texto: "El levantamiento olímpico es una de las formas más efectivas de desarrollar fuerza-potencia. Antes de programarlo, conviene entender de dónde viene y por qué importa." },
            { tipo: "titulo", texto: "Origen — de Grecia a los Juegos" },
            { tipo: "pasos", items: [
              { titulo: "1896.", texto: "Debuta en los Juegos Olímpicos de Atenas, uno de los deportes originales del programa moderno." },
              { titulo: "1972.", texto: "Se elimina el press (era casi imposible de juzgar). Sobreviven dos movimientos: arranque + envión." }
            ] },
            { tipo: "clave", texto: "Una de las formas más efectivas de desarrollar la fuerza-potencia: combina en un solo gesto lo que pocos métodos logran integrar." },
            { tipo: "lista", items: ["Fuerza", "Velocidad", "Coordinación", "Precisión"] }
          ]
        },
        {
          id: "mod2", titulo: "Adaptaciones físicas", lectura: 6,
          bloques: [
            { tipo: "texto", intro: true, texto: "Qué le hace al cuerpo: impactos físicos, neuronales y coordinativos." },
            { tipo: "pasos", items: [
              { titulo: "Fuerza.", texto: "Aumento de la fuerza máxima, hipertrofia funcional y potencia (fuerza × velocidad)." },
              { titulo: "Huesos y articulaciones.", texto: "Aumenta la densidad ósea, fortalece tendones y ligamentos, y previene la pérdida de masa ósea asociada al envejecimiento." },
              { titulo: "Sistema nervioso.", texto: "Mayor reclutamiento de unidades motoras, mayor velocidad de contracción y mejor coordinación intermuscular." }
            ] },
            { tipo: "clave", texto: "RFD — Rate of Force Development: qué tan rápido producís fuerza. Fundamental para saltar, esprintar y cambiar de dirección." },
            { tipo: "titulo", texto: "El gran diferencial" },
            { tipo: "texto", texto: "Combina coordinación, velocidad y fuerza. En un arranque, el cuerpo se activa en secuencia perfecta:" },
            { tipo: "lista", items: ["Tobillos", "Rodillas", "Caderas", "Tronco", "Hombros", "Brazos"] },
            { tipo: "texto", texto: "Coordinación intermuscular, intramuscular y propiocepción en un mismo gesto." }
          ]
        },
        {
          id: "mod3", titulo: "Los derivados", lectura: 6,
          bloques: [
            { tipo: "texto", intro: true, texto: "Simplificar para potenciar. Los derivados aíslan una fase del movimiento: más beneficio técnico, menos complejidad." },
            { tipo: "titulo", texto: "Del arranque" },
            { tipo: "lista", items: ["Hang Snatch", "Power Snatch", "Snatch Pull"] },
            { tipo: "titulo", texto: "Del envión" },
            { tipo: "lista", items: ["Power Clean", "Hang Clean", "Clean Pull", "Push Press", "Power Jerk", "Split Jerk"] },
            { tipo: "titulo", texto: "Los tirones (pulls) — más carga, más fuerza" },
            { tipo: "clave", texto: "110–130%: en un Clean Pull podés trabajar en valores mayores que tu máxima carga de Clean. Adaptaciones neurales: más unidades motoras y fuerza aplicada más rápido." },
            { tipo: "clave", texto: "Triple extensión: tobillo + rodilla + cadera. La misma acción de los saltos, sprints y cambios de dirección." }
          ]
        },
        {
          id: "mod4", titulo: "Cómo se programa", lectura: 5,
          bloques: [
            { tipo: "titulo", texto: "Calidad antes que cantidad" },
            { tipo: "texto", intro: true, texto: "El volumen se trata como accesorio: lo que entrenamos es la potencia." },
            { tipo: "tabla", columnas: ["Variable", "Valor"], filas: [
              ["Series", "3 – 5"],
              ["Reps por serie", "2 – 3"],
              ["Descanso", "2 – 3 min"],
              ["Volumen total", "6 – 15 reps"]
            ] },
            { tipo: "clave", texto: "El principio: con fatiga, la velocidad cae y la técnica se rompe. Ahí deja de entrenarse la potencia y empieza el trabajo fatigante. Por eso: pocas reps, muchas series de alta calidad." }
          ]
        },
        {
          id: "mod5", titulo: "Cómo se enseña", lectura: 6,
          bloques: [
            { tipo: "titulo", texto: "La técnica en 4 fases" },
            { tipo: "pasos", items: [
              { titulo: "Posición inicial.", texto: "Tensión posterior, hombros sobre la barra, pie en 3 apoyos." },
              { titulo: "Transición.", texto: "La barra sube por el muslo hasta la cadera, con la rodilla flexionada." },
              { titulo: "Fase de vuelo.", texto: "Triple extensión: la barra sube pegada al cuerpo." },
              { titulo: "Recepción.", texto: "Apoyo plantar completo, recepción en el lugar, tren superior activo." }
            ] },
            { tipo: "cita", texto: "La potencia se construye con calidad, no con cantidad.", autor: "DHARMA" },
            { tipo: "preguntas", titulo: "Para cerrar el módulo", items: [
              { q: "¿Qué dos movimientos sobreviven en la competición olímpica desde 1972?", opciones: ["Press y sentadilla", "Arranque y envión", "Arranque y press"], correcta: 1, explicacion: "Se eliminó el press por la dificultad de juzgarlo. Quedaron arranque (snatch) y envión (clean & jerk)." },
              { q: "¿Qué es la triple extensión?", opciones: ["Extender los tres dedos del agarre", "Extensión simultánea de tobillo, rodilla y cadera", "Tres repeticiones seguidas"], correcta: 1, explicacion: "Tobillo + rodilla + cadera: la misma acción de los saltos, sprints y cambios de dirección." },
              { q: "¿Por qué se programa con pocas reps y muchas series?", opciones: ["Para ahorrar tiempo", "Porque con fatiga cae la velocidad y se rompe la técnica", "Para generar más volumen"], correcta: 1, explicacion: "Lo que se entrena es la potencia. Con fatiga la velocidad cae y deja de entrenarse la potencia; por eso pocas reps de alta calidad." },
              { q: "Verdadero o falso: 'En un Clean Pull se puede trabajar con más carga que tu máxima de Clean.'", opciones: ["Verdadero", "Falso"], correcta: 0, explicacion: "Verdadero. Los tirones permiten 110–130% de la carga máxima del levantamiento completo, buscando adaptaciones neurales." }
            ] }
          ]
        }
      ]
    },
    {
      id: "man_movimiento", categoria: "fundamentos",
      titulo: "El camino del profe — Módulo 2: Movimiento",
      descripcion: "Biomecánica, bases del movimiento, capacidades, habilidades y conceptos clave del movimiento humano.",
      autor: "DHARMA", actualizado: "Jun 2026", visibleAlumnos: false,
      modulos: [
        {
          id: "mod1", titulo: "Qué es el movimiento", lectura: 5,
          bloques: [
            { tipo: "cita", texto: "El movimiento es un cambio de un cuerpo en el espacio.", autor: "Definición de trabajo" },
            { tipo: "texto", intro: true, texto: "A través del movimiento se dan miles de expresiones distintas. Antes de programar, el profe tiene que entender cómo se organiza ese cambio en el espacio." },
            { tipo: "titulo", texto: "Tres planos y tres ejes" },
            { tipo: "tabla", columnas: ["Plano", "Eje", "Acciones"], filas: [
              ["Sagital", "Latero-lateral", "Flexión / extensión"],
              ["Frontal", "Anteroposterior", "Aducción / abducción"],
              ["Transversal", "Vertical", "Rotaciones"]
            ] },
            { tipo: "clave", texto: "Todo movimiento sucede en uno o varios de estos tres planos. Programar full body es, en parte, cubrir los tres." }
          ]
        },
        {
          id: "mod2", titulo: "Globales y analíticos", lectura: 5,
          bloques: [
            { tipo: "texto", intro: true, texto: "Existen movimientos globales y analíticos. La diferencia está en cuántas articulaciones y grupos musculares involucran." },
            { tipo: "titulo", texto: "Analíticos" },
            { tipo: "texto", texto: "Una o dos articulaciones y grupos musculares: flexión, extensión, abducción, aducción. Ejemplos: curl de bíceps, sillón de cuádriceps." },
            { tipo: "titulo", texto: "Globales" },
            { tipo: "texto", texto: "Múltiples articulaciones y grupos musculares, organizados en patrones de movimiento." },
            { tipo: "lista", items: ["Empujar", "Traccionar", "Rodilla dominante / sentadilla", "Cadera dominante / bisagra"] },
            { tipo: "clave", texto: "En DHARMA programamos por patrones globales: fuerza de brazo, dominada, sentadilla. Lo analítico es accesorio." }
          ]
        },
        {
          id: "mod3", titulo: "Patrones, habilidades y capacidades", lectura: 6,
          bloques: [
            { tipo: "pasos", items: [
              { titulo: "Patrón motor básico.", texto: "Acciones corporales que se combinan en un todo integrado que implica la totalidad del cuerpo (Gallahue)." },
              { titulo: "Habilidad motora.", texto: "La capacidad adquirida, mediante el aprendizaje, de realizar uno o más patrones con una intención determinada (Gallahue)." }
            ] },
            { tipo: "clave", texto: "El movimiento se da gracias a habilidades, sobre las cuales se construyen las capacidades." },
            { tipo: "cita", texto: "Las capacidades físicas son condiciones internas de cada organismo, determinadas genéticamente, que se mejoran con el entrenamiento y constituyen los componentes básicos de la condición física.", autor: "Castañer & Camerino (1991)" }
          ]
        },
        {
          id: "mod4", titulo: "Capacidades condicionales", lectura: 7,
          bloques: [
            { tipo: "cita", texto: "Están determinadas por los procesos energéticos del organismo y la capacidad mecánica del sistema musculoesquelético.", autor: "Zatsiorsky (1995)" },
            { tipo: "texto", texto: "Dependen de procesos energéticos y la estructura morfológica: músculo, sistema cardiovascular y palancas óseas." },
            { tipo: "titulo", texto: "Fuerza" },
            { tipo: "texto", texto: "Capacidad del sistema neuromuscular de superar resistencias externas o internas a través de la contracción muscular." },
            { tipo: "cita", texto: "La fuerza muscular es la base de todas las demás capacidades condicionales; sin ella, la velocidad y la resistencia encuentran un techo temprano.", autor: "Bompa (1999)" },
            { tipo: "pasos", items: [
              { titulo: "Fuerza máxima.", texto: "La mayor expresión de tensión posible ante una resistencia." },
              { titulo: "Fuerza explosiva / potencia.", texto: "Producto de fuerza × velocidad; base del rendimiento en la mayoría de los deportes." },
              { titulo: "Fuerza resistencia.", texto: "Capacidad de sostener tensión muscular en el tiempo." }
            ] },
            { tipo: "lista", items: ["Velocidad — acciones motoras en el menor tiempo posible, muy dependiente del sistema nervioso y del tipo de fibra.", "Flexibilidad — rango de movimiento disponible.", "Resistencia — sostener el esfuerzo en el tiempo."] }
          ]
        },
        {
          id: "mod5", titulo: "Capacidades coordinativas", lectura: 6,
          bloques: [
            { tipo: "cita", texto: "Son determinadas y condicionadas principalmente por los procesos de dirección y regulación del movimiento a través del sistema nervioso central.", autor: "Hirtz (1985)" },
            { tipo: "texto", intro: true, texto: "Dependen del sistema nervioso central y periférico. Permiten organizar, controlar y regular el movimiento con precisión, economía y adaptabilidad." },
            { tipo: "lista", items: ["Equilibrio", "Acoplamiento", "Orientación espacio-temporal", "Ritmo", "Reacción", "Diferenciación"] },
            { tipo: "clave", texto: "La activación gamificada de nuestras clases entrena justamente estas capacidades: juegos, parejas y desafíos." }
          ]
        },
        {
          id: "mod6", titulo: "Conceptos clave del movimiento", lectura: 7,
          bloques: [
            { tipo: "regla", numero: 1, texto: "Stack — alineación tórax/pelvis" },
            { tipo: "cita", texto: "La alineación funcional del complejo toracoabdominal es la base del control postural dinámico; la estabilidad se logra gestionando presiones, no con rigidez muscular.", autor: "Kolar (2012)" },
            { tipo: "texto", texto: "La neutralidad o 'stack' es el estado en el que el cuerpo organiza sus estructuras respiratorias y estabilizadoras —diafragma torácico y diafragma pélvico— para gestionar de forma eficiente las presiones internas." },
            { tipo: "regla", numero: 2, texto: "Trenes miofasciales" },
            { tipo: "cita", texto: "La eficiencia del movimiento humano depende de la continuidad tensional entre los tejidos, no de la acción aislada de los músculos.", autor: "Myers" },
            { tipo: "titulo", texto: "5 vías principales" },
            { tipo: "lista", items: ["Línea posterior superficial", "Línea anterior superficial", "Línea lateral", "Línea espiral", "Línea anterior profunda"] },
            { tipo: "resumen", items: ["El movimiento sucede en 3 planos y 3 ejes.", "Programamos patrones globales, no músculos aislados.", "Capacidades condicionales (fuerza, velocidad, flexibilidad) + coordinativas (equilibrio, acoplamiento, orientación).", "Stack y trenes miofasciales: estabilidad por presión y continuidad, no por rigidez."] },
            { tipo: "preguntas", titulo: "Para cerrar el módulo", items: [
              { q: "¿En qué plano sucede una rotación?", opciones: ["Sagital", "Frontal", "Transversal"], correcta: 2, explicacion: "El plano transversal, sobre el eje vertical, es el de las rotaciones." },
              { q: "¿Qué diferencia un movimiento global de uno analítico?", respuesta: "El global involucra múltiples articulaciones y grupos musculares organizados en patrones (sentadilla, dominada); el analítico, una o dos articulaciones (curl de bíceps)." },
              { q: "Verdadero o falso: 'La estabilidad del stack se logra con rigidez muscular.'", opciones: ["Verdadero", "Falso"], correcta: 1, explicacion: "Falso. Se logra gestionando presiones internas (diafragmas torácico y pélvico), no con rigidez." }
            ] }
          ]
        },
        {
          id: "mod7", titulo: "Continuo movilidad–estabilidad", lectura: 6,
          bloques: [
            { tipo: "texto", intro: true, texto: "El cuerpo es una pila de articulaciones que alternan su necesidad principal: una pide movilidad, la siguiente pide estabilidad. Es el enfoque articulación-por-articulación (joint-by-joint) de Mike Boyle y Gray Cook." },
            { tipo: "clave", texto: "Cuando una articulación pierde su rol, la de al lado lo compensa: si el tobillo no se mueve, la rodilla (que debería ser estable) empieza a moverse de más, y aparece el dolor." },
            { tipo: "titulo", texto: "El patrón alternado (de abajo hacia arriba)" },
            { tipo: "tabla", columnas: ["Articulación", "Necesidad principal"], filas: [
              ["Tobillo", "Movilidad"],
              ["Rodilla", "Estabilidad"],
              ["Cadera", "Movilidad"],
              ["Zona media / lumbar", "Estabilidad"],
              ["Columna torácica", "Movilidad"],
              ["Escápula", "Estabilidad"],
              ["Hombro (glenohumeral)", "Movilidad"]
            ] },
            { tipo: "regla", numero: 3, texto: "Movilidad y estabilidad van de la mano" },
            { tipo: "texto", texto: "No es 'o una o la otra': es un continuo. De nada sirve ganar rango si no podés controlarlo. Primero abrir el rango (movilidad), después aprender a sostenerlo bajo carga (estabilidad)." },
            { tipo: "pasos", items: [
              { titulo: "Movilidad.", texto: "Acceder al rango articular disponible, activo y pasivo." },
              { titulo: "Estabilidad.", texto: "Controlar ese rango: producir y resistir fuerza sin perder la posición." },
              { titulo: "Fuerza en el rango.", texto: "Cargar el patrón ya estable para que la mejora sea real y duradera." }
            ] },
            { tipo: "clave", texto: "Por eso en la Preparación de la clase la movilidad y la estabilidad conviven: abrimos rangos y enseguida los controlamos con balance y core." },
            { tipo: "preguntas", titulo: "Para cerrar el módulo", items: [
              { q: "Según el continuo, ¿qué necesita principalmente la cadera?", opciones: ["Estabilidad", "Movilidad"], correcta: 1, explicacion: "La cadera pide movilidad; la zona media de al lado pide estabilidad. Las necesidades alternan." },
              { q: "Si el tobillo pierde movilidad, ¿qué suele pasar?", respuesta: "La rodilla —que debería ser estable— compensa moviéndose de más, y ahí aparecen molestias. Cuando una articulación no cumple su rol, la vecina lo asume." },
              { q: "Verdadero o falso: 'Ganar rango de movilidad alcanza, no hace falta controlarlo.'", opciones: ["Verdadero", "Falso"], correcta: 1, explicacion: "Falso. Un rango sin control es riesgo. Movilidad y estabilidad son un continuo: abrir y luego sostener bajo carga." }
            ] }
          ]
        }
      ]
    },
    {
      id: "man_ninos", categoria: "metodologia",
      titulo: "Entrenamiento en edades tempranas",
      descripcion: "Cómo entrenar a niños y jóvenes: períodos sensibles, principios del entrenamiento infantil y el rol del formador. Verdades y mentiras.",
      autor: "DHARMA", actualizado: "Jun 2026", visibleAlumnos: false,
      modulos: [
        {
          id: "mod1", titulo: "Entrenar para el niño, no del adulto", lectura: 6,
          bloques: [
            { tipo: "texto", intro: true, texto: "El error más común es copiar el entrenamiento del adulto y achicarlo. No se trata de un 'mini entrenamiento': hace falta una metodología pensada para el niño." },
            { tipo: "clave", texto: "El objetivo no es el rendimiento rápido, sino expandir todas las posibilidades motoras para construir un amplio repertorio de movimientos." },
            { tipo: "regla", numero: 1, texto: "No especializar de forma prematura" },
            { tipo: "texto", texto: "La especialización precoz fija estereotipos primitivos y trae estancamientos posteriores. Primero, desarrollo multilateral." },
            { tipo: "cita", texto: "Roma no se hizo en un día, nuestro cuerpo tampoco.", autor: "Sobre el entrenamiento a largo plazo" }
          ]
        },
        {
          id: "mod2", titulo: "Principios del entrenamiento infantil", lectura: 8,
          bloques: [
            { tipo: "texto", intro: true, texto: "Se agrupan en dos grandes bloques que conviene tener siempre presentes." },
            { tipo: "tabla", columnas: ["Tipo", "De qué se ocupa"], filas: [
              ["Biológicos", "Procesos de adaptación orgánica del alumno"],
              ["Pedagógicos", "La metodología que usamos para enseñar"]
            ] },
            { tipo: "titulo", texto: "Los que más pesan a esta edad" },
            { tipo: "pasos", items: [
              { titulo: "Desarrollo multilateral.", texto: "Formación completa en todas las facetas; evita el desgaste unilateral precoz." },
              { titulo: "Individualización.", texto: "Cada niño responde distinto: genética, maduración, motivación, contexto." },
              { titulo: "Progresión.", texto: "Elevación gradual de la carga; ni sobreentrenamiento ni desentrenamiento." },
              { titulo: "Largo plazo.", texto: "Mucho entrenamiento prematuro termina en fracaso físico y mental." }
            ] },
            { tipo: "clave", texto: "La madurez para iniciar un deporte no es solo biológica: la psicológica importa igual o más, y no siempre coinciden con la edad." }
          ]
        },
        {
          id: "mod3", titulo: "El juego como vía", lectura: 5,
          bloques: [
            { tipo: "texto", intro: true, texto: "Las sesiones rígidamente programadas, miméticas del adulto, resultan poco motivantes. El niño busca el juego motriz libre." },
            { tipo: "clave", texto: "Si los gestos son proporcionales a las capacidades de cada uno y se proponen de forma que interesen y diviertan, el objetivo está logrado." },
            { tipo: "titulo", texto: "Cualidades a desarrollar, de a poco" },
            { tipo: "lista", items: ["Capacidad aeróbica", "Amplitud de movimiento", "Fuerza dinámica y resistencia muscular", "Capacidades coordinativas / psicomotrices", "Tiempo de reacción y velocidad gestual"] },
            { tipo: "regla", numero: 2, texto: "Que el niño no se 'queme'" },
            { tipo: "texto", texto: "El aprendizaje prematuro que produce subidas rápidas de rendimiento suele ser antieconómico e inútil, y abrevia la vida deportiva." }
          ]
        },
        {
          id: "mod4", titulo: "Beneficios y rol del formador", lectura: 6,
          bloques: [
            { tipo: "titulo", texto: "Lo que deja un buen entrenamiento" },
            { tipo: "lista", items: ["Más actividad y movimiento coordinado", "Sienta bases para el aprendizaje posterior", "Expande las posibilidades motoras", "Desarrolla el placer por el movimiento", "Crea hábitos de higiene y salud", "Integra socialmente y enseña a ganar y perder"] },
            { tipo: "clave", texto: "Concepto rendimiento-salud: el desarrollo integral del niño sostenido en un proceso pedagógico progresivo, sistemático y variable." },
            { tipo: "cita", texto: "El entrenador aplica la pedagogía y controla el aprendizaje, pero sobre todo evita que el niño se queme.", autor: "Ortega Hurtado" },
            { tipo: "resumen", items: ["Entrenar para el niño, no copiar al adulto.", "Multilateral antes que especialización.", "El juego es la vía, no el obstáculo.", "Largo plazo y rendimiento-salud por encima del éxito inmediato."] },
            { tipo: "preguntas", titulo: "Para cerrar el módulo", items: [
              { q: "¿Cuál es el objetivo central del entrenamiento infantil?", opciones: ["Maximizar el rendimiento cuanto antes", "Expandir el repertorio motor y el desarrollo integral", "Especializar temprano en un deporte"], correcta: 1, explicacion: "El foco es el amplio repertorio motor y el desarrollo integral; el rendimiento llega después y dura más." },
              { q: "¿Por qué evitar la especialización prematura?", respuesta: "Porque fija estereotipos motores primitivos, genera estancamientos posteriores y suele 'quemar' al niño, acortando su vida deportiva." },
              { q: "Verdadero o falso: 'La madurez para iniciar un deporte es solo biológica.'", opciones: ["Verdadero", "Falso"], correcta: 1, explicacion: "Falso. La madurez psicológica pesa igual o más, y no siempre coincide con la edad biológica." }
            ] }
          ]
        }
      ]
    },
    {
      id: "man_grupales", categoria: "metodologia",
      titulo: "Clases grupales DHARMA — el sistema",
      descripcion: "Cómo pensamos una clase grupal: conceptos base, organización, individualización, la estructura de la sesión y los cuatro tipos de clase del centro.",
      autor: "DHARMA", actualizado: "Jun 2026", visibleAlumnos: false,
      modulos: [
        {
          id: "mod1", titulo: "Qué es una clase grupal DHARMA", lectura: 6,
          bloques: [
            { tipo: "texto", intro: true, texto: "Una clase grupal no es un entrenamiento individual hecho de a muchos. Es una experiencia diseñada para que un grupo heterogéneo entrene junto, cada uno en su nivel, hacia un foco común." },
            { tipo: "regla", numero: 1, texto: "El entrenamiento es para todo el mundo, pero no para todos igual" },
            { tipo: "texto", texto: "Misma clase, misma estructura, mismo foco — pero cada persona la transita en su nivel. Por eso todo se adapta: un ejercicio escala de Guerrero a Maestro sin cambiar la lógica de la sesión." },
            { tipo: "clave", texto: "La adherencia está por encima de todo. Lograr que la gente sostenga el proceso es lo más relevante; para el resto basta con ser prolijos y ordenados." },
            { tipo: "titulo", texto: "Dos ejes que no se confunden" },
            { tipo: "tabla", columnas: ["Eje", "Responde a", "Ejemplos"], filas: [
              ["Bloques de la sesión", "El CUÁNDO (orden de la clase)", "Preparación · Activación · Juegos · Principal · Cierre"],
              ["Contenidos / capacidades", "El QUÉ (lo que se trabaja)", "Rodilla, cadera, tracción, empuje, saltos, lanzamientos…"]
            ] },
            { tipo: "clave", texto: "El bloque es el 'cuándo' y el contenido es el 'qué'. Un mismo contenido (ej: saltos) puede vivir en Activación o en el Principal según el objetivo del día." }
          ]
        },
        {
          id: "mod2", titulo: "Organización e individualización", lectura: 8,
          bloques: [
            { tipo: "texto", intro: true, texto: "Agrupar nos ayuda a enfocar las propuestas y a jerarquizar necesidades. Entendiendo el objetivo de la persona, todo es más fácil." },
            { tipo: "titulo", texto: "Las tres grandes poblaciones" },
            { tipo: "pasos", items: [
              { titulo: "Salud y bienestar.", texto: "Sentirse mejor, más energía, vida activa. Foco en adherencia, movilidad y fuerza útil." },
              { titulo: "Rendimiento deportivo.", texto: "Mejorar en un deporte, competitivo o recreativo. Foco en especificidad y demandas." },
              { titulo: "Composición corporal.", texto: "Estética: subir o bajar de peso, relación masa grasa/muscular. Foco en estructura y sobrecarga." }
            ] },
            { tipo: "titulo", texto: "Individualizar dentro del grupo" },
            { tipo: "texto", texto: "La herramienta principal son los niveles: cada ejercicio del bloque principal ofrece una variante por nivel. La persona elige (o el profe le sugiere) según su momento actual." },
            { tipo: "lista", items: ["Niveles: Guerrero · Ninja · Mago · Maestro", "Semáforo de intensidad: escalas de esfuerzo y 'momento actual'", "Regular con peso, rango, velocidad o densidad", "Respetar tiempos biológicos por sobre los sociales"] },
            { tipo: "regla", numero: 2, texto: "Coaching: 2 balas — máximo 2 correcciones por movimiento" },
            { tipo: "texto", texto: "No hablar de más, no decir 'NO', corregir una cosa a la vez, dar referencias externas. Dejar que el error sea parte del aprendizaje mientras no haya riesgo. La técnica se construye a largo plazo." },
            { tipo: "titulo", texto: "Dinámica de clase y manejo del tiempo" },
            { tipo: "lista", items: ["Sectorizar el espacio; ordenar a las personas para que entrenen cómodas", "Pensar la clase en el espacio: ¿la estructura soporta la cantidad de alumnos?", "Organizar las partes para que alcance el tiempo para todo", "El orden de la sesión debe permitirte estar atento a varias cosas a la vez"] },
            { tipo: "preguntas", titulo: "Lista pre-clase (algunas)", items: [
              "¿Tengo claro qué voy a hacer y por qué?",
              "¿Mi estructura soporta la cantidad de alumnos que voy a tener?",
              "¿Tiene la clase continuidad con lo que venimos haciendo?",
              "¿Es el nivel acorde a los alumnos — ni muy fácil ni muy difícil?"
            ] }
          ]
        },
        {
          id: "mod3", titulo: "La estructura de la sesión", lectura: 7,
          bloques: [
            { tipo: "texto", intro: true, texto: "Toda clase grupal sigue la misma columna vertebral de cinco bloques. Cambia el contenido y el peso de cada parte según el tipo de clase, pero el orden da coherencia y un hilo conductor." },
            { tipo: "pasos", items: [
              { titulo: "1 · Preparación.", texto: "Respiración (mecánica + alineación tórax-pelvis), movilidad 3D, estabilidad, balance y core. Prepara el cuerpo para lo que viene." },
              { titulo: "2 · Activación.", texto: "Prender el sistema nervioso: respuesta rápida, reacción, locomoción, movimientos animales." },
              { titulo: "3 · Juegos.", texto: "Reacción, balance, parejas, desafíos. Usan los 3 planos y conectan con la parte principal." },
              { titulo: "4 · Principal.", texto: "El foco de la clase. En Fuerza y Potencia: alta velocidad (saltos, lanzamientos, DLO) y alta intensidad (patrones de fuerza)." },
              { titulo: "5 · Cierre.", texto: "Respiración y vuelta a la calma: bajar pulsaciones, posturas y respiración consciente." }
            ] },
            { tipo: "clave", texto: "Las partes son jerarquizables: según contexto, objetivo y demandas, algunas pesan más, otras se acortan. Pero el hilo conductor se mantiene." },
            { tipo: "regla", numero: 3, texto: "Hilo conductor — lo del principio ayuda a lo del final" },
            { tipo: "titulo", texto: "Fuerza: de la potencia a la fuerza" },
            { tipo: "texto", texto: "En general se respeta la progresión de potencia hacia fuerza (lo más explosivo y técnico, con sistema nervioso fresco). Pueden combinarse o alternarse según la sesión." },
            { tipo: "titulo", texto: "Programar por patrones, full body" },
            { tipo: "lista", items: ["Empuje y tracción (vertical / horizontal)", "Rodilla dominante (sentadilla) y cadera dominante (bisagra)", "Transporte y rotación", "Sub-clasificación: bilateral · bilateral asimétrico · unilateral"] },
            { tipo: "texto", texto: "Cada sesión varía los vectores y planos (A/B/C) para cubrir todo el cuerpo a lo largo de la semana, sin repetir esquemas." }
          ]
        },
        {
          id: "mod4", titulo: "Los tipos de clase del centro", lectura: 9,
          bloques: [
            { tipo: "texto", intro: true, texto: "Cada tipo de clase tiene un foco distinto. La estructura de 5 bloques es la misma; cambia cuál es el bloque principal y qué se prioriza. Esto es lo que vas a encontrar al abrir cada clase en la Biblioteca." },

            { tipo: "titulo", texto: "Movilidad y Respiración" },
            { tipo: "clave", texto: "Objetivo: recuperar y ampliar rangos, mejorar la mecánica respiratoria y la conciencia corporal. Una clase para 'sentir' y controlar el cuerpo." },
            { tipo: "lista", items: ["Principal = movilidad articular 3D + control de rangos + estabilidad", "Respiración protagonista en toda la sesión, no solo al cierre", "Baja intensidad, alto control; ideal como complemento o descarga"] },

            { tipo: "titulo", texto: "Cardio" },
            { tipo: "clave", texto: "Objetivo: acondicionamiento y sistemas energéticos. Mejorar la capacidad de sostener y repetir esfuerzo." },
            { tipo: "lista", items: ["Principal = trabajo intermitente o continuo (locomoción, saltos, transportes a ritmo)", "Se regula por densidad: tiempos de trabajo/pausa", "Outdoor o indoor; foco metabólico con técnica cuidada"] },

            { tipo: "titulo", texto: "Fuerza y Potencia" },
            { tipo: "clave", texto: "Objetivo: producir y aplicar tensión — fuerza, potencia y su transferencia. El corazón del método." },
            { tipo: "lista", items: ["Principal = alta velocidad (saltos, lanzamientos, DLO) → alta intensidad (patrones de fuerza)", "Por niveles (Guerrero→Maestro), full body, patrones rotando A/B/C", "Una barra por bloque; el resto KB, mancuernas, anillas, peso corporal"] },

            { tipo: "titulo", texto: "Musculación" },
            { tipo: "clave", texto: "Objetivo: estético / estructural. Composición corporal e hipertrofia. El nivel se regula individualmente con peso, series y repeticiones — no por variantes de niveles." },
            { tipo: "lista", items: ["Principal = trabajo analítico por zonas (estructura / hipertrofia)", "Más series y repeticiones, descansos pautados, foco en tensión y volumen", "Se programa por músculo/zona más que por patrón global"] },

            { tipo: "resumen", items: ["Una sola estructura de 5 bloques para todas las clases.", "Cambia el foco del bloque Principal según el tipo.", "Fuerza/Potencia y Movilidad/Cardio escalan por niveles; Musculación, por peso/series/reps.", "Al abrir una clase en la Biblioteca, ya sabés cómo fue pensada."] },
            { tipo: "preguntas", titulo: "Para cerrar el módulo", items: [
              { q: "¿Qué diferencia un 'bloque de la sesión' de un 'contenido'?", respuesta: "El bloque es el cuándo (orden: preparación, activación, juegos, principal, cierre). El contenido es el qué se trabaja (patrones, saltos, lanzamientos). Un contenido puede ubicarse en distintos bloques según el objetivo." },
              { q: "¿Cómo se individualiza en Fuerza y Potencia vs. en Musculación?", opciones: ["Ambas por niveles Guerrero→Maestro", "Fuerza/Potencia por niveles; Musculación por peso, series y reps", "Ambas por peso, series y reps"], correcta: 1, explicacion: "Fuerza y Potencia escala por variantes de nivel; Musculación regula la carga individual con peso, series y repeticiones." },
              { q: "Verdadero o falso: 'La parte de Resistencia es un bloque fijo de toda clase grupal.'", opciones: ["Verdadero", "Falso"], correcta: 1, explicacion: "Falso. Con el nuevo esquema, cada clase grupal tiene un foco específico; el acondicionamiento es el foco de la clase de Cardio, no un bloque obligatorio de todas." }
            ] }
          ]
        }
      ]
    },
    {
      id: "man_vias", categoria: "anatomia",
      titulo: "Vías anatómicas y tensegridad",
      descripcion: "Cómo el cuerpo transmite fuerzas como un sistema integrado: los meridianos miofasciales de Myers y el concepto de tensegridad.",
      autor: "DHARMA", actualizado: "Jun 2026", visibleAlumnos: false,
      modulos: [
        {
          id: "mod1", titulo: "Tensegridad: la estructura del cuerpo", lectura: 7,
          bloques: [
            { tipo: "texto", intro: true, texto: "Antes de mover, hay que entender cómo está construido el cuerpo. No es una torre de ladrillos apilados: es una estructura de tensión y compresión que se autoequilibra." },
            { tipo: "cita", texto: "Una estructura de elementos de compresión interconectados por elementos tensiles y elásticos, lo que le otorga su integridad.", autor: "R. Buckminster Fuller" },
            { tipo: "clave", texto: "Tensegridad = tensión + integridad. Compresión discontinua (huesos) flotando en una red de tensión continua (fascia, músculos)." },
            { tipo: "titulo", texto: "Qué significa para el movimiento" },
            { tipo: "lista", items: ["Las fuerzas se reparten por toda la estructura, no se concentran en un punto", "La estructura cambia de forma y la recupera (viscoelástica, no lineal)", "Es dinámica y estable a la vez, en tensión constante", "Gestionar las cargas internas antes de agregar cargas externas"] },
            { tipo: "regla", numero: 1, texto: "Primero gestionar la tensión interna, después la carga externa" },
            { tipo: "titulo", texto: "Mecanotransducción" },
            { tipo: "texto", texto: "Las células 'sienten' las fuerzas mecánicas y las traducen en respuestas biológicas. El estímulo mecánico del entrenamiento llega hasta el tejido y lo remodela: por eso cómo cargamos importa tanto como cuánto." },
            { tipo: "titulo", texto: "La fascia" },
            { tipo: "texto", texto: "Tejido conectivo que rodea y conecta todo: músculos, huesos, órganos y vasos. Elástica y flexible, da soporte, movilidad y protección, y transmite fuerzas además de cumplir función sensorial." },
            { tipo: "clave", texto: "La eficiencia del movimiento depende de la continuidad tensional entre los tejidos, no de la acción aislada de los músculos." }
          ]
        },
        {
          id: "mod2", titulo: "Las vías anatómicas", lectura: 11,
          bloques: [
            { tipo: "texto", intro: true, texto: "Imaginá las costuras de un buzo: recorren la prenda de punta a punta y, si tirás de una, se mueve toda. El cuerpo tiene 'costuras' parecidas hechas de músculo y fascia (el tejido que los envuelve y conecta). Tom Myers las llamó meridianos miofasciales: líneas por las que la fuerza viaja como un tren por sus vías." },
            { tipo: "cita", texto: "Líneas de fuerza que recorren el cuerpo usando músculos y fascias como rutas; los huesos actúan como 'paradas' o puntos de inserción.", autor: "Anatomy Trains — Myers" },
            { tipo: "clave", texto: "Miofascial = mío (músculo) + fascial (fascia). La fascia es la 'tela' que envuelve cada músculo y los conecta entre sí. Una vía es una serie de músculos enlazados por esa tela, que trabajan como un equipo." },
            { tipo: "texto", texto: "Para leer cada línea conviene preguntarse tres cosas: ¿por dónde pasa? (su recorrido), ¿qué hace? (qué movimiento genera o frena) y ¿para qué me sirve al entrenar? Vamos una por una, de la más conocida a la más profunda." },

            { tipo: "titulo", texto: "1 · Línea posterior superficial" },
            { tipo: "texto", texto: "Recorrido: sube por toda la parte de atrás, desde la planta del pie y los gemelos, por los isquiotibiales y los glúteos, sigue por toda la musculatura de la espalda y termina en el cuero cabelludo, sobre la frente. Es la línea que tocás cuando te agachás a tocarte los pies y sentís 'tirar' desde el talón hasta la nuca." },
            { tipo: "texto", texto: "Qué hace: te mantiene de pie. Es la que evita que te vayas hacia adelante por gravedad; genera la extensión (enderezarte) y sostiene la postura erguida. Al entrenar: pesos muertos, puentes y todo lo que sea cadena posterior la cargan." },

            { tipo: "titulo", texto: "2 · Línea anterior superficial" },
            { tipo: "texto", texto: "Recorrido: sube por todo el frente, desde el empeine y la espinilla, por los cuádriceps, los abdominales y el pecho, hasta los lados del cráneo. Es la 'opuesta' de la anterior." },
            { tipo: "texto", texto: "Qué hace: flexiona — te enrolla hacia adelante (acercar el pecho a las rodillas) — y a la vez frena la extensión excesiva, protegiendo la zona de adelante. Anterior y posterior son como dos cinchas que se equilibran: si una está muy tensa, la otra lo sufre. Al entrenar: abdominales y flexiones de cadera la involucran." },

            { tipo: "titulo", texto: "3 · Línea lateral" },
            { tipo: "texto", texto: "Recorrido: por el costado del cuerpo, desde la parte externa del pie y la pierna, sube por la cadera (la 'cartuchera'), zigzaguea por las costillas y llega hasta el oído. Hay una a cada lado." },
            { tipo: "texto", texto: "Qué hace: es la estabilizadora lateral. Evita que te caigas de costado y frena la flexión lateral y parte de la rotación. Es la que trabaja a full cuando estás parado en una sola pierna sin tambalearte. Al entrenar: transportes a una mano (maleta), planchas laterales y trabajo en apoyo unipodal." },

            { tipo: "titulo", texto: "4 · Línea espiral" },
            { tipo: "texto", texto: "Recorrido: es la única que envuelve el cuerpo en hélice, como una bandera enroscada a un mástil. Cruza de un hombro, pasa por la espalda hacia la cadera del lado opuesto, baja por la pierna y vuelve a subir. Conecta lados cruzados." },
            { tipo: "texto", texto: "Qué hace: crea y, sobre todo, controla las rotaciones. Es la que te permite girar el tronco con fuerza y la que estabiliza la pierna al caminar (que la rodilla no se vaya para adentro). Es clave en todo gesto potente y cruzado: lanzar, patear, esprintar. Al entrenar: leñadores, lanzamientos rotacionales y press en zancada." },

            { tipo: "titulo", texto: "5 · Línea anterior profunda" },
            { tipo: "texto", texto: "Recorrido: es la más interna y difícil de 'ver'. Es el núcleo del cuerpo: desde la planta del pie por dentro de la pierna, sube por la cara interna del muslo, pasa por el piso de la pelvis y el diafragma (el músculo de la respiración) y sigue por delante de la columna hasta la base del cráneo y la mandíbula." },
            { tipo: "texto", texto: "Qué hace: es el soporte central, el 'mástil interno' que sostiene todo desde adentro y conecta la respiración con la postura. Cuando respirás bien y armás el 'stack' (tórax sobre pelvis), estás trabajando esta línea. Al entrenar: respiración 360°, core profundo y transportes overhead." },
            { tipo: "clave", texto: "Regla práctica: las superficiales (posterior, anterior, lateral) mueven y frenan; la profunda sostiene desde adentro. Sin un buen centro (línea profunda), las de afuera trabajan de más y aparece el dolor." },

            { tipo: "titulo", texto: "Vías de los brazos y funcionales" },
            { tipo: "texto", texto: "Las vías de los brazos conectan el tronco con las manos en cuatro rutas (las que empujan, las que traccionan, por delante y por detrás): son las que se cargan al hacer flexiones, dominadas o cualquier agarre." },
            { tipo: "texto", texto: "Las vías funcionales cruzan el cuerpo en diagonal conectando un hombro con la cadera contraria (por delante y por detrás). Son el 'cableado' de los gestos atléticos y cruzados: el saque, el golpe, el lanzamiento. Trabajan junto con la línea espiral." },
            { tipo: "clave", texto: "Cuando programás un patrón rotacional o cruzado (leñador, lanzamiento, press en zancada) estás cargando las vías espirales y funcionales: el cuerpo trabaja como un todo conectado, no como un músculo aislado." }
          ]
        },
        {
          id: "mod3", titulo: "Llevarlo a la práctica", lectura: 5,
          bloques: [
            { tipo: "titulo", texto: "Patrones anatómicos motrices" },
            { tipo: "texto", intro: true, texto: "Pensar en vías cambia cómo elegimos ejercicios: buscamos cargar líneas completas, no rellenar músculos. Un buen patrón integra varias vías a la vez." },
            { tipo: "lista", items: ["Movimientos multi-planares antes que analíticos aislados", "Cargar la desaceleración y el control, no solo la fase concéntrica", "Anti-rotación y rotación para entrenar las líneas espirales", "Transportes y suspensiones para la continuidad tensional"] },
            { tipo: "resumen", items: ["El cuerpo es una estructura de tensegridad: tensión continua, compresión discontinua.", "La fuerza viaja por vías miofasciales, no por músculos sueltos.", "Las vías son una categoría útil para pensar, no un dogma.", "Programar patrones integrados = cargar vías completas."] },
            { tipo: "preguntas", titulo: "Para cerrar el manual", items: [
              { q: "¿Qué es la tensegridad?", respuesta: "Una estructura donde elementos de compresión (huesos) flotan interconectados por una red de tensión continua (fascia y músculos), que se autoequilibra y es dinámica y estable a la vez." },
              { q: "¿Qué línea miofascial controla principalmente las rotaciones?", opciones: ["Línea posterior superficial", "Línea espiral", "Línea anterior superficial"], correcta: 1, explicacion: "La línea espiral envuelve el cuerpo en hélice y crea/controla las rotaciones." },
              { q: "Verdadero o falso: 'Las vías anatómicas son una ciencia exacta y cerrada.'", opciones: ["Verdadero", "Falso"], correcta: 1, explicacion: "Falso. Son una categoría conveniente para explicar el movimiento integrado, una herramienta de pensamiento, no un dogma." }
            ] }
          ]
        }
      ]
    },
    {
      id: "man_clavas_kb", categoria: "metodologia",
      titulo: "Clavas y pesas rusas — práctico",
      descripcion: "Herramientas no convencionales: historia, para qué sirven y cómo entrenarlas. Clavas (clubbells) y kettlebells.",
      autor: "DHARMA", actualizado: "Jun 2026", visibleAlumnos: false,
      modulos: [
        {
          id: "mod1", titulo: "Por qué herramientas no convencionales", lectura: 4,
          bloques: [
            { tipo: "texto", intro: true, texto: "Las mejores herramientas son las que nos dejan movernos en distintos planos y aplicar fuerza sin restringir el movimiento. Las clavas y las pesas rusas son las preferidas, pero el principio vale para mazas, cuerdas, bolsas y hasta piedras." },
            { tipo: "clave", texto: "No es la herramienta, es la función. La carga descentrada (lejos del eje) obliga al cuerpo a estabilizar y a trabajar la continuidad tensional — justo lo que vimos en vías y tensegridad." }
          ]
        },
        {
          id: "mod2", titulo: "Las clavas (clubbells)", lectura: 7,
          bloques: [
            { tipo: "titulo", texto: "Algo de historia" },
            { tipo: "texto", intro: true, texto: "El clubbell o clava tiene una historia que se remonta a Persia y al subcontinente indio. Las 'Indian Clubs' originales eran de madera, gigantescas; hoy se fabrican en fundición, como las pesas rusas." },
            { tipo: "texto", texto: "Con el auge de las kettlebells en el entrenamiento militar, funcional y CrossFit, se revivió el interés por las clavas — ya sin connotación religiosa o cultural, enfocadas solo en fuerza, movilidad y coordinación." },
            { tipo: "titulo", texto: "Para qué sirven" },
            { tipo: "lista", items: ["Fuerza de agarre (grip) y salud de la mano", "Fuerza, resistencia y rango de hombro — preserva autonomía", "Salud del tejido conectivo y las articulaciones (pre/rehab)", "Movimiento multi-planar y fuerza equilibrada", "Entrenamiento de la desaceleración (frenar la herramienta)", "Estabilidad del core: anti-rotación", "Fuerza aplicada en distintos planos y vectores"] },
            { tipo: "clave", texto: "La clava brilla en los rangos amplios y en el control de la desaceleración: el peso queda lejos del agarre, así que cada movimiento te obliga a frenar y estabilizar." },
            { tipo: "titulo", texto: "Movimientos base" },
            { tipo: "pasos", items: [
              { titulo: "Preparación: movilidad en espiral.", texto: "Antes de cargar, abrir hombros y columna torácica con la propia clava liviana." },
              { titulo: "Press y pull-over.", texto: "Llevar la clava de adelante hacia atrás de la cabeza, controlando el arco." },
              { titulo: "Círculos anteriores y posteriores.", texto: "El gesto identitario: la clava gira alrededor del hombro en ambos sentidos." },
              { titulo: "Péndulos y bloqueos estáticos.", texto: "Balancear y frenar en seco (desaceleración); sostener posiciones." },
              { titulo: "Mills.", texto: "Combinación fluida de círculos que cruza los planos; el 'molino' de las clavas." }
            ] }
          ]
        },
        {
          id: "mod3", titulo: "Las pesas rusas (kettlebells)", lectura: 8,
          bloques: [
            { tipo: "titulo", texto: "Algo de historia" },
            { tipo: "texto", intro: true, texto: "La kettlebell ('campana de hierro') tiene su cuna en Rusia — San Petersburgo es un punto de referencia. En Latinoamérica hubo que fabricarlas a mano y viajar a buscar el conocimiento; de ahí nació toda una escuela de difusión en español." },
            { tipo: "texto", texto: "Hay formatos: las 'iron cast' negras (la forma cambia con el peso) y las 'pro grade' de competición, de medidas estándar más específicas para el deporte." },
            { tipo: "titulo", texto: "Por qué funciona" },
            { tipo: "clave", texto: "El centro de masa está por debajo y por fuera del agarre. Eso convierte cada balanceo en un trabajo de cadera explosivo y de control del core — el patrón de bisagra por excelencia." },
            { tipo: "titulo", texto: "Grips, core y patrones" },
            { tipo: "lista", items: ["Grips: agarre normal, rack (apoyada en el antebrazo), bottoms-up (de cabeza), overhead", "Core convencional vs. no convencional: anti-extensión, anti-rotación y anti-flexión lateral", "Se integran a los patrones: bisagra (swing), empuje (press), tracción, sentadilla, transporte"] },
            { tipo: "titulo", texto: "Movimientos clave" },
            { tipo: "pasos", items: [
              { titulo: "Péndulo / Swing.", texto: "La base. Bisagra de cadera explosiva: la kettlebell flota por impulso de cadera, no de brazos." },
              { titulo: "Overhead (press / sostén).", texto: "Llevar y estabilizar la campana arriba; hombro y core integrados." },
              { titulo: "Transporte de Cook.", texto: "Caminar con la kettlebell en rack o overhead, sosteniendo la posición del core." },
              { titulo: "TGU (Turkish Get-Up).", texto: "Levantada turca: pasar de acostado a de pie con la campana arriba. Movilidad, estabilidad y control en un solo ejercicio." },
              { titulo: "Molinos (windmills).", texto: "Bisagra lateral con carga arriba: rango de cadera y fuerza del core en rotación-lateralización." }
            ] },
            { tipo: "resumen", items: ["Clava: rangos amplios, desaceleración, hombro y agarre.", "Kettlebell: bisagra explosiva, core integrado, carga descentrada.", "Ambas entrenan el cuerpo como sistema, no músculos aislados.", "Primero técnica y control; después carga."] },
            { tipo: "preguntas", titulo: "Para cerrar el manual", items: [
              { q: "¿Cuál es el patrón base de la kettlebell?", opciones: ["Empuje", "Bisagra de cadera (swing)", "Sentadilla"], correcta: 1, explicacion: "El swing es la base: una bisagra de cadera explosiva donde la campana flota por impulso de la cadera." },
              { q: "¿Por qué la carga descentrada de estas herramientas es valiosa?", respuesta: "Porque el peso queda lejos del eje/agarre, obligando al cuerpo a estabilizar, frenar (desaceleración) y trabajar la continuidad tensional — entrena el cuerpo como sistema integrado." },
              { q: "¿Qué ejercicio de kettlebell integra movilidad, estabilidad y control en una sola secuencia?", opciones: ["Swing", "TGU (levantada turca)", "Press"], correcta: 1, explicacion: "El TGU pasa de acostado a de pie sosteniendo la campana arriba: moviliza, estabiliza y controla en un mismo movimiento." }
            ] }
          ]
        }
      ]
    }
  ],
  // Los "turnos" concretos se generan en runtime combinando estas plantillas con
  // las fechas de la semana visible. Las reservas viven en localStorage por instancia.
  tiposClase: [
    { id: "fuerza", nombre: "Fuerza y Potencia", color: "#E84D23" },
    { id: "yoga", nombre: "Yoga", color: "#489DA3" },
    { id: "musculacion", nombre: "Musculación", color: "#2A3B47" },
    { id: "pilates", nombre: "Pilates", color: "#B5683C" },
    { id: "outdoor", nombre: "Outdoor Cardio", color: "#4E7A51" },
    { id: "movilidad", nombre: "Movilidad y Respiración", color: "#6E7BA8" },
    { id: "personalizado", nombre: "Personalizado", color: "#000000" },
    { id: "personalizado_ex", nombre: "Personalizado Exclusivo", color: "#8A6D3B" }
  ],
  // dia: 1=Lun … 6=Sáb, 0=Dom · seed = reservas iniciales (nombres) para que la demo no esté vacía
  horarios: [
    // LUNES
    { id: "t_lun_08f", tipo: "fuerza", dia: 1, hora: "08:00", dur: 60, coach: "Juan", sala: "Sala 1", cupo: 12, seed: ["Caro", "Mar", "Naza", "Fede", "Sofi", "Tomi", "Vale"] },
    { id: "t_lun_09m", tipo: "musculacion", dia: 1, hora: "09:00", dur: 60, coach: "Cami", sala: "Sala 2", cupo: 10, seed: ["Agus", "Pao", "Juli"] },
    { id: "t_lun_18y", tipo: "yoga", dia: 1, hora: "18:00", dur: 60, coach: "Sofi", sala: "Box", cupo: 14, seed: ["Bel", "Flor", "Meli", "Vale", "Pao"] },
    { id: "t_lun_19f", tipo: "fuerza", dia: 1, hora: "19:00", dur: 60, coach: "Juan", sala: "Sala 1", cupo: 12, seed: ["Nico", "Rama", "Gonza", "Santi", "Fede", "Tomi", "Caro", "Mar", "Agus", "Lu", "Juli", "Naza"] },
    { id: "t_lun_20mo", tipo: "movilidad", dia: 1, hora: "20:00", dur: 45, coach: "Lu", sala: "Box", cupo: 16, seed: ["Flor", "Bel"] },
    // MARTES
    { id: "t_mar_07o", tipo: "outdoor", dia: 2, hora: "07:00", dur: 60, coach: "Naza", sala: "Outdoor", cupo: 18, seed: ["Santi", "Gonza", "Rama", "Meli"] },
    { id: "t_mar_09p", tipo: "pilates", dia: 2, hora: "09:00", dur: 50, coach: "Sofi", sala: "Sala 2", cupo: 10, seed: ["Pao", "Bel", "Flor", "Vale", "Juli", "Caro"] },
    { id: "t_mar_18f", tipo: "fuerza", dia: 2, hora: "18:00", dur: 60, coach: "Cami", sala: "Sala 1", cupo: 12, seed: ["Tomi", "Fede", "Nico", "Agus", "Mar"] },
    { id: "t_mar_19y", tipo: "yoga", dia: 2, hora: "19:00", dur: 60, coach: "Sofi", sala: "Box", cupo: 14, seed: ["Flor", "Meli", "Bel"] },
    // MIÉRCOLES
    { id: "t_mie_08f", tipo: "fuerza", dia: 3, hora: "08:00", dur: 60, coach: "Juan", sala: "Sala 1", cupo: 12, seed: ["Caro", "Mar", "Naza", "Fede", "Sofi"] },
    { id: "t_mie_12mu", tipo: "musculacion", dia: 3, hora: "12:00", dur: 60, coach: "Cami", sala: "Sala 2", cupo: 10, seed: ["Agus", "Juli", "Nico", "Rama"] },
    { id: "t_mie_18p", tipo: "pilates", dia: 3, hora: "18:00", dur: 50, coach: "Sofi", sala: "Sala 2", cupo: 10, seed: ["Pao", "Vale", "Bel", "Flor"] },
    { id: "t_mie_19f", tipo: "fuerza", dia: 3, hora: "19:00", dur: 60, coach: "Juan", sala: "Sala 1", cupo: 12, seed: ["Nico", "Gonza", "Santi", "Fede", "Tomi", "Caro", "Mar"] },
    // JUEVES
    { id: "t_jue_07o", tipo: "outdoor", dia: 4, hora: "07:00", dur: 60, coach: "Naza", sala: "Outdoor", cupo: 18, seed: ["Santi", "Rama", "Meli", "Gonza", "Agus"] },
    { id: "t_jue_09y", tipo: "yoga", dia: 4, hora: "09:00", dur: 60, coach: "Sofi", sala: "Box", cupo: 14, seed: ["Bel", "Flor", "Pao"] },
    { id: "t_jue_18f", tipo: "fuerza", dia: 4, hora: "18:00", dur: 60, coach: "Cami", sala: "Sala 1", cupo: 12, seed: ["Tomi", "Fede", "Nico", "Mar", "Caro", "Vale"] },
    { id: "t_jue_20mo", tipo: "movilidad", dia: 4, hora: "20:00", dur: 45, coach: "Lu", sala: "Box", cupo: 16, seed: ["Flor", "Bel", "Meli"] },
    // VIERNES
    { id: "t_vie_08f", tipo: "fuerza", dia: 5, hora: "08:00", dur: 60, coach: "Juan", sala: "Sala 1", cupo: 12, seed: ["Caro", "Naza", "Fede", "Sofi", "Tomi", "Mar"] },
    { id: "t_vie_12mu", tipo: "musculacion", dia: 5, hora: "12:00", dur: 60, coach: "Cami", sala: "Sala 2", cupo: 10, seed: ["Agus", "Juli", "Nico"] },
    { id: "t_vie_18y", tipo: "yoga", dia: 5, hora: "18:00", dur: 60, coach: "Sofi", sala: "Box", cupo: 14, seed: ["Bel", "Flor", "Meli", "Pao", "Vale"] },
    { id: "t_vie_19pe", tipo: "personalizado", dia: 5, hora: "19:00", dur: 45, coach: "Juan", sala: "Sala 1", cupo: 2, seed: ["Cliente de prueba"] },
    // SÁBADO
    { id: "t_sab_09f", tipo: "fuerza", dia: 6, hora: "09:00", dur: 60, coach: "Cami", sala: "Sala 1", cupo: 12, seed: ["Caro", "Mar", "Naza", "Tomi", "Fede", "Agus", "Nico", "Rama"] },
    { id: "t_sab_10o", tipo: "outdoor", dia: 6, hora: "10:00", dur: 60, coach: "Naza", sala: "Outdoor", cupo: 18, seed: ["Santi", "Gonza", "Meli", "Flor"] },
    { id: "t_sab_11mo", tipo: "movilidad", dia: 6, hora: "11:00", dur: 45, coach: "Lu", sala: "Box", cupo: 16, seed: ["Bel", "Pao", "Vale"] }
  ],

  // ---- MEMBRESÍAS: planes disponibles ----
  // categoria: agrupa la vista de planes (grupales vs. personalizado en grupo).
  // tipo: creditos (N clases) · ilimitada
  planes: [
    { id: "gr4", nombre: "Grupales — 4 clases", categoria: "Grupales", tipo: "creditos", creditos: 4, dias: 30, precio: 20000, color: "#489DA3" },
    { id: "gr8", nombre: "Grupales — 8 clases", categoria: "Grupales", tipo: "creditos", creditos: 8, dias: 30, precio: 30000, color: "#489DA3" },
    { id: "gr12", nombre: "Grupales — 12 clases", categoria: "Grupales", tipo: "creditos", creditos: 12, dias: 30, precio: 40000, color: "#489DA3" },
    { id: "gril", nombre: "Grupales — Ilimitado", categoria: "Grupales", tipo: "ilimitada", creditos: null, dias: 30, precio: 50000, color: "#E84D23" },
    { id: "pg4", nombre: "Personalizado en grupo — 4 sesiones", categoria: "Personalizado en grupo", tipo: "creditos", creditos: 4, dias: 30, precio: 60000, color: "#000000" },
    { id: "pg8", nombre: "Personalizado en grupo — 8 sesiones", categoria: "Personalizado en grupo", tipo: "creditos", creditos: 8, dias: 30, precio: 100000, color: "#000000" }
  ],
  // ---- SOCIOS: membresías activas migradas de EVO (fecha corte: ver Last sync) ----
  socios: {
    "p_evo_ro_fernandez_119": {
      "planId": "gril",
      "inicio": "2026-07-20",
      "vencimiento": "2026-08-19",
      "creditos": null,
      "pagos": []
    },
    "exl5": {
      "planId": "gril",
      "inicio": "2026-07-13",
      "vencimiento": "2026-08-12",
      "creditos": null,
      "pagos": []
    },
    "p_evo_ari_puente_124": {
      "planId": "gr8",
      "inicio": "2026-07-15",
      "vencimiento": "2026-08-14",
      "creditos": 8,
      "pagos": []
    },
    "p_evo_belu_medina_125": {
      "planId": "gr8",
      "inicio": "2026-07-01",
      "vencimiento": "2026-07-31",
      "creditos": 8,
      "pagos": []
    },
    "exl4": {
      "planId": "gr12",
      "inicio": "2026-07-20",
      "vencimiento": "2026-08-19",
      "creditos": 12,
      "pagos": []
    },
    "p_evo_dai_valverde_porras_129": {
      "planId": "gril",
      "inicio": "2026-07-01",
      "vencimiento": "2026-07-31",
      "creditos": null,
      "pagos": []
    },
    "p_evo_luna_martinez_133": {
      "planId": "gril",
      "inicio": "2026-07-13",
      "vencimiento": "2026-08-12",
      "creditos": null,
      "pagos": []
    },
    "exl12": {
      "planId": "gr8",
      "inicio": "2026-07-21",
      "vencimiento": "2026-08-20",
      "creditos": 8,
      "pagos": []
    },
    "p_evo_nacho_holst_135": {
      "planId": "gr8",
      "inicio": "2026-07-10",
      "vencimiento": "2026-08-09",
      "creditos": 8,
      "pagos": []
    },
    "p_evo_omri_goren_136": {
      "planId": "gr12",
      "inicio": "2026-07-23",
      "vencimiento": "2026-08-22",
      "creditos": 12,
      "pagos": []
    },
    "p_evo_facu_gorosito_137": {
      "planId": "gr12",
      "inicio": "2026-07-06",
      "vencimiento": "2026-08-05",
      "creditos": 12,
      "pagos": []
    },
    "exl20": {
      "planId": "gril",
      "inicio": "2026-07-07",
      "vencimiento": "2026-08-06",
      "creditos": null,
      "pagos": []
    },
    "p_evo_nico_lescano_143": {
      "planId": "gr12",
      "inicio": "2026-07-12",
      "vencimiento": "2026-08-11",
      "creditos": 12,
      "pagos": []
    },
    "p_evo_maqui_fioretti_145": {
      "planId": "gr12",
      "inicio": "2026-07-13",
      "vencimiento": "2026-08-12",
      "creditos": 12,
      "pagos": []
    },
    "exl31": {
      "planId": "gr12",
      "inicio": "2026-07-27",
      "vencimiento": "2026-08-26",
      "creditos": 12,
      "pagos": []
    },
    "exl6": {
      "planId": "gr12",
      "inicio": "2026-07-08",
      "vencimiento": "2026-08-07",
      "creditos": 12,
      "pagos": []
    },
    "p_evo_seba_tabak_156": {
      "planId": "gr12",
      "inicio": "2026-07-08",
      "vencimiento": "2026-08-07",
      "creditos": 12,
      "pagos": []
    },
    "p_evo_cami_ferrari_157": {
      "planId": "gril",
      "inicio": "2026-07-13",
      "vencimiento": "2026-08-12",
      "creditos": null,
      "pagos": []
    },
    "p_evo_mai_bartozetti_165": {
      "planId": "gril",
      "inicio": "2026-07-17",
      "vencimiento": "2026-08-16",
      "creditos": null,
      "pagos": []
    },
    "p_evo_natalia_diaz_167": {
      "planId": "gril",
      "inicio": "2026-07-17",
      "vencimiento": "2026-08-16",
      "creditos": null,
      "pagos": []
    },
    "p_evo_aura_dinarte_170": {
      "planId": "gr12",
      "inicio": "2026-07-02",
      "vencimiento": "2026-08-01",
      "creditos": 12,
      "pagos": []
    },
    "exl24": {
      "planId": "gr12",
      "inicio": "2026-07-08",
      "vencimiento": "2026-08-07",
      "creditos": 12,
      "pagos": []
    },
    "exl42": {
      "planId": "gr12",
      "inicio": "2026-07-10",
      "vencimiento": "2026-08-09",
      "creditos": 12,
      "pagos": []
    },
    "p_evo_maruchi_perez_175": {
      "planId": "gr12",
      "inicio": "2026-07-13",
      "vencimiento": "2026-08-12",
      "creditos": 12,
      "pagos": []
    },
    "p_evo_sol_soaje_177": {
      "planId": "gr8",
      "inicio": "2026-07-24",
      "vencimiento": "2026-08-23",
      "creditos": 8,
      "pagos": []
    },
    "p_evo_lea_tucs_184": {
      "planId": "gr12",
      "inicio": "2026-07-06",
      "vencimiento": "2026-08-05",
      "creditos": 12,
      "pagos": []
    },
    "p_evo_soledad_garcia_201": {
      "planId": "gril",
      "inicio": "2026-07-10",
      "vencimiento": "2026-08-09",
      "creditos": null,
      "pagos": []
    },
    "exl57": {
      "planId": "gril",
      "inicio": "2026-07-05",
      "vencimiento": "2026-08-04",
      "creditos": null,
      "pagos": []
    },
    "exl61": {
      "planId": "gr12",
      "inicio": "2026-07-02",
      "vencimiento": "2026-08-01",
      "creditos": 12,
      "pagos": []
    },
    "p_evo_juani_alberti_212": {
      "planId": "gr12",
      "inicio": "2026-07-05",
      "vencimiento": "2026-08-04",
      "creditos": 12,
      "pagos": []
    },
    "p_evo_vicky_luna_216": {
      "planId": "gr12",
      "inicio": "2026-07-24",
      "vencimiento": "2026-08-23",
      "creditos": 12,
      "pagos": []
    },
    "exl76": {
      "planId": "gr12",
      "inicio": "2026-07-20",
      "vencimiento": "2026-08-19",
      "creditos": 12,
      "pagos": []
    },
    "exl77": {
      "planId": "gr8",
      "inicio": "2026-07-27",
      "vencimiento": "2026-08-26",
      "creditos": 8,
      "pagos": []
    },
    "exl79": {
      "planId": "gr8",
      "inicio": "2026-07-08",
      "vencimiento": "2026-08-07",
      "creditos": 8,
      "pagos": []
    },
    "p_evo_meli_cittadella_351": {
      "planId": "gr12",
      "inicio": "2026-07-12",
      "vencimiento": "2026-08-11",
      "creditos": 12,
      "pagos": []
    },
    "exl86": {
      "planId": "gr8",
      "inicio": "2026-07-21",
      "vencimiento": "2026-08-20",
      "creditos": 8,
      "pagos": []
    },
    "exl87": {
      "planId": "gr8",
      "inicio": "2026-07-13",
      "vencimiento": "2026-08-12",
      "creditos": 8,
      "pagos": []
    },
    "exl89": {
      "planId": "gr8",
      "inicio": "2026-07-14",
      "vencimiento": "2026-08-13",
      "creditos": 8,
      "pagos": []
    },
    "p_evo_cata_monti_373": {
      "planId": "gr8",
      "inicio": "2026-07-15",
      "vencimiento": "2026-08-14",
      "creditos": 8,
      "pagos": []
    },
    "p_evo_vicky_maffrand_381": {
      "planId": "gr8",
      "inicio": "2026-07-07",
      "vencimiento": "2026-08-06",
      "creditos": 8,
      "pagos": []
    },
    "exl102": {
      "planId": "gr8",
      "inicio": "2026-07-06",
      "vencimiento": "2026-08-05",
      "creditos": 8,
      "pagos": []
    },
    "exl100": {
      "planId": "gr12",
      "inicio": "2026-07-01",
      "vencimiento": "2026-07-31",
      "creditos": 12,
      "pagos": []
    },
    "exl101": {
      "planId": "gr12",
      "inicio": "2026-07-01",
      "vencimiento": "2026-07-31",
      "creditos": 12,
      "pagos": []
    },
    "exl106": {
      "planId": "gr8",
      "inicio": "2026-07-24",
      "vencimiento": "2026-08-23",
      "creditos": 8,
      "pagos": []
    },
    "exl108": {
      "planId": "gr8",
      "inicio": "2026-07-13",
      "vencimiento": "2026-08-12",
      "creditos": 8,
      "pagos": []
    },
    "p_evo_augusto_pollo_421": {
      "planId": "gril",
      "inicio": "2026-07-23",
      "vencimiento": "2026-08-22",
      "creditos": null,
      "pagos": []
    }
  },

  // ---- EVENTOS INTERNOS de la agenda (reuniones, etc.) ----
  // repite: días de semana (0=Dom..6=Sáb) para recurrencia; vacío = puntual en 'fecha'
  eventosAgenda: [
    { id: "ev_reunion", titulo: "Reunión de profes", fecha: "2026-06-01", hora: "13:00", dur: 60, coach: "Equipo", color: "#1C1E20", repite: [1] }
  ],

  // ---- BIBLIOTECA DE EJERCICIOS ----
  // familia: preparacion | activacion | principal — agrupa visualmente.
  // niveles (capacidad): true = los ejercicios de la sección admiten progresión por niveles.
  ejerciciosSecciones: [
    { id: "equilibrio", nombre: "Equilibrio / Vestibular", familia: "preparacion", niveles: false },
    { id: "respiracion", nombre: "Respiración 360°", familia: "preparacion", niveles: false },
    { id: "movilidad", nombre: "Movilidad global", familia: "preparacion", niveles: false },
    { id: "estabilidad", nombre: "Estabilidad", familia: "preparacion", niveles: true },
    { id: "core", nombre: "Core", familia: "preparacion", niveles: true },
    { id: "act_saltos", nombre: "Saltos", familia: "activacion", niveles: false },
    { id: "act_lanzamientos", nombre: "Lanzamientos", familia: "activacion", niveles: false },
    { id: "act_peso", nombre: "Peso corporal", familia: "activacion", niveles: false },
    { id: "jg_tenis", nombre: "Juegos · Pelotas de tenis", familia: "activacion", niveles: false },
    { id: "jg_baston", nombre: "Juegos · Bastón de escoba", familia: "activacion", niveles: false },
    { id: "jg_individual", nombre: "Juegos · Individuales (peso corporal)", familia: "activacion", niveles: false },
    { id: "jg_lucha", nombre: "Juegos · Lucha / enfrentamiento (parejas)", familia: "activacion", niveles: false },
    { id: "jg_agilidad", nombre: "Juegos · Agilidad y reacción (parejas)", familia: "activacion", niveles: false },
    { id: "jg_equipo", nombre: "Juegos · Creativos en equipo", familia: "activacion", niveles: false },
    { id: "rodilla_bi", nombre: "Rodilla · Bilateral", familia: "principal", niveles: true },
    { id: "rodilla_uni", nombre: "Rodilla · Unilateral", familia: "principal", niveles: true },
    { id: "cadera_bi", nombre: "Cadera · Bilateral", familia: "principal", niveles: true },
    { id: "cadera_uni", nombre: "Cadera · Unilateral", familia: "principal", niveles: true },
    { id: "mixtos", nombre: "Mixtos / Combinados", familia: "principal", niveles: false },
    { id: "empuje_bi", nombre: "Empuje · Bilateral", familia: "principal", niveles: true },
    { id: "empuje_uni", nombre: "Empuje · Unilateral", familia: "principal", niveles: true },
    { id: "traccion_bi", nombre: "Tracción · Bilateral", familia: "principal", niveles: true },
    { id: "traccion_uni", nombre: "Tracción · Unilateral", familia: "principal", niveles: true },
    { id: "potencia", nombre: "Potencia / Saltos", familia: "principal", niveles: true },
    { id: "car_frenos", nombre: "Frenos", familia: "carrera", niveles: false },
    { id: "car_postural", nombre: "Postural", familia: "carrera", niveles: false },
    { id: "car_lineal", nombre: "Lineal", familia: "carrera", niveles: false },
    { id: "car_lateral", nombre: "Lateral", familia: "carrera", niveles: false },
    { id: "car_cruzado", nombre: "Cruzado", familia: "carrera", niveles: false },
    { id: "car_girar", nombre: "Girar y arrancar", familia: "carrera", niveles: false },
    { id: "car_drive", nombre: "Drive de rodilla", familia: "carrera", niveles: false },
    { id: "car_brazos", nombre: "Acción de brazos", familia: "carrera", niveles: false },
    { id: "car_tobillo", nombre: "Stiffness de tobillo", familia: "carrera", niveles: false },
    { id: "colgarse", nombre: "Colgarse / Grip", familia: "principal", niveles: false },
    { id: "rotacion", nombre: "Rotación / Anti-rotación", familia: "principal", niveles: false },
    { id: "acc_hombro", nombre: "Hombro (deltoides)", familia: "accesorios", niveles: false },
    { id: "acc_biceps", nombre: "Bíceps", familia: "accesorios", niveles: false },
    { id: "acc_triceps", nombre: "Tríceps", familia: "accesorios", niveles: false },
    { id: "acc_gluteo", nombre: "Glúteo", familia: "accesorios", niveles: false },
    { id: "acc_isquios", nombre: "Isquiotibiales", familia: "accesorios", niveles: false },
    { id: "acc_cuadriceps", nombre: "Cuádriceps", familia: "accesorios", niveles: false },
    { id: "acc_aductores", nombre: "Aductores", familia: "accesorios", niveles: false },
    { id: "acc_abductores", nombre: "Abductores", familia: "accesorios", niveles: false },
    { id: "acc_gemelos", nombre: "Gemelos", familia: "accesorios", niveles: false },
    { id: "acc_cuello", nombre: "Cuello", familia: "accesorios", niveles: false },
    { id: "acc_tobillo", nombre: "Tobillo", familia: "accesorios", niveles: false },
    { id: "acc_otros", nombre: "Otros accesorios", familia: "accesorios", niveles: false },
    { id: "dep_surf", nombre: "Surf", familia: "deportivo", niveles: false }
  ],
  // niveles?: [4 nombres] solo en ejercicios de fuerza/potencia/core que progresan.
  ejercicios: [
    // Equilibrio / Vestibular
    { id: "eq1", seccion: "equilibrio", nombre: "Caminata con ojos arriba / abajo / laterales" },
    { id: "eq2", seccion: "equilibrio", nombre: "Seguir el dedo a 1 pie" },
    { id: "eq3", seccion: "equilibrio", nombre: "Giros de cabeza con ojos cerrados" },
    // Respiración 360°
    { id: "re1", seccion: "respiracion", nombre: "Respiración 360° en cuadrupedia" },
    { id: "re2", seccion: "respiracion", nombre: "Respiración 360° acostado" },
    { id: "re3", seccion: "respiracion", nombre: "Respiración 360° en estocada" },
    { id: "re4", seccion: "respiracion", nombre: "Respiración 360° caminando" },
    { id: "re5", seccion: "respiracion", nombre: "Respiración 360° en la pared" },
    // Movilidad global
    { id: "mo1", seccion: "movilidad", nombre: "Sentadilla manos en la cabeza + rotación" },
    { id: "mo2", seccion: "movilidad", nombre: "Vuelta al mundo" },
    { id: "mo3", seccion: "movilidad", nombre: "Paloma + arquero" },
    { id: "mo4", seccion: "movilidad", nombre: "90/90 a extensión", video: "https://youtube.com/shorts/9nhhZIpIZ7A?si=57fSCmSxN53hGC5l" },
    { id: "mo5", seccion: "movilidad", nombre: "Sentadilla lateral a trípode" },
    { id: "mo6", seccion: "movilidad", nombre: "Rotación espinal piernas cruzadas" },
    { id: "mo7", seccion: "movilidad", nombre: "Media luna de piernas" },
    { id: "mo8", seccion: "movilidad", nombre: "Copa de té" },
    { id: "mo9", seccion: "movilidad", nombre: "Infinito" },
    { id: "mo10", seccion: "movilidad", nombre: "Balanceo arriba / abajo" },
    // Estabilidad
    { id: "es1", seccion: "estabilidad", nombre: "Perro a plancha alta / Bird dog" },
    { id: "es2", seccion: "estabilidad", nombre: "Plancha lateral con tap-toques" },
    { id: "es3", seccion: "estabilidad", nombre: "Bicho muerto + ruido" },
    { id: "es4", seccion: "estabilidad", nombre: "Pallof press (parado)" },
    { id: "es5", seccion: "estabilidad", nombre: "Cambio de pie tipo valija" },
    { id: "es6", seccion: "estabilidad", nombre: "Vuelta al mundo" },
    { id: "es7", seccion: "estabilidad", nombre: "Leñador" },
    { id: "es8", seccion: "estabilidad", nombre: "Caminata en puente piernas extendidas" },
    { id: "es9", seccion: "estabilidad", nombre: "Molino / medio molino" },
    { id: "es10", seccion: "estabilidad", nombre: "Levantada turca (a lo turco)" },
    // Core
    { id: "co1", seccion: "core", nombre: "Rodillas al pecho" },
    { id: "co2", seccion: "core", nombre: "Rodillas al pecho pasando" },
    { id: "co3", seccion: "core", nombre: "Rollout con TRX", niveles: ["Deslizamiento / roll out a la pared", "Roll out de rodillas", "Roll out de rodillas con apoyos alejados", "Roll out de pie"], nota: "Producí el movimiento solo en hombros y caderas manteniendo la plancha (anti-extensión). No arquees la lumbar." },
    // Activación — Saltos
    { id: "as1", seccion: "act_saltos", nombre: "Pasos en cuclillas" },
    { id: "as2", seccion: "act_saltos", nombre: "Tijeras" },
    { id: "as3", seccion: "act_saltos", nombre: "Laterales" },
    { id: "as4", seccion: "act_saltos", nombre: "Laterales con rotación" },
    // Activación — Lanzamientos
    { id: "al1", seccion: "act_lanzamientos", nombre: "Lanzamiento de pecho" },
    { id: "al2", seccion: "act_lanzamientos", nombre: "Lanzamiento sobre la cabeza" },
    { id: "al3", seccion: "act_lanzamientos", nombre: "Lanzamiento con rotación" },
    { id: "al4", seccion: "act_lanzamientos", nombre: "Lanzamiento con pasos" },
    // Activación — Peso corporal
    { id: "ap1", seccion: "act_peso", nombre: "Sapo + patada" },
    { id: "ap2", seccion: "act_peso", nombre: "Break dance" },
    { id: "ap3", seccion: "act_peso", nombre: "Cangrejo" },
    { id: "ap4", seccion: "act_peso", nombre: "Abro y cierro manos" },
    { id: "ap5", seccion: "act_peso", nombre: "Toco cielo y suelo" },
    // ---- PRINCIPALES (fuerza) — taxonomía por patrón y plano ----
    { id: "p1", seccion: "rodilla_bi", nombre: "Sentadilla back", plano: "sagital", niveles: ["Sentadilla a cajón / goblet", "Sentadilla con barra (front o trasera)", "Sentadilla overhead / búlgara", "Pistol (sentadilla a una pierna)"], nota: "Bajá profundo manteniendo las curvas; rodillas alineadas con la punta de los pies, con abducción y rotación externa de cadera para no colapsar a medial." },
    { id: "p2", seccion: "rodilla_bi", nombre: "Sentadilla frontal", plano: "sagital", video: "https://youtu.be/45zwbpbEl-k" },
    { id: "p3", seccion: "rodilla_bi", nombre: "Sentadilla en copa", plano: "sagital" },
    { id: "p4", seccion: "rodilla_bi", nombre: "Sentadilla trap bar", plano: "sagital" },
    { id: "p5", seccion: "rodilla_bi", nombre: "Sentadilla con pelota", plano: "sagital" },
    { id: "p6", seccion: "cadera_bi", nombre: "Peso muerto", plano: "sagital", niveles: ["Peso muerto con KB", "Peso muerto rumano con mancuernas", "Peso muerto convencional con barra", "Peso muerto a déficit con barra"], nota: "Bisagra de cadera con lumbar estable: extendé primero rodillas y después caderas, barra cerca del cuerpo." },
    { id: "p7", seccion: "cadera_bi", nombre: "Peso muerto rumano", plano: "sagital" },
    { id: "p8", seccion: "cadera_bi", nombre: "Peso muerto sumo", plano: "sagital" },
    { id: "p9", seccion: "cadera_bi", nombre: "Peso muerto KB", plano: "sagital" },
    { id: "p10", seccion: "cadera_bi", nombre: "Peso muerto con banda", plano: "sagital" },
    { id: "p11", seccion: "cadera_bi", nombre: "Empuje de cadera en suelo", plano: "sagital" },
    { id: "p12", seccion: "cadera_bi", nombre: "Empuje de cadera elevado (hip thrust)", plano: "sagital", niveles: ["Puente de glúteos (2 piernas)", "Hip thrust con barra", "Hip thrust a 1 pie / con banda", "Hip thrust a 1 pie con carga"], nota: "Estabilidad lumbar con movilidad de cadera: extendé con los glúteos hasta nivelar la pelvis con los muslos, sin arquear la lumbar." },
    { id: "p13", seccion: "cadera_bi", nombre: "Empuje de cadera en suiza", plano: "sagital" },
    { id: "p14", seccion: "rodilla_uni", nombre: "Estocada", plano: "sagital" },
    { id: "p15", seccion: "rodilla_uni", nombre: "Podio frontal", plano: "sagital" },
    { id: "p16", seccion: "rodilla_uni", nombre: "Búlgara", plano: "sagital" },
    { id: "p17", seccion: "rodilla_uni", nombre: "Skater", plano: "sagital", video: "https://youtu.be/aHX2NOlNubo" },
    { id: "p18", seccion: "rodilla_uni", nombre: "Sentadilla lateral", plano: "frontal", niveles: ["Sentadilla lateral pies fijos", "Sentadilla lateral con paso", "Sentadilla lateral c/paso y cargada", "Sentadilla lateral c/paso y cargada a sentadilla cruzada"], nota: "Dominante de cadera/rodilla en el plano frontal; mantené el raquis estable durante la carga y la rotación." },
    { id: "p19", seccion: "rodilla_uni", nombre: "Pistol", plano: "sagital", niveles: ["Sentadilla a cajón a 1 pierna", "Pistol sentado (a cajón)", "Skater / cosaco", "Pistol completo"], nota: "Unilateral muy dominante de rodilla; alta exigencia de movilidad y estabilidad de rodilla y lumbar. Controlá el descenso.", video: "https://youtu.be/Z0TzofPBY0o" },
    { id: "p20", seccion: "cadera_uni", nombre: "Peso muerto a un pie", plano: "sagital", niveles: ["Peso muerto con KB (2 piernas)", "Peso muerto a 1 pierna asistido (tocando)", "Peso muerto a 1 pierna con mancuerna", "Peso muerto a 1 pierna con barra"], nota: "Bisagra de cadera unilateral; lumbar estable y peso cerca del cuerpo. Controlá la cadera de apoyo para no rotar." },
    { id: "p21", seccion: "cadera_uni", nombre: "Podio lateral", plano: "sagital" },
    { id: "p22", seccion: "cadera_uni", nombre: "Búlgara (cadera)", plano: "sagital" },
    { id: "p23", seccion: "cadera_uni", nombre: "Elevación a un pie", plano: "sagital" },
    { id: "p24", seccion: "cadera_uni", nombre: "Elevación asimétrica", plano: "sagital" },
    { id: "p25", seccion: "cadera_uni", nombre: "Peso muerto asimétrico", plano: "sagital" },
    { id: "p26", seccion: "mixtos", nombre: "Sent. lateral KB de un lado a otro (dinámico)", plano: "frontal" },
    { id: "p27", seccion: "mixtos", nombre: "PM 1p + Sent. lateral KB", plano: "multiplanar" },
    { id: "p28", seccion: "mixtos", nombre: "Sent. lateral KB + cargada con rotación", plano: "multiplanar" },
    { id: "p29", seccion: "mixtos", nombre: "PM 1p + cargada + estocada", plano: "sagital" },
    { id: "p30", seccion: "mixtos", nombre: "PM 1p + cargada + estocada con rotación", plano: "sagital" },
    { id: "p31", seccion: "empuje_bi", nombre: "Banco plano", plano: "sagital", niveles: ["Floor press con mancuernas", "Banco plano con barra", "Banco inclinado / agarre cerrado", "Banco con arco y cadenas"], nota: "Escápulas retraídas en el descenso y neutras en el empuje; antebrazos perpendiculares al piso. Usá el leg drive." },
    { id: "p32", seccion: "empuje_bi", nombre: "Banco con mancuernas", plano: "sagital" },
    { id: "p33", seccion: "empuje_bi", nombre: "Banco con KB", plano: "sagital" },
    { id: "p34", seccion: "empuje_bi", nombre: "Empuje en suelo con barra", plano: "sagital" },
    { id: "p35", seccion: "empuje_bi", nombre: "Empuje en suelo con KB/MC", plano: "sagital" },
    { id: "p36", seccion: "empuje_bi", nombre: "Fuerza de brazo (flexión)", plano: "sagital", niveles: ["Flexión inclinada / a la pared", "Flexión completa en el piso", "Flexión declinada (pies elevados)", "Flexión a una mano / con aplauso"], nota: "Mantené la plancha: en la bajada flexioná el codo y extendé el hombro, antebrazo perpendicular. Estabilizá la escápula antes de empujar." },
    { id: "p37", seccion: "empuje_bi", nombre: "Fuerza de brazo declinada", plano: "sagital" },
    { id: "p38", seccion: "empuje_bi", nombre: "Fuerza de brazo inclinada", plano: "sagital" },
    { id: "p39", seccion: "empuje_bi", nombre: "Fuerza de brazo con sobrecarga", plano: "sagital" },
    { id: "p40", seccion: "empuje_bi", nombre: "Press militar (vertical)", plano: "sagital", niveles: ["Press de pie a 1 mano (back up press)", "Press estricto con barra/mancuernas", "Push press", "Jerk (split) / push press pesado"], nota: "Empuje vertical sin inclinar el tronco; movilidad de hombro con escápula estable. El push press suma el impulso de piernas." },
    { id: "p41", seccion: "empuje_uni", nombre: "Fuerza de brazo 1m slider abducción", plano: "multiplanar" },
    { id: "p42", seccion: "empuje_uni", nombre: "Fuerza de brazo 1m slider flexión", plano: "multiplanar" },
    { id: "p43", seccion: "empuje_uni", nombre: "Fuerza de brazo 1m slider limpia piso", plano: "multiplanar" },
    { id: "p44", seccion: "empuje_uni", nombre: "Fuerza de brazo 1m asistida", plano: "multiplanar" },
    { id: "p45", seccion: "empuje_uni", nombre: "Fuerza de brazo 1m asimétrico", plano: "multiplanar" },
    { id: "p46", seccion: "empuje_uni", nombre: "Fuerza de brazo 1m excéntrico", plano: "multiplanar" },
    { id: "p47", seccion: "empuje_uni", nombre: "Banco con mancuerna a 1 mano", plano: "sagital" },
    { id: "p48", seccion: "empuje_uni", nombre: "Banco con KB a 1 mano", plano: "sagital" },
    { id: "p49", seccion: "empuje_uni", nombre: "Empuje en suelo KB/MC a 1 mano", plano: "sagital" },
    { id: "p50", seccion: "traccion_bi", nombre: "Dominada", plano: "sagital", niveles: ["Dominada asistida con banda / jalón horizontal", "Dominada estricta", "Dominada con lastre", "Dominada a una mano (progresión)"], nota: "Activá las escápulas antes de subir; llegá con el pecho o el mentón sobre la barra. Evitá patadas y sacudones." },
    { id: "p51", seccion: "traccion_bi", nombre: "Remo con barra (Pendlay)", plano: "sagital", niveles: ["Remo invertido / con bandas", "Remo Pendlay con barra", "Remo a una mano (unilateral)", "Remo Pendlay pesado con pausa"], nota: "Tronco cerca de paralelo con columna neutra; jalá hacia el abdomen sin perder el core. No separes mucho los codos." },
    { id: "p52", seccion: "traccion_bi", nombre: "Remo en anillas / TRX", plano: "sagital" },
    { id: "p53", seccion: "traccion_bi", nombre: "Jalón al pecho (polea)", plano: "sagital" },
    { id: "p54", seccion: "traccion_uni", nombre: "Remo a 1 mano con mancuerna", plano: "sagital" },
    { id: "p55", seccion: "traccion_uni", nombre: "Remo renegado", plano: "sagital", video: "https://youtu.be/UzooTDSa9bA" },
    { id: "p56", seccion: "traccion_uni", nombre: "Serrucho", plano: "sagital" },
    { id: "p57", seccion: "potencia", nombre: "Caminador", plano: "sagital" },
    { id: "p58", seccion: "potencia", nombre: "Salto y caigo", plano: "sagital" },
    { id: "p59", seccion: "potencia", nombre: "Salto adelante", plano: "sagital" },
    { id: "p60", seccion: "potencia", nombre: "Salto rodillas al pecho", plano: "sagital" },
    { id: "p61", seccion: "potencia", nombre: "Swing", plano: "sagital", niveles: ["Bisagra / hike con KB (start-stop)", "Swing ruso (a la altura del pecho)", "Swing pesado", "Swing americano / a una mano"], nota: "La altura la da el empuje de la pelvis, no los brazos. Columna estable; la extensión la generan los glúteos. No es para novicios.", video: "https://drive.google.com/file/d/1K59HCU2RIMmPkZOsyobfc40tIYEyqYmN/view" },
    { id: "p62", seccion: "potencia", nombre: "Combina 3 extensiones", plano: "sagital" },
    // ---- Juegos (clasificados por bloque) ----
    { id: "jg1", seccion: "jg_tenis", nombre: "Malabares en sentadilla", nota: "Sentadilla isométrica contra la pared (90°). Hacer malabares con 2 pelotas (o lanzar una de mano a mano) sin perder la postura ni la altura de la cadera." },
    { id: "jg2", seccion: "jg_tenis", nombre: "Plancha alta cruzada (parejas)", nota: "Frente a frente en plancha alta. Pasarse la pelota rodando o con un pique corto. Mantener la pelvis estable sin rotar el core al quedar a un brazo." },
    { id: "jg3", seccion: "jg_tenis", nombre: "Rebote de espaldas", nota: "De espaldas a una pared. Lanzar la pelota hacia atrás por entre las piernas, girar rápido (pivote) y atraparla en el aire o al primer pique." },
    { id: "jg4", seccion: "jg_tenis", nombre: "El esquive de piernas (parejas)", nota: "Uno lanza la pelota al ras del suelo hacia los pies del compañero. El otro realiza un skipping rápido o salto para esquivarla. Trabajo de agilidad de pies." },
    { id: "jg5", seccion: "jg_tenis", nombre: "Cangrejo coordinativo", nota: "Posición de caminata de cangrejo (boca arriba, apoyo de manos y pies, cadera arriba). Avanzar mientras se pasa la pelota de mano en mano por arriba del abdomen." },
    { id: "jg6", seccion: "jg_tenis", nombre: "Tenis de manos (1 vs 1)", nota: "Delimitar un cuadrado de 2×2 m con un cono en medio. Juegan golpeando la pelota con la palma de la mano; debe pegar un pique en el campo rival." },
    { id: "jg7", seccion: "jg_tenis", nombre: "Atrapa el cono", nota: "Lanzar la pelota verticalmente hacia el techo con máxima potencia. Reaccionar y atraparla en el aire usando un cono invertido como guante." },
    { id: "jg8", seccion: "jg_tenis", nombre: "Drop extremo", nota: "El coach sostiene la pelota a la altura del hombro y la suelta. El alumno arranca 3 m atrás en posición de start, sale en velocidad y debe atraparla antes del segundo pique." },
    { id: "jg9", seccion: "jg_tenis", nombre: "Estocadas con malabar", nota: "Caminata en estocadas continuas (lunge walking). Mientras se avanza, lanzar la pelota hacia arriba y atraparla con la misma mano en cada paso (disociación motriz)." },
    { id: "jg10", seccion: "jg_tenis", nombre: "La muralla humana (parejas)", nota: "Alumno A de espaldas a la pared. Alumno B (detrás de A) lanza la pelota con fuerza hacia la pared. A debe reaccionar al estímulo visual del rebote y atraparla." },
    { id: "jg11", seccion: "jg_tenis", nombre: "Lanza, toca suelo y atrapa", nota: "Lanzar la pelota alta en vertical. Antes de que caiga, tocar el suelo con ambas manos en posición de sentadilla y atraparla en el aire." },
    { id: "jg12", seccion: "jg_tenis", nombre: "El reloj en plancha (grupal)", nota: "Grupo de 4 a 6 personas en círculo en plancha alta. Introducir de 2 a 3 pelotas que deben pasarse de mano en mano hacia la derecha sin que se detengan." },
    { id: "jg13", seccion: "jg_tenis", nombre: "Pinza de dedos en estocada", nota: "Sostener una pelota en cada mano usando solo la yema de los dedos (agarre de pinza, fuerza de antebrazo). Mantener la presión mientras se hacen estocadas estáticas." },
    { id: "jg14", seccion: "jg_tenis", nombre: "Puntería en cuadrupedia", nota: "Posición de oso (cuadrupedia baja con rodillas a 2 cm del suelo). Con una mano, lanzar la pelota e intentar derribar un cono colocado a 3 m." },
    { id: "jg15", seccion: "jg_tenis", nombre: "Pase de pies en V-sit (parejas)", nota: "Sentados frente a frente en V-sit (pies y espalda en el aire, manos atrás solo para equilibrio). Pasarse la pelota usando únicamente los tobillos/pies." },
    { id: "jg16", seccion: "jg_tenis", nombre: "Atrapada con salto explosivo", nota: "Desde sentadilla profunda, lanzar la pelota verticalmente. Realizar un salto al cajón o salto vertical explosivo y atrapar la pelota en el punto más alto." },
    { id: "jg17", seccion: "jg_tenis", nombre: "Sprint al pique largo", nota: "Lanzar la pelota con fuerza contra el suelo hacia adelante (pique alto). Salir en sprint y atraparla antes de que toque el suelo por segunda vez, a los 5–8 m." },
    { id: "jg18", seccion: "jg_tenis", nombre: "Desplazamiento lateral dinámico (parejas)", nota: "Alumno A se desplaza lateralmente (shuttle) entre dos conos. B le lanza la pelota a los extremos de forma aleatoria; A la atrapa con freno excéntrico y la devuelve." },
    { id: "jg19", seccion: "jg_tenis", nombre: "Equilibrio unipodal cruzado (parejas)", nota: "Parados en un solo pie frente a frente. Pasarse la pelota cruzado: lanzar con mano derecha, el compañero atrapa con mano izquierda." },
    { id: "jg20", seccion: "jg_tenis", nombre: "Malabar sobre inestabilidad", nota: "Parado sobre un Bosu, almohadilla de equilibrio o disco de rotación. Lanzar e intercambiar dos pelotas de tenis de forma continua sin perder el eje." },
    { id: "jg21", seccion: "jg_baston", nombre: "El bastón volador (ronda grupal)", nota: "Alumnos en ronda, cada uno con su bastón vertical apoyado en el piso. A la señal, sueltan su bastón y corren hacia la derecha a atrapar el del compañero antes de que caiga." },
    { id: "jg22", seccion: "jg_baston", nombre: "Equilibrio isométrico", nota: "Sentadillas continuas manteniendo el bastón en equilibrio vertical sobre la palma de una mano (o sobre un dedo). Foco en control visual y propiocepción." },
    { id: "jg23", seccion: "jg_baston", nombre: "Paso de valla", nota: "Sostener el bastón horizontal con agarre prono frente al cuerpo. Pasar una pierna por encima y luego la otra para quedar con el bastón atrás sin soltarlo. Movilidad de cadera." },
    { id: "jg24", seccion: "jg_baston", nombre: "La hélice del core", nota: "Pasar el bastón alrededor del cuerpo (cintura, cabeza, piernas) a máxima velocidad cambiando de mano. Mantener el torso completamente rígido (anti-rotación)." },
    { id: "jg25", seccion: "jg_baston", nombre: "Giro 360°", nota: "Dejar el bastón vertical en el piso, soltarlo, realizar un giro completo sobre el eje corporal (360°) y volver a atraparlo antes de que caiga." },
    { id: "jg26", seccion: "jg_baston", nombre: "Flexiones inestables", nota: "Flexiones de brazos apoyando ambas manos sobre el bastón horizontal en el suelo. Exige co-contracción de hombros y core." },
    { id: "jg27", seccion: "jg_baston", nombre: "Salto de valla en parejas", nota: "Alumno A arrodillado sostiene el bastón horizontal a 20 cm del suelo. B realiza saltos laterales continuos a pies juntos sobre el bastón durante 30 segundos." },
    { id: "jg28", seccion: "jg_baston", nombre: "Sentadilla OHS con rotación", nota: "Sentadilla profunda con bastón sobre la cabeza (overhead squat). En la fase isométrica abajo, rotar el torso a la derecha, luego a la izquierda, y extender rodillas." },
    { id: "jg29", seccion: "jg_baston", nombre: "El limbo abdominal (grupal)", nota: "Dos alumnos sostienen el bastón horizontal. El resto pasa por debajo inclinando el torso hacia atrás. Trabajo excéntrico de cuádriceps y control de zona media." },
    { id: "jg30", seccion: "jg_baston", nombre: "Remo unipodal", nota: "Parado en un solo pie. Simular el movimiento cíclico de remar en kayak con el bastón a máxima velocidad sin perder el equilibrio ni flexionar la columna." },
    { id: "jg31", seccion: "jg_individual", nombre: "El desafío de la zapatilla (shoe get-up)", nota: "Acostado boca arriba, colocar una zapatilla o cono sobre la planta del pie apuntando al techo. Pararse por completo y volver a acostarse sin que el objeto caiga del pie." },
    { id: "jg32", seccion: "jg_individual", nombre: "El rollo ninja", nota: "Sentado en el suelo, rodar hacia atrás sobre la columna y usar el impulso hacia adelante para ponerse de pie de un solo golpe sin apoyar las manos." },
    { id: "jg33", seccion: "jg_individual", nombre: "La plancha jenga", nota: "En plancha alta, colocar un bloque o cono en la zona lumbar. Transicionar de plancha alta a plancha baja (antebrazos) y dar pasos laterales sin tirar el objeto." },
    { id: "jg34", seccion: "jg_individual", nombre: "La grulla ciega", nota: "Equilibrio unipodal con ojos cerrados. Tocar en secuencia: punta de la nariz, rodilla de la pierna libre y el suelo con la mano, sin abrir los ojos ni perder estabilidad." },
    { id: "jg35", seccion: "jg_individual", nombre: "El giro del oso (360° en cuadrupedia)", nota: "Posición de oso (rodillas a 2 cm del suelo). Dar un giro completo de 360° moviendo manos y pies coordinadamente sin que las rodillas toquen el piso ni se eleven." },
    { id: "jg36", seccion: "jg_individual", nombre: "Salto de precisión ninja", nota: "Salto en largo bidireccional desde el lugar hacia una línea objetivo. Clavar la caída estricta (stick the landing) y congelarse 3 segundos sin pasos de ajuste." },
    { id: "jg37", seccion: "jg_lucha", nombre: "Toque de hombros", nota: "Frente a frente en plancha alta. Intentar tocar los hombros del rival con una mano mientras se defiende bloqueando los ataques. Estabilidad de core y hombro." },
    { id: "jg38", seccion: "jg_lucha", nombre: "Robo de medias (o conos)", nota: "Colocar un cono o pechera en la parte trasera del pantalón. En cuclillas / estocada baja, intentar quitar el objeto del rival protegiendo el propio." },
    { id: "jg39", seccion: "jg_lucha", nombre: "Empuje de palmas", nota: "Frente a frente, pies fijos y palmas contra palmas. Usar fintas, empujes o amagues rápidos para desestabilizar al rival. Pierde quien mueva un pie del piso." },
    { id: "jg40", seccion: "jg_lucha", nombre: "Gallo de pelea", nota: "En posición unipodal o cuclillas con brazos cruzados. Empujar al compañero usando solo los hombros para que pierda el equilibrio o apoye el pie libre." },
    { id: "jg41", seccion: "jg_lucha", nombre: "La sombra resistida", nota: "Alumno A intenta avanzar en sprint lineal. B lo sujeta firmemente de la cintura ofreciendo resistencia activa. Foco en la fase de empuje y potencia de piernas." },
    { id: "jg42", seccion: "jg_lucha", nombre: "Tira y afloja (con toalla)", nota: "Ambos sujetan los extremos de una toalla en sentadilla profunda isométrica. Tirar con fuerza controlada para arrastrar al rival o hacer que pierda la postura." },
    { id: "jg43", seccion: "jg_agilidad", nombre: "El espejo fugaz", nota: "Alumno A es el líder y realiza desplazamientos libres (laterales, saltos, caídas al piso). B copia los movimientos en tiempo real reflejando la velocidad." },
    { id: "jg44", seccion: "jg_agilidad", nombre: "¡Simón dice... cono!", nota: "Frente a frente con un cono en medio. El coach dicta partes del cuerpo a tocar (cabeza, rodillas). Al escuchar \"¡cono!\", el primero en agarrarlo gana el punto." },
    { id: "jg45", seccion: "jg_agilidad", nombre: "Caza de sombras", nota: "En un cuadrado de 4×4 m, A escapa cambiando de dirección. B lo persigue intentando mantener una distancia menor a 1 m en todo momento." },
    { id: "jg46", seccion: "jg_agilidad", nombre: "Cruce de ochos", nota: "Dos conos separados 3 m. Ambos arrancan en el centro y corren dibujando un \"8\" alrededor de los conos. El objetivo es alcanzar y tocar la espalda del rival." },
    { id: "jg47", seccion: "jg_agilidad", nombre: "El guardián del arco", nota: "Dos arcos pequeños con conos. A (atacante) intenta cruzar corriendo cualquiera de los arcos. B (defensor) solo se mueve lateralmente para bloquear el paso." },
    { id: "jg48", seccion: "jg_agilidad", nombre: "Reacción al aplauso en skipping", nota: "Skipping alto en el lugar. 1 aplauso = caer a burpee y pararse al instante. 2 aplausos = salto tuck (rodillas al pecho). Foco en velocidad de reacción auditiva." },
    { id: "jg49", seccion: "jg_equipo", nombre: "Los constructores y destructores", nota: "20 conos esparcidos. Equipo A (constructores) los pone boca abajo; equipo B (destructores) los voltea boca arriba. Tiempo: 1 minuto a máxima velocidad." },
    { id: "jg50", seccion: "jg_equipo", nombre: "Piedra, papel o tijera con burpee", nota: "En parejas, juegan en sentadilla isométrica. El que pierde ejecuta 2 burpees explosivos mientras el ganador descansa. Gana el primero a 5 puntos." },
    { id: "jg51", seccion: "jg_equipo", nombre: "Pasamanos humano", nota: "Grupo alineado hombro con hombro en plancha alta. El último de la fila pasa gateando por debajo de la estructura y se coloca al principio. Avanzar hasta cruzar el salón." },
    { id: "jg52", seccion: "jg_equipo", nombre: "El reloj de soga", nota: "El coach en el centro hace girar una soga larga al ras del suelo. Los alumnos en círculo la saltan cronometradamente. Penalización por tocarla: 5 sentadillas saltadas." },
    { id: "jg53", seccion: "jg_equipo", nombre: "Carrera de orugas", nota: "Equipos de 4 en fila sentados, sujetando los tobillos del compañero de atrás. Avanzar coordinando la flexión de cadera y tracción de brazos sin soltarse." },
    { id: "jg54", seccion: "jg_equipo", nombre: "Tres en línea humano (tic-tac-toe)", nota: "Matriz de 3×3 aros a 10 m. Relevos de velocidad (uno por equipo) para colocar una pechera en los aros. Gana el equipo que forme la línea primero. Decisión bajo fatiga." },
    // ---- TÉCNICA DE CARRERA (drills en orden de progresión) ----
    { id: "car1", seccion: "car_frenos", nombre: "Caídas al piso" },
    { id: "car2", seccion: "car_frenos", nombre: "Caídas al piso con carga" },
    { id: "car3", seccion: "car_frenos", nombre: "Caídas al piso combinadas" },
    { id: "car4", seccion: "car_frenos", nombre: "Caídas al cajón" },
    { id: "car5", seccion: "car_frenos", nombre: "Combinado" },
    { id: "car6", seccion: "car_frenos", nombre: "Caída + caos" },
    { id: "car7", seccion: "car_frenos", nombre: "Con banda adelante" },
    { id: "car8", seccion: "car_frenos", nombre: "Con banda lateral" },
    { id: "car9", seccion: "car_frenos", nombre: "Empujado por pareja (lineal)" },
    { id: "car10", seccion: "car_frenos", nombre: "Empujado por pareja (multidirección)" },
    { id: "car11", seccion: "car_postural", nombre: "Wall drill iso" },
    { id: "car12", seccion: "car_postural", nombre: "Wall drill dinámico" },
    { id: "car13", seccion: "car_postural", nombre: "Piso" },
    { id: "car14", seccion: "car_postural", nombre: "Piso con banda" },
    { id: "car15", seccion: "car_postural", nombre: "Piso con disco" },
    { id: "car16", seccion: "car_postural", nombre: "Piso con cajón" },
    { id: "car17", seccion: "car_postural", nombre: "Piso con lanzamiento" },
    { id: "car18", seccion: "car_postural", nombre: "Combinado" },
    { id: "car19", seccion: "car_postural", nombre: "Combinado explosivo / caos" },
    { id: "car20", seccion: "car_postural", nombre: "Cargada al cajón" },
    { id: "car21", seccion: "car_lineal", nombre: "Wall drill iso" },
    { id: "car22", seccion: "car_lineal", nombre: "Wall drill dinámico" },
    { id: "car23", seccion: "car_lineal", nombre: "Piso control" },
    { id: "car24", seccion: "car_lineal", nombre: "Piso ritmo" },
    { id: "car25", seccion: "car_lineal", nombre: "Parejas inclinado control" },
    { id: "car26", seccion: "car_lineal", nombre: "Parejas inclinado ritmo" },
    { id: "car27", seccion: "car_lineal", nombre: "Piso con lanzamiento" },
    { id: "car28", seccion: "car_lineal", nombre: "Combinado" },
    { id: "car29", seccion: "car_lineal", nombre: "Combinado explosivo / caos" },
    { id: "car30", seccion: "car_lineal", nombre: "Cargada al cajón" },
    { id: "car31", seccion: "car_lateral", nombre: "Wall drill iso" },
    { id: "car32", seccion: "car_lateral", nombre: "Wall drill dinámico" },
    { id: "car33", seccion: "car_lateral", nombre: "Piso control" },
    { id: "car34", seccion: "car_lateral", nombre: "Piso ritmo" },
    { id: "car35", seccion: "car_lateral", nombre: "Parejas inclinado control" },
    { id: "car36", seccion: "car_lateral", nombre: "Parejas inclinado ritmo" },
    { id: "car37", seccion: "car_lateral", nombre: "1 vs 1 espejo" },
    { id: "car38", seccion: "car_lateral", nombre: "Combinado" },
    { id: "car39", seccion: "car_lateral", nombre: "Combinado explosivo / caos" },
    { id: "car40", seccion: "car_lateral", nombre: "Landmine" },
    { id: "car41", seccion: "car_cruzado", nombre: "Wall drill iso" },
    { id: "car42", seccion: "car_cruzado", nombre: "Wall drill dinámico" },
    { id: "car43", seccion: "car_cruzado", nombre: "Piso control" },
    { id: "car44", seccion: "car_cruzado", nombre: "Piso ritmo" },
    { id: "car45", seccion: "car_cruzado", nombre: "Parejas inclinado control" },
    { id: "car46", seccion: "car_cruzado", nombre: "Parejas inclinado ritmo" },
    { id: "car47", seccion: "car_cruzado", nombre: "Piso con lanzamiento" },
    { id: "car48", seccion: "car_cruzado", nombre: "Combinado" },
    { id: "car49", seccion: "car_cruzado", nombre: "Combinado explosivo / caos" },
    { id: "car50", seccion: "car_cruzado", nombre: "Landmine" },
    { id: "car51", seccion: "car_girar", nombre: "Girar y arrancar en pareja" },
    { id: "car52", seccion: "car_drive", nombre: "Skipping sin brazos" },
    { id: "car53", seccion: "car_drive", nombre: "Skipping con palo arriba" },
    { id: "car54", seccion: "car_drive", nombre: "Partida foco externo" },
    { id: "car55", seccion: "car_drive", nombre: "Wall drill pistón" },
    { id: "car56", seccion: "car_drive", nombre: "Cambio de paso x1" },
    { id: "car57", seccion: "car_drive", nombre: "Cambio de paso x2" },
    { id: "car58", seccion: "car_drive", nombre: "Cambio de paso x3" },
    { id: "car59", seccion: "car_brazos", nombre: "Braceo sentado" },
    { id: "car60", seccion: "car_brazos", nombre: "Braceo caminando" },
    { id: "car61", seccion: "car_brazos", nombre: "Braceo iso en pareja" },
    // ---- Base de videos (Excel) — clasificados por patrón/zona muscular ----
    { id: "vb1", seccion: "acc_gemelos", nombre: "Gemelos maquina", plano: "sagital", video: "https://www.youtube.com/shorts/goHLe1fninw" },
    { id: "vb2", seccion: "acc_isquios", nombre: "Curl isquio mancuerna", plano: "sagital", video: "https://youtu.be/leFSrMGBh0c?si=yulvHbTYyIDIDARo" },
    { id: "vb3", seccion: "acc_hombro", nombre: "Vuelos laterales", plano: "frontal", video: "https://www.youtube.com/shorts/JmkFJW6dfh0" },
    { id: "vb4", seccion: "acc_biceps", nombre: "Bíceps mancuernas", plano: "sagital", video: "https://www.youtube.com/watch?v=j1FjaWu5Am4" },
    { id: "vb5", seccion: "acc_tobillo", nombre: "Tobillo en estocada", plano: "sagital", video: "https://youtube.com/shorts/27zsxZxgUd0?si=PYhSnNyph82IXVka" },
    { id: "vb6", seccion: "acc_abductores", nombre: "Abducción de cadera", plano: "frontal", video: "https://youtube.com/shorts/nMjttUh-6AM" },
    { id: "vb7", seccion: "acc_gluteo", nombre: "Patada de gluteo en polea", plano: "sagital", video: "https://youtube.com/shorts/z7msJmXNTj0" },
    { id: "vb8", seccion: "acc_abductores", nombre: "Abduccion de cadera con banda- posicion lateral", plano: "frontal", video: "https://www.youtube.com/watch?v=u2p6nH7WEhE&ab_channel=ProetEjercicioTerap%C3%A9utico" },
    { id: "vb9", seccion: "acc_abductores", nombre: "Abducción de cadera sentado con banda", plano: "frontal", video: "https://youtu.be/GoeqVgJdWak?si=vTWNMkXOL7M5HTwX" },
    { id: "vb10", seccion: "acc_abductores", nombre: "Abducciones en máquina", plano: "frontal", video: "https://www.youtube.com/watch?v=VW7_tnAq7qM" },
    { id: "vb11", seccion: "acc_aductores", nombre: "Aductores acostado", plano: "frontal", video: "https://www.youtube.com/watch?v=2TezOmbj8_I" },
    { id: "vb12", seccion: "acc_cuadriceps", nombre: "Prensa", plano: "sagital", video: "https://youtube.com/shorts/CZrG20G5B1g?si=wVHKu8iyRutDavCe" },
    { id: "vb13", seccion: "acc_aductores", nombre: "Aductores con fitball", plano: "frontal", video: "https://www.youtube.com/shorts/jaD-9Kenqns" },
    { id: "vb14", seccion: "acc_cuadriceps", nombre: "Sillon de cuadriceps", plano: "sagital", video: "https://www.youtube.com/watch?v=5dDUWdJKmFE" },
    { id: "vb15", seccion: "acc_aductores", nombre: "aductores en maquina- add", plano: "frontal", video: "https://www.youtube.com/watch?v=fItDiXXZyZo" },
    { id: "vb16", seccion: "acc_otros", nombre: "Caminata en puente", plano: "sagital", video: "https://drive.google.com/file/d/1KQi17E5PFDnN9DvoLgllw-3vL_hXQ4-b/view?usp=drive_copy" },
    { id: "vb17", seccion: "acc_isquios", nombre: "Caminata isquio", plano: "sagital", video: "https://drive.google.com/file/d/1W3HOZKU8GNd4LYHFKO9DUbfZzzWqwuDH/view" },
    { id: "vb18", seccion: "acc_isquios", nombre: "Puente isquio 2 pies", plano: "sagital", video: "https://youtube.com/shorts/Ms9R6r91VTY?si=VmBJBzLsUK6RT40Q" },
    { id: "vb19", seccion: "acc_isquios", nombre: "Puente isquio 1 pie", plano: "sagital", video: "https://youtube.com/shorts/AdQ__T9Fong?si=Zz-L47QvmwsSTP7j" },
    { id: "vb20", seccion: "acc_otros", nombre: "Fondos banco", plano: "sagital", video: "https://drive.google.com/file/d/16t7Sczcm1ZCqVaiQ_ZTYMp0zw8shjkQS/view?usp=sharing" },
    { id: "vb21", seccion: "acc_triceps", nombre: "Triceps polea", plano: "sagital", video: "https://www.youtube.com/shorts/4NWWB0f0vzQ" },
    { id: "vb22", seccion: "acc_otros", nombre: "Levantada 90/90 mb", plano: "sagital", video: "https://drive.google.com/file/d/10Sxb-h89fxzZLuhmE2uj-LJHK-X0hsdD/view" },
    { id: "vb23", seccion: "acc_otros", nombre: "Matrix (nordico invertido)", plano: "sagital", video: "https://drive.google.com/file/d/1O3rWSzfewbBtA6cxvlyQQ-jHxBlQZcDe/view" },
    { id: "vb24", seccion: "acc_otros", nombre: "Matrix (nordico invertido) asistido TRX", plano: "sagital", video: "https://drive.google.com/file/d/1cvZjIKs4aio2XGHhiODasNuE2PmhY11V/view" },
    { id: "vb25", seccion: "acc_cuello", nombre: "Cuello plancha lateral", plano: "frontal", video: "https://youtu.be/LxkZgSRat20?si=AXeKmj0z6XClY-u1" },
    { id: "vb26", seccion: "acc_cuello", nombre: "Cuello puente (mirada arriba )", plano: "sagital", video: "https://www.youtube.com/watch?v=IWEx_XwtMWo" },
    { id: "vb27", seccion: "acc_cuello", nombre: "Cuello puente piernas estiradas (mirada arriba )", plano: "sagital", video: "https://youtu.be/2H_gCMGwBt0?si=u0p1QLdiCJs3KPu2" },
    { id: "vb28", seccion: "acc_cuello", nombre: "Cuello plancha frontal", plano: "sagital", video: "https://www.youtube.com/shorts/mXCbnh1_A-o" },
    { id: "vb29", seccion: "colgarse", nombre: "Colgarse + balanceo frontal", plano: "sagital", video: "https://youtu.be/ddnlwt6o3ns" },
    { id: "vb30", seccion: "colgarse", nombre: "Colgarse + balanceo lateral", plano: "frontal", video: "https://youtu.be/F-O-oWy80iY" },
    { id: "vb31", seccion: "colgarse", nombre: "Colgarse alterno", plano: "sagital", video: "https://youtu.be/TdYuvTypyQQ" },
    { id: "vb32", seccion: "colgarse", nombre: "Colgarse alterno c/apoyo", plano: "sagital", video: "https://youtu.be/TGWvtY3BPgk" },
    { id: "vb33", seccion: "colgarse", nombre: "Colgarse barra", plano: "sagital", video: "https://youtu.be/TEvvbpqk1Dg" },
    { id: "vb34", seccion: "colgarse", nombre: "Colgarse con apoyo", plano: "sagital", video: "https://youtu.be/yad4daW5iT8" },
    { id: "vb35", seccion: "colgarse", nombre: "Colgarse una mano", plano: "sagital", video: "https://youtu.be/5f6qSOwop-E" },
    { id: "vb36", seccion: "colgarse", nombre: "Hombro combo banda", plano: "multiplanar", video: "https://youtu.be/m_-jmBVtXoY" },
    { id: "vb37", seccion: "acc_otros", nombre: "Tiron T con banda arrodillado", plano: "sagital", video: "https://youtu.be/4Quf7VxrTmI" },
    { id: "vb38", seccion: "acc_triceps", nombre: "Tríceps mancuerna", plano: "sagital", video: "https://drive.google.com/file/d/1cJuVTrnx25YEoZHz--GmhqFhM199D6nR/view" },
    { id: "vb39", seccion: "movilidad", nombre: "4 posiciones caminata columna", plano: "sagital", video: "https://www.youtube.com/watch?v=lBfiy5716PE" },
    { id: "vb40", seccion: "cadera_uni", nombre: "Isquio iso catch 1pie", plano: "sagital", video: "https://drive.google.com/file/d/1t3YmvuFMiKEyGUYHlIv9c1tfaokKIwz2/view" },
    { id: "vb41", seccion: "cadera_bi", nombre: "Isquio iso catch 2p", plano: "sagital", video: "https://drive.google.com/file/d/1mChIzqU1xc5QbVVgrjb8DdfmCiAwg52S/view" },
    { id: "vb42", seccion: "cadera_uni", nombre: "Peso muerto 1p barra", plano: "sagital", video: "https://drive.google.com/file/d/12L7fsarqXZv_-GSSkOd0dsM737n71dSe/view" },
    { id: "vb43", seccion: "cadera_uni", nombre: "Peso muerto rumano dividido pie en la pared", plano: "sagital", video: "https://www.youtube.com/shorts/EC1YZCq9QFw" },
    { id: "vb44", seccion: "cadera_bi", nombre: "Peso muerto un pie asistido", plano: "sagital", video: "https://www.youtube.com/shorts/MopTgSRk0MQ" },
    { id: "vb45", seccion: "cadera_bi", nombre: "peso muerto convencional barra", plano: "sagital", video: "https://www.youtube.com/watch?v=0XL4cZR2Ink" },
    { id: "vb46", seccion: "cadera_uni", nombre: "Peso muerto dividido mancuerna", plano: "sagital", video: "https://youtu.be/WmhRPpA7NMI" },
    { id: "vb47", seccion: "cadera_bi", nombre: "Peso muerto con kettlebell", plano: "sagital", video: "https://www.youtube.com/shorts/UFDqMPNHFNw" },
    { id: "vb48", seccion: "cadera_bi", nombre: "Hip thrust", plano: "sagital", video: "https://www.youtube.com/shorts/WUDVZPTHUhU" },
    { id: "vb49", seccion: "cadera_bi", nombre: "Peso muerto rumano RDL", plano: "sagital", video: "https://www.youtube.com/shorts/QQyJ2CCWgK0" },
    { id: "vb50", seccion: "cadera_bi", nombre: "Tecnica peso muerto con baston", plano: "sagital", video: "https://www.youtube.com/shorts/LZ5cik9RRHE" },
    { id: "vb51", seccion: "cadera_bi", nombre: "Curl de isquio 1 pierna en trx", plano: "sagital", video: "https://www.youtube.com/shorts/W2VFtaM-2vI" },
    { id: "vb52", seccion: "cadera_uni", nombre: "Elevacion de cadera 1pie", plano: "sagital", video: "https://www.youtube.com/shorts/fhhCfaEyVzE" },
    { id: "vb53", seccion: "rotacion", nombre: "Leñador diagonal paso adelante", plano: "transversal", video: "https://drive.google.com/file/d/1K0PDN_h61gSflVnPId2aDKlkonmzsg2T/view" },
    { id: "vb54", seccion: "rotacion", nombre: "Leñador diagonal sentadilla", plano: "transversal", video: "https://drive.google.com/file/d/16fkw_tVVQouhZub_zjruyEzj3_-0zB4w/view" },
    { id: "vb55", seccion: "rotacion", nombre: "Leñador estocada", plano: "transversal", video: "https://drive.google.com/file/d/1GDnhMvqNXgUPff4cYH-eSVZn61lKDCgG/view" },
    { id: "vb56", seccion: "rotacion", nombre: "Leñador paso Cruzado + lateral rotaciónal", plano: "transversal", video: "https://drive.google.com/file/d/13VUiBqvDYiei2BnORyuPYg1gojzdmrKU/view" },
    { id: "vb57", seccion: "rotacion", nombre: "Rotaciones arcoiris con mancuerna", plano: "transversal", video: "https://drive.google.com/file/d/1hMfIY55CO6YyXWFr1DC8FTqTkZWZAC90/view" },
    { id: "vb58", seccion: "rotacion", nombre: "Rotaciones de cadera soltando mancuerna", plano: "transversal", video: "https://drive.google.com/file/d/1r6BzxgoYoXON76LIft6U5ISNfl5KJ59B/view" },
    { id: "vb59", seccion: "core", nombre: "Abdomen bisagra (suelo)", plano: "sagital", video: "https://drive.google.com/file/d/16OKnP7dKB9g3dobqW6_XSarTU8o9mIrn/view?usp=sharing" },
    { id: "vb60", seccion: "rotacion", nombre: "Arcoiris RR landmine stop pecho", plano: "transversal", video: "https://www.youtube.com/watch?v=OoUbKMZawas&list=PLiD0iJFrHtz3Vs1ZNDQzVQ9M2bx6ZQG4R&index=11" },
    { id: "vb61", seccion: "rotacion", nombre: "Arcoiris landmine RR continuo", plano: "transversal", video: "https://www.youtube.com/watch?v=rVFPbHP8fEc&list=PLiD0iJFrHtz3Vs1ZNDQzVQ9M2bx6ZQG4R&index=13" },
    { id: "vb62", seccion: "rotacion", nombre: "Arcoiris landmine RR nivel 1", plano: "transversal", video: "https://www.youtube.com/watch?v=K_9NmRfJLw0&list=PLiD0iJFrHtz3Vs1ZNDQzVQ9M2bx6ZQG4R&index=12" },
    { id: "vb63", seccion: "rotacion", nombre: "Arcoiris landmine RR stop cabeza", plano: "transversal", video: "https://www.youtube.com/watch?v=rVFPbHP8fEc&list=PLiD0iJFrHtz3Vs1ZNDQzVQ9M2bx6ZQG4R&index=13" },
    { id: "vb64", seccion: "rotacion", nombre: "Arcoiris parado landmine", plano: "transversal", video: "https://www.youtube.com/watch?v=mL6SKV4f99U" },
    { id: "vb65", seccion: "core", nombre: "Bicho muerto con pelota suiza", plano: "sagital", video: "https://drive.google.com/file/d/1Exgafcwqyd6W-3C88V2qkNpHy6qI4wZp/view" },
    { id: "vb66", seccion: "core", nombre: "Caminata a plancha", plano: "sagital", video: "https://www.youtube.com/watch?v=0gBFyogmVnE" },
    { id: "vb67", seccion: "core", nombre: "Levantamiento turco inicio", plano: "sagital", video: "https://youtu.be/e_s_ihChSXQ?si=z4m5ARItDUYj4HCf" },
    { id: "vb68", seccion: "core", nombre: "Levantamiento turco", plano: "sagital", video: "https://www.youtube.com/watch?v=Sb5bdKQryZU" },
    { id: "vb69", seccion: "core", nombre: "Pallof 1pie", plano: "sagital", video: "https://drive.google.com/file/d/1KsxoUZr-HpZanVK4C--JpmjPstlPTQ8i/view" },
    { id: "vb70", seccion: "core", nombre: "Pallof caida a estocada", plano: "sagital", video: "https://drive.google.com/file/d/13y5CWQFX76a1JwkXc-kzsksJl7kcilLU/view" },
    { id: "vb71", seccion: "core", nombre: "Pallof sentadilla rotacion", plano: "transversal", video: "https://drive.google.com/file/d/1n6whrBbOEQuTxD_np8Z93-gsmijaOj-e/view" },
    { id: "vb72", seccion: "core", nombre: "Perro pasa pesa", plano: "sagital", video: "https://drive.google.com/file/d/1FasOsGTO-9hcRxseU7QdRB5UhkSjcc-c/view" },
    { id: "vb73", seccion: "core", nombre: "Trx plank roll out", plano: "sagital", video: "https://www.youtube.com/watch?v=M-u2CYwsP_4" },
    { id: "vb74", seccion: "core", nombre: "Trx plank", plano: "sagital", video: "https://www.youtube.com/watch?v=0W8k_vbjvz4" },
    { id: "vb75", seccion: "core", nombre: "Push up escapulas en perro", plano: "sagital", video: "https://www.youtube.com/watch?v=_0iMd-L3HHE" },
    { id: "vb76", seccion: "core", nombre: "Perro rotacion a plancha lateral mc", plano: "transversal", video: "https://drive.google.com/file/d/1u6tvSv66Oom0LZ638wrh9Lz_yjf_9Ypz/view" },
    { id: "vb77", seccion: "core", nombre: "Plancha abro y cierro manos", plano: "sagital", video: "https://drive.google.com/file/d/1NK73IFFWA1dz8lRdIv6Lqee0TbAMn93N/view" },
    { id: "vb78", seccion: "acc_otros", nombre: "Caminatas sentado flexores de cadera", plano: "sagital", video: "https://www.youtube.com/shorts/4tgWbiiaoXM" },
    { id: "vb79", seccion: "core", nombre: "Plancha flexores de cadera en banco", plano: "sagital", video: "https://www.youtube.com/shorts/WCkrF6B4sdg" },
    { id: "vb80", seccion: "core", nombre: "Plancha araña", plano: "sagital", video: "https://www.youtube.com/watch?v=O8gGZh6XYRg" },
    { id: "vb81", seccion: "core", nombre: "Pallof press", plano: "sagital", video: "https://youtube.com/shorts/bnpqMNtaBIA?si=7LBl8pvdNN-5RTvu" },
    { id: "vb82", seccion: "core", nombre: "Balanceo hollow", plano: "sagital", video: "https://youtube.com/shorts/6nNzwsoEdv0?si=aEGUQMS5SBOEZEvP" },
    { id: "vb83", seccion: "core", nombre: "Plancha c/movimiento pelota suiza", plano: "sagital", video: "https://drive.google.com/file/d/1iW_XUlCcChHiT0LADsakgeZhzXrJNDYX/view" },
    { id: "vb84", seccion: "core", nombre: "Plancha lateral copenaguen dinamica", plano: "frontal", video: "https://youtu.be/VNveG5bCKiE" },
    { id: "vb85", seccion: "core", nombre: "Plancha lateral copenaguen", plano: "frontal", video: "https://www.youtube.com/watch?v=5A7qtXuQqco" },
    { id: "vb86", seccion: "core", nombre: "Plancha lateral copenaguen 3 niveles iniciales", plano: "frontal", video: "https://youtube.com/shorts/UnVWFQJ54vE?si=h3Cx2eMMIgvrj2DB" },
    { id: "vb87", seccion: "core", nombre: "talones a la cola pelota suiza", plano: "sagital", video: "https://youtu.be/FXHb0u5lrCA" },
    { id: "vb88", seccion: "core", nombre: "Bicho muerto doble", plano: "sagital", video: "https://youtu.be/vhCkxk8SWTY" },
    { id: "vb89", seccion: "core", nombre: "Rodillas al pecho en barra combinado", plano: "sagital", video: "https://www.youtube.com/watch?v=mEg1gTsqR0A&list=PLiD0iJFrHtz3Vs1ZNDQzVQ9M2bx6ZQG4R&index=6" },
    { id: "vb90", seccion: "core", nombre: "Rodillas al pecho en TRX", plano: "sagital", video: "https://drive.google.com/file/d/1eJnaX_NbdwJIbf8skFiITNo9ASG9cIAm/view" },
    { id: "vb91", seccion: "core", nombre: "Rodillas al pecho pelota suiza", plano: "sagital", video: "https://youtu.be/t735traLrBM?si=bhcGZgmWaYJthX1X" },
    { id: "vb92", seccion: "core", nombre: "Rodillas al pecho pelota suiza 1pierna", plano: "sagital", video: "https://www.youtube.com/watch?v=HoVGlKiwxyo&list=PLiD0iJFrHtz3Vs1ZNDQzVQ9M2bx6ZQG4R&index=5" },
    { id: "vb93", seccion: "core", nombre: "Rotacion con banda arrodillado", plano: "transversal", video: "https://drive.google.com/file/d/1pV2P2mpYRm56_RLkS--R15TsaMkFJKGn/view" },
    { id: "vb94", seccion: "core", nombre: "Transporte asimetrico barra hexagonal", plano: "sagital", video: "https://youtu.be/TTWWbcPrcu4" },
    { id: "vb95", seccion: "core", nombre: "Transporte combinado mesero + valija", plano: "sagital", video: "https://youtu.be/IbJt8IGNazY" },
    { id: "vb96", seccion: "core", nombre: "Transporte combinado valija + cabeza", plano: "sagital", video: "https://youtu.be/U0XBQqrq98M" },
    { id: "vb97", seccion: "core", nombre: "Transporte 1mano hombro", plano: "sagital", video: "https://youtu.be/49vMjykPklc" },
    { id: "vb98", seccion: "core", nombre: "Transporte granjero hexagonal", plano: "sagital", video: "https://youtu.be/Y4qAxRCkrjk" },
    { id: "vb99", seccion: "core", nombre: "Transporte valija + hombro", plano: "sagital", video: "https://youtu.be/NyItsyaA2P8" },
    { id: "vb100", seccion: "core", nombre: "Push up escapular pared", plano: "sagital", video: "https://www.youtube.com/shorts/yZVsAWcZRQ8" },
    { id: "vb101", seccion: "core", nombre: "Chop drop step cable", plano: "sagital", video: "https://www.youtube.com/shorts/iiG6nJRzk4g" },
    { id: "vb102", seccion: "core", nombre: "Jalon diagonal lateral cable", plano: "frontal", video: "https://www.youtube.com/shorts/VKZQISCw5Xo" },
    { id: "vb103", seccion: "core", nombre: "Remo perro volador", plano: "sagital", video: "https://youtube.com/shorts/AdZ3VOblTTU?si=eEI96ukHD2LgyXBz" },
    { id: "vb104", seccion: "core", nombre: "Chop abajo arriba estocada baja", plano: "sagital", video: "https://www.youtube.com/shorts/aU7NvHS8AoA" },
    { id: "vb105", seccion: "core", nombre: "Chop abajo arriba cable", plano: "sagital", video: "https://www.youtube.com/shorts/7bWAE_VFgLA" },
    { id: "vb106", seccion: "core", nombre: "Chop horizontal cable", plano: "sagital", video: "https://www.youtube.com/shorts/cS94FLiBKDE" },
    { id: "vb107", seccion: "core", nombre: "Rotacion acostado + press", plano: "transversal", video: "https://youtu.be/e_s_ihChSXQ?si=z4m5ARItDUYj4HCf" },
    { id: "vb108", seccion: "core", nombre: "Abdominal mcgill", plano: "sagital", video: "https://youtube.com/shorts/BH5toeuGdfQ?si=2kimeRLUIiRqG3Jf" },
    { id: "vb109", seccion: "core", nombre: "Sentadilla isometrica pared", plano: "sagital", video: "https://youtu.be/tsTd43aoTKw?si=9uVMFpRmZxfDiBdL" },
    { id: "vb110", seccion: "core", nombre: "Roll out rueda", plano: "sagital", video: "https://www.youtube.com/shorts/MinlHnG7j4k" },
    { id: "vb111", seccion: "core", nombre: "Rolido Hollow a superman", plano: "sagital", video: "https://www.youtube.com/watch?v=unYqvau41RY&list=PLZEzuVwAyen24_9U7HOXRDI6Rps-gkTmd&index=23" },
    { id: "vb112", seccion: "core", nombre: "Landmine anti rotacion split", plano: "transversal", video: "https://youtu.be/dx09vfYv5J4?si=smjXDzJRIwhn1mnI" },
    { id: "vb113", seccion: "core", nombre: "Crunch reverse", plano: "sagital", video: "https://youtube.com/shorts/esYVzdEfs04?si=C6pU3eou9nd0Om6s" },
    { id: "vb114", seccion: "core", nombre: "Skipping barra overhead asimetrico", plano: "sagital", video: "https://www.youtube.com/watch?v=jytcNYwFt-I" },
    { id: "vb115", seccion: "car_lineal", nombre: "Aceleracion- desaceleracion", plano: "sagital", video: "https://www.youtube.com/watch?v=nZtdaYlLbwQ&ab_channel=CoachAntonioExp%C3%B3sito" },
    { id: "vb116", seccion: "potencia", nombre: "Salto con caida rotacional 2p", plano: "transversal", video: "https://drive.google.com/file/d/1LLU5IKQKHgDJC9gm_jSVQMIzsOaKaPKB/view" },
    { id: "vb117", seccion: "potencia", nombre: "Hang power clean", plano: "sagital", video: "https://www.youtube.com/watch?v=qQ8InArxi-Y" },
    { id: "vb118", seccion: "empuje_bi", nombre: "Aperturas con mancuernas", plano: "sagital", video: "https://www.youtube.com/shorts/l_Hkd8twMhU" },
    { id: "vb119", seccion: "empuje_bi", nombre: "Empuje cruzado bicho muerto", plano: "multiplanar", video: "https://youtu.be/-UpGuJ4pkvM" },
    { id: "vb120", seccion: "empuje_bi", nombre: "Empuje en puente mancuernas", plano: "sagital", video: "https://youtube.com/shorts/FggxMKysbEM?si=m9SYyFB6m3orCaca" },
    { id: "vb121", seccion: "empuje_bi", nombre: "Empuje Suelo mancuernas", plano: "sagital", video: "https://youtu.be/LYo6ASR9Mxo?si=4fYNCn_WsnUvlnGS" },
    { id: "vb122", seccion: "empuje_bi", nombre: "Empuje 1mano cable estocada alta", plano: "sagital", video: "https://www.youtube.com/watch?v=WRTAmz6sOd8" },
    { id: "vb123", seccion: "empuje_uni", nombre: "Empuje vertical 1m + mano en la pared arrodillado", plano: "sagital", video: "https://drive.google.com/file/d/1sEx6VEUa-QubHqv8vw63tkPr3lbs-GbI/view" },
    { id: "vb124", seccion: "empuje_bi", nombre: "Empuje vertical 1mano parado", plano: "sagital", video: "https://drive.google.com/file/d/1v_EmY_vEypN5thH71FA06DEo903fSE9r/view" },
    { id: "vb125", seccion: "empuje_bi", nombre: "Fondos", plano: "sagital", video: "https://drive.google.com/file/d/1lnhtkK6pcHKjaMdmF10tI-aqEve5mp5X/view" },
    { id: "vb126", seccion: "empuje_bi", nombre: "Fuerza de brazo", plano: "sagital", video: "https://drive.google.com/file/d/1CgovHbqqxU-0TKGMKCXu9AObrmJSGKr7/view" },
    { id: "vb127", seccion: "empuje_bi", nombre: "Fuerza de brazo asimetrica -", plano: "sagital", video: "https://drive.google.com/file/d/1crmsFk3I5WOHSpeXnEOAcN-vOrhroDVA/view" },
    { id: "vb128", seccion: "empuje_bi", nombre: "Fuerza de brazo bajo libre subo c/rodillas", plano: "sagital", video: "https://drive.google.com/file/d/1SsbB3YrCDnGTcUgaqA_wZ6npD7RLgV5h/view" },
    { id: "vb129", seccion: "empuje_bi", nombre: "Fuerza de brazo c/banda", plano: "sagital", video: "https://drive.google.com/file/d/1HelXafT0ZKMC9UZ90jIFJqwumVJP9kKF/view" },
    { id: "vb130", seccion: "empuje_bi", nombre: "Fuerza de brazo drop", plano: "sagital", video: "https://www.youtube.com/watch?v=XBLiZBfZf0c" },
    { id: "vb131", seccion: "empuje_bi", nombre: "Fuerza de brazo conc a step", plano: "sagital", video: "https://youtu.be/wPJcKSDe4gM" },
    { id: "vb132", seccion: "empuje_bi", nombre: "Fuerza de brazo conc RR a step", plano: "sagital", video: "https://drive.google.com/file/d/12ZobaWB84UfwFIrTgi0D0CqdoSm9R3RB/view" },
    { id: "vb133", seccion: "empuje_bi", nombre: "Fuerza de brazo Pike", plano: "sagital", video: "https://drive.google.com/file/d/1BCM8oVFYU9LghbhcA3zAhBCMD8ea3cEL/view" },
    { id: "vb134", seccion: "empuje_bi", nombre: "Fuerza de brazo escapulas", plano: "sagital", video: "https://www.youtube.com/shorts/SBPRhZI2RkI" },
    { id: "vb135", seccion: "empuje_bi", nombre: "Press plano smith", plano: "sagital", video: "https://www.youtube.com/watch?v=2TBOciYPzkk" },
    { id: "vb136", seccion: "empuje_bi", nombre: "Press plano smith explosivo", plano: "sagital", video: "https://www.youtube.com/shorts/ivNcccw7qA0" },
    { id: "vb137", seccion: "empuje_bi", nombre: "Press militar barra", plano: "sagital", video: "https://drive.google.com/file/d/1zsbHiHM091y0HkCdBfnrESFMCf74MheZ/view?usp=sharing" },
    { id: "vb138", seccion: "empuje_bi", nombre: "Fuerza de brazo 3 niveles iniciales", plano: "sagital", video: "https://youtu.be/CuKyFclQ0QA" },
    { id: "vb139", seccion: "empuje_bi", nombre: "Fuerza de brazo rodillas explosiva", plano: "sagital", video: "https://www.youtube.com/shorts/NFqHHn6nzPc" },
    { id: "vb140", seccion: "empuje_bi", nombre: "Fuerza de brazo trx", plano: "sagital", video: "https://youtube.com/shorts/_Km1J7Ievck?si=a79D1tBMtjIkwREt" },
    { id: "vb141", seccion: "empuje_bi", nombre: "Press plano", plano: "sagital", video: "https://www.youtube.com/watch?v=SCVCLChPQFY" },
    { id: "vb142", seccion: "empuje_bi", nombre: "Fuerza de brazo explosiva continuas", plano: "sagital", video: "https://www.youtube.com/watch?v=jZSBGlusC2Q" },
    { id: "vb143", seccion: "empuje_bi", nombre: "TRX roll out", plano: "sagital", video: "https://www.youtube.com/watch?v=M-u2CYwsP_4" },
    { id: "vb144", seccion: "empuje_uni", nombre: "Empuje 1 mano cable en estocada baja", plano: "sagital", video: "https://www.youtube.com/watch?v=7vAGdLYoc5M" },
    { id: "vb145", seccion: "equilibrio", nombre: "Balanceo de pesos", plano: "sagital", video: "https://youtu.be/sQdQxksgdgw" },
    { id: "vb146", seccion: "rotacion", nombre: "Rotaciones torax en estocada alta", plano: "transversal", video: "https://youtu.be/ng17o3Qg04A" },
    { id: "vb147", seccion: "equilibrio", nombre: "Balanceos frontales de pierna", plano: "sagital", video: "https://youtu.be/K0CLIW5Also" },
    { id: "vb148", seccion: "equilibrio", nombre: "Grulla + paloma", plano: "sagital", video: "https://youtu.be/ZJZYKM79doA" },
    { id: "vb149", seccion: "equilibrio", nombre: "Grulla + paloma + avion rotacional", plano: "transversal", video: "https://youtu.be/P7ngkTsBfQE" },
    { id: "vb150", seccion: "equilibrio", nombre: "Medialuna piernas + sostengo", plano: "sagital", video: "https://youtu.be/xsUCoyk8WJ8" },
    { id: "vb151", seccion: "equilibrio", nombre: "Medialuna piernas fluido", plano: "sagital", video: "https://youtu.be/OxGkC3GOq-c" },
    { id: "vb152", seccion: "equilibrio", nombre: "Seguir el dedo un pie", plano: "sagital", video: "https://youtu.be/EYGX3ChBrpo" },
    { id: "vb153", seccion: "equilibrio", nombre: "Swing 1pie", plano: "sagital", video: "https://drive.google.com/file/d/1TlimhbLopAItSg0q1O2a6VfLtoIQrwwm/view" },
    { id: "vb154", seccion: "equilibrio", nombre: "Vuelta al mundo grulla + estocada", plano: "sagital", video: "https://youtu.be/aY7ku6k08VM" },
    { id: "vb155", seccion: "estabilidad", nombre: "Plancha copenaguen 3 niveles iniciales", plano: "sagital", video: "https://www.youtube.com/shorts/UnVWFQJ54vE" },
    { id: "vb156", seccion: "equilibrio", nombre: "Giros de cabeza ojos cerrados", plano: "sagital", video: "https://youtu.be/WPTNtNoEX5w" },
    { id: "vb157", seccion: "estabilidad", nombre: "Bicho muerto 1p con disco", plano: "sagital", video: "https://youtu.be/0qjq2xXnqbM?si=1dvC4_KSCo_vGXdT" },
    { id: "vb158", seccion: "estabilidad", nombre: "Bicho muerto combo", plano: "multiplanar", video: "https://youtu.be/-XgIDWth6pU" },
    { id: "vb159", seccion: "estabilidad", nombre: "Bicho muerto con banda 1pie", plano: "sagital", video: "https://drive.google.com/file/d/1O57LR0eiD3JQ7iDDvxQ0y8njipS6EOKH/view" },
    { id: "vb160", seccion: "estabilidad", nombre: "Perro volador", plano: "sagital", video: "https://youtu.be/i55B2XJrGV8" },
    { id: "vb161", seccion: "estabilidad", nombre: "Perro con pelota de tenis frontal", plano: "sagital", video: "https://drive.google.com/file/d/1Iu6IL_OxaY5bD0kJNF0q1C3ylWu5v89f/view" },
    { id: "vb162", seccion: "estabilidad", nombre: "Perro con pelota de tenis lateral", plano: "frontal", video: "https://drive.google.com/file/d/1t57JZa4WVFWFXChJ8YUvlXbcU6mNMTQ3/view" },
    { id: "vb163", seccion: "estabilidad", nombre: "Plancha lateral 3 niveles", plano: "frontal", video: "https://youtu.be/Arm91nWTTpM" },
    { id: "vb164", seccion: "estabilidad", nombre: "Plancha lateral dinamica 2 niveles", plano: "frontal", video: "https://youtu.be/iNddm-UbiLM" },
    { id: "vb165", seccion: "potencia", nombre: "CMJ asistido", plano: "sagital", video: "https://www.youtube.com/watch?v=ZRkOzCDBfYs" },
    { id: "vb166", seccion: "equilibrio", nombre: "Balance 1p + fuerza cruzada mano rodilla", plano: "multiplanar", video: "https://drive.google.com/file/d/1N5U0I3_8_0hpxeSfhhpG_f4azWJbmc7c/view?usp=sharing" },
    { id: "vb167", seccion: "empuje_bi", nombre: "Iso hold - Flexion de cadera de pie con banda", plano: "sagital", video: "https://www.youtube.com/watch?v=00VRCbIBvDM" },
    { id: "vb168", seccion: "empuje_bi", nombre: "Iso push sentadilla 120°", plano: "sagital", video: "https://www.youtube.com/watch?v=Nl4TShpW_rg" },
    { id: "vb169", seccion: "empuje_bi", nombre: "Iso push press plano", plano: "sagital", video: "https://www.youtube.com/watch?v=0sbZHuKXWXY" },
    { id: "vb170", seccion: "rotacion", nombre: "Landmine rotacion", plano: "transversal", video: "https://www.youtube.com/watch?v=mL6SKV4f99U" },
    { id: "vb171", seccion: "rotacion", nombre: "Landmine rotacion arcoiris", plano: "transversal", video: "https://www.youtube.com/watch?v=STy6D5_dBws" },
    { id: "vb172", seccion: "rotacion", nombre: "Landmine drop catch rotacion", plano: "transversal", video: "https://www.youtube.com/watch?v=QDIhXe3bwjY" },
    { id: "vb173", seccion: "rotacion", nombre: "Lanzamiento pecho continuo arrodillado", plano: "sagital", video: "https://drive.google.com/file/d/1D3pdUr3tfqrjvf4Zj_KlpNxOHuIIR6hY/view?usp=sharing" },
    { id: "vb174", seccion: "rotacion", nombre: "Lanzamiento rot pulso sentadilla", plano: "sagital", video: "https://drive.google.com/file/d/1UhzTYKRgSlZUqav4-_6w29TLETIX4zQJ/view" },
    { id: "vb175", seccion: "rotacion", nombre: "Lanzamiento cabeza cont parado", plano: "sagital", video: "https://drive.google.com/file/d/1CsdnOVg6q_OBS9a8R3xDwXZBrfhbdGTI/view" },
    { id: "vb176", seccion: "rotacion", nombre: "Lanzamiento cabeza continuo arrodillado", plano: "sagital", video: "https://drive.google.com/file/d/1s61gE-jA_F1UNGATWeSeEVklT9NO6APf/view" },
    { id: "vb177", seccion: "rotacion", nombre: "Lanzamiento cabeza pared cont arro", plano: "sagital", video: "https://drive.google.com/file/d/18scpklKjxZPbLz3ftuW15R7y_sBr3qZR/view" },
    { id: "vb178", seccion: "rotacion", nombre: "Lanzamiento cabeza pared continuo", plano: "sagital", video: "https://drive.google.com/file/d/1pr7da9KHH85pPAQKnzuzhBzWv_qik_r7/view" },
    { id: "vb179", seccion: "rotacion", nombre: "Lanzamiento cabeza rotacional 180 a estocada", plano: "transversal", video: "https://drive.google.com/file/d/12hxKGLrjSlQCKllEuni43f90SAzjDSXD/view" },
    { id: "vb180", seccion: "rotacion", nombre: "Lanzamiento cabeza rotacional al piso 180", plano: "transversal", video: "https://drive.google.com/file/d/1XwSuNUGudEjShzJA1jfI7g5MLiX3nWdo/view" },
    { id: "vb181", seccion: "rotacion", nombre: "Lanzamiento pecho continuo sentadilla", plano: "sagital", video: "https://drive.google.com/file/d/11EcQOXx-u5mtj8QWdDIAdS5N8ENEaTD8/view" },
    { id: "vb182", seccion: "rotacion", nombre: "Lanzamiento pecho intensivo sentadilla", plano: "sagital", video: "https://drive.google.com/file/d/1s2J4xlFgQJ05T9uR0QYUe-PwF2R-4Qq7/view" },
    { id: "vb183", seccion: "rotacion", nombre: "Lanzamiento pecho pulso sentadilla .", plano: "sagital", video: "https://drive.google.com/file/d/1xkDnb1zqartymn5-RtpwxkSU-ZptthzC/view?usp=sharing" },
    { id: "vb184", seccion: "rotacion", nombre: "Lanzamiento rot continuo estocada", plano: "sagital", video: "https://drive.google.com/file/d/10dCk153ytqdsR31bDOWPpzYm_VUVShES/view" },
    { id: "vb185", seccion: "rotacion", nombre: "Lanzamiento rot continuo parado", plano: "sagital", video: "https://drive.google.com/file/d/1BCROYgZ6-sW6OTdpaxK2IfGdZodDggGN/view" },
    { id: "vb186", seccion: "rotacion", nombre: "Lanzamiento rot int c/ autopase", plano: "sagital", video: "https://drive.google.com/file/d/1OKvaqefb044-Ox0Tv8GJAx6znX2NNvGw/view" },
    { id: "vb187", seccion: "rotacion", nombre: "Lanzamiento rot intensivo parado", plano: "sagital", video: "https://drive.google.com/file/d/1eGiKPrcallLs1DhORaftqRydpKRtdWfi/view" },
    { id: "vb188", seccion: "movilidad", nombre: "3 estiramientos de cuello - 3 kneck strechs", plano: "sagital", video: "https://www.youtube.com/watch?v=FEo514Kp_ys" },
    { id: "vb189", seccion: "movilidad", nombre: "Peso muerto a sentadilla", plano: "sagital", video: "https://www.youtube.com/watch?v=nNOXS2r_DGU&list=PLiD0iJFrHtz32fQMFW36wg12BfiMpeKpD&index=2" },
    { id: "vb190", seccion: "movilidad", nombre: "W - Y en pared", plano: "sagital", video: "https://www.youtube.com/watch?v=c2rHg_XhKG4&list=PLiD0iJFrHtz32fQMFW36wg12BfiMpeKpD&index=3" },
    { id: "vb191", seccion: "movilidad", nombre: "Extension de torax en banco", plano: "transversal", video: "https://www.youtube.com/watch?v=C016SQEr5yc" },
    { id: "vb192", seccion: "movilidad", nombre: "Abduccion de cadera sapo", plano: "frontal", video: "https://www.youtube.com/watch?v=eD0SMkOrd6g&ab_channel=AtomicAthlete" },
    { id: "vb193", seccion: "movilidad", nombre: "Acostado cruzo pierna - lumbar zone", plano: "sagital", video: "https://www.youtube.com/watch?v=083PIcwFF2Q" },
    { id: "vb194", seccion: "movilidad", nombre: "Arcoiris pared split", plano: "transversal", video: "https://www.youtube.com/watch?v=5E7Wr2TNVhc" },
    { id: "vb195", seccion: "movilidad", nombre: "Avion cadera", plano: "sagital", video: "https://www.youtube.com/watch?v=RZ0jr9a0LNA" },
    { id: "vb196", seccion: "movilidad", nombre: "Avion cadera a arcoiris en pared-Wall hip aeroplane to rainbow", plano: "transversal", video: "https://www.youtube.com/watch?v=Fzn7MurM6Qk" },
    { id: "vb197", seccion: "movilidad", nombre: "Secuencia movilidad acostado n1", plano: "sagital", video: "https://youtu.be/EstvDNVpKjE?si=1-cxkuOR76W1n9vh" },
    { id: "vb198", seccion: "movilidad", nombre: "Secuencia movilidad acostado n2", plano: "sagital", video: "https://youtu.be/6xZMRjMeFk4?si=sJCpNm79HfuXLePP" },
    { id: "vb199", seccion: "movilidad", nombre: "Secuencia movilidad carpa n1", plano: "sagital", video: "https://youtu.be/r6V7Z0GCJsk?si=UyQf0wx_67w7kOhN" },
    { id: "vb200", seccion: "movilidad", nombre: "Secuencia movilidad carpa n2", plano: "sagital", video: "https://youtu.be/r6V7Z0GCJsk?si=_6tlnX2qRkWllmKO" },
    { id: "vb201", seccion: "movilidad", nombre: "Secuencia movilidad gorila n1", plano: "sagital", video: "https://youtu.be/GSiclEuAtUI?si=anohGbYh0Q_3xoBK" },
    { id: "vb202", seccion: "movilidad", nombre: "Secuencia movilidad gorila n2", plano: "sagital", video: "https://youtu.be/QX1IEyaaqEo?si=G62IfYep0Pe-Vkuy" },
    { id: "vb203", seccion: "movilidad", nombre: "Secuencia movilidad sapo n1", plano: "sagital", video: "https://drive.google.com/file/d/1Hc9u0fXu_xgjbAG-bqtpMJYjYLYNwRNB/view" },
    { id: "vb204", seccion: "movilidad", nombre: "Secuencia movilidad sapo n2", plano: "sagital", video: "https://drive.google.com/file/d/1fqcNtWqvZShogqY-EEja6IPpCxPuZR3x/view" },
    { id: "vb205", seccion: "movilidad", nombre: "Secuencia movilidad sentadilla n1", plano: "sagital", video: "https://www.youtube.com/watch?v=z2pR9Is55VY&list=PLiD0iJFrHtz1QGI3I93JWjhfVUJw3pyuF&index=5" },
    { id: "vb206", seccion: "movilidad", nombre: "Secuencia movilidad sentadilla n2", plano: "sagital", video: "https://youtu.be/izSj6czXw0M?si=KLVMq_kFkT2BEjES" },
    { id: "vb207", seccion: "movilidad", nombre: "Secuencia movilidad sentado n1", plano: "sagital", video: "https://youtu.be/u0JJCJvCYV8?si=VHVcQXsFLFIGrEsB" },
    { id: "vb208", seccion: "movilidad", nombre: "Secuencia movilidad sentado n2", plano: "sagital", video: "https://youtu.be/bJpPgc73olM?si=aSBYdr4nkVI22NSL" },
    { id: "vb209", seccion: "movilidad", nombre: "Flexores con bandar a anterior", plano: "sagital", video: "https://youtu.be/Y_wsPJhnPhA?si=gs2xpo66XFVE7LrH" },
    { id: "vb210", seccion: "movilidad", nombre: "Flexores con banda a posterior", plano: "sagital", video: "https://www.youtube.com/watch?v=_QlvstWTNNE" },
    { id: "vb211", seccion: "movilidad", nombre: "Secuencia movilidad baston n1", plano: "sagital", video: "https://www.youtube.com/watch?v=p2Qen7EB_FU&list=PLiD0iJFrHtz1QGI3I93JWjhfVUJw3pyuF&index=13" },
    { id: "vb212", seccion: "movilidad", nombre: "Secuencia movilidad baston n2", plano: "sagital", video: "https://www.youtube.com/watch?v=vzU1gqND9Ek&list=PLiD0iJFrHtz1QGI3I93JWjhfVUJw3pyuF&index=10" },
    { id: "vb213", seccion: "movilidad", nombre: "Gato bueno gato malo", plano: "sagital", video: "https://www.youtube.com/watch?v=LIVJZZyZ2qM" },
    { id: "vb214", seccion: "movilidad", nombre: "Bretzel", plano: "sagital", video: "https://www.youtube.com/watch?v=-Ea52Vha7HI" },
    { id: "vb215", seccion: "movilidad", nombre: "gato bueno gato malo con banda", plano: "sagital", video: "https://www.youtube.com/watch?v=wCE7dDcXSPY" },
    { id: "vb216", seccion: "movilidad", nombre: "Gato bueno gato malo circulos", plano: "sagital", video: "https://www.youtube.com/watch?v=sRzgvjWvljI" },
    { id: "vb217", seccion: "movilidad", nombre: "CARS cadera cuadrupedia- dog position", plano: "sagital", video: "https://www.youtube.com/shorts/0dDBSGHbSU8" },
    { id: "vb218", seccion: "movilidad", nombre: "CARS cadera RR a step - hip cars split", plano: "sagital", video: "https://www.youtube.com/embed/Xc5EJJBJaYg?rel=0" },
    { id: "vb219", seccion: "movilidad", nombre: "CARS cadera tumbado - hip side cars", plano: "sagital", video: "https://www.youtube.com/watch?v=noQk6-VQZGc" },
    { id: "vb220", seccion: "movilidad", nombre: "CARS cuello- kneck", plano: "sagital", video: "https://youtube.com/shorts/QOhW7Yj0Y28?si=R4TpEdMBf7fmrhGO" },
    { id: "vb221", seccion: "movilidad", nombre: "CARS escapular - scapular cars", plano: "sagital", video: "https://youtube.com/shorts/ZtKiQKiBadc?si=9KJpU0XVs7E0NN6J" },
    { id: "vb222", seccion: "movilidad", nombre: "CARS hombro - shoulders cars", plano: "sagital", video: "https://youtube.com/shorts/HexOK60uigY?si=0xL6DipfMBKeLDGl" },
    { id: "vb223", seccion: "movilidad", nombre: "CARS muñecas- wrist cars", plano: "sagital", video: "https://www.youtube.com/watch?v=GQOAEBD2OTg" },
    { id: "vb224", seccion: "movilidad", nombre: "90/90 Caderas", plano: "sagital", video: "https://youtube.com/shorts/BjepwiZz0-o?si=YNEmQj3cJ4aYay6w" },
    { id: "vb225", seccion: "movilidad", nombre: "CARS rodilla - knee", plano: "sagital", video: "https://www.youtube.com/watch?v=N0zkUzI1Bfc" },
    { id: "vb226", seccion: "movilidad", nombre: "CARS tobillo - ankle", plano: "sagital", video: "https://www.youtube.com/watch?v=vz42-6VL-B0" },
    { id: "vb227", seccion: "movilidad", nombre: "CARS torax - T spine cars", plano: "transversal", video: "https://www.youtube.com/watch?v=1nrIEaES2XI" },
    { id: "vb228", seccion: "movilidad", nombre: "Tripode rotacion", plano: "transversal", video: "https://youtu.be/pO3KPQ5fzJ0?si=JowpEm1_fnGVJNBy" },
    { id: "vb229", seccion: "movilidad", nombre: "Sumergidas de cabeza - head dives", plano: "sagital", video: "https://www.youtube.com/watch?v=dXQ-Ov7WvyM&feature=youtu.be" },
    { id: "vb230", seccion: "respiracion", nombre: "Respi Estiramiento pulmones vacios", plano: "sagital", video: "https://www.youtube.com/watch?v=ebxGp_PPXcs" },
    { id: "vb231", seccion: "respiracion", nombre: "Base de la respiración para gestionar tus emociones", plano: "sagital", video: "https://www.youtube.com/watch?v=z0QEjowV8yA" },
    { id: "vb232", seccion: "respiracion", nombre: "Respiración estiramientos + apnea con pulmones llenos", plano: "sagital", video: "https://youtu.be/JKkM-QSFJQ8" },
    { id: "vb233", seccion: "movilidad", nombre: "Flexores banda a anterior + lateralizo", plano: "frontal", video: "https://youtu.be/Y_wsPJhnPhA?si=gs2xpo66XFVE7LrH" },
    { id: "vb234", seccion: "respiracion", nombre: "Respi 90 grados en pared", plano: "sagital", video: "https://www.youtube.com/watch?v=SD0lve2NMUk" },
    { id: "vb235", seccion: "respiracion", nombre: "Respi manos atras en pared", plano: "sagital", video: "https://youtu.be/BjK4gfGaCbo" },
    { id: "vb236", seccion: "respiracion", nombre: "Respi 90 grados pared elevando pelvis", plano: "sagital", video: "https://www.youtube.com/watch?v=RlanJvrDiZE" },
    { id: "vb237", seccion: "respiracion", nombre: "Respi posturas en pelota suiza", plano: "sagital", video: "https://youtu.be/DnHA37L1tHs" },
    { id: "vb238", seccion: "respiracion", nombre: "Respi vascula de pelvis en pared", plano: "sagital", video: "https://youtu.be/1GBlNNSw-5g" },
    { id: "vb239", seccion: "car_girar", nombre: "Giro 45°", plano: "sagital", video: "https://drive.google.com/file/d/1yYzWil3vQ1SLCmn55Zmtel049_UUhDaE/view" },
    { id: "vb240", seccion: "car_girar", nombre: "Giro 90°", plano: "sagital", video: "https://drive.google.com/file/d/1U8U8zHds8q6_ONkudNbCMYlGzfkWacd5/view" },
    { id: "vb241", seccion: "rodilla_bi", nombre: "Sentadilla lateral landmine copa", plano: "transversal", video: "https://www.youtube.com/watch?v=w29bT04oiAM" },
    { id: "vb242", seccion: "rodilla_bi", nombre: "Estocada fija mancuerna", plano: "sagital", video: "https://youtu.be/LLwGkzf1bcU" },
    { id: "vb243", seccion: "rodilla_bi", nombre: "Estocada zercher", plano: "sagital", video: "https://youtube.com/shorts/gSBp16-f6mY?si=WCRKdgn1pFe0T3kT" },
    { id: "vb244", seccion: "rodilla_bi", nombre: "Dragon squat", plano: "sagital", video: "https://youtube.com/shorts/Z7hgGVzIt78?si=UVk6FgYGdR4ck86Z" },
    { id: "vb245", seccion: "rodilla_bi", nombre: "Dragon squat en cajon", plano: "sagital", video: "https://youtube.com/shorts/MXUHESKJrw8?si=KGA2eRgbGUZXlFbh" },
    { id: "vb246", seccion: "rodilla_bi", nombre: "Matrix asistido pared (sissy)", plano: "sagital", video: "https://youtu.be/5Bz46L0rS60" },
    { id: "vb247", seccion: "rodilla_bi", nombre: "Podio bajada lateral", plano: "frontal", video: "https://youtu.be/rKxeZNUkuYw" },
    { id: "vb248", seccion: "rodilla_bi", nombre: "Podio subida lateral", plano: "frontal", video: "https://youtu.be/l_imbVyShWM" },
    { id: "vb249", seccion: "rodilla_bi", nombre: "Podio subida de frente", plano: "sagital", video: "https://youtu.be/6RkJXq3RXPg" },
    { id: "vb250", seccion: "rodilla_bi", nombre: "Sentadilla atrás barra", plano: "sagital", video: "https://drive.google.com/file/d/1wADmbkJUyrzrTAVDPigDvwuLcXKac12j/view" },
    { id: "vb251", seccion: "rodilla_bi", nombre: "Peso muerto trap bar", plano: "sagital", video: "https://www.youtube.com/shorts/tsIQqdJfoV0" },
    { id: "vb252", seccion: "rodilla_bi", nombre: "Sentadilla Búlgara mancuerna", plano: "sagital", video: "https://youtu.be/4hnBrXZcxLQ" },
    { id: "vb253", seccion: "rodilla_bi", nombre: "Sentadilla copa", plano: "sagital", video: "https://youtu.be/zmJROVAIM0A" },
    { id: "vb254", seccion: "rodilla_bi", nombre: "Sentadilla landmine a punta de pie", plano: "transversal", video: "https://youtu.be/1GTZVGabpUg" },
    { id: "vb255", seccion: "rodilla_bi", nombre: "Sentadilla lateral cosaca", plano: "frontal", video: "https://youtu.be/BML4P0tAGts" },
    { id: "vb256", seccion: "rodilla_bi", nombre: "Sentadilla lateral fijo", plano: "frontal", video: "https://youtu.be/BML4P0tAGts" },
    { id: "vb257", seccion: "rodilla_bi", nombre: "Sentadilla lateral a cargada", plano: "frontal", video: "https://youtu.be/uhOhMLutuQI" },
    { id: "vb258", seccion: "rodilla_bi", nombre: "Sentadilla lateral deslizador", plano: "frontal", video: "https://youtu.be/FopoUWDK6Fc" },
    { id: "vb259", seccion: "rodilla_bi", nombre: "Sentadilla lateral deslizador + press hombro", plano: "frontal", video: "https://youtu.be/7M-rj8v65E0" },
    { id: "vb260", seccion: "rodilla_bi", nombre: "Sentadilla lateral deslizador peso abajo", plano: "frontal", video: "https://drive.google.com/file/d/1pacN_EECEOuxLc0WGHAj8d4GQ9qZoL9_/view" },
    { id: "vb261", seccion: "rodilla_bi", nombre: "Sentadilla lateral fija peso abajo", plano: "frontal", video: "https://youtu.be/BgziDKWkpV8" },
    { id: "vb262", seccion: "rodilla_bi", nombre: "Sentadilla lateral peso una mano", plano: "frontal", video: "https://youtu.be/enpByBzAgpM" },
    { id: "vb263", seccion: "rodilla_bi", nombre: "Sentadilla skater lateral landmine", plano: "transversal", video: "https://youtu.be/tFyJ6QunZfM" },
    { id: "vb264", seccion: "rodilla_bi", nombre: "Sentadilla lateral landmine bajo", plano: "transversal", video: "https://youtu.be/Zb2qyoE_V00" },
    { id: "vb265", seccion: "rodilla_bi", nombre: "Sentadilla lateral trx", plano: "frontal", video: "https://youtube.com/shorts/fdTSUjRjjB8?si=lNVsBM7Dwn68HrDw" },
    { id: "vb266", seccion: "rodilla_bi", nombre: "Sentadilla Zercher (antebrazo)", plano: "sagital", video: "https://youtu.be/jFNppWPxlhM" },
    { id: "vb267", seccion: "rodilla_bi", nombre: "Sumo con mancuerna", plano: "sagital", video: "https://youtube.com/shorts/Zt4WwH1Rx_E?si=8x17uLlK-Iy5aoWo" },
    { id: "vb268", seccion: "rodilla_bi", nombre: "Sentadilla trx un pie", plano: "sagital", video: "https://youtube.com/shorts/t-6kwQEdJ2A?si=D9ucbOupb6NSQub7" },
    { id: "vb269", seccion: "rodilla_bi", nombre: "Sentadilla trx", plano: "sagital", video: "https://youtube.com/shorts/LOOFBkmBlGU?si=ayf-y6wjvuGgIjoW" },
    { id: "vb270", seccion: "rodilla_bi", nombre: "Sentadilla smith machine", plano: "sagital", video: "https://www.youtube.com/watch?v=g2H0JSEjpNE" },
    { id: "vb271", seccion: "rodilla_bi", nombre: "Estocada atras mancuerna", plano: "sagital", video: "https://youtu.be/5nPhfFPEANY" },
    { id: "vb272", seccion: "potencia", nombre: "Salto con giro step", plano: "sagital", video: "https://www.youtube.com/watch?v=cbRFZtWjGI0&list=PLiD0iJFrHtz2fYasZKvaQK_svpOmU7H_y&index=8" },
    { id: "vb273", seccion: "potencia", nombre: "Saltos pogo 2p", plano: "sagital", video: "https://youtu.be/GKr90_WsmlE?si=Uskx-R4LOSrHPloL" },
    { id: "vb274", seccion: "potencia", nombre: "Salto lateral 1p con caida", plano: "frontal", video: "https://www.youtube.com/watch?v=EQsA49b0QC0&list=PLiD0iJFrHtz2fYasZKvaQK_svpOmU7H_y&index=7" },
    { id: "vb275", seccion: "potencia", nombre: "Salto lateral 1p ida y vuelta con caida", plano: "frontal", video: "https://drive.google.com/file/d/1wdm27GNc6QaTJ_gEjN3jlVYVk3n4pe1V/view" },
    { id: "vb276", seccion: "potencia", nombre: "Caídas base 3 niveles", plano: "sagital", video: "https://youtu.be/kBoOii7qwVc?si=XZb1ANvoCN8gWBvP" },
    { id: "vb277", seccion: "potencia", nombre: "Caida 1pie lateral", plano: "frontal", video: "https://www.youtube.com/watch?v=763BW-ZSS5c&list=PLiD0iJFrHtz2fYasZKvaQK_svpOmU7H_y&index=3" },
    { id: "vb278", seccion: "potencia", nombre: "Caida 2pies 1pie horizontal", plano: "sagital", video: "https://youtu.be/tCiTEPnuqPY?si=oAgZo3qU1rJK2jZm" },
    { id: "vb279", seccion: "potencia", nombre: "Salto en L 1pie", plano: "sagital", video: "https://youtu.be/t3IxnPJHHHU?si=yXAPJ2gLM1jV411y" },
    { id: "vb280", seccion: "potencia", nombre: "Saltos horizontales continuos", plano: "sagital", video: "https://youtu.be/0a01ocZDMCQ" },
    { id: "vb281", seccion: "potencia", nombre: "Saltos laterales con cono", plano: "frontal", video: "https://youtu.be/5maGq-w-4AI?si=9mQf_BfTPKt2JvuV" },
    { id: "vb282", seccion: "potencia", nombre: "Saltos laterales cont c/rot", plano: "frontal", video: "https://youtu.be/rf27I6uqL4w?si=j8Ai9ulBzW0x3swB" },
    { id: "vb283", seccion: "potencia", nombre: "Saltos tijera con giro a step", plano: "sagital", video: "https://youtu.be/rkzY6ckxamI" },
    { id: "vb284", seccion: "potencia", nombre: "Salto al cajon rotacion 90°", plano: "transversal", video: "https://www.youtube.com/watch?v=z0UJWG1ig4k" },
    { id: "vb285", seccion: "potencia", nombre: "Salto lateral desde sentado al cajon", plano: "frontal", video: "https://www.youtube.com/watch?v=_Bvxdc1vOaY" },
    { id: "vb286", seccion: "potencia", nombre: "Drop asistido con banda", plano: "sagital", video: "https://www.youtube.com/watch?v=WRDVBSgPJj4" },
    { id: "vb287", seccion: "potencia", nombre: "Salto con vallas 1p", plano: "sagital", video: "https://www.youtube.com/shorts/0ztaw8DC81g" },
    { id: "vb288", seccion: "potencia", nombre: "Salto estocada intensivo", plano: "sagital", video: "https://youtu.be/cE654IExyIo" },
    { id: "vb289", seccion: "potencia", nombre: "Sentadilla explosiva landmine", plano: "transversal", video: "https://www.youtube.com/watch?v=Kd3FfUOo_Ew" },
    { id: "vb290", seccion: "potencia", nombre: "Salto CMJ", plano: "sagital", video: "https://youtu.be/kLcyORjdkyI" },
    { id: "vb291", seccion: "potencia", nombre: "Salto con caida (drop jump)", plano: "sagital", video: "https://drive.google.com/file/d/1nhMWjopBJkjhMM3AVg2uIWz7fuxEFqzW/view?usp=sharing" },
    { id: "vb292", seccion: "potencia", nombre: "Salto con caida pies divididos (drop estocada)", plano: "sagital", video: "https://drive.google.com/file/d/1bJ3vZ4YEF5y1ZI125aQgdOYNmDQkSXCS/view?usp=sharing" },
    { id: "vb293", seccion: "potencia", nombre: "Salto de rodillas + variantes", plano: "sagital", video: "https://youtu.be/JUIPxS1qMtc" },
    { id: "vb294", seccion: "potencia", nombre: "Salto en L 2p explosivo", plano: "sagital", video: "https://drive.google.com/file/d/1cFgvY79WRu7k9-GuNAClpWOJi8ysyJZc/view" },
    { id: "vb295", seccion: "potencia", nombre: "Salto estocada c/mancuerna", plano: "sagital", video: "https://drive.google.com/file/d/1ZH-vGDYkXzKsFynOD8ydytbjeOO8EX5C/view" },
    { id: "vb296", seccion: "potencia", nombre: "Salto horizontal + lanz rotacional int", plano: "transversal", video: "https://youtu.be/6-Da6HogSnI" },
    { id: "vb297", seccion: "potencia", nombre: "Salto rodilla + horizontal", plano: "sagital", video: "https://drive.google.com/file/d/1ATr7dUtDkJ5OHThd0-DW9U7dE0E6SYc9/view" },
    { id: "vb298", seccion: "potencia", nombre: "Salto rodilla + vertical", plano: "sagital", video: "https://drive.google.com/file/d/1nJRZkZx2Q4pMKdJsjFojFqhP7gUbRgGT/view?usp=sharing" },
    { id: "vb299", seccion: "movilidad", nombre: "Tobillos 1pie", plano: "sagital", video: "https://drive.google.com/file/d/1wBernXYgxjSHNL1WLNQ-e1HkfDXY1Op4/view" },
    { id: "vb300", seccion: "movilidad", nombre: "Tobillos deficit 2pies", plano: "sagital", video: "https://drive.google.com/file/d/1WvPCHc-EWZbAvyT8V5QoBOOKIOh4yvoO/view" },
    { id: "vb301", seccion: "traccion_bi", nombre: "T-W-Y", plano: "sagital", video: "https://www.youtube.com/shorts/8RJLYUH0akM" },
    { id: "vb302", seccion: "traccion_bi", nombre: "Remo rotacional cable 1mano contra", plano: "transversal", video: "https://www.youtube.com/watch?v=vSkQ8zkZFys" },
    { id: "vb303", seccion: "traccion_uni", nombre: "Remo 1 mano en perro cable", plano: "sagital", video: "https://www.youtube.com/watch?v=5qsqkt1cyqE" },
    { id: "vb304", seccion: "traccion_bi", nombre: "Remo rotacional cable 1mano ipsi", plano: "transversal", video: "https://www.youtube.com/watch?v=MPtO3rZxQIU" },
    { id: "vb305", seccion: "traccion_bi", nombre: "Remo una mano cable en estocada alta", plano: "sagital", video: "https://www.youtube.com/watch?v=c8gfIZPA3q8" },
    { id: "vb306", seccion: "traccion_bi", nombre: "Dominada asistida banda", plano: "sagital", video: "https://youtu.be/KKoIPA2KyiE" },
    { id: "vb307", seccion: "traccion_bi", nombre: "Dominada sentadilla trx", plano: "sagital", video: "https://youtu.be/5_gi64g_BWI" },
    { id: "vb308", seccion: "traccion_bi", nombre: "Dominada cerrada", plano: "sagital", video: "https://youtu.be/N_V0urc4n9M" },
    { id: "vb309", seccion: "traccion_bi", nombre: "Dominada media pies en cajon", plano: "sagital", video: "https://youtu.be/xaCA7_FNCfY" },
    { id: "vb310", seccion: "traccion_bi", nombre: "Dominada sentadilla barra", plano: "sagital", video: "https://youtu.be/c7tcIWgmVuc" },
    { id: "vb311", seccion: "traccion_bi", nombre: "Remo acostado con pies elevados TRX.", plano: "sagital", video: "https://youtu.be/3_7oenIMAt4" },
    { id: "vb312", seccion: "traccion_bi", nombre: "Remo 1mano rotacional de pie cable", plano: "transversal", video: "https://www.youtube.com/shorts/7t-RXAYbw7o" },
    { id: "vb313", seccion: "traccion_bi", nombre: "Remo acostado TRX", plano: "sagital", video: "https://youtu.be/Nd2sETgg3SQ" },
    { id: "vb314", seccion: "traccion_bi", nombre: "Remo con barra inclinado", plano: "sagital", video: "https://youtu.be/iuOhyFnkcHU" },
    { id: "vb315", seccion: "traccion_bi", nombre: "Remo en plancha", plano: "sagital", video: "https://youtu.be/2um6v66RedU" },
    { id: "vb316", seccion: "traccion_bi", nombre: "Remo en puente TRX", plano: "sagital", video: "https://youtu.be/P6VT3Vn7Xi8" },
    { id: "vb317", seccion: "traccion_bi", nombre: "Remo T en trx", plano: "sagital", video: "https://youtu.be/Pi1c89G7qR8" },
    { id: "vb318", seccion: "traccion_bi", nombre: "Remo TRX inicial", plano: "sagital", video: "https://youtu.be/N5NXm430pIc" },
    { id: "vb319", seccion: "traccion_bi", nombre: "Remo Gorila", plano: "sagital", video: "https://youtu.be/m1yctI1o7k8" },
    { id: "vb320", seccion: "traccion_bi", nombre: "Remo perro", plano: "sagital", video: "https://youtu.be/iiEleJbez_s" },
    { id: "vb321", seccion: "traccion_bi", nombre: "Remo perro en pared", plano: "sagital", video: "https://youtu.be/Tcmq0q7SUnw" },
    { id: "vb322", seccion: "traccion_bi", nombre: "Remo pendlay", plano: "sagital", video: "https://youtu.be/O9v7sb3JAPk?si=Lv9eyZhdXYhOG25d" },
    { id: "vb323", seccion: "traccion_bi", nombre: "Remo arquero trx", plano: "sagital", video: "https://youtu.be/_hhC4yx5JZ0" },
    { id: "vb324", seccion: "traccion_bi", nombre: "Remo una mano Trx", plano: "sagital", video: "https://youtu.be/jneXE6Mbvqk" },
    { id: "vb325", seccion: "traccion_bi", nombre: "Remo una mano rotacion TRX", plano: "transversal", video: "https://youtu.be/dT_EpqGFMTM" },
    { id: "vb326", seccion: "traccion_bi", nombre: "Face pull", plano: "sagital", video: "https://www.youtube.com/watch?v=I41wK3wTZlo" },
    { id: "vb327", seccion: "traccion_bi", nombre: "Remo sentado polea", plano: "sagital", video: "https://www.youtube.com/watch?v=g6ysGz2qso8" },
    { id: "vb328", seccion: "traccion_bi", nombre: "Pull up/ dominada abierta", plano: "sagital", video: "https://youtube.com/shorts/eDP_OOhMTZ4?si=gSW877jl6ikw-l9d" },
    { id: "vb329", seccion: "traccion_uni", nombre: "Remo 1 mano 45° polea", plano: "sagital", video: "https://www.youtube.com/shorts/zdN7_2LKdIA" },
    { id: "vb330", seccion: "traccion_bi", nombre: "Dorsalera supina", plano: "sagital", video: "https://youtube.com/shorts/VnLY_duYJKI?si=PYSRR6n7n60vcU4A" },
    { id: "vb331", seccion: "traccion_bi", nombre: "Remo W -TRX", plano: "sagital", video: "https://drive.google.com/file/d/1Pe4IIDGdLdYsu6j2tXCrUhi3OfQ9FcZZ/view" },
    { id: "vb332", seccion: "traccion_bi", nombre: "Remo explosivo invertido en barra", plano: "sagital", video: "https://www.youtube.com/shorts/1PCIo24YXSc" },
    { id: "vb333", seccion: "core", nombre: "Chop arriba abajo estocada baja", plano: "sagital", video: "https://www.youtube.com/shorts/EzoMXce9M-k" },
    { id: "vb334", seccion: "core", nombre: "Chop anti rotacion base ancha", plano: "transversal", video: "https://www.youtube.com/watch?v=3BXlV1EnXx0" },
    { id: "vb335", seccion: "cadera_bi", nombre: "Extensiones de cadera en barra", plano: "sagital", video: "https://www.youtube.com/shorts/1kRz8n9e7L8" },
    { id: "vb336", seccion: "rodilla_bi", nombre: "Caida a sentadilla lateral catch", plano: "frontal", video: "https://www.youtube.com/watch?v=1XTKu6bO_nU" },
    { id: "vb337", seccion: "dep_surf", nombre: "Pop up surf", plano: "sagital", video: "https://youtube.com/shorts/005XQNBf9yw?si=7vykqcHh41QJaSFk" },
    { id: "vb338", seccion: "dep_surf", nombre: "Pop up + bottom", plano: "sagital", video: "https://youtu.be/-RfxEUbC2BM?si=p_OIf-Whz_a1jpVv" },
    // ---- Ejercicios usados en clases que faltaban en la Biblioteca ----
    { id: "vbx339", seccion: "rodilla_bi", nombre: "Sentadilla lateral con clavas", plano: "frontal" },
    { id: "vbx340", seccion: "rodilla_bi", nombre: "Sentadilla a cajón", plano: "sagital" },
    { id: "vbx341", seccion: "cadera_bi", nombre: "Peso muerto rumano c/ mancuernas", plano: "sagital" },
    { id: "vbx342", seccion: "acc_gluteo", nombre: "Empuje de cadera (hip thrust)", plano: "sagital" },
    { id: "vbx343", seccion: "traccion_bi", nombre: "Remo en anillas", plano: "sagital" },
    { id: "vbx344", seccion: "traccion_bi", nombre: "Face pull con banda", plano: "sagital" },
    { id: "vbx345", seccion: "estabilidad", nombre: "Plancha lateral", plano: "transversal" },
    { id: "vbx346", seccion: "estabilidad", nombre: "Bird-dog (perro de muestra)", plano: "sagital" },
    { id: "vbx347", seccion: "potencia", nombre: "Locomoción: oso adelante/atrás + cangrejo", plano: "sagital" },
    { id: "vbx348", seccion: "potencia", nombre: "Pogos en el lugar → desplazados", plano: "sagital" },
    { id: "vbx349", seccion: "respiracion", nombre: "Puente subibaja con respiración (inhalo 6 · sostengo 3 · exhalo 6)", plano: "sagital" },
    { id: "vbx350", seccion: "respiracion", nombre: "Postura de niño con respiración nasal", plano: "sagital" },
    { id: "vbx351", seccion: "movilidad", nombre: "Estiramiento de cadena posterior", plano: "sagital" },
    { id: "vbx352", seccion: "respiracion", nombre: "Respiración costal lateral en decúbito", plano: "sagital" },
    { id: "vbx353", seccion: "estabilidad", nombre: "Pallof press con banda (anti-rotación)", plano: "transversal" },
    { id: "vbx354", seccion: "rodilla_uni", nombre: "Patinador (skater) en el lugar", plano: "frontal" },
    { id: "vbx355", seccion: "potencia", nombre: "Cangrejo + break dance", plano: "sagital" },
    { id: "vbx356", seccion: "respiracion", nombre: "Piernas a la pared / invertida — respiración 90°", plano: "sagital" },
    { id: "vbx357", seccion: "movilidad", nombre: "Estiramiento de flexores de cadera (zancada baja)", plano: "sagital" },
    { id: "vbx358", seccion: "respiracion", nombre: "Respiración nasal en silencio", plano: "sagital" },
    { id: "vbx359", seccion: "respiracion", nombre: "Respiración con activación de transverso (hollow suave)", plano: "sagital" },
    { id: "vbx360", seccion: "rotacion", nombre: "Rotación torácica en cuadrupedia (enhebrar la aguja)", plano: "transversal" },
    { id: "vbx361", seccion: "rotacion", nombre: "Rotación trípode arcoíris", plano: "transversal" },
    { id: "vbx362", seccion: "rotacion", nombre: "Capoeira + patada cruzada", plano: "transversal" },
    { id: "vbx363", seccion: "rotacion", nombre: "Volantazos con pesa (rotación de cadera)", plano: "transversal" },
    { id: "vbx364", seccion: "respiracion", nombre: "Respiración en caja (4-4-4-4)", plano: "sagital" },
    { id: "vbx365", seccion: "estabilidad", nombre: "Torsión espinal en el piso", plano: "transversal" },
    { id: "vbx366", seccion: "movilidad", nombre: "Postura de paloma (cadera)", plano: "sagital" },
    { id: "vbx367", seccion: "movilidad", nombre: "Gato bueno / malo con banda", plano: "sagital" },
    { id: "vbx368", seccion: "cadera_bi", nombre: "Peso muerto + sentadilla con pelota", plano: "sagital" },
    { id: "vbx369", seccion: "rodilla_bi", nombre: "Sentadilla isométrica sacando pies", plano: "sagital" },
    { id: "vbx370", seccion: "colgarse", nombre: "Colgarse de la barra", plano: "sagital" },
    { id: "vbx371", seccion: "traccion_bi", nombre: "Remo", plano: "sagital" },
    { id: "vbx372", seccion: "acc_biceps", nombre: "Bíceps", plano: "sagital" },
    { id: "vbx373", seccion: "rodilla_bi", nombre: "Sentadilla sumo punta de pie", plano: "sagital" },
    { id: "vbx374", seccion: "acc_triceps", nombre: "Tríceps / fondos", plano: "sagital" },
    { id: "vbx375", seccion: "movilidad", nombre: "Aperturas de cadera de pie o acostado", plano: "sagital" },
    { id: "vbx376", seccion: "movilidad", nombre: "Gato bueno / malo", plano: "sagital" },
    { id: "vbx377", seccion: "respiracion", nombre: "Respiración lateral", plano: "sagital" },
    { id: "vbx378", seccion: "respiracion", nombre: "Hipopresivo", plano: "sagital" },
    { id: "vbx379", seccion: "cadera_bi", nombre: "Elevación de cadera con aductores y pelota", plano: "frontal" },
    { id: "vbx380", seccion: "estabilidad", nombre: "Bicho muerto + flexión con pelota", plano: "sagital" },
    { id: "vbx381", seccion: "estabilidad", nombre: "Rotación de tronco en plancha lateral con pelota", plano: "transversal" },
    { id: "vbx382", seccion: "movilidad", nombre: "Paso atrás + vuelta al mundo con pelota", plano: "sagital" },
    { id: "vbx383", seccion: "rodilla_bi", nombre: "Sentadilla", plano: "sagital" },
    { id: "vbx384", seccion: "empuje_bi", nombre: "Press de suelo con mancuernas", plano: "sagital" },
    { id: "vbx385", seccion: "acc_hombro", nombre: "Vuelos frontales", plano: "sagital" },
    { id: "vbx386", seccion: "traccion_bi", nombre: "Remo vertical", plano: "sagital" },
    { id: "vbx387", seccion: "movilidad", nombre: "Bajada de podio", plano: "sagital" },
    { id: "vbx388", seccion: "acc_gluteo", nombre: "Patada de glúteos", plano: "sagital" },
    { id: "vbx389", seccion: "movilidad", nombre: "Bebé feliz + panqueque", plano: "sagital" },
    { id: "vbx390", seccion: "respiracion", nombre: "Packing (respiración con compresión)", plano: "sagital" },
    { id: "vbx391", seccion: "estabilidad", nombre: "Plancha lateral codo-rodilla alternado", plano: "transversal" },
    { id: "vbx392", seccion: "rodilla_uni", nombre: "Estocada punta de pie", plano: "sagital" },
    { id: "vbx393", seccion: "movilidad", nombre: "Estocada toco cielo / toco tierra", plano: "sagital" },
    { id: "vbx394", seccion: "estabilidad", nombre: "Plancha 8 apoyos", plano: "sagital" },
    { id: "vbx395", seccion: "empuje_bi", nombre: "Fuerza de brazo con escápulas", plano: "sagital" },
    { id: "vbx396", seccion: "cadera_bi", nombre: "Peso muerto pies divididos", plano: "sagital" },
    { id: "vbx397", seccion: "estabilidad", nombre: "Giros rusos", plano: "transversal" },
    { id: "vbx398", seccion: "traccion_bi", nombre: "Remo doble mancuerna", plano: "sagital" },
    { id: "vbx399", seccion: "acc_isquios", nombre: "Talones a la cola (curl de isquios)", plano: "sagital" },
    { id: "vbx400", seccion: "cadera_bi", nombre: "Apertura de caderas con banda", plano: "frontal" },
    { id: "vbx401", seccion: "estabilidad", nombre: "Plancha lateral subibaja", plano: "transversal" },
    { id: "vbx402", seccion: "estabilidad", nombre: "Abdominal codo-rodilla", plano: "sagital" },
    { id: "vbx403", seccion: "respiracion", nombre: "Packing 30\\\" + vaciado 10\\\"", plano: "sagital" },
    { id: "vbx404", seccion: "movilidad", nombre: "Estiramientos sentado: rotación · flexión lateral · extensión · flexión", plano: "sagital" },
    { id: "vbx405", seccion: "respiracion", nombre: "Apneas máximas", plano: "sagital" }
  ],

  // ---- contenido para el panel de Alumno: sección Información ----
  // Textos base editables: pedime cambios de copy/precios/políticas y los actualizo acá.
  info: {
    centro: {
      comoReservar: "Desde la pestaña Reservar elegís el día y la hora, y confirmás tu lugar. Se descuenta una clase de tu plan al reservar, y se te devuelve si cancelás con tiempo. Si tu plan es ilimitado, reservá las que quieras.",
      cancelacion: "Podés cancelar tu reserva desde la app hasta 2 horas antes del inicio de la clase, y la clase se te devuelve al plan. Si cancelás con menos de 2 horas de anticipación, la clase queda usada — así cuidamos el cupo para el resto del grupo.",
      vencimiento: "Los planes duran 30 días desde que se activan. Si se cumple el mes, tu plan vence aunque te queden clases sin usar — la app te va a avisar unos días antes para que renueves a tiempo.",
      pagos: ["SINPE", "Transferencia colones", "Transferencia dólares", "Efectivo"],
      cuentasPago: [
        { medio: "SINPE Móvil", detalle: "72401591" },
        { medio: "Transferencia — Colones (Lafise, Juan Serioli)", detalle: "CR63011400007013214570" },
        { medio: "Transferencia — Dólares (Lafise, Juan Serioli)", detalle: "CR81011400007813639525" },
        { medio: "Efectivo", detalle: "En el centro, con tu coach" }
      ],
      comoPagar: "Elegís tu plan desde Mi perfil y avisás el pago a tu coach (o lo hacés en el centro). Una vez que el coach confirma que lo recibió, tu plan queda activo al instante."
    },
    nutricion: [
      { id: "n1", titulo: "Antes de entrenar", texto: "Comé algo liviano con carbohidratos 1-2 horas antes de la clase (fruta, avena, pan) y evitá llegar en ayunas si tu entrenamiento es de alta intensidad. Hidratate bien durante el día, no solo antes de entrenar." },
      { id: "n2", titulo: "Después de entrenar", texto: "En la primera hora después de entrenar buscá combinar proteína con carbohidrato (por ejemplo huevo con fruta, o yogur con granola) para ayudar a la recuperación muscular." },
      { id: "n3", titulo: "Hidratación diaria", texto: "Como referencia general, tomá agua a lo largo de todo el día — no solo cuando tenés sed. En días de más calor o entrenamientos largos, sumá algo de sodio (agua con una pizca de sal, o una bebida isotónica)." }
    ],
    descanso: [
      { id: "d1", titulo: "Por qué dormir es parte del entrenamiento", texto: "El músculo se recupera y se fortalece mientras dormís, no mientras entrenás. Dormir menos de 6-7 horas de forma sostenida frena tus resultados tanto como saltarte clases." },
      { id: "d2", titulo: "Días de descanso", texto: "Un día sin entrenar no es un día perdido: es parte del plan. Si sentís mucho cansancio acumulado, avisale a tu coach — se puede ajustar la intensidad de tu rutina esa semana." }
    ],
    blog: [
      { id: "b1", fecha: "2026-06", titulo: "¿Por qué entrenamos por patrones de movimiento?", texto: "En vez de separar el cuerpo en \"músculos\", en DHARMA organizamos los ejercicios por patrones (empuje, tracción, cadera, rodilla, rotación). Así entrenamos movimientos que después usás en la vida real: levantar, empujar, girar, cargar." },
      { id: "b2", fecha: "2026-05", titulo: "El check-in diario, ¿para qué sirve?", texto: "Registrar cómo dormiste, tu energía y tu ánimo antes de entrenar nos ayuda a vos y a tu coach a ver patrones: si varias semanas seguidas aparecés cansado, es momento de ajustar la carga antes de que te lesiones." }
    ]
  }
};
