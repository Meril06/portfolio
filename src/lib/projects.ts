export type Project = {
  slug: string;
  title: string;
  role: string;
  year: string;
  tools: string[];
  tagline: string;
  scene: "desk" | "transit" | "bank" | "clinic";
  problem: string;
  process: string[];
  decisions: { title: string; detail: string }[];
  outcome: string;
  metrics: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "nftauth",
    title: "NFTAuth",
    role: "Team member — smart contracts & frontend",
    year: "2025",
    tools: ["Solidity", "React", "IPFS"],
    tagline: "A decentralized way to prove a credential is real.",
    scene: "bank",
    problem:
      "Academic and professional credentials are still verified the slow, trust-me way — a call to the issuing college, a PDF that could be edited, a cross-border check that takes weeks. Our team wanted to know if a blockchain could actually remove the 'just trust me' step instead of adding more paperwork on top of it.",
    process: [
      "Broke the problem into three real failure modes: credential forgery, slow long-process verification, and cross-border validation that assumes everyone uses the same registrar.",
      "Designed the verification flow first as a flowchart on paper — issuer, holder, verifier — before writing a single line of Solidity.",
      "Split the build: smart contracts and decentralized storage on one side, a React frontend that had to make 'trustless' feel simple on the other.",
    ],
    decisions: [
      {
        title: "IPFS for the credential itself, chain for the proof",
        detail:
          "Storing full documents on-chain is expensive and pointless — we stored the credential on IPFS and only anchored its hash on-chain, so verification stays cheap and tamper-evidence stays strong.",
      },
      {
        title: "One clear verification screen, not a block explorer",
        detail:
          "A verifier shouldn't need to understand transaction hashes. The frontend reduces the whole check to a single 'Valid / Not valid' state, with the technical proof available underneath for anyone who wants it.",
      },
    ],
    outcome:
      "We came away with a working prototype that verifies a credential's authenticity without a phone call to the issuing institution — and a much better sense of where blockchain earns its complexity, and where it doesn't.",
    metrics: [
      { label: "Team size", value: "4" },
      { label: "Verification steps", value: "3 → 1" },
    ],
  },
  {
    slug: "profilecraft",
    title: "ProFileCraft",
    role: "Solo developer & designer",
    year: "2025",
    tools: ["Java", "Swing", "AWT"],
    tagline: "A resume builder that works fully offline.",
    scene: "clinic",
    problem:
      "Most resume builders assume a stable connection and a login. As an academic mini-project, I wanted to see if I could design something a student could open on a shared lab computer with no internet and still walk away with a properly formatted resume.",
    process: [
      "Sketched the form-to-output flow first: what's the minimum number of fields before someone has a usable resume?",
      "Built the interface in Java Swing, treating each section (summary, education, experience, skills) as its own component so the form stays readable instead of one long page.",
      "Tested the generated output against real resume formatting conventions — margins, hierarchy, spacing — instead of just dumping text into a template.",
    ],
    decisions: [
      {
        title: "Live preview, not a final export surprise",
        detail:
          "The formatted resume updates as you type, so there's no gap between filling out a form and trusting what comes out the other side.",
      },
      {
        title: "Offline by design, not by accident",
        detail:
          "No network calls anywhere in the app — it was a constraint I set deliberately, closer to how a lot of students actually work on shared or unreliable machines.",
      },
    ],
    outcome:
      "A functioning desktop app that takes someone from a blank form to an exported, neatly formatted resume in one sitting, no account and no connection required.",
    metrics: [
      { label: "Setup required", value: "None" },
      { label: "Sections supported", value: "5" },
    ],
  },
  {
    slug: "personal-portfolio-v1",
    title: "Personal Portfolio (v1)",
    role: "Design & development",
    year: "2024",
    tools: ["HTML", "CSS"],
    tagline: "The static site that came before this one.",
    scene: "desk",
    problem:
      "I needed a place to actually show projects instead of just listing them on a resume — and a reason to get comfortable with layout and responsiveness fundamentals before reaching for a framework.",
    process: [
      "Built the whole thing in plain HTML and CSS first, deliberately avoiding a framework so I'd understand the box model and responsive breakpoints properly.",
      "Iterated the layout across a few passes as I learned more about spacing and hierarchy — the second version looked nothing like the first.",
    ],
    decisions: [
      {
        title: "Responsive from the first line of CSS",
        detail:
          "Rather than designing desktop-first and retrofitting mobile, I built breakpoints in from the start, which made the eventual move to component-based frameworks much less painful.",
      },
    ],
    outcome:
      "A working, responsive static site that became the reason I went looking for Figma, then React, then everything this current portfolio is built with.",
    metrics: [
      { label: "Load time", value: "< 1s" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
