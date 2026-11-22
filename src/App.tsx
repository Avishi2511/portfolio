import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { links, segments, type PanelKey } from "./data";
import AgentTrace, { type Run, type Step } from "./AgentTrace";
import Contact from "./Contact";
import Reveal from "./Reveal";
import About from "./panels/About";
import Skills from "./panels/Skills";
import Tools from "./panels/Tools";
import History from "./panels/History";
import Traces from "./panels/Traces";
import Recall from "./panels/Recall";

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const icons = {
  github: (
    <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" {...line}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3.5 7l8.5 6.5L20.5 7" /></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="9" width="4" height="12" /><circle cx="5" cy="4.6" r="2.3" /><path d="M10 9h3.8v1.7c.6-1.1 2-2 3.9-2 3.6 0 4.3 2.4 4.3 5.4V21h-4v-6c0-1.4 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H10z" /></svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  ),
  resume: (
    <svg viewBox="0 0 24 24" {...line}><path d="M6 2.5h8l5 5v14H6z" /><path d="M14 2.5v5h5" /><path d="M9 13h7M9 17h7" /></svg>
  ),
};

const endpoints = [
  { label: "github", href: links.github, text: "GitHub", icon: icons.github },
  { label: "email", href: links.email, text: "Email", icon: icons.email },
  { label: "linkedin", href: links.linkedin, text: "LinkedIn", icon: icons.linkedin },
  { label: "x", href: links.x, text: "X", icon: icons.x },
  { label: "resume", href: links.resume, text: "Resume", icon: icons.resume },
];

const BOOT: Step[] = [
  ["observe", "boot · loading system_prompt/"],
  ["decide", "ready · waiting for input"],
  ["act", "pick a node to run it"],
];

export default function App() {
  const [sel, setSel] = useState<PanelKey>("about");
  const [run, setRun] = useState<Run>({ id: 0, steps: BOOT });
  const detailRef = useRef<HTMLDivElement>(null);
  const selIdx = segments.findIndex((s) => s.key === sel);
  const current = segments[selIdx];

  const pick = useCallback((key: PanelKey) => {
    const seg = segments.find((s) => s.key === key)!;
    setSel(key);
    setRun((r) => ({
      id: r.id + 1,
      steps: [
        ["observe", `visitor.click("${seg.folder}/")`],
        ["decide", `route → ${seg.folder}/`],
        ["act", `render("${seg.label}")`],
        ["done", "ok"],
      ],
    }));
    // on phones the detail sits below the graph, so bring it into view
    if (window.matchMedia("(max-width: 700px)").matches) {
      requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, []);

  // keyboard: left/right arrows move between nodes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable) return;
      if (e.altKey || e.ctrlKey || e.metaKey || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
      const i = segments.findIndex((s) => s.key === sel);
      pick(segments[(i + (e.key === "ArrowRight" ? 1 : segments.length - 1)) % segments.length].key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sel, pick]);

  // ambient motion: scroll progress bar + cursor spotlight on cards
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll", max > 0 ? String(window.scrollY / max) : "0");
    };
    const glow = ".jw, .stile, .bub.bot, .fe, .sc, .node, .post, .ccard, .trace, .cside";
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(glow);
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("pointermove", onMove); };
  }, []);

  const renderPanel = () => {
    switch (sel) {
      case "about": return <About />;
      case "skills": return <Skills />;
      case "tools": return <Tools />;
      case "history": return <History />;
      case "traces": return <Traces />;
      case "recall": return <Recall />;
    }
  };

  return (
    <div className="page">
      <div className="progress" aria-hidden="true" />
      <div className="aurora" aria-hidden="true" />
      <div className="wrap">
        <div className="bar">
          <span className="mono">
            <strong className="b">agent.spec</strong> <span className="muted">· v1.0</span>
          </span>
          <span className="mono muted">name: Avishi Mittal · role: ai engineer · mode: read-only</span>
        </div>

        <header className="hero">
          <div className="hero-text">
            <h1 className="disp">Avishi builds systems.<br />They take it from there.</h1>
            <div className="mono">
              <span className="type">Each section is named after a part of an agent, a nod to the systems I work on. Start anywhere.</span>
            </div>
          </div>
          <AgentTrace run={run} />
        </header>

        <div className="ctx-head">
          <span className="mono b">its graph</span>
          <span className="mono muted loaded">click a node, or use ← → keys</span>
        </div>

        <div className="graph" role="group" aria-label="Agent graph">
          <span className="gend mono">START</span>
          {segments.map((s, i) => {
            const state = i < selIdx ? "done" : i === selIdx ? "run" : "queued";
            return (
              <Fragment key={s.key}>
                <span className={i <= selIdx ? "edge lit" : "edge"} aria-hidden="true" />
                <button
                  className={`node ${state}`}
                  style={{ animationDelay: s.delay }}
                  onClick={() => pick(s.key)}
                  aria-pressed={sel === s.key}
                >
                  <span className="mono nk">{s.folder}/</span>
                  <span className="nn">{s.label}</span>
                  <span className="mono ns">{state === "done" ? "✓ done" : state === "run" ? "● running" : "○ queued"}</span>
                </button>
              </Fragment>
            );
          })}
          <span className={selIdx === segments.length - 1 ? "edge lit" : "edge"} aria-hidden="true" />
          <span className="gend mono">END</span>
        </div>

        <div className="detail" ref={detailRef}>
          <div className="dh">
            <div className="mono acc b">› read {current.folder}/</div>
            <h2 className="disp">{current.title}</h2>
            <p className="muted">{current.hint}</p>
          </div>
          <div className="dr" key={sel}>
            {renderPanel()}
          </div>
        </div>

        <Reveal as="footer" className="foot">
          <div className="fhead mono">
            <span className="acc b">› endpoints</span>
            <span className="muted">{endpoints.length} routes · all return 200 OK</span>
          </div>
          <div className="fgrid">
            {endpoints.map((e) => (
              <a
                className="fe"
                key={e.label}
                href={e.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="mono fm"><b>OPEN</b> /{e.label}</span>
                <span className="frow">
                  <span className="fi" aria-hidden="true">{e.icon}</span>
                  <span className="ft">{e.text}</span>
                </span>
                <span className="fa mono" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <Contact />

          <div className="fend mono muted">
            <span>© {new Date().getFullYear()} Avishi Mittal</span>
            <span>end of spec · mode: read-only</span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
