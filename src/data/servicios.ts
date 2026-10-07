/**
 * Servicios de la asesoría. El texto de `resumen` y `caracteristicas` es el que ya
 * existia en la home; el resto (descripciones de cada punto, "para quien") se
 * deriva de el sin añadir cifras ni promesas nuevas. Revisar antes de publicar.
 */
export interface Servicio {
  slug: string;
  nombre: string;
  icon: string;
  resumen: string;
  caracteristicas: string[];
  seo: { title: string; description: string; h1: string };
  intro: string;
  incluye: { titulo: string; texto: string }[];
  paraQuien: string[];
}

export const servicios: Servicio[] = [
  {
    slug: "asesoria-fiscal",
    nombre: "Fiscalidad",
    icon: "coins",
    resumen:
      "Presentamos tus impuestos a tiempo, sin errores. Optimizamos tu carga fiscal desde el día uno. Cumples con Hacienda sin complicarte la vida.",
    caracteristicas: [
      "Declaraciones trimestrales y anuales.",
      "Revisión de tus impuestos.",
      "Asesor fiscal asignado para consultas.",
      "Gestión de notificaciones de Hacienda.",
      "Optimizamos para que pagues menos.",
    ],
    seo: {
      title: "Asesoría fiscal en Tenerife | Nova Consulting",
      description:
        "Asesoría fiscal para autónomos y empresas en Tenerife: declaraciones, IGIC, optimización fiscal y gestión de notificaciones de Hacienda con asesor asignado.",
      h1: "Asesoría fiscal en Tenerife",
    },
    intro:
      "Presentamos tus impuestos a tiempo y sin errores, y optimizamos tu carga fiscal desde el primer día. Conocemos la fiscalidad canaria y el Régimen Económico y Fiscal de Canarias (REF), así que no tienes que descifrarlos tú.",
    incluye: [
      {
        titulo: "Declaraciones trimestrales y anuales",
        texto: "Preparamos y presentamos tus declaraciones periódicas en plazo, incluido el IGIC.",
      },
      {
        titulo: "Revisión de tus impuestos",
        texto: "Analizamos lo que pagas hoy para detectar errores y oportunidades de mejora.",
      },
      {
        titulo: "Asesor fiscal asignado",
        texto: "Una persona de referencia a la que consultar tus dudas, sin pasar por un buzón genérico.",
      },
      {
        titulo: "Gestión de notificaciones de Hacienda",
        texto: "Recibimos, interpretamos y respondemos requerimientos y notificaciones por ti.",
      },
      {
        titulo: "Optimización de tu carga fiscal",
        texto: "Planificamos para que pagues lo justo, dentro de la ley y aprovechando las deducciones y bonificaciones que te correspondan.",
      },
    ],
    paraQuien: [
      "Autónomos y profesionales que quieren olvidarse de los plazos.",
      "Pymes y sociedades que necesitan una planificación fiscal a medida.",
      "Empresas con actividad en Canarias que quieren aprovechar el REF.",
    ],
  },
  {
    slug: "asesoria-laboral",
    nombre: "Laboral",
    icon: "users-three",
    resumen:
      "Altas, bajas y contratos sin dolores de cabeza. Nóminas claras, bien hechas y a tiempo. Cumplimiento total con la normativa vigente.",
    caracteristicas: [
      "Gestión de nóminas y seguros sociales.",
      "Contratos adaptados a convenios vigentes.",
      "Alta/baja en Seguridad Social en 24h.",
      "Consultoría laboral para evitar sanciones.",
      "Defensa ante inspecciones laborales.",
    ],
    seo: {
      title: "Asesoría laboral en Tenerife | Nova Consulting",
      description:
        "Asesoría laboral en Tenerife: nóminas, seguros sociales, contratos, altas y bajas en la Seguridad Social y apoyo ante inspecciones de trabajo.",
      h1: "Asesoría laboral en Tenerife",
    },
    intro:
      "Altas, bajas y contratos sin dolores de cabeza. Nos ocupamos de tus nóminas y de cumplir con la normativa laboral vigente para que dediques tu tiempo a tu equipo y a tu negocio.",
    incluye: [
      {
        titulo: "Nóminas y seguros sociales",
        texto: "Nóminas claras, bien hechas y a tiempo, junto con la gestión de tus seguros sociales.",
      },
      {
        titulo: "Contratos adaptados al convenio",
        texto: "Redactamos contratos conforme a los convenios vigentes de tu sector.",
      },
      {
        titulo: "Altas y bajas en la Seguridad Social",
        texto: "Tramitamos altas y bajas en 24 horas.",
      },
      {
        titulo: "Consultoría laboral preventiva",
        texto: "Te orientamos antes de decidir, para evitar sanciones y conflictos.",
      },
      {
        titulo: "Defensa ante inspecciones laborales",
        texto: "Te acompañamos y preparamos la documentación si recibes una inspección.",
      },
    ],
    paraQuien: [
      "Autónomos que contratan a su primer empleado.",
      "Pymes con plantilla que quieren delegar la gestión laboral.",
      "Empresas que necesitan resolver dudas sobre convenios y contratos.",
    ],
  },
  {
    slug: "contabilidad",
    nombre: "Contabilidad",
    icon: "calculator",
    resumen:
      "Llevamos tus libros contables al día, sin líos. Informes claros para que sepas cómo va tu negocio. Olvídate del Excel.",
    caracteristicas: [
      "Informes mensuales claros y visuales.",
      "Cuadro de mando financiero actualizado.",
      "Herramienta para escaneo automático de facturas.",
      "Control de gastos y previsión de tesorería.",
      "Cero Excel: todo automatizado.",
    ],
    seo: {
      title: "Contabilidad para autónomos y empresas en Tenerife | Nova",
      description:
        "Contabilidad en Tenerife para autónomos y empresas: libros al día, informes mensuales claros, escaneo automático de facturas y control de tesorería.",
      h1: "Contabilidad para autónomos y empresas en Tenerife",
    },
    intro:
      "Llevamos tus libros contables al día y te damos informes claros para que sepas cómo va tu negocio en cada momento. Olvídate del Excel: automatizamos lo repetitivo y cuidamos los detalles.",
    incluye: [
      {
        titulo: "Informes mensuales claros y visuales",
        texto: "Resúmenes fáciles de leer para que entiendas tus números sin ser contable.",
      },
      {
        titulo: "Cuadro de mando financiero",
        texto: "Una vista actualizada de ingresos, gastos y resultados.",
      },
      {
        titulo: "Escaneo automático de facturas",
        texto: "Una herramienta para que subir tus facturas sea cuestión de segundos.",
      },
      {
        titulo: "Control de gastos y previsión de tesorería",
        texto: "Anticipamos tus necesidades de caja para que tomes decisiones con margen.",
      },
      {
        titulo: "Todo automatizado",
        texto: "Menos tareas manuales y menos errores, con la contabilidad siempre al día.",
      },
    ],
    paraQuien: [
      "Autónomos que quieren saber cuánto ganan de verdad.",
      "Pymes que necesitan informes para decidir y para presentar a bancos.",
      "Negocios que hoy llevan las cuentas en hojas de cálculo.",
    ],
  },
];

export function getServicio(slug: string): Servicio | undefined {
  return servicios.find((s) => s.slug === slug);
}
