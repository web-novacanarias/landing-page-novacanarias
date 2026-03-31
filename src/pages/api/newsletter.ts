export const prerender = false;
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const email = data.get("email")?.toString();

    if (!email) {
      return new Response(JSON.stringify({ message: "Email requerido" }), { status: 400 });
    }

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${import.meta.env.MAILERLITE_API_KEY}`
      },
      body: JSON.stringify({
        email: email,
        groups: [import.meta.env.MAILERLITE_GROUP_ID],
        status: 'active'
      })
    });

    if (response.ok) {
      return new Response(JSON.stringify({ message: "success" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "error" }), { status: 400 });
    }

  } catch (e) {
    return new Response(JSON.stringify({ message: "error" }), { status: 500 });
  }
};