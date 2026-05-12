# Slide Content

---

## Slide 1 [title]

**TITLE:** AI-Assisted Development — Full Power
**SUBTITLE:** Practices and tools you're (probably) not using
**SPEAKER:** {{SPEAKER_NAME}}
**DATE:** {{DATE}}

**SPEAKER NOTES:**
Opening line: "Raise your hand if you use AI when writing code. Great — almost everyone. Now: who has set up a project context file? Hooks? MCP? That's exactly what we'll talk about — the 80% of capabilities you haven't touched yet."

---

## Slide 2 [agenda]

**TITLE:** What We'll Cover

**CONTENT:**
- The gap: how we use AI vs. what it can do
- Foundation: context engineering — "memory" for AI
- Workflow: plan → implement → verify
- Scaling: MCP, commands, parallel sessions
- Anti-patterns and what the research says
- Checklist: 5 things to do today

**SPEAKER NOTES:**
Every section ends with something concrete — configs, commands, examples you can bring to your project. This isn't evangelism — it's a practical talk for people already in the game. If you're expecting a slide about "AI will replace developers" — there isn't one.

---

## Slide 3 [hook/problem]

**TITLE:** How It Usually Goes

**CONTENT:**
- 85% of developers use AI regularly ¹
- AI is already embedded in day-to-day development
- But every new session starts from scratch — no context
- AI doesn't know your stack, conventions, or architecture
- Result: generic code → manual rewriting

**FOOTNOTES:**
¹ JetBrains Developer Ecosystem Survey 2025

**SPEAKER NOTES:**
Ask the audience: "How many times have you explained the same things to AI — your stack, how to run tests, your code style?" That cycle — starting over every time — is the biggest waste. We use AI as a glorified autocomplete, but it can do so much more.

---

## Slide 4 [problem/gap]

**TITLE:** The Gap: What's Possible vs. What We Do

**CONTENT:**
- "Implement a feature from a JIRA ticket, write tests, open a PR" — already achievable
- Parallel AI sessions are possible, but need proper setup
- Repo-level instructions and memory files carry conventions across sessions
- Auto-formatting and blocking dangerous operations — without human involvement
- The shift: from prompt engineering to context engineering ¹

**FOOTNOTES:**
¹ Anthropic, "Effective Context Engineering for AI Agents," 2025

**SPEAKER NOTES:**
All of this can be assembled today, provided the team has clear context, integrations, and isolation discipline. But don't confuse "technically possible" with "industry standard." Context engineering means managing not a single prompt, but the entire context ecosystem around the agent: memory files, rules, tools, and constraints.

---

## Slide 5 [section divider]

**TITLE:** Foundation: Context Engineering
**TEASER:** The quality of AI output isn't determined by the prompt — it's determined by the entire context ecosystem around it.

---

## Slide 6 [content]

**TITLE:** Persistent Project Context

**CONTENT:**
- CLAUDE.md, .cursor/rules, copilot-instructions.md, AGENTS.md — similar mechanisms, no unified standard
- Automatically loaded at the start of every session
- Stores: build commands, code style, architectural decisions, gotchas
- "One file for all tools" approach: markdown + symlinks
- An investment in the practice, not in a specific product

**SPEAKER NOTES:**
These mechanisms share the same function, but they aren't a single standard. Claude Code uses CLAUDE.md, Cursor has rules, Copilot has copilot-instructions.md — each with its own format and scope. The practical idea is the same: describe the project once so that a new session doesn't start blind. Advanced teams often maintain a single canonical markdown file and adapt it for the necessary entry points.

---

## Slide 7 [demo/example]

**TITLE:** What to Include in a Context File (and What Not To)

**DESCRIPTION:** An example of an effective context file — compact and specific.

**CODE:**
```markdown
# Stack
- TypeScript, React, PostgreSQL
- Tests: vitest — run individual tests, not the full suite
- Linter: ESLint + prettier, bun instead of npm

# Conventions
- ES modules (import/export), not CommonJS
- Components — functional, no classes
- State management: Zustand (see src/stores/)

# Gotchas
- API rate limit: no more than 10 req/sec to /api/external
- Legacy module src/billing — don't touch without review
```

**KEY TAKEAWAYS:**
- Test for each line: "Would AI make a mistake without this?" — if not, remove it
- Don't include: "write clean code," general language conventions, file-by-file descriptions
- Keep the file compact: every line should reduce the risk of an error

**SPEAKER NOTES:**
The main trap is a bloated file. When it's full of secondary rules, important constraints get lost in the noise. AI doesn't ignore them intentionally — the context simply becomes less useful. A study of real repositories (arXiv:2602.14690) found that context files are often the only mechanism for configuring AI agents, yet most developers use them superficially.

---

## Slide 8 [content]

**TITLE:** Hooks: From Recommendations to Enforcement

**CONTENT:**
- A context file is a recommendation (AI can ignore it)
- A hook is a deterministic action (always executes)
- Auto-formatting after every edit (prettier, black, gofmt)
- Blocking changes to .env, credentials, secrets
- Notifications when the agent is waiting for input

**SPEAKER NOTES:**
Rule of thumb: if an instruction must be followed 100% of the time — it's a hook, not a line in a config. A context file says "use prettier." A hook runs prettier automatically after every file change. The first is a request, the second is enforcement. Start with deny rules: block `git push --force`, `rm -rf`, `git reset --hard` — it takes 5 minutes and can save you from disaster.

---

## Slide 9 [demo/example]

**TITLE:** Automation and Rules in Action

**DESCRIPTION:** Example hook configuration in Claude Code and rule configuration in Cursor.

**CODE:**
```json
// Claude Code: settings.json — auto-formatting
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
      }]
    }]
  }
}
```

```markdown
# Cursor: .cursor/rules/format.mdc — auto-attach
---
description: TypeScript file formatting
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: true
---
After editing any TypeScript file, run `npx prettier --write` on it.
Never modify .env files.
```

**KEY TAKEAWAYS:**
- Claude Code: hook on the PostToolUse event — fires after Edit and Write
- Cursor: auto-attach rule with glob scope — this is a rule, not a hook
- Essential: deny rules for `git push --force`, `rm -rf`, `git reset --hard`

**SPEAKER NOTES:**
Pay attention here: it's important not to mix up the terminology. In Claude Code, this is a real event hook; in Cursor, it's a rule with auto-attach logic. The principle is the same: some behavior can be automated, some can be more strictly constrained. But the specific syntax, permissions, and list of events depend on the tool, so always verify configurations against the documentation.

---

## Slide 10 [section divider]

**TITLE:** Workflow: Plan → Implement → Verify
**TEASER:** For non-trivial tasks, separating phases almost always improves control and quality.

---

## Slide 11 [content]

**TITLE:** Plan Mode and the 4-Phase Workflow

**CONTENT:**
- 4 phases: Explore → Plan → Implement → Commit
- The full cycle is needed for tasks involving multiple files, integrations, or risk
- Plan Mode: AI only reads and analyzes — no code writing
- A markdown plan file > built-in planning (survives context resets)
- Numbered tasks: "Do 1.1–1.3, skip 1.4"
- Trivial edits can be handled with a shorter flow (typo, import, local rename)

**SPEAKER NOTES:**
The most common mistake is jumping straight into implementation. "Add Google OAuth" — and the AI starts writing code, making architectural decisions for you. Split it up: first Explore — "read src/auth and explain how sessions work." Then Plan — "I want OAuth, which files need to change? Make a plan." Only then — implement against the plan. Key trick: write the plan into a markdown file rather than relying on built-in planning. The file survives context resets, tool switches, and task handoffs to a colleague.

---

## Slide 12 [content]

**TITLE:** Iterative Decomposition Over Monolithic Prompts

**CONTENT:**
- ❌ "Implement the entire auth system with OAuth, MFA, and password reset"
- ✅ Define scope → iterative cycle → review each step
- "Interview" before a feature: ask AI to raise questions about the implementation
- Interview output → spec file → new session for implementation
- 4 skills: Instructing, Constraining, Providing context, Evaluating

**SPEAKER NOTES:**
For complex tasks, a monolithic prompt is like handing a junior developer a 10-page spec and disappearing for a week. The AI will make dozens of architectural decisions you wouldn't agree with. Instead — do an "interview": ask the AI to raise questions before implementation. "Which OAuth provider? How to store tokens? Do we need refresh? What edge cases?" Write the answers into a spec file — and hand it to a new session. This dramatically changes the quality of the output. For small, local tasks, this level of ceremony isn't necessary.

---

## Slide 13 [content]

**TITLE:** TDD with AI: Making the Agent Disciplined

**CONTENT:**
- By default, the agent optimizes for task completion, not clean TDD discipline
- Strategy 1: explicit role separation — "You are a tester. DO NOT write implementation"
- Strategy 2: enforcement through the context file (TDD Rules)
- Strategy 3: separate sessions for Red and Green phases
- Most valuable use case: "Generate 10 edge case tests for this function"

**SPEAKER NOTES:**
AI defaults to optimizing for completion — it "wants" to write both tests and implementation at once. The tests end up tailored to the code, not the other way around. Three working approaches: explicitly prohibit writing implementation in the first step; put TDD rules in the context file; or physically separate sessions — one writes tests, another writes code. But even without full TDD — ask AI to generate edge case tests. This is where AI truly shines: it finds cases you didn't think of.

---

## Slide 14 [demo/example]

**TITLE:** In Action: TDD Session and Plan File

**DESCRIPTION:** Concrete prompts for TDD and a plan file structure you can use tomorrow.

**CODE:**
```text
# Step 1 — Red (tester)
"Write failing tests for a rate limiter:
- 100 requests per minute per user
- 429 after exceeding the limit
- Counter reset after 60 seconds
DO NOT write the implementation. Show the output of failing tests."

# Step 2 — Green (developer)
"Implement RateLimiter to pass all tests.
Minimal implementation — no optimizations."

# Step 3 — Refactor
"Tests are passing. Refactor for cleanliness and performance,
without breaking tests."
```

```markdown
# Plan file: feature-rate-limiter.md

| #   | Task                          | Status | Comment              |
|-----|-------------------------------|--------|----------------------|
| 1.1 | Write failing tests           | ✅     | 6 tests, all red     |
| 1.2 | Minimal implementation        | ✅     | All tests green      |
| 1.3 | Refactoring                   | 🔄     | Sliding window       |
| 1.4 | Integration tests             | ⬜     |                      |
| 1.5 | PR + review                   | ⬜     |                      |

## Decision Log
- Chose sliding window over fixed window (more accurate, less burst)
- Redis for distributed rate limiting — deferred to v2
```

**KEY TAKEAWAYS:**
- Clear Red/Green/Refactor separation — AI gets one role at a time
- Plan file with numbering: "Do 1.3" — a precise command for the agent
- Commit after each successful step = rollback point

**SPEAKER NOTES:**
Notice the plan file. Numbered tasks let you give precise commands: "Do 1.3, skip 1.4." The decision log is invaluable during context resets or task handoffs. And the main thing — commit after every green step. If the AI takes the code in the wrong direction, you can always roll back. Without commits, you'd have to start from scratch.

---

## Slide 15 [section divider]

**TITLE:** Scaling: From Writer to Orchestrator
**TEASER:** The most valuable skills are task decomposition, context curation, and integrating results.

---

## Slide 16 [content]

**TITLE:** MCP: Connecting Your Workspace

**CONTENT:**
- MCP — "USB-C for AI": a universal standard for connecting tools
- MCP has quickly become the standard way to connect external tools
- GitHub, Playwright, Sentry, PostgreSQL, Jira, Figma — all via MCP
- Scenario: "Implement a feature from a JIRA ticket and create a PR" — a single command
- The same approach is reusable across different AI tools

**SPEAKER NOTES:**
MCP solves the M×N integration problem. Previously, every AI tool wrote its own connector to every service. Now, a single MCP server for GitHub or Jira can be used across different environments, reducing integration cost and reusing the same protocol. A real scenario: you say "implement the feature from JIRA ticket ENG-4521, write tests, open a PR on GitHub" — AI reads the ticket via Jira MCP, writes code, runs tests, and creates a PR via GitHub MCP. Important caveat: third-party MCP servers are a potential vector for prompt injection — only use servers from trusted sources.

---

## Slide 17 [content]

**TITLE:** Custom Commands and Skills

**CONTENT:**
- Claude Code: slash commands, Cursor: notepads + custom modes, Copilot: reusable prompts
- /fix-issue — from ticket to PR in a single command
- /review — check the branch before pushing (security, tests, breaking changes)
- /component — new React component following project conventions
- A small set of reusable commands makes project workflows explicit

**SPEAKER NOTES:**
Custom commands turn a 20-step workflow into a single command. But more importantly, they become living documentation for the project. A new developer sees the command set and immediately understands how things work here: how to create components, how to review code, how to fix bugs. Unlike regular documentation, commands don't just describe the process — they help reproduce it. Even a small set of these commands can noticeably speed up onboarding and make project workflows more explicit.

---

## Slide 18 [content]

**TITLE:** Parallel Sessions and the Writer/Reviewer Pattern

**CONTENT:**
- Git worktrees: multiple working directories from a single repository
- Writer/Reviewer: a fresh session reviews — catches what the "writer" got used to
- Writer/Tester: natural TDD through role separation
- Parallel development: multiple backlog tasks simultaneously
- Requirement: clear task boundaries, non-overlapping files

**SPEAKER NOTES:**
This is the next level — the human as orchestrator of multiple AI sessions. Git worktrees provide working tree isolation, but they don't eliminate the need to think about integration, conflicts, and merge order. The Writer/Reviewer pattern is one of the most practical ways to start: session A writes code, session B with a fresh context reviews it. A fresh context catches problems the "writer" has already gotten used to. But parallel sessions only work when tasks are well-decomposed and have minimal file overlap.

---

## Slide 19 [content]

**TITLE:** Anti-Patterns: 5 Ways to Make AI Useless

**CONTENT:**
- ❌ "fix the login bug" → ✅ Context + specifics + constraints
- ❌ Monolithic prompt for an entire feature → ✅ Explore → Plan → Implement
- ❌ Accept All without review → ✅ Tests, verification, manual checks
- ❌ Kitchen sink: mixing tasks in one session → ✅ Reset between tasks
- ❌ No git discipline → ✅ Commit after every successful step

**SPEAKER NOTES:**
Let's run through these quickly. First: overly generic prompts — the AI "invents a data model" when it doesn't get context. Second: monolithic requests — the AI makes dozens of decisions for you. Third: blind acceptance — one of the most dangerous mistakes and a fast track to a false sense of productivity. The code looks plausible, but edge cases aren't handled. Fourth: mixing unrelated tasks in one session — the context gets polluted, and the AI starts "forgetting." Fifth: not committing — when the AI takes the code in the wrong direction, without rollback points you'll have to start from zero.

---

## Slide 20 [content]

**TITLE:** What the Data Says

**CONTENT:**
- METR (2025): experienced devs 19% slower with AI ¹
- METR update (2026): signal toward speedup, but with caveats about the sample ²
- DORA 2025: AI "amplifies existing strengths and weaknesses" ³
- AI excels at: boilerplate, tests, documentation, isolated bugs
- AI struggles with: architecture, cross-module dependencies, domain logic
- Takeaway: invest in practices — AI will deliver multiplicative returns

**FOOTNOTES:**
¹ METR, "Measuring AI Impact on Experienced Developers," July 2025
² METR, "Developer Productivity Experiment Update," February 2026
³ Google DORA Report 2025

**SPEAKER NOTES:**
This is important. METR ran a randomized controlled study — 16 experienced developers, 246 real tasks. The first robust finding: 19% slower with AI. The reason: time spent on prompting, waiting, and reviewing AI output exceeded the savings. The 2026 update showed a signal toward speedup, but the authors themselves specifically note the weak signal and selection effects, so presenting it as "the new definitive result" isn't warranted. The main lesson isn't about the specific numbers — it's about the principle from DORA: AI amplifies what's already there. Good practices → multiplied returns. Poor practices → multiplied technical debt. Invest in tests, reviews, CI/CD — and AI becomes a multiplier.

---

## Slide 21 [action items]

**TITLE:** What to Do on Monday

**CONTENT:**
- 🟢 Create a project context file (CLAUDE.md / .cursorrules) — 15 minutes
- 🟢 Add deny rules or equivalent tool restrictions — 5 minutes
- 🟡 Try Plan Mode on the next non-trivial task — 30 minutes
- 🟡 Package one repeating workflow as a custom command — 30 minutes
- 🔴 Set up an MCP server (GitHub or Jira) and try an end-to-end scenario — 1 hour

**SPEAKER NOTES:**
Five steps, ordered by effort. Green ones can be done during a lunch break: create a project context file and block dangerous commands. Yellow — try on the next task: Plan Mode and a custom command. Red — set aside an hour for MCP setup. Each item is a small win that pays off immediately. You don't need to do everything at once — start with the context file and deny rules, it'll take 20 minutes and change every session that follows.

---

## Slide 22 [Q&A / thank you]

**TITLE:** Questions?
**SUBTITLE:** Links and resources — in the QR code

**SPEAKER NOTES:**
Thank you. The QR code links to a page with all the references from this talk — studies, configuration examples, context file templates, and plan file templates. Happy to take questions — about specific setups, workflows, or anything that didn't make it into the talk.
