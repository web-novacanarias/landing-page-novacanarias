/**
 * Defensas compartidas por /api/contact y /api/newsletter.
 *
 * Capas (de barata a cara): origen -> honeypot -> tiempo minimo -> rate limit
 * -> validacion -> Turnstile (si esta configurado). El honeypot y el tiempo
 * minimo NO delatan al bot: se responde con un exito falso para que no reintente.
 */

export const HONEYPOT_FIELD = "website_url";
export const TIMESTAMP_FIELD = "ts";
export const TURNSTILE_FIELD = "cf-turnstile-response";

const MIN_FILL_MS = 2500;
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7;

// Mas de este numero de enlaces en un mensaje se trata como spam.
const MAX_LINKS = 2;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]{1,64}@[a-z0-9.-]{1,253}\.[a-z]{2,24}$/i;
const PHONE_RE = /^[+0-9][0-9 ().-]{5,29}$/;

export function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

/** Respuesta de exito que no revela nada al bot. */
export function silentSuccess(): Response {
  return json({ message: "success" }, 200);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Quita caracteres de control (y saltos de linea si multiline es false). */
export function sanitize(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  const pattern = multiline
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
    : /[\u0000-\u001F\u007F]/g;
  return value.replace(pattern, " ").trim().slice(0, max);
}

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && EMAIL_RE.test(email);
}

export function isValidPhone(phone: string): boolean {
  return PHONE_RE.test(phone);
}

export function countLinks(text: string): number {
  return (text.match(/https?:\/\/|www\./gi) ?? []).length;
}

export function hasTooManyLinks(text: string): boolean {
  return countLinks(text) > MAX_LINKS;
}

/** El navegador envia Origin en los POST de fetch; debe coincidir con el host que sirve la API. */
export function isSameOrigin(request: Request): boolean {
  const source = request.headers.get("origin") ?? request.headers.get("referer");
  if (!source) return false;
  try {
    const host = new URL(source).host;
    const own = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host;
    return host === own;
  } catch {
    return false;
  }
}

export function honeypotTripped(data: FormData): boolean {
  const value = data.get(HONEYPOT_FIELD);
  return typeof value === "string" && value.trim().length > 0;
}

/** Los humanos tardan mas de 2,5 s en rellenar; un POST fabricado a mano casi nunca incluye ts valido. */
export function submittedTooFast(data: FormData, now = Date.now()): boolean {
  const raw = data.get(TIMESTAMP_FIELD);
  const ts = typeof raw === "string" ? Number(raw) : NaN;
  if (!Number.isFinite(ts)) return true;
  const elapsed = now - ts;
  return elapsed < MIN_FILL_MS || elapsed > MAX_AGE_MS;
}

// Rate limit en memoria: protege dentro de una instancia serverless. Para un
// limite global, usar una regla de rate limit en el Firewall de Vercel.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

export function rateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_HITS;
}

export function clientIp(request: Request, clientAddress?: string): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || clientAddress || "unknown";
}

/**
 * Cloudflare Turnstile. Si TURNSTILE_SECRET_KEY no esta definida (todavia no
 * configurado) no se exige, para no romper el formulario antes de tener claves.
 */
export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY as string | undefined;
  if (!secret) return true;
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });
    const result = (await res.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}
