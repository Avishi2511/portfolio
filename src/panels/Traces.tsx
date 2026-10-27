import { links } from "../data";

const POST = "https://medium.com/@avishimittal2004/context-engineering-why-your-ai-system-might-be-failing-before-the-llm-even-runs-b9529ee4e0c9";

export default function Traces() {
  return (
    <div>
      <a className="post" href={POST} target="_blank" rel="noreferrer">
        <span className="big" aria-hidden="true">01</span>
        <div className="mono muted pmeta">
          trace_01 · medium
        </div>
        <h3 className="disp ptitle">
          Context Engineering: Why Your AI System Might Be Failing <mark>Before the LLM Even Runs</mark>
        </h3>
        <div className="pbottom">
          <span className="mono pcta">read on medium →</span>
        </div>
      </a>

      <div className="next mono muted" aria-hidden="true">
        <span className="rec">●</span> trace_02 · recording<span className="dots" />
      </div>

      <div className="lbl card-lbl">also explore writing on</div>
      <div className="soc">
        <a className="sc" href={links.linkedin} target="_blank" rel="noreferrer">
          <span className="smark" aria-hidden="true">in</span>
          <span className="sbody">
            <span className="sk2 mono">linkedin.com/in/avishi-mittal</span>
            <span className="sname"><mark>LinkedIn</mark></span>
            <span className="srole">AI Engineer at a21.ai · New Delhi</span>
          </span>
          <span className="scta mono">open profile →</span>
        </a>
        <a className="sc sc-x" href={links.x} target="_blank" rel="noreferrer">
          <span className="smark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </span>
          <span className="sbody">
            <span className="sk2 mono">x.com/avishi_mit6693</span>
            <span className="sname"><mark>X</mark></span>
            <span className="srole">@avishi_mit6693</span>
          </span>
          <span className="scta mono">open profile →</span>
        </a>
      </div>
    </div>
  );
}
