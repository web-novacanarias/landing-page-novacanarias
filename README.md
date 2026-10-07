# Nova Consulting (canariasnova.com)

Web de Canarias Nova Consulting SL. Astro 6 + Tailwind 4, desplegada en Vercel.

## Desarrollo

```sh
npm install
npm run dev      # http://localhost:4321
npm run build
```

Variables de entorno: ver `.env.example`.

## Estructura

| Ruta | Qué es |
|---|---|
| `src/pages/index.astro` | Home, compuesta por `src/components/home/*` |
| `src/pages/servicios/[slug].astro` | Páginas de servicio (datos en `src/data/servicios.ts`) |
| `src/pages/formulario-rentas.astro` | Cuestionario de la campaña de la Renta (independiente) |
| `src/pages/api/contact.ts`, `newsletter.ts` | Endpoints de los formularios |
| `src/lib/form-guard.ts` | Defensas anti-bot compartidas por los endpoints |
| `src/lib/site.ts` | Datos de negocio (teléfono, email, horario) y JSON-LD |
| `src/styles/global.css` | Tokens de marca (`@theme`), fuentes y estilos base |

## Formularios y bots

Capas, en orden: comprobación de origen (Astro + `isSameOrigin`), honeypot `website_url`
(fuera de pantalla), tiempo mínimo de 2,5 s (`ts`), rate limit en memoria, validación y
escape de HTML, y Cloudflare Turnstile si hay claves. El honeypot y el control de tiempo
responden con un éxito falso para que el bot no reintente. Para un límite de peticiones
global, añadir una regla de rate limit en el Firewall de Vercel sobre `/api/*`.

## SEO

Dominio canónico `https://www.canariasnova.com`. `vercel.json` redirige el apex a www (308).
Canonical, Open Graph y JSON-LD se generan por página en `src/layouts/Layout.astro`.
