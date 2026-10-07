---
name: Nova Consulting
description: Asesoría fiscal, laboral y contable en Tenerife; navy ground, paper sections, one blue accent, Futura weight contrast.
colors:
  nova: "#00236a"
  nova-deep: "#001a4d"
  nova-night: "#00112f"
  paper: "#f7f6f6"
  ink: "#0a1a3f"
  accent: "#1e4fd8"
  sky: "#8fb8ff"
  sky-soft: "#c9dcff"
  white: "#ffffff"
typography:
  display:
    fontFamily: "FuturaStd, ui-sans-serif, system-ui, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "FuturaStd, ui-sans-serif, system-ui, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 900
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "FuturaStd, ui-sans-serif, system-ui, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "FuturaStd, ui-sans-serif, system-ui, Segoe UI, Roboto, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "FuturaStd, ui-sans-serif, system-ui, Segoe UI, Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  control: "12px"
  panel: "24px"
  pill: "9999px"
spacing:
  section-y: "112px"
  section-y-mobile: "80px"
  gutter: "24px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.nova}"
    rounded: "{rounded.control}"
    padding: "16px 32px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "16px 32px"
  input-field:
    backgroundColor: "rgba(255,255,255,0.10)"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "14px 16px"
  nav-pill:
    backgroundColor: "{colors.nova-deep}"
    textColor: "{colors.sky-soft}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  photo-panel:
    rounded: "{rounded.panel}"
---

# Design System: Nova Consulting

## Overview

**Creative North Star: "The Calm Despacho"**

A Canarian professional firm that speaks plainly. The page is a navy ground with off-white paper sections interleaved; structure comes from weight contrast (Futura 900 headlines against 400 body) and hairline-ruled lists rather than grids of cards. Photography is real (desk, offices, sector scenes), never illustration. One blue accent does all the emphasis, in two tones matched to the ground it sits on.

Density is generous: large section padding, wide measure limits, one idea per band. Motion is quiet: a single scroll-reveal (fade plus 16px rise) on the stats strip and sector tiles, small hover lifts on buttons, and a slow crossfade between two contact photos. All motion is disabled under prefers-reduced-motion.

**Key Characteristics:**
- Navy ground (#00236a) with a deeper band (#001a4d) and paper (#f7f6f6) sections.
- Hairline-ruled lists (services, principles, audience) in place of card grids.
- Weight contrast in one family: 900 headlines, 400 body, 700 for links and buttons.
- Real photography in 24px-radius panels; Phosphor icons only.
- Flat surfaces; depth from tonal bands and a few soft shadows on floating or lifted items.

## Colors

A single blue accent on two grounds: pale sky on navy, saturated blue on paper. Everything else is the navy family, paper, and white.

### Primary
- **Nova Navy** (nova): page ground, hero, Nosotros, Contacto, primary-button text on white.
- **Sky Blue** (sky): the accent on dark grounds: highlighted words in headlines, icons, hover state of links, focus ring, text selection.
- **Signal Blue** (accent): the accent on paper: icons, text links, checkmarks, the focus ring inside light sections.

### Neutral
- **Deep Navy** (nova-deep): stats strip, footer, floating nav, "Para quién es" band, gradient scrims over photos.
- **Night Navy** (nova-night): the renta notice card only.
- **Paper** (paper): light section ground (Servicios, Sectores, Equipo, Newsletter).
- **Ink** (ink): headline and list text on paper. Body copy on paper uses slate-700 from the Tailwind default scale.
- **Mist Blue** (sky-soft): body text on navy (at 80-90% opacity), labels, nav links.
- **White** (white): headlines on navy and the primary button fill.

### Named Rules
**The Two-Tone Accent Rule.** There is one accent. Use sky on navy grounds and accent on paper grounds; never sky on paper, never accent on navy. Light sections carry the `surface-light` class so the focus ring flips with the ground.

**The Ground Pairing Rule.** Text on navy is white or sky-soft; text on paper is ink or slate-700. Do not mix.

## Typography

**Display Font:** Futura Std (self-hosted OTF from src/fonts, weights 400/500/700/900, with ui-sans-serif, system-ui, Segoe UI, Roboto fallback)
**Body Font:** Futura Std, same family
**Label/Mono Font:** none

**Character:** One geometric family carries everything; hierarchy is made by weight (900 against 400) and size, not by pairing faces.

### Hierarchy
- **Display** (900, 2.25rem to 3.5rem, 1.08, -0.025em): the home h1 only.
- **Headline** (900, 2.25rem to 3rem, 1.08, -0.025em): section h2s. Service pages go to 3.75rem on h1.
- **Title** (900 or 700, 1.875rem to 2.25rem; 1.5rem to 1.875rem for list items): service names, principle titles.
- **Body** (400, 1.125rem to 1.25rem, relaxed leading, `max-w-prose` or `max-w-md/xl`): intros and descriptions; `text-wrap: pretty` on paragraphs, `balance` on h1-h3.
- **Label** (500, 0.875rem): nav links, form labels, footer links; 0.75rem for legal line.

### Named Rules
**The Weight Does the Work Rule.** Hierarchy is 900 versus 400 with size steps; never add a second face or a decorative display font.

## Layout

Single column bands, each a `max-w-7xl` container (1280px; service pages 1024px) with 24px side padding and 80px/112px (mobile/desktop) vertical section padding. Two-column bands (hero 1.2fr/1fr, Nosotros and Equipo 5/12 + 7/12) put the headline in a sticky left column (`top-28`) and the content on the right. Lists are separated by 1px hairlines at 15% ink or white opacity. The sector mosaic is a 4-column grid of 200px rows with row and column spans, 16px gap, with no empty cells. The stats strip is 4 columns (2 on mobile) separated by hairline dividers. Fixed header floats 16px from the top; content is offset by 96px mobile / 128px desktop; anchors use 6.5rem scroll padding. Breakpoints are Tailwind defaults (sm 640, md 768, lg 1024).

## Elevation & Depth

Mostly flat: depth comes from alternating navy, deep navy and paper bands and from 1px borders at 10-30% white. Soft, large-blur, navy-tinted shadows appear only on lifted or floating things: the hero photo, the primary buttons (`0 12px 30px -12px rgba(0,17,47,0.7)`), the floating nav (`0 10px 30px -10px rgba(0,17,47,0.6)`) with a backdrop blur, the notice cards. No hard offset shadows.

### Named Rules
**The Tonal Bands Rule.** Separate sections by changing the ground (navy, deep navy, paper), not by adding shadows or card outlines.

## Shapes

Three radii: controls (buttons, inputs, icon buttons, notice actions) 12px; panels (photos, sector tiles, cards, other-service links) 24px; the main nav is a full pill on desktop (rounded-3xl when open on mobile). Focus rings are 3px, offset 3px, in sky (accent on paper). Photography is always cropped into a panel, never full-bleed raw.

### Named Rules
**The 12/24 Rule.** If it is clickable or typeable it is 12px; if it holds an image or groups content it is 24px.

## Components

### Buttons
- **Shape:** 12px radius, 16px by 32px padding (larger hero and form submit), weight 700.
- **Primary:** white fill, nova navy text, soft navy shadow, 2px lift on hover, scale 0.98 on press. Trailing arrow-right nudges 4px on hover.
- **Secondary:** transparent, 1px white/30 border, white text, white/10 fill on hover.
- **Text link on paper:** bold accent blue, underlined at 30% with offset 4px; hover to navy.

### Inputs / Fields
- **Style:** 12px radius, 1px white/60 border, white/10 fill, white text, sky-soft placeholder, labels above in 500 sky-soft.
- **Focus:** border shifts to sky, fill to white/15, 2px sky ring. Success and error messages use tinted emerald and red panels at 12px.

### Navigation
Floating pill (max 1152px) in deep navy at 92% with white/15 border and backdrop blur; sky-soft links at 14px/500 turning white; a small white pill CTA. On mobile a hamburger opens a 24px-radius panel with hairline-separated links and a full-width white CTA.

### Hairline List
The signature pattern: rows between top and bottom 1px rules, a Phosphor icon at left in the accent tone, a 900 title, 400 body, a bold text link, and a checklist at right. Used for Servicios, Nosotros principles, and "Para quién es".

### Sector Tile
Photo in a 24px panel with a deep-navy bottom scrim and a white bold name at the lower left; sizes vary by span. Reveals on scroll.

### Stats Strip
Deep navy band, 4 cells divided by hairlines: sky icon, 900 figure at 2.25rem to 3rem, sky-soft caption. Reveals on scroll with an 80ms stagger.

### Owner-kept exceptions (not system rules)
- **Team card stack (Equipo.astro):** interactive stacked photo cards, kept as the owner built it. Its `shadow-2xl` and card behavior are not a pattern to extend.
- **Newsletter section (Newsletter.astro):** a rounded 2.5rem paper card with blurred color blobs, a pulsing-dot uppercase pill, a blue gradient on "BOE", and 16px/24px-radius form controls. Preserved at the owner's request; it deviates from the 12/24 Rule, Two-Tone Accent Rule and flat-band doctrine.
- **formulario-rentas page:** intentionally not redesigned; it uses its own older utility styling and is outside this system.

## Do's and Don'ts

### Do:
- **Do** alternate nova, nova-deep and paper bands to pace the page; put `surface-light` on every paper section.
- **Do** use sky on navy and accent on paper for all highlighted words, icons and links.
- **Do** build lists as hairline-ruled rows, with 900 titles over 400 body.
- **Do** use real photographs in 24px panels with descriptive Spanish alt text.
- **Do** import icons through `Icon.astro` (Phosphor, regular, bold only for arrows and actions) and register new glyphs in its glob list.
- **Do** put the reveal class only on the stats strip and sector tiles, and respect reduced motion.

### Don't:
- **Don't** use a second typeface or a weight outside 400/500/700/900.
- **Don't** use hard offset shadows or heavy card grids with shadows to separate content.
- **Don't** introduce a second accent hue; semantic emerald and red are for form status only.
- **Don't** use 12px on a panel or 24px on a control.
- **Don't** extend the owner-kept Newsletter or team-stack styling to new sections.

### Not canonized (defects the build carries)
- The Newsletter "Newsletter Exclusiva" uppercase pill with ping dot is a kicker/eyebrow; it is kept by the owner and not a rule for new surfaces.
- The 404 "Error 404" small sky line above the h1 is an eyebrow-style label; do not replicate it.
- The "TOP" stat in Destacados is a placeholder-like claim, not a token.
