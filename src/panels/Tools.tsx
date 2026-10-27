import { GITHUB, tools, type Tool } from "../data";

function Card({ t, n }: { t: Tool; n: number }) {
  const q = (s: string) => `"${s}"`;
  return (
    <div className="proj">
      <span className="num" aria-hidden="true">{n}</span>
      <div className={`jw st-${t.status}`}>
        <div className="jbar">
          <i /><i /><i />
          <span className="mono jt">tool_call</span>
          <span className="mono jstat">{t.status}</span>
        </div>
        <div className="jbody mono">
          <div className="jfn">
            <span className="jname">{t.name}</span>
            <span className="jp">(</span><span className="ja">{t.arg}</span><span className="jp">)</span>
          </div>
          <div className="jret">→ returned {"{"}</div>
          <div className="jl">
            <span className="jk">"status"</span><span className="jp">:</span>
            <span className="jv"><span className="jchip">{t.status}</span><span className="jp">,</span></span>
          </div>
          <div className="jl">
            <span className="jk">"does"</span><span className="jp">:</span>
            <span className="jv js">{q(t.does)}<span className="jp">,</span></span>
          </div>
          {t.breaksWhen && (
            <div className="jl">
              <span className="jk">"breaks_when"</span><span className="jp">:</span>
              <span className="jv jw2">{q(t.breaksWhen)}<span className="jp">,</span></span>
            </div>
          )}
          <div className="jl">
            <span className="jk">"stack"</span><span className="jp">:</span>
            <span className="jv jstack">
              <span className="jp">[</span>
              {t.stack.map((s, i) => (
                <span key={s}>
                  <span className="jtag">{q(s)}</span>
                  {i < t.stack.length - 1 && <span className="jp">,</span>}
                </span>
              ))}
              <span className="jp">]</span>
              <span className="jp">,</span>
            </span>
          </div>
          <div className="jl">
            <span className="jk">"source"</span><span className="jp">:</span>
            <span className="jv">
              <a className="jsrc" href={`${GITHUB}/${t.repo}`} target="_blank" rel="noreferrer">{q(t.repo)}</a>
              {t.demo && <span className="jp">,</span>}
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
