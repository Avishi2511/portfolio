import { GITHUB, tools, type Tool } from "../data";
import { stackIcons } from "../stackIcons";

function Card({ t, n }: { t: Tool; n: number }) {
  const q = (s: string) => `"${s}"`;
  return (
    <div className="proj">
      <span className="num" aria-hidden="true">{n}</span>
      <div className="jw">
        <div className="jbar">
          <i /><i /><i />
          <span className="mono jt">tool_call</span>
          <a className="mono jsrc" href={`${GITHUB}/${t.repo}`} target="_blank" rel="noreferrer">repo ↗</a>
        </div>
        <div className="jbody mono">
          <div className="jfn">
            <span className="jname">{t.name}</span>
            <span className="jp">(</span><span className="ja">{t.arg}</span><span className="jp">)</span>
          </div>
          <div className="jret">→ returned {"{"}</div>
          <div className="jl">
            <span className="jk">"does"</span><span className="jp">:</span>
            <span className="jv js">{q(t.does)}<span className="jp">,</span></span>
          </div>
          <div className="jl">
            <span className="jk">"stack"</span><span className="jp">:</span>
            <span className="jv jstack">
              {t.stack.map((name) => {
                const ic = stackIcons[name];
                return ic ? (
                  <span className="sico" key={name} title={name} aria-label={name} role="img">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ic.path} /></svg>
                  </span>
                ) : (
                  <span className="jtag" key={name}>{name}</span>
                );
              })}
            </span>
          </div>
          {t.demo && (
            <div className="jl">
              <span className="jk">"demo"</span><span className="jp">:</span>
              <span className="jv">
                <a className="jdemo" href={t.demo} target="_blank" rel="noreferrer">{q(t.demo.replace("https://", ""))}</a>
              </span>
            </div>
          )}
          <div className="jret">{"}"}</div>
        </div>
      </div>
    </div>
  );
}

export default function Tools() {
  return (
    <div className="tg">
      {tools.map((t, i) => (
        <Card t={t} n={i + 1} key={t.name} />
      ))}
    </div>
  );
}
