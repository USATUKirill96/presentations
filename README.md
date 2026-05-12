# Presentation Pipeline

AI-powered presentation generation pipeline — a chain of specialized agents that transform a topic into a polished `.pptx` file.

Each agent is a separate session. Run agents in order, review the artifact after each step, fix if needed, then launch the next one.

The pipeline supports multiple projects — each presentation lives in its own directory within `projects/`. All agents are parameterized: they read the topic, audience, style, and other inputs from the project's `brief.md`.

## Pipeline Architecture

```
{PROJECT}/brief.md   ←── input file, defines everything

[01_researcher] → {PROJECT}/content/research.md
                        ↓
               [02_architect] → {PROJECT}/content/outline.md
                                      ↓
                             [03_writer] → {PROJECT}/content/slides_content.md
                                                  ↓
                              [08_review_orchestrator]
                                ↙              ↘
                    [06_critic]                [07_expert]
                                ↘              ↙
                     {PROJECT}/content/expert_review/final_qa.md
                                                  ↓
                                    [09_translator] → {PROJECT}/content/slides_content_{LANG}.md
                                                  ↓
                                        [04_designer] → {PROJECT}/content/design_spec.md
                                                              ↓
                                               [05_builder] → {PROJECT}/output/presentation.pptx
                                                              → {PROJECT}/output/presentation_{LANG}.pptx
```

## Directory Structure

```
agents/              ← universal agent instructions (do not touch)
templates/           ← brief template for new projects
projects/            ← one subdirectory per presentation
  └── {project-name}/
      ├── brief.md        ← brief: topic, audience, style, research
      ├── content/        ← pipeline artifacts (your review zone)
      │   ├── research.md
      │   ├── outline.md
      │   ├── slides_content.md
      │   ├── slides_content_{LANG}.md
      │   ├── design_spec.md
      │   └── expert_review/
      └── output/         ← final presentations
          ├── presentation.pptx
          └── presentation_{LANG}.pptx
```


## Quick Start (Recommended)

The easiest way to start — launch the initializer. It asks 3-5 questions, creates the project with a filled `brief.md`, and suggests the next command:

> "Read the file agents/00_init.md and help create a new presentation project"

After that you'll have a ready `projects/{name}/brief.md` and pipeline commands.

## Manual Setup

If you prefer to fill in the brief yourself:

1. Create the directory: `projects/{project-name}/`
2. Copy the template: `cp templates/brief_template.md projects/{project-name}/brief.md`
3. Fill in `brief.md` — this is the only file you write manually
4. Create subdirectories: `mkdir -p projects/{project-name}/content/expert_review projects/{project-name}/output`
5. Run the pipeline starting from Step 1

---

## How to Run

**Two ways to launch:**

1. **Step by step** — launch each agent as a separate session (detailed below)
2. **Single prompt** — meta-orchestrator `agents/00_pipeline.md` runs the entire pipeline for you

In each step, when launching an agent, **specify the project**. Command format:

> "Read the file agents/0X_agent.md and execute the task for project projects/{project-name}"

---

### Step 1 — Researcher

**Agent file:** `agents/01_researcher.md`

**Open a new session and say:**
> "Read the file agents/01_researcher.md and execute the task for project projects/{project-name}"

**Review:** Open `projects/{project-name}/content/research.md`, add/remove topics, facts, emphasis.

**Done when:** You are satisfied with the set of topics and key points.

---

### Step 2 — Structure Architect

**Agent file:** `agents/02_architect.md`

**Open a new session and say:**
> "Read the file agents/02_architect.md and execute the task for project projects/{project-name}"

**Review:** Open `projects/{project-name}/content/outline.md`. Check slide order, narrative, whether there are any extra/missing slides.

**Done when:** The structure and story flow satisfy you.

---

### Step 3 — Content Writer

**Agent file:** `agents/03_writer.md`

**Open a new session and say:**
> "Read the file agents/03_writer.md and execute the task for project projects/{project-name}"

**Review:** Open `projects/{project-name}/content/slides_content.md`. Edit texts, titles, code examples, speaker notes to match your style.

**Done when:** All texts are final.

---

### Step 3.5 — Expert Content Review

**Agent files:**
- `agents/06_critic.md`
- `agents/07_expert.md`
- `agents/08_review_orchestrator.md`

**Recommended launch in a new session:**
> "Read the file agents/08_review_orchestrator.md, then launch the critic and expert in parallel as subagents for project projects/{project-name}. Have them discuss the content, prepare questions and answers, point out inaccuracies, and compile the result into projects/{project-name}/content/expert_review/final_qa.md"

**What to check after launch:**
- `projects/{project-name}/content/expert_review/final_qa.md` — consolidated list of questions, answers, and corrections
- `projects/{project-name}/content/expert_review/critic_questions.md` — if you want to see only the skeptical line
- `projects/{project-name}/content/expert_review/expert_answers.md` — if you want to see only the answers and sources

**Done when:** Major questions are resolved, controversial statements are softened or confirmed.

---

### Step 3.7 — Translator (optional)

**Agent file:** `agents/09_translator.md`

**Open a new session and say:**
> "Read the file agents/09_translator.md and translate the content into English for project projects/{project-name}"

Or for another language:
> "Read the file agents/09_translator.md and translate the content into German for project projects/{project-name}"

**Review:** Open `projects/{project-name}/content/slides_content_en.md` (or `_de.md`, etc.). Check translation quality, technical terminology, speaker notes.

**Done when:** The translation sounds natural and all terms are correct.

**Note:** This step is optional. If the presentation is only needed in one language — skip it and proceed to the designer. Translation can also be done after building, but it is more convenient before design, so you can review content in all languages.

---

### Step 4 — Designer

**Agent file:** `agents/04_designer.md`

**Open a new session and say:**
> "Read the file agents/04_designer.md and execute the task for project projects/{project-name}"

**Review:** Open `projects/{project-name}/content/design_spec.md`. Adjust colors, fonts, styles to match corporate branding if needed.

**Done when:** The design spec is agreed upon.

---

### Step 5 — PPTX Builder

**Agent file:** `agents/05_builder.md`

**Open a new session and say:**
> "Read the file agents/05_builder.md and execute the task for project projects/{project-name}"

To build in a specific language:
> "Read the file agents/05_builder.md and build the English version for project projects/{project-name}"

To build all languages:
> "Read the file agents/05_builder.md and build all language versions for project projects/{project-name}"

**Result:**
- `projects/{project-name}/output/presentation.pptx` — primary version
- `projects/{project-name}/output/presentation_en.pptx` — English version (if translated)
- etc. for each language

Ready files, no PowerPoint needed.

---

## How to Make Edits Between Steps

- **Minor text edits** → edit the artifact manually and immediately launch the next agent
- **Structural edits** → describe the edits to the agent in the same session: "change slide 3 — remove the point about X, add example Y"
- **Iteration on the final pptx** → in the builder agent's session, say what needs to change, and it will rebuild the file

---

## Running the Entire Pipeline with a Single Prompt

**Agent file:** `agents/00_pipeline.md`

The meta-orchestrator runs the entire pipeline from research to the finished `.pptx`. Two modes:

### Autopilot (no pauses)
> "Read the file agents/00_pipeline.md and run the pipeline in autopilot mode for project projects/{project-name}"

All steps are executed sequentially. Stops only for critical issues. At the end — a finished presentation.

### Step-by-step (with pauses)
> "Read the file agents/00_pipeline.md and run the pipeline in step-by-step mode for project projects/{project-name}"

After each step, the orchestrator shows a summary and asks "continue?" You can make edits between steps.