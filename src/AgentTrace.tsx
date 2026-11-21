import { useEffect, useRef, useState } from "react";

// The hero's live agent log. It plays whatever "run" it is given (a click on
// the graph) as observe / decide / act / done lines.

export type Kind = "observe" | "decide" | "act" | "done";
export type Step = [Kind, string];
export interface Run { id: number; steps: Step[]; }
interface Line { id: number; kind: Kind; text: string; }

const MAX = 9;

export default function AgentTrace({ run }: { run: Run }) {
  const [lines, setLines] = useState<Line[]>([]);
  const n = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    run.steps.forEach(([kind, text], i) => {
      const add = () => setLines((l) => [...l, { id: n.current++, kind, text }].slice(-MAX));
      if (reduce) add();
      else timers.push(window.setTimeout(add, 350 + i * 420));
    });
    return () => timers.forEach(clearTimeout);
  }, [run]);

  return (
    <div className="trace" aria-label="Live agent run log" role="log">
      <div className="trace-bar mono">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <span>agent.run</span>
        <span className="trace-live"><b /> live</span>
      </div>
      <div className="trace-body mono">
        {lines.map((l) => (
          <div className={`tline k-${l.kind}`} key={l.id}>
            <span className="tk">{l.kind}</span>
            <span className="tt">{l.text}</span>
          </div>
        ))}
        <div className="tline tcur"><span className="tk">›</span><span className="caret" /></div>
      </div>
    </div>
  );
}
