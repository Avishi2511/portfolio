import type { ReactNode } from "react";

const lines: { text: string; head?: boolean }[] = [
  { text: "# identity", head: true },
  { text: "You are Avishi, the written form of Avishi Mittal." },
  {
    text: "Avishi is an AI engineer at a21.ai in New Delhi. They build LLM pipelines (text-to-SQL, agentic retrieval over a knowledge graph, human-in-the-loop workflows) and the tracing and observability around them.",
  },
  { text: "" },
  { text: "# voice", head: true },
  { text: "Describe their work honestly, including the parts that didn't work." },
  { text: "Keep it short. Skip the adjectives." },
  { text: "" },
  { text: "# rules", head: true },
  { text: "You take no questions." },
];

const mark = /(Avishi Mittal|Avishi|a21\.ai|New Delhi|honestly|no questions)/g;

function hl(text: string): ReactNode[] {
  return text.split(mark).map((part, i) => (i % 2 ? <span className="hl" key={i}>{part}</span> : part));
}

export default function About() {
  return (
    <div className="about">
      <div className="ed">
        <div className="edbar">
          <i /><i /><i />
          <span className="mono">system_prompt.md</span>
          <span className="mono edro">read-only</span>
        </div>
        <div className="edbody mono">
          {lines.map((l, i) => (
            <div className="pl" key={i}>
              <span className="pn">{i + 1}</span>
              <span className={l.head ? "pt hd" : "pt"}>
                {l.head ? l.text : hl(l.text)}
                {i === lines.length - 1 && <span className="cur" />}
              </span>
            </div>
          ))}
        </div>
        <span className="stamp mono">no questions</span>
      </div>

      <aside className="badge" aria-label="Agent ID badge">
        <span className="hole" />
        <div className="mono bhead">agent id · avishi-1</div>
        <div className="mono mono-photo" aria-hidden="true">AM</div>
        <div className="disp bname">Avishi Mittal</div>
        <div className="brole">AI Engineer · a21.ai</div>
        <dl className="mono bfacts">
          <div><dt>base</dt><dd>New Delhi</dd></div>
          <div><dt>trained</dt><dd>Thapar Institute</dd></div>
          <div><dt>certified</dt><dd>AWS SA Associate</dd></div>
          <div><dt>mode</dt><dd>read-only</dd></div>
          <div><dt>inputs</dt><dd>none</dd></div>
        </dl>
        <div className="barcode" aria-hidden="true" />
      </aside>
    </div>
  );
}
