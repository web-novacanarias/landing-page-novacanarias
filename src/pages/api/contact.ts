export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const nombre = data.get("nombre")?.toString();
    const email = data.get("email")?.toString();
    const mensaje = data.get("mensaje")?.toString();

    if (!nombre || !email || !mensaje) {
      return new Response(JSON.stringify({ message: "Faltan campos" }), {
        status: 400,
      });
    }

    // CAMBIO A MODO PRODUCCIÓN:
    const { error } = await resend.emails.send({
      // 1. Remitente oficial (Ya verificado)
      from: "web@canariasnova.com",

      // 2. Destinatario REAL (Donde quieres recibir los mensajes)
      to: ["web@canariasnova.com"],

      // 3. El cliente (Para que al dar a 'Responder' le escribas a él)
      replyTo: email,

      subject: `📩 Nueva consulta de ${nombre}`,
      html: `
    <div style="font-family: sans-serif; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 600px;">
      <h2 style="color: #00236a; margin-bottom: 20px;">Nueva solicitud de contacto</h2>
      <p style="font-size: 16px;"><strong>Nombre:</strong> ${nombre}</p>
      <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
      <div style="margin-top: 25px; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
        <p style="font-weight: bold; color: #64748b; margin-top: 0;">Mensaje:</p>
        <p style="line-height: 1.6; color: #334155;">${mensaje}</p>
      </div>
      <hr style="margin: 30px 0; border: 0; border-top: 1px solid #e2e8f0;" />
      <p style="font-size: 12px; color: #94a3b8;">Este mensaje ha sido enviado desde el formulario de contacto de canariasnova.com</p>
    </div>
  `,
    });

    if (error) return new Response(JSON.stringify(error), { status: 400 });

    return new Response(JSON.stringify({ message: "Enviado" }), {
      status: 200,
    });
  } catch (e) {
    return new Response(null, { status: 500 });
  }
};
