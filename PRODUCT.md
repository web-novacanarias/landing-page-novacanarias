# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Autónomos, pymes y profesionales de Tenerife y Canarias que necesitan resolver su fiscalidad, contabilidad y laboral sin perder tiempo en papeleo. Llegan desde una búsqueda local o por recomendación, quieren saber en segundos si el despacho es de fiar y cómo contactar. En temporada de renta (abril a junio) llegan también particulares que buscan el formulario de la campaña.

## Product Purpose

Canarias Nova Consulting SL es una asesoría con sede en La Laguna (Tenerife) que presta servicios fiscales, laborales, contables, de subvenciones y constitución de sociedades, especializada en el Régimen Económico y Fiscal de Canarias (REF). La web existe para generar consultas de contacto, captar suscriptores de su newsletter fiscal y recoger datos de la campaña de la renta.

## Positioning

Despacho 100% canario que lleva fiscal, laboral y contable en un solo sitio, con asesor asignado y conocimiento del REF.

## Operating Context

Contacto por formulario, teléfono (+34 649 73 30 76) y email (info@canariasnova.com). Horario de lunes a viernes, 09:00 a 17:00. El formulario de la campaña de la renta (/formulario-rentas) es una página aparte y no forma parte de este trabajo.

## Capabilities and Constraints

- Astro 6 + Tailwind 4 desplegado en Vercel. Formulario de contacto con Resend; newsletter con MailerLite.
- Dominio canónico: www.canariasnova.com.
- No se añade WhatsApp (decisión del propietario).
- Se conserva la pila de cartas del equipo y el encabezado "Anticípate al BOE" de la newsletter (decisión del propietario).
- Copy en español de España, tono cercano y claro.
- Sin cifras ni afirmaciones sin respaldo: se retiró el "35% menos de impuestos".

## Brand Commitments

Azul marino de marca `#00236a`, tipografía Futura Std (archivos en `src/fonts`), logotipo blanco `public/nova-logo.avif`. Las cifras "+15 años", "100% origen canario" y "TOP" las mantiene el propietario.

## Evidence on Hand

Fotos reales del equipo y de la oficina en `public/images`. Sin testimonios, casos de éxito, métricas de clientes ni reseñas disponibles: no se deben inventar.

## Product Principles

1. Confianza local antes que espectáculo: claridad, datos de contacto visibles y nada que prometa lo que no se puede probar.
2. Un despacho, tres áreas: fiscal, laboral y contable se presentan como un todo.
3. Accesible y rápido en móvil: es el dispositivo desde el que llega la mayoría de los autónomos.
4. Los formularios no deben ser una vía de spam ni de abuso hacia clientes de terceros.

## Accessibility & Inclusion

WCAG AA como mínimo: contraste, foco visible, navegación por teclado, `prefers-reduced-motion` respetado.
