/** Datos de negocio verificados en el repo o confirmados por la propiedad. No inventar mas. */
export const SITE = {
  name: "Canarias Nova Consulting",
  shortName: "Nova Consulting",
  legalName: "Canarias Nova Consulting SL",
  url: "https://www.canariasnova.com",
  email: "info@canariasnova.com",
  phone: "+34 649 73 30 76",
  phoneHref: "tel:+34649733076",
  locality: "La Laguna",
  region: "Santa Cruz de Tenerife",
  country: "ES",
  geo: { lat: 28.4635203, lng: -16.3113931 },
  hoursLabel: "Lunes a viernes",
  hoursRange: "09:00 - 17:00",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Canarias%20Nova%20Consulting%20SL%20La%20Laguna",
  defaultDescription:
    "Asesoría fiscal, laboral y contable en Tenerife para autónomos y empresas. Especialistas en el REF y la fiscalidad canaria. Despacho en La Laguna.",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).href;
}

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#negocio`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: absoluteUrl("/logo-nova.png"),
  image: absoluteUrl("/og-image.jpg"),
  description: SITE.defaultDescription,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Canarias" },
    { "@type": "AdministrativeArea", name: "Tenerife" },
  ],
  knowsAbout: ["Asesoría fiscal", "Asesoría laboral", "Contabilidad", "Régimen Económico y Fiscal de Canarias"],
};
