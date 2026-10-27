const banned = [
  { t: "Microsoft Word", s: 3 },
  { t: "“it works on my machine”", s: 2 },
  { t: "Friday 6pm merge conflicts", s: 2 },
  { t: "“quick change, shouldn’t break anything”", s: 2 },
  { t: "light mode at 2am", s: 1 },
  { t: "final_v3_FINAL_actually.pdf", s: 2 },
  { t: "demos that worked 5 minutes ago", s: 2 },
  { t: "“can we just add one more feature”", s: 1 },
];

export default function Recall() {
  return (
    <div className="fun">
      <div className="lbl">recommends · top_k = 4</div>
      <div className="shelf">
        <figure className="obj o-book">
          <div className="book">
            <img src="/covers/metamorphosis.jpg" alt="Metamorphosis by Franz Kafka, book cover" />
            <i className="ribbon" />
          </div>
          <figcaption className="mono">book · Metamorphosis</figcaption>
        </figure>

        <figure className="obj o-show">
          <div className="tv">
            <img src="/covers/fleabag.jpg" alt="Fleabag, show artwork" />
            <span className="mono live">● now playing</span>
          </div>
          <figcaption className="mono">show · Fleabag</figcaption>
        </figure>

        <figure className="obj o-band">
          <div className="vinyl">
            <div className="disc">
              <img className="lab" src="/covers/the1975.jpg" alt="The 1975, I like it when you sleep album cover" />
              <span className="spindle" />
            </div>
          </div>
          <figcaption className="mono">band · The 1975</figcaption>
        </figure>

        <figure className="obj o-site">
          <div className="win">
            <div className="wbarx">
              <i /><i /><i />
              <span className="mono url">substack.com</span>
            </div>
            <div className="wbody">
              <img className="wlogo" src="/covers/substack.svg" alt="" />
              <span className="disp wt">Substack</span>
              <span className="mono wsub">⌁ 14 tabs open, 0 regrets</span>
            </div>
          </div>
          <figcaption className="mono">website · Substack</figcaption>
        </figure>
      </div>

      <div className="lbl card-lbl">scheduled tasks · crontab -l</div>
      <div className="term" role="img" aria-label="A crontab of Avishi's hobbies">
        <div className="tl"><span className="c"># runs whenever there's no PR to review</span></div>
        <div className="tl"><span className="k">@wanderlust</span> <span>explore --places --new</span></div>
        <div className="tl"><span className="k">@monthly</span>&nbsp;&nbsp;&nbsp;<span>invest --index-fund --no-timing</span> <span className="c"># all my time goes into coding</span></div>
        <div className="tl"><span className="k">@daily</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>read --book</span></div>
        <div className="tl"><span className="k">@daily</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>coffee --try-new &amp;&amp; dessert --try-new</span></div>
        <div className="tl"><span className="k">@sometimes</span> <span>yoga || pilates</span> <span className="c"># occasional, not a promise</span></div>
        <div className="tl"><span className="k">@weekend</span>&nbsp;&nbsp;&nbsp;<span>chill --with friends,family</span></div>
        <div className="tl"><span className="k">* * * * *</span>&nbsp;&nbsp;<span>code</span> <span className="c"># never exits</span><span className="cur" /></div>
      </div>

      <div className="lbl card-lbl">things i don’t like · logit_bias = −100</div>
      <div className="banned">
        {banned.map((b, i) => (
          <span className={`ban s${b.s} r${i % 4}`} key={b.t}>
            <s>{b.t}</s>
            <em className="mono">−100</em>
          </span>
        ))}
      </div>
    </div>
  );
}
