import { certified, deployed, trained, type Row } from "../data";

function Rows({ rows }: { rows: Row[] }) {
  return (
    <div className="rows">
      {rows.map((r) => (
        <div className="row" key={r.what}>
          <span className="when mono muted">{r.when}</span>
          <span className="what">
            {r.what}
            {r.sub && <small>{r.sub}</small>}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function History() {
  // newest first
  const roles = [...deployed].reverse();
  return (
    <div>
      <div className="lbl">experience</div>
      <div className="xp">
        {roles.map((r, i) => (
          <article className={i === 0 ? "xr latest" : "xr"} key={r.org}>
            <div className="xw mono">{r.when}</div>
            <div className="xb">
              <h3 className="xt">{r.title}</h3>
              <div className="xo">{r.org}</div>
              <ul>
                {r.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="xedu">
        <section>
          <div className="lbl">education</div>
          <Rows rows={trained} />
        </section>
        <section>
          <div className="lbl">certifications</div>
          <Rows rows={certified} />
        </section>
      </div>
    </div>
  );
}
