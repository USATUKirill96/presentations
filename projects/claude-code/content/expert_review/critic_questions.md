# Critic's Questions for the Presentation

## What Already Works
- Slides 6-7: good connection between the idea of persistent context and a concrete example, easy for the audience to apply to their project.
- Slides 11-14: workflow broken down into steps, not abstractly; especially strong are the plan file and Red/Green/Refactor separation.
- Slides 19-21: honest antipatterns and a clear action checklist, making the talk practical rather than promotional.

## Blocking Questions

### Q1
- Slides: 3, 20
- Question: Where do the numbers `85%` and `41%` come from, and in what sample were they measured? They currently sound very confident, but without an exact source and context they may look like marketing numbers.
- Why it matters: Two strong quantitative claims appear at the start and end of the talk, and if they are inaccurate or overly generalized, they undermine trust in the entire presentation.
- What would convince the critic: A direct link to a primary source, wording with a caveat about the sample, or replacing with a less precise but verifiable formulation.

### Q2
- Slide: 4
- Question: The phrase about `5 parallel AI sessions` and the scenario `implement a feature ... with a single command` looks like a demonstration of a future state. Is this already a mass practice or still a rare, well-tuned pipeline?
- Why it matters: The slide sets audience expectations about technology maturity. If presented as the norm, a skeptical audience may consider the talk exaggerated.
- What would convince the critic: A clear separation between `can be assembled` and `typically used`, plus a short caveat about what conditions must be met.

### Q3
- Slides: 6, 7
- Question: Aren't different entities being conflated here: `CLAUDE.md`, `.cursor/rules/*.mdc`, `copilot-instructions.md`, `AGENTS.md`? To the audience, this may look like a single standard, though in practice the mechanics, location, and semantics differ between tools.
- Why it matters: There's a risk the listener will leave with an oversimplified model and then misconfigure their stack.
- What would convince the critic: A small table `tool -> format -> what the agent actually reads` or an explicit clarification that this is not a single standard, but a family of similar mechanisms.

### Q4
- Slides: 8, 9, 21
- Question: How universal are the `deny rules` and hook examples? Currently it sounds like they can be painlessly enabled everywhere, but in practice some commands and integrations may conflict with workflows or access rights.
- Why it matters: If the audience tries to copy the config verbatim and hits tool limitations, they may be disappointed with the whole idea.
- What would convince the critic: A short caveat that configurations are illustrative, and a note about where exactly the tool has limitations.

### Q5
- Slides: 11, 12
- Question: How universal is the `Explore -> Plan -> Implement -> Commit` transition? In its current form it's presented almost as a mandatory process, though for small tasks and some teams it may be excessive.
- Why it matters: A skeptical audience quickly notices when a good pattern is turned into dogma.
- What would convince the critic: Applicability criteria: when the process is mandatory and when it can be shortened.

## Important, but Not Blocking Questions

### Q6
- Slide: 13
- Question: The formulation `AI writes tests and implementation simultaneously` sounds plausible, but this behavior depends on instructions and tools. Wouldn't it be better to name the problem more precisely: `the agent tends to optimize for task completion`?
- Why it matters: This makes the formulation more precise and doesn't argue with those who already successfully do TDD with AI.
- What would convince the critic: Rephrasing to more neutral and engineering-oriented language.

### Q7
- Slides: 16, 20
- Question: The MCP numbers `97M SDK downloads/month` and `10,000+ servers` look impressive, but where exactly do they come from and how resilient are they to date? A similar problem exists with METR metrics on slide 20.
- Why it matters: Here the reliance is on quantitative claims about the market and research, which quickly become outdated and easily provoke the question `is that accurate?`
- What would convince the critic: Direct links to primary sources or replacing numbers with less fragile formulations.

### Q8
- Slide: 17
- Question: `5-10 commands in a project = fast onboarding + living documentation` sounds very strong. Is this an empirical observation, internal team experience, or an assumption?
- Why it matters: Without clarification, this looks like a promise that is then hard to back up on a real project.
- What would convince the critic: A caveat that the effect depends on team maturity and the quality of the commands/skills themselves.

### Q9
- Slide: 18
- Question: The `Writer/Reviewer` pattern is presented as `the highest-ROI` one. This is a strong claim with no comparison to alternatives. What is this prioritization based on?
- Why it matters: A listener might ask, why not `Writer/Tester`, pair human review, or more traditional code review.
- What would convince the critic: Clarifying that this is one of the most practical patterns, not universally the best.

### Q10
- Slide: 19
- Question: The phrase `Accept All without review` as `the most common and most dangerous mistake according to all sources` sounds too categorical. Do we have data confirming exactly this ranking?
- Why it matters: This point is easy to attack in Q&A because it asserts frequency and danger without explicit support.
- What would convince the critic: Soften to `one of the most dangerous` or add a source/data.

## Small Clarifications
- Slide 3: `41% of code is already generated by AI` — better to explain as a share in a specific study or replace with a more cautious formulation.
- Slide 4: `context engineering` should be briefly defined in one sentence so the term doesn't sound like a buzzword for buzzword's sake.
- Slide 20: the block about `AI good for / bad for` is better presented as a rule based on practice, not as a rigid division.
