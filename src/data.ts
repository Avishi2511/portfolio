export type PanelKey = "about" | "skills" | "tools" | "history" | "traces" | "recall";

export const GITHUB = "https://github.com/Avishi2511";

export const links = {
  github: GITHUB,
  email: "mailto:avishimittal2004@gmail.com",
  linkedin: "https://www.linkedin.com/in/avishi-mittal",
  x: "https://x.com/avishi_mit6693",
  resume: "https://drive.google.com/file/d/1BpAYRpA3q4L6YlbAjZPKXZ1bLh8iCM8f/view?usp=sharing",
};

export interface Segment {
  key: PanelKey;
  folder: string;
  label: string;
  grow: number;
  delay: string;
  title: string;
  hint: string;
}

export const segments: Segment[] = [
  { key: "about", folder: "system_prompt", label: "About", grow: 10, delay: ".05s", title: "About", hint: "The instructions it runs on." },
  { key: "history", folder: "run_history", label: "Experience", grow: 13, delay: ".17s", title: "Experience and education", hint: "Where it has run, and how it was trained." },
  { key: "tools", folder: "tools", label: "Projects", grow: 16, delay: ".29s", title: "Projects", hint: "Each project as a call and what it returns." },
  { key: "skills", folder: "skills", label: "Good at", grow: 11, delay: ".41s", title: "What I'm good at", hint: "Situations it is called for, and the skill that answers." },
  { key: "traces", folder: "traces", label: "Writing", grow: 11, delay: ".53s", title: "Writing", hint: "I write what I learn." },
  { key: "recall", folder: "most_retrieved", label: "Off the clock", grow: 10, delay: ".65s", title: "Off the clock", hint: "What it retrieves most often when nobody is prompting it." },
];

export interface Skill {
  said: string;
  name: string;
  notWhen: string;
  evidence: string;
}

export const skills: Skill[] = [
  { said: "“Can I just ask the database?”", name: "text_to_sql", notWhen: "Not when the schema is small enough for a form.", evidence: "a21.ai · team of 4 · 96% accuracy · 30+ prompts refined" },
  { said: "“A person has to sign off first.”", name: "agent_orchestration", notWhen: "Not when one prompt and one call do the job.", evidence: "LangGraph interrupts · Postgres-backed state" },
  { said: "“It can't find the right passage.”", name: "retrieval", notWhen: "Not when the corpus fits in the prompt.", evidence: "research-rag: BM25 + embeddings · Neo4j traversal at a21.ai" },
  { said: "“What did that run cost?”", name: "llm_observability", notWhen: "Not when you have no traffic yet.", evidence: "Langfuse: prompt versions, tracing, cost, latency" },
  { said: "“Keep the model in its lane.”", name: "guardrails_and_gateways", notWhen: "Not when a provider's built-in filter is enough.", evidence: "llm-gateway" },
  { said: "“Can it just make the call?”", name: "voice_agents", notWhen: "Not when a form is faster.", evidence: "candidate-screener · Basera" },
];

export interface Tool {
  name: string;
  arg: string;
  status: "shipped" | "experimental" | "retired";
  does: string;
  breaksWhen?: string;
  keptFor?: string;
  stack: string[];
  repo: string;
  demo?: string;
}

export const tools: Tool[] = [
  {
    name: "dead_code_hunter",
    arg: "repo",
    status: "experimental",
    does: "Finds unused functions, imports, routes and dependencies in public Python/FastAPI repos without running them, with evidence, a confidence level and a reviewable git apply patch.",
    stack: ["Python", "FastAPI", "React", "TypeScript"],
    repo: "dead-code-hunter",
  },
  {
    name: "llm_gateway",
    arg: "request",
    status: "shipped",
    does: "Sits between apps and an LLM provider: input and output guardrails, auth, rate limits and usage logging. 140+ tests run with no credentials.",
    stack: ["Python", "FastAPI", "SQLAlchemy", "Anthropic SDK"],
    repo: "llm-gateway",
  },
  {
    name: "basera",
    arg: "utterance",
    status: "experimental",
    does: "Voice-first Bangalore property search. After each utterance it asks the one question that best narrows the remaining listings. Money and dates are parsed by rules, not the LLM. 126 tests.",
    breaksWhen: "the listings are synthetic: 550 across 18 localities, not live data.",
    stack: ["Python", "FastAPI", "React", "WebSocket"],
    repo: "property-search",
  },
  {
    name: "smart_ehr",
    arg: "patient",
    status: "shipped",
    does: "FHIR R4 backend (8+ resource types), React front end, and a multi-modal LSTM trained on 18,000+ ADNI visits at 0.95 R².",
    stack: ["Python", "FastAPI", "React", "FHIR R4", "LSTM"],
    repo: "Smart-EHR-System",
    demo: "https://smart-ehr-system.vercel.app",
  },
  {
    name: "research_rag",
    arg: "question",
    status: "shipped",
    does: "Multi-document hybrid RAG: BM25 plus embeddings, configurable weighting and metadata filters, Gemini answers with source citations.",
    stack: ["Python", "FastAPI", "ChromaDB", "SQLite"],
    repo: "research-rag",
  },
  {
    name: "bug_tracker",
    arg: "bug",
    status: "shipped",
    does: "MERN bug tracker with 3 roles, JWT auth, rate limiting and public bug intake. Deployed on Vercel and Render.",
    stack: ["React", "Node.js", "MongoDB", "JWT"],
    repo: "bug-tracker",
  },
  {
    name: "webhook_service",
    arg: "event",
    status: "experimental",
    does: "Webhook delivery with Postgres as the source of truth and a Redis worker pool: retries, dead-letter queue, HMAC signing, per-endpoint ordering and replay.",
    breaksWhen: "no migrations, no SSRF protection on outbound URLs, one Redis instance.",
    stack: ["Python", "Postgres", "Redis", "Docker"],
    repo: "webhooks",
  },
  {
    name: "candidate_screener",
    arg: "candidate",
    status: "experimental",
    does: "A LiveKit phone agent that runs a 5-question screen and classifies the candidate as qualified, maybe or rejected. Saves JSON and CSV.",
    stack: ["Python", "LiveKit", "Deepgram", "OpenAI"],
    repo: "candidate-screener",
  },
];

export interface Role {
  when: string;
  title: string;
  org: string;
  points: string[];
}

export const deployed: Role[] = [
  {
    when: "Jun – Aug 2025",
    title: "Full Stack Developer Intern",
    org: "Shiksha Sathi · remote",
    points: [
      "Refactored 10+ pages for layout, responsiveness and accessibility.",
      "Improved performance and backend APIs, raising the mobile PageSpeed SEO score by 130%.",
    ],
  },
  {
    when: "Jan 2026 – present",
    title: "AI Engineer",
    org: "a21.ai · New Delhi",
    points: [
      "Led a team of 4 on a text-to-SQL system at 96% accuracy.",
      "Architected an agentic pipeline on LangGraph with Neo4j knowledge-graph traversal and hybrid retrieval.",
      "Built human-in-the-loop workflows with LangGraph interrupts and PostgreSQL state persistence.",
      "Refined 30+ prompts with few-shot and chain-of-thought techniques.",
      "Instrumented the pipeline with Langfuse for prompt versioning, tracing, cost and latency.",
    ],
  },
];

export interface Row {
  when: string;
  what: string;
  sub?: string;
}

export const trained: Row[] = [
  {
    when: "Sep 2022 – May 2026",
    what: "B.E. Computer Engineering, Thapar Institute of Engineering and Technology",
  },
];

export const certified: Row[] = [
  { when: "certified", what: "AWS Certified Solutions Architect – Associate" },
];
