export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";
import {
  TURNSTILE_FIELD,
  clientIp,
  escapeHtml,
  hasTooManyLinks,
  honeypotTripped,
  isSameOrigin,
  isValidEmail,
  isValidPhone,
  json,
  rateLimited,
  sanitize,
  silentSuccess,
  submittedTooFast,
  verifyTurnstile,
} from "../../lib/form-guard";

const SERVICIOS: Record<string, string> = {
  fiscal: "Fiscalidad",
  laboral: "Laboral",
  contabilidad: "Contabilidad",
  subvenciones: "Subvenciones",
  sociedades: "Constitución de sociedades",
  otro: "Otro",
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    if (!isSameOrigin(request)) return json({ message: "Origen no permitido" }, 403);

    const data = await request.formData();

    // Bots: respuesta de exito falsa, sin enviar nada.
    if (honeypotTripped(data) || submittedTooFast(data)) return silentSuccess();

    const ip = clientIp(request, clientAddress);
    if (rateLimited(`contact:${ip}`)) {
      return json({ message: "Demasiados intentos. Inténtalo más tarde." }, 429);
    }

    const nombre = sanitize(data.get("nombre"), 100);
    const email = sanitize(data.get("email"), 254).toLowerCase();
    const telefono = sanitize(data.get("telefono"), 30);
    const servicioKey = sanitize(data.get("servicio"), 20);
    const mensaje = sanitize(data.get("mensaje"), 3000, true);
    const privacidad = data.get("privacidad");

    if (!nombre || !email || !mensaje) return json({ message: "Faltan campos" }, 400);
    if (!isValidEmail(email)) return json({ message: "Email no válido" }, 400);
    if (telefono && !isValidPhone(telefono)) return json({ message: "Teléfono no válido" }, 400);
    if (mensaje.length < 10) return json({ message: "El mensaje es demasiado corto" }, 400);
    if (!privacidad) return json({ message: "Debes aceptar la política de privacidad" }, 400);

    // Mensajes llenos de enlaces: spam clasico. Se descartan en silencio.
    if (hasTooManyLinks(mensaje) || hasTooManyLinks(nombre)) return silentSuccess();

    if (!(await verifyTurnstile(data.get(TURNSTILE_FIELD), ip))) {
      return json({ message: "No hemos podido verificar que eres una persona. Recarga la página e inténtalo de nuevo." }, 400);
    }

    const servicio = SERVICIOS[servicioKey] ?? "";
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "info@canariasnova.com",
      to: ["info@canariasnova.com"],
      replyTo: email,
      subject: `Nueva consulta web de ${nombre}`,
      text: [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        telefono && `Teléfono: ${telefono}`,
        servicio && `Servicio: ${servicio}`,
        "",
        mensaje,
      ]
        .filter((line) => line !== "" && line !== false)
        .join("\n"),
      html: `
    <div style="font-family: sans-serif; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 600px;">
      <h2 style="color: #00236a; margin-bottom: 20px;">Nueva solicitud de contacto</h2>
      <p style="font-size: 16px;"><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
      <p style="font-size: 16px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${telefono ? `<p style="font-size: 16px;"><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>` : ""}
      ${servicio ? `<p style="font-size: 16px;"><strong>Servicio:</strong> ${escapeHtml(servicio)}</p>` : ""}
      <div style="margin-top: 25px; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
        <p style="font-weight: bold; color: #64748b; margin-top: 0;">Mensaje:</p>
        <p style="line-height: 1.6; color: #334155; white-space: pre-wrap;">${escapeHtml(mensaje)}</p>
      </div>
      <hr style="margin: 30px 0; border: 0; border-top: 1px solid #e2e8f0;" />
      <p style="font-size: 12px; color: #94a3b8;">Enviado desde el formulario de contacto de canariasnova.com. El usuario aceptó la política de privacidad.</p>
    </div>
  `,
    });

    if (error) {
      console.error("[contact] Resend error:", error.name);
      return json({ message: "No hemos podido enviar el mensaje. Inténtalo más tarde." }, 502);
    }

    return json({ message: "Enviado" }, 200);
  } catch (e) {
    console.error("[contact] error inesperado", e instanceof Error ? e.message : e);
    return json({ message: "Error del servidor" }, 500);
  }
};
