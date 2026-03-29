export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const email = data.get("email");

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Email no válido" }), {
        status: 400,
      });
    }

    const { data: allContacts } = await resend.contacts.list({
      audienceId: "",
    });

    const exists = allContacts?.data?.some(
      (contact) => contact.email.toLowerCase() === email.toLowerCase(),
    );

    if (exists) {
      return new Response(JSON.stringify({ message: "Ya estás suscrito" }), {
        status: 409,
      });
    }

    const { error: createError } = await resend.contacts.create({
      email: email,
      unsubscribed: false,
    });

    if (createError) {
      return new Response(JSON.stringify({ error: createError.message }), {
        status: 400,
      });
    }

    // cambiar por email de info o el que sea @canariasnova.com y añadir registros dns en resend panel
    // cambiar logo
    await resend.emails.send({
      from: "Nova Consulting <onboarding@resend.dev>", // Cambia cuando verifiques dominio
      to: email,
      subject: "⚓ ¡Bienvenido a la Newsletter de Nova Consulting!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #00236a; padding: 30px; text-align: center;">
            <img src="https://canariasnova.com/logo-white.png" alt="Nova Consulting Logo" style="width: 180px;">
          </div>
          
          <div style="padding: 40px; color: #334155; line-height: 1.6;">
            <h1 style="color: #00236a; font-size: 24px; margin-bottom: 20px;">¡Gracias por confiar en nosotros!</h1>
            <p>Hola,</p>
            <p>Es un placer confirmarte que ya formas parte de nuestra comunidad exclusiva. A partir de ahora, recibirás directamente en tu bandeja de entrada:</p>
            <ul style="padding-left: 20px;">
              <li>Resúmenes ejecutivos del <strong>BOE</strong>.</li>
              <li>Alertas de <strong>subvenciones</strong> y ayudas fiscales.</li>
              <li>Actualizaciones críticas para tu empresa en Canarias.</li>
            </ul>
            <p style="margin-top: 30px;">Nuestro objetivo es que te anticipes a los cambios legales y los conviertas en <strong>oportunidades</strong>.</p>
            
            <div style="text-align: center; margin-top: 40px;">
              <a href="https://canariasnova.com" style="background-color: #00236a; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">Visitar nuestra Web</a>
            </div>
          </div>

          <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
            <p style="margin-bottom: 15px;"><strong>Nova Consulting Canarias</strong><br>Asesoría Fiscal, Contable y Laboral</p>
            <div style="margin-bottom: 20px;">
              <a href="#" style="margin: 0 10px; text-decoration: none; color: #00236a;">LinkedIn</a>
              <a href="#" style="margin: 0 10px; text-decoration: none; color: #00236a;">Instagram</a>
            </div>
            <p>© 2026 Nova Consulting. Todos los derechos reservados.</p>
            <p style="font-size: 10px;">Has recibido este email porque te suscribiste en nuestra web. Si no quieres recibir más correos, puedes <a href="{{{unsubscription_url}}}" style="color: #94a3b8;">darte de baja aquí</a>.</p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ message: "Suscrito con éxito" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    });
  }
};
