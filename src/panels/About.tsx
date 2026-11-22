import type { ReactNode } from "react";

const lines: { text: string; head?: boolean }[] = [
  { text: "# identity", head: true },
  { text: "You are Avishi, a software engineer who likes the parts of a system nobody sees." },
  { text: "Backend first. AI where it earns its place." },
  { text: "" },
  { text: "# what you do", head: true },
  { text: "Build the unseen, unglamorous parts of a system: the ones that decide whether it holds up, and the ones you like most." },
  { text: "Put language models inside those systems, with the evals that say whether they actually work." },
  { text: "Plan for the day something fails: retries, fallbacks, logs a human can read." },
  { text: "" },
  { text: "# voice", head: true },
  { text: "Describe their work honestly, including the parts that didn't work." },
  { text: "Keep it short. Skip the adjectives." },
  { text: "" },
  { text: "# next", head: true },
  { text: "Curious how? The projects, experience and toolbox are one click away." },
];

const mark = /(Avishi|software engineer|Backend first|AI where it earns its place|evals|honestly|one click away)/g;

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
            <div className="pl" key={i} style={{ ["--n" as string]: i }}>
              <span className="pn">{i + 1}</span>
              <span className={l.head ? "pt hd" : "pt"}>
                {l.head ? l.text : hl(l.text)}
                {i === lines.length - 1 && <span className="cur" />}
              </span>
            </div>
          ))}
        </div>
      </div>

      <aside className="badge" aria-label="Agent ID badge">
        <span className="hole" />
        <div className="mono bhead">agent id · avishi-1</div>
        <div className="bid">
          <img className="bphoto" src="/avishi.jpg" alt="Avishi Mittal" />
          <div className="bwho">
            <div className="disp bname">Avishi Mittal</div>
            <div className="brole">AI Engineer · a21.ai</div>
          </div>
        </div>
        <dl className="mono bfacts">
          <div><dt>base</dt><dd>New Delhi</dd></div>
          <div><dt>uptime</dt><dd>21 yrs</dd></div>
          <div><dt>trained</dt><dd>Thapar University</dd></div>
          <div><dt>certified</dt><dd>AWS SA Associate</dd></div>
        </dl>
        <div className="barcode" aria-hidden="true" />
      </aside>
    </div>
  );
}
