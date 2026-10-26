import { links } from "../data";

const POST = "https://medium.com/@avishimittal2004/context-engineering-why-your-ai-system-might-be-failing-before-the-llm-even-runs-b9529ee4e0c9";

const layers = [
  { n: "system prompt", w: 34 },
  { n: "retrieved docs", w: 92 },
  { n: "history", w: 60 },
  { n: "tools", w: 44 },
  { n: "the question", w: 18 },
];

export default function Traces() {
  return (
    <div>
      <a className="post" href={POST} target="_blank" rel="noreferrer">
        <span className="big" aria-hidden="true">01</span>
        <div className="mono muted pmeta">
          trace_01 · <span className="ph">[DATE]</span> · medium · <span className="ph">[N]</span> min read
        </div>
        <h3 className="disp ptitle">
          Context Engineering: Why Your AI System Might Be Failing <mark>Before the LLM Even Runs</mark>
        </h3>
        <div className="pbottom">
          <div className="ctxd" aria-hidden="true">
            <div className="mono muted ctxl">the context, illustrated</div>
            {layers.map((l) => (
              <div className="lay" key={l.n}>
                <span className="lbar" style={{ width: `${l.w}%` }} />
                <span className="mono">{l.n}</span>
              </div>
            ))}
          </div>
          <span className="mono pcta">read on medium →</span>
        </div>
      </a>

      <div className="next mono muted" aria-hidden="true">
        <span className="rec">●</span> trace_02 · recording<span className="dots" />
      </div>

      <div className="lbl card-lbl">spotlight · profile</div>
      <a className="spot" href={links.linkedin} target="_blank" rel="noreferrer">
        <span className="smark" aria-hidden="true">in</span>
        <span className="sbody">
          <span className="sk2 mono">linkedin.com/in/avishi-mittal</span>
          <span className="sname">Avishi Mittal</span>
          <span className="srole">AI Engineer at a21.ai · New Delhi</span>
          <span className="sfacts mono">
            <span>B.E. Computer Engineering, Thapar Institute</span>
            <span>AWS Certified Solutions Architect – Associate</span>
          </span>
        </span>
        <span className="sside" aria-hidden="true">
          <span className="scta mono">open profile →</span>
        </span>
      </a>
    </div>
  );
}
