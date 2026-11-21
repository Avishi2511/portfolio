import { skills } from "../data";
import { stackIcons } from "../stackIcons";
import Reveal from "../Reveal";

// Built from the public GitHub repos (languages and dependency files) plus the
// extras on the resume that don't show up there (Neo4j, Langfuse, AWS, ...).
const stack: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "HTML/CSS"] },
  { group: "Models and orchestration", items: ["Anthropic SDK", "OpenAI", "Gemini", "LangGraph", "LangChain", "Langfuse"] },
  { group: "Backend, frontend and realtime", items: ["FastAPI", "Flask", "Node.js", "Express", "React", "LiveKit"] },
  { group: "Data and ML", items: ["PostgreSQL", "MongoDB", "SQLite", "Neo4j", "ChromaDB", "TensorFlow"] },
  { group: "Tools and cloud", items: ["AWS", "Docker", "Git", "GitHub", "Postman", "pgAdmin", "Claude Code", "Codex", "Vercel", "Render"] },
];

function Tile({ name }: { name: string }) {
  const ic = stackIcons[name];
  return (
    <div className="stile">
      <span className="sglyph" aria-hidden="true">
        {ic ? <svg viewBox="0 0 24 24"><path d={ic.path} /></svg> : <b>{name.slice(0, 2)}</b>}
      </span>
      <span className="sltxt">{name}</span>
    </div>
  );
}

export default function Skills() {
  return (
    <>
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

      <Reveal as="section" className="stackwrap">
        <div className="mono muted chat-top">▸ toolbox · what it runs on</div>
        <div className="sgroups">
          {stack.map((g) => (
            <div className="sgroup" key={g.group}>
              <div className="mono sglabel">{g.group}</div>
              <div className="sgrid">
                {g.items.map((it) => <Tile name={it} key={it} />)}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </>
  );
}
