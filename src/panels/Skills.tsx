import { skills } from "../data";

export default function Skills() {
  return (
    <div className="chat">
      <div className="mono muted chat-top">▸ session · router log · {skills.length} skills triggered</div>
      {skills.map((s, i) => (
        <div className="turn" key={s.name} style={{ ["--i" as string]: i }}>
          <div className="bub user">
            <span className="mono who">someone</span>
            <span className="say">{s.said}</span>
          </div>
          <div className="bub bot">
            <span className="mono who">agent · loading skill</span>
            <span className="sname2 mono">
              <span className="gear" aria-hidden="true">⚙</span> {s.name}
            </span>
            <span className="load" aria-hidden="true"><b /></span>
            <span className="nw">
              <span className="mono nwl">skip it</span> {s.notWhen.replace(/^Not when /, "when ").replace(/\.$/, "")}
            </span>
            <span className="mono muted ev">{s.evidence}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
