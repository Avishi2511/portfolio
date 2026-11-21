import { useState, type FormEvent } from "react";
import { links } from "./data";

// "Send a task": posts to a form service that forwards to Avishi's inbox.
// Set VITE_CONTACT_ENDPOINT (see .env.example). Without it, the form falls
// back to opening the visitor's mail app so nothing is silently lost.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

type State = "idle" | "sending" | "sent" | "mail" | "error";

const direct = [
  { k: "email", label: "Email", href: links.email },
  { k: "linkedin", label: "LinkedIn", href: links.linkedin },
];

const flow = [
  ["01", "You send a message", "Name, email and what you have in mind."],
  ["02", "It lands in the inbox", "No form queue in between, no account to create."],
  ["03", "Avishi replies", "To the address you gave."],
];

export default function Contact() {
  const [state, setState] = useState<State>("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return; // honeypot: bots fill this, people never see it
    if (!ENDPOINT) {
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      window.location.href = `${links.email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent(body)}`;
      setState("mail");
      return;
    }
    setState("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-h">
      <div className="fhead mono">
        <span className="acc b">› new task</span>
        <span className="muted">1 route · lands in the inbox</span>
      </div>
      <div className="ccard">
        <form id="contact-form" onSubmit={submit} />
        <div className="cgrid">
          <div className="chead">
            <h2 className="disp" id="contact-h">Interested in working together?</h2>
            <p className="muted contact-sub">Send a message and it lands straight in Avishi's inbox.</p>
          </div>

          {state === "sent" ? (
            <div className="cdone mono" role="status">✓ delivered. Avishi will reply to the address you gave.</div>
          ) : (
            <div className="cfields">
              <label className="cf">
                <span className="mono">name</span>
                <input form="contact-form" name="name" required autoComplete="name" placeholder="Your name" />
              </label>
              <label className="cf">
                <span className="mono">email</span>
                <input form="contact-form" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
              </label>
              <label className="cf cf-wide cf-fill">
                <span className="mono">message</span>
                <textarea form="contact-form" name="message" required rows={4} placeholder="What are you working on, and where could Avishi help?" />
              </label>
              <input form="contact-form" className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            </div>
          )}

          <aside className="cside" aria-label="How this works">
            <div className="mono cside-h"><span className="pulse" aria-hidden="true" /> how it works</div>
            <ol className="cflow">
              {flow.map(([n, t, d]) => (
                <li key={n}>
                  <span className="cn2 mono">{n}</span>
                  <span><b>{t}</b><small>{d}</small></span>
                </li>
              ))}
            </ol>
          </aside>

          {state !== "sent" && (
            <div className="cact">
              <button form="contact-form" className="csend mono" type="submit" disabled={state === "sending"}>
                {state === "sending" ? "sending…" : "send task ↵"}
              </button>
              {state === "error" && <span className="cerr mono" role="alert">Didn't go through. Try again, or use a direct link.</span>}
              {state === "mail" && <span className="cnote mono" role="status">Opened your mail app with the message filled in.</span>}
            </div>
          )}

          <div className="cdirect">
            <span className="mono muted cor">or reach out directly</span>
            {direct.map((d) => (
              <a key={d.k} href={d.href} target="_blank" rel="noreferrer" className="mono">
                {d.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
