/**
 * Cliente comun de los formularios de la home (contacto y newsletter).
 * - Marca de tiempo (campo `ts`) para el control de velocidad del servidor.
 * - Turnstile bajo demanda: solo se carga el script de Cloudflare cuando la
 *   persona empieza a rellenar el formulario, y solo si hay clave configurada.
 * - Mensajes por textContent (nunca innerHTML) en una region aria-live.
 */

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

interface FormOptions {
  form: HTMLFormElement;
  endpoint: string;
  button: HTMLButtonElement;
  buttonLabel?: HTMLElement | null;
  message: HTMLElement;
  busyText: string;
  successText: string;
  errorText: string;
  successClass: string;
  errorClass: string;
}

let turnstileScript: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  turnstileScript ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile"));
    document.head.appendChild(s);
  });
  return turnstileScript;
}

function setupTurnstile(form: HTMLFormElement) {
  const siteKey = form.dataset.turnstileSitekey;
  const slot = form.querySelector<HTMLElement>("[data-turnstile-slot]");
  if (!siteKey || !slot) return { ready: () => Promise.resolve(), reset: () => {} };

  let widgetId: string | undefined;
  let resolveToken: (() => void) | undefined;
  let tokenPromise = new Promise<void>((r) => (resolveToken = r));

  const start = () =>
    loadTurnstile()
      .then(() => {
        if (widgetId || !window.turnstile) return;
        widgetId = window.turnstile.render(slot, {
          sitekey: siteKey,
          appearance: "interaction-only",
          theme: "auto",
          language: "es",
          callback: () => resolveToken?.(),
          "expired-callback": () => {
            tokenPromise = new Promise<void>((r) => (resolveToken = r));
          },
        });
      })
      .catch(() => {});

  form.addEventListener("focusin", start, { once: true });

  return {
    ready: async () => {
      await start();
      // Espera como maximo 8 s a que Cloudflare entregue el token.
      await Promise.race([tokenPromise, new Promise((r) => setTimeout(r, 8000))]);
    },
    reset: () => {
      if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
      tokenPromise = new Promise<void>((r) => (resolveToken = r));
    },
  };
}

export function setupForm(opts: FormOptions) {
  const { form, endpoint, button, buttonLabel, message, busyText } = opts;

  const stamp = form.querySelector<HTMLInputElement>('input[name="ts"]');
  if (stamp) stamp.value = String(Date.now());

  // Mensajes de validación en español y con la acción a seguir (el navegador los pone en su idioma).
  type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  const messageFor = (field: Field) => {
    const v = field.validity;
    if (v.valueMissing) return field instanceof HTMLInputElement && field.type === "checkbox" ? "Marca esta casilla para continuar." : "Rellena este campo.";
    if (v.typeMismatch) return field.type === "email" ? "Escribe un email válido, por ejemplo nombre@empresa.com." : "El formato no es válido.";
    if (v.tooShort) return `Escribe al menos ${field.minLength} caracteres.`;
    return "";
  };
  // form.elements incluye campos asociados con el atributo form= (p. ej. la casilla de la newsletter).
  for (const el of Array.from(form.elements) as Field[]) {
    el.addEventListener("invalid", () => el.setCustomValidity?.(messageFor(el)));
    el.addEventListener("input", () => el.setCustomValidity?.(""));
  }

  const turnstile = setupTurnstile(form);
  const idleText = (buttonLabel ?? button).textContent ?? "";

  function show(text: string, kind: "success" | "error") {
    message.textContent = text;
    message.className = kind === "success" ? opts.successClass : opts.errorClass;
    message.hidden = false;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    (buttonLabel ?? button).textContent = busyText;
    message.hidden = true;

    try {
      await turnstile.ready();
      const response = await fetch(endpoint, { method: "POST", body: new FormData(form) });

      if (response.ok) {
        show(opts.successText, "success");
        form.reset();
        if (stamp) stamp.value = String(Date.now());
      } else {
        let detail = "";
        try {
          const body = (await response.json()) as { message?: string };
          // Solo mostramos mensajes pensados para la persona (400/429), no errores internos.
          if (response.status === 400 || response.status === 429) detail = body.message ?? "";
        } catch {
          /* respuesta sin JSON */
        }
        show(detail || opts.errorText, "error");
      }
    } catch {
      show(opts.errorText, "error");
    } finally {
      turnstile.reset();
      button.disabled = false;
      button.removeAttribute("aria-busy");
      (buttonLabel ?? button).textContent = idleText;
    }
  });
}
