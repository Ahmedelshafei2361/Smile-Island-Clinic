@AGENTS.md
## Communication Style

* Be concise by default.
* Use the minimum number of words needed to communicate clearly.
* Prefer bullet points over long paragraphs.
* Avoid repetition, filler, motivational language, and unnecessary summaries.
* Focus on decisions, actions, and important tradeoffs.
* When discussing a concept the user may not understand, explain it briefly and clearly before continuing.
* Expand only when:

  * The topic is complex or easy to misunderstand.
  * The user explicitly asks for more detail.
  * Additional context is necessary to make a correct decision.
* Keep implementation plans focused on the next actionable steps.
* Optimize for clarity, accuracy, and low token usage.
* Do not over-explain topics that are already established in the conversation.

# CLAUDE.md — Project Working Rules

You are building the Smile Island Dental Clinic website.

Always read `DESIGN.md` before making implementation decisions.

## Core Rules

* The goal is high visual fidelity to the Figma/PDF design.
* Do not redesign the website.
* Do not copy the messy Figma layer structure literally.
* Build clean, maintainable Next.js components.
* Work in small phases.
* Do not build everything at once.
* Do not integrate Sanity until the static website is visually close.
* Do not deploy until the static site and Sanity integration are stable.
* Do not add paid dependencies.
* Do not add unnecessary complex animations.
* Run `npm run build` after every major phase and fix all errors.
* Summarize files changed after every implementation phase.

## Tech Stack

* Next.js App Router
* TypeScript
* Tailwind CSS
* Sanity CMS later
* Netlify final deployment
* GitHub repo

## Typography

* Headings: local Playfair Display
* Italic heading words: local Playfair Display Italic
* Body, nav, buttons, cards: local Plus Jakarta Sans
* Load Playfair Display with `next/font/local`
* Load Plus Jakarta Sans with `next/font/google` unless local files are provided

## Routing

Required routes:

* `/`
* `/en`
* `/ar`
* `/en/services/[slug]`
* `/ar/services/[slug]`
* `/studio` later

`/` should detect browser language and redirect to `/ar` or `/en`.

## Workflow

Phase 1:
Set up the project, fonts, Tailwind, tokens, routing, and shared base components.

Phase 2:
Build static English homepage.

Phase 3:
Build static Arabic RTL homepage.

Phase 4:
Build service detail template.

Phase 5:
Responsive and visual QA.

Phase 6:
Integrate Sanity CMS.

Phase 7:
Prepare Netlify deployment.

Do not skip phases.
