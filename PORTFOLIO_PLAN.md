# Portfolio content plan

Design source: the "Agent Spec" canvas. The page is styled as an agent's spec file. The visitor clicks parts of a harness diagram (`system_prompt/`, `skills/`, `tools/`, and so on), and each part opens a panel below it.

This file covers **what goes in each section**. Nothing is built yet.

## Sources and gaps

| Source | Status |
|---|---|
| Resume (`Avishi_Mittal_v1.2.pdf`) | Read in full. |
| GitHub (`Avishi2511`) | Read: profile, README, repo list (30 of ~50 repos) and READMEs of the main repos. |
| LinkedIn | **Blocked** (HTTP 429). Nothing taken from it. |
| X (`@avishi_mit6693`) | **Blocked** (HTTP 402). Nothing taken from it. |

For LinkedIn and X, paste your headline, About text, any posts you want reflected, and your X bio. Until then `traces/` and the bio line use only what's in the resume and GitHub.

**Rule for all copy:** only claims backed by the resume or a README. Numbers are quoted exactly. The design's voice is "say what didn't work, never claim a number you can't reproduce", so every project gets an honest "breaks when…" line. Where I don't know the real limitation I've marked it **[YOU]** for you to fill in. The page has no "beliefs" content anywhere. I won't invent one.

---

## Header and hero

- Top bar: `agent.spec · v1.0` and `name: Avishi Mittal · role: ai engineer · mode: read-only · inputs: none`.
- Headline: **"Avishi Mittal builds agents. This page is one."**
- Typed line under it: the design has "every part of her is a real part of an agent." Pronouns need your call: swap to **"every part of me…"** or **"every part of this page is a real part of an agent."**
- The hint "click any part ↓" stays.
- Core box in the middle: `model + loop · observe · decide · act`. It prints `› read <folder>/` for the selected part.

## 1. `system_prompt/` — About

Written as a system prompt addressed to the agent, as in the design.

> You are **Avishi**, the written form of Avishi Mittal.
> Avishi is an AI engineer at a21.ai in New Delhi. They build LLM pipelines (text-to-SQL, agentic retrieval over a knowledge graph, and human-in-the-loop workflows) and the evals and observability around them.
> Describe their work honestly, including the parts that didn't work.
> Keep it short. Skip the adjectives. You take no questions.

Facts behind it: AI Engineer at a21.ai since Jan 2026. B.E. Computer Engineering, Thapar Institute, graduated May 2026. AWS Solutions Architect – Associate.

## 2. `skills/` — What I'm good at

Each skill has a one-line claim and a "Not when…" line, per the design. Six slots, all grounded in resume or repo evidence.

| Skill | Line | Not when | Evidence |
|---|---|---|---|
| `text_to_sql` | Natural-language questions over a relational database. | Not when the schema is small enough for a form. | a21.ai: team of 4, 96% accuracy, 30+ refined prompts |
| `agent_orchestration` | Stateful agents with a human in the loop. | Not when one prompt and one call do the job. | LangGraph interrupts, Postgres state persistence |
| `retrieval` | Hybrid dense plus keyword retrieval, and graph traversal. | Not when the corpus fits in the prompt. | research-rag (BM25 + embeddings, ChromaDB); Neo4j at a21.ai |
| `llm_observability` | Tracing, prompt versions, cost and latency. | Not when you have no traffic yet. | Langfuse at a21.ai |
| `guardrails_and_gateways` | Putting validation and limits between an app and a model. | Not when a provider's built-in filter is enough. | llm-gateway |
| `voice_agents` | Phone and browser voice that stays on task. | Not when a form is faster. | candidate-screener, Basera (property-search) |

Candidate 7th, if you want it: `full_stack_delivery` (React, Node, FastAPI, shipped on Vercel and Render).

## 3. `tools/` — Projects

Format from the design: name, status chip, one sentence, "Breaks when…", repo link. Status chips map to `shipped`, `experimental` and `retired`. I'm proposing the order below, strongest and most recent first. The design shows 4 slots, and I'd allow up to 8, with the rest collapsed.

| # | Name | Status | What it does | Breaks when | Link |
|---|---|---|---|---|---|
| 1 | `dead_code_hunter` | experimental | Static analysis that finds unused functions, imports, routes and dependencies in public Python/FastAPI repos without running them. It attaches evidence and a confidence level, and generates a reviewable `git apply` patch. | **[YOU]** (likely dynamic dispatch and reflection) | `dead-code-hunter` |
| 2 | `llm_gateway` (SecureLLM Gateway) | shipped | FastAPI service between apps and an LLM provider, applying input and output guardrails, auth, rate limits and usage logging. 140+ tests run with no credentials. | Per its README: the mock provider is deterministic, so real-model behaviour is only covered by the Anthropic adapter. **[YOU]** to confirm. | `llm-gateway` |
| 3 | `basera` (property-search) | experimental | Voice-first Bangalore property search. After each utterance it asks the one question that best narrows the remaining listings. Money and dates are parsed by rules, not the LLM. 126 tests, 550 synthetic listings. | The listings are synthetic, not live data. | `property-search` |
| 4 | `webhook_service` | experimental | Webhook delivery with Postgres as the source of truth and a Redis worker pool. Retries, dead-letter queue, HMAC signing, per-endpoint ordering and replay. | Its own README lists three limits: no migrations, no SSRF protection on outbound URLs, and a single Redis instance. | `webhooks` |
| 5 | `candidate_screener` | experimental | LiveKit phone agent ("Aria") that runs a 5-question screen and classifies the candidate as qualified, maybe or rejected. Writes JSON and CSV. | **[YOU]** | `candidate-screener` |
| 6 | `research_rag` | shipped | Multi-document hybrid RAG: BM25 plus embeddings, configurable weighting, metadata filters, Gemini answers with source citations. | **[YOU]** | `research-rag` |
| 7 | `smart_ehr` | shipped | FHIR R4 backend (8+ resource types), React front end, and a multi-modal LSTM trained on 18,000+ ADNI visits at 0.95 R². | It is a fork of a group project; I'll say which parts are yours. **[YOU]** | `Smart-EHR-System`, live demo: smart-ehr-system.vercel.app |
| 8 | `bug_tracker` | retired | MERN bug tracker with 3 roles, JWT auth, rate limiting and public bug intake. Vercel and Render. | Kept as a first full-stack build. | `bug-tracker` |

Not included, with reasons:
- `job-search-copilot` and `healthcare-voice-support-agent`: their READMEs are empty, so there's nothing honest to say yet. If they're real projects, tell me what they do and I'll add them.
- `shl`: empty repo.
- `task-classifier`, `meeting-summarizer-ai`, `ChatApp`, `invoice-pdf-generator`, coursework notebooks: candidates for a collapsed "older" row.

## 4. `run_history/` — Experience and education

Node label in the diagram: `run_history/` with the subtitle "Experience and education". Replaces the design's `memory/`, and the "what I believe" column is removed; there are no beliefs anywhere on the page. The panel is one timeline in two groups, in the design's row style (mono date, one line, rule between rows). The group labels use the agent lifecycle:

- `deployed` = experience (where the agent has run in production)
- `trained` = education (how the agent was built)

**deployed** (newest first):

- **Jan 2026 – present · AI Engineer, a21.ai, New Delhi.**
  - Led a team of 4 on a text-to-SQL system at 96% accuracy.
  - Architected an agentic pipeline on LangGraph with Neo4j knowledge-graph traversal and hybrid retrieval.
  - Built human-in-the-loop workflows with LangGraph interrupts and PostgreSQL state persistence.
  - Refined 30+ prompts with few-shot and chain-of-thought techniques.
  - Instrumented the pipeline with Langfuse for prompt versioning, tracing, and cost and latency.
- **Jun – Aug 2025 · Full Stack Developer Intern, Shiksha Sathi, remote.**
  - Refactored 10+ pages for layout, responsiveness and accessibility.
  - Improved performance and backend APIs, raising the mobile PageSpeed SEO score by 130%.

**trained**

- **Sep 2022 – May 2026 · B.E. Computer Engineering, Thapar Institute of Engineering and Technology.** Coursework: data structures, operating systems, machine learning, data science, software engineering, AI, database management, computer networks.
- **May 2020 – Sep 2022 · PCM, CBSE, The British School, Mohali.**

**certified / also**

- AWS Certified Solutions Architect – Associate.
- Microsoft Learn Student Chapter: organised technical events and workshops, and co-led planning of an MLH-sponsored makeathon with 200+ participants.

Every line is from the resume. No "Kept: lesson" lines.

## 5. `traces/` — Writing

I have **no posts** to list. Options, your call:
1. Hide this folder until you have writing.
2. Fill it with write-ups you already have (LinkedIn or X posts, once you paste them).
3. Seed it with 2–3 short postmortems drawn from the projects (e.g. "why Basera parses money with rules, not the LLM"). You'd write them.

Default: **hide it** rather than ship placeholders.

## 6. `most_retrieved/` — Things I come back to

Books, albums, essays and papers, as tiles. Your GitHub README says you enjoy reading and are interested in finance, but names no titles. I won't guess. This section needs your list (up to 5), with a "×N" re-read count each. Default: **hide it** until you send it.

## Footer

`endpoints:` GitHub (`github.com/Avishi2511`), email (`avishimittal2004@gmail.com`), LinkedIn (`linkedin.com/in/avishi-mittal`), X (`@avishi_mit6693`), resume PDF download. Then the design's closing line: "end of spec. no input taken, no reply expected."

---

## Implementation notes

- The repo currently holds only the resume PDF, so there are no existing components or conventions to match. My default is **Vite + React + TypeScript**, one component per folder-panel, with the design's CSS variables and fonts carried over as-is: paper `#F4F1E8`, ink `#17160F`, accent `#B93A09`, dark-mode variants, Instrument Serif, Newsreader and JetBrains Mono.
- Harness layout with six panels: left column `system_prompt/`, `skills/`, `run_history/`; right column `tools/`, `traces/`, `most_retrieved/`. If `traces/` and `most_retrieved/` stay hidden, the diagram has four nodes (two per column) and `tools/` is the default open panel.
- Behaviour to keep: the typing animation (off under reduced motion), the click-to-open harness with connector lines on desktop, the stacked layout under 860px, and `aria-pressed` on the nodes.
- Resume PDF copied into `public/` for the download link.

## Questions for you

1. Hide `traces/` and `most_retrieved/` until you have content, or keep them with placeholders?
2. Pronouns for the hero line: first person ("me"), or neutral?
3. Fill in the **[YOU]** items (the "Breaks when…" lines), or should I draft them for you to edit?
4. Paste LinkedIn and X content, or skip those sources?
5. Vite + React + TypeScript, or plain HTML/CSS/JS?
