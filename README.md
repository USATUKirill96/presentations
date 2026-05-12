# Presentation Pipeline

AI-powered presentation generation pipeline — a chain of specialized agents that transform a topic brief into a polished `.pptx` file.

## How it works

The pipeline consists of 8 agents running in sequence:

```
brief.md → [Researcher] → [Architect] → [Writer] → [Review Orchestrator]
                                                          ↙           ↘
                                                   [Critic]         [Expert]
                                                          ↘           ↙
                                                     [Translator] → [Designer] → [Builder] → .pptx
```

Each agent produces an artifact in the project's `content/` directory. You review each artifact before running the next agent.

## Quick start

1. Create a new project:
   ```bash
   mkdir -p projects/{project-name}/content/expert_review projects/{project-name}/output
   cp templates/brief_template.md projects/{project-name}/brief.md
   ```

2. Fill in `projects/{project-name}/brief.md` — topic, audience, style, research notes.

3. Run agents in order (start a new AI session for each):
   ```
   > "Read agents/01_researcher.md and execute for project projects/{project-name}"
   > "Read agents/02_architect.md and execute for project projects/{project-name}"
   > "Read agents/03_writer.md and execute for project projects/{project-name}"
   > "Read agents/08_review_orchestrator.md and execute for project projects/{project-name}"
   > "Read agents/04_designer.md and execute for project projects/{project-name}"
   > "Read agents/05_builder.md and execute for project projects/{project-name}"
   ```

4. Find the generated presentation at `projects/{project-name}/output/presentation.pptx`.

## One-command pipeline

Run the entire pipeline with the meta-orchestrator:
```
> "Read agents/00_pipeline.md and run autopilot mode for project projects/{project-name}"
```

## Project structure

```
agents/              — Universal agent instructions (do not modify)
templates/           — Brief template for new projects
projects/            — One subdirectory per presentation
  └── {name}/
      ├── brief.md        — Topic, audience, style, research
      ├── content/        — Pipeline artifacts (review zone)
      └── output/         — Final presentations (.pptx)
```

## Requirements

- Node.js (for pptxgenjs `.pptx` generation)
- `npm install`
