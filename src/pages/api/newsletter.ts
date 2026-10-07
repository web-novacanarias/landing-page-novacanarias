export const prerender = false;
import type { APIRoute } from "astro";
import {
  TURNSTILE_FIELD,
  clientIp,
  honeypotTripped,
  isSameOrigin,
  isValidEmail,
  json,
  rateLimited,
  sanitize,
  silentSuccess,
  submittedTooFast,
  verifyTurnstile,
} from "../../lib/form-guard";

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    if (!isSameOrigin(request)) return json({ message: "Origen no permitido" }, 403);

    const data = await request.formData();

    // Bots: respuesta de exito falsa, sin tocar MailerLite.
    if (honeypotTripped(data) || submittedTooFast(data)) return silentSuccess();

    const ip = clientIp(request, clientAddress);
    if (rateLimited(`newsletter:${ip}`)) {
      return json({ message: "Demasiados intentos. Inténtalo más tarde." }, 429);
    }

    const email = sanitize(data.get("email"), 254).toLowerCase();
    if (!email) return json({ message: "Email requerido" }, 400);
    if (!isValidEmail(email)) return json({ message: "Email no válido" }, 400);
    if (!data.get("privacidad")) {
      return json({ message: "Debes aceptar la política de privacidad" }, 400);
    }

    if (!(await verifyTurnstile(data.get(TURNSTILE_FIELD), ip))) {
      return json({ message: "No hemos podido verificar que eres una persona. Recarga la página e inténtalo de nuevo." }, 400);
    }

    // Sin `status`: MailerLite aplica el doble opt-in configurado en la cuenta
    // y el alta queda "unconfirmed" hasta que la persona confirma por email.
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${import.meta.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        groups: [import.meta.env.MAILERLITE_GROUP_ID],
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (response.ok) return json({ message: "success" }, 200);

    console.error("[newsletter] MailerLite status", response.status);
    return json({ message: "No hemos podido completar la suscripción. Inténtalo más tarde." }, response.status === 422 ? 400 : 502);
  } catch (e) {
    console.error("[newsletter] error inesperado", e instanceof Error ? e.message : e);
    return json({ message: "Error del servidor" }, 500);
  }
};
