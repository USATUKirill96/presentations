# Находки эксперта

## Подтверждённые сильные тезисы
- Слайд 3: тезис про `85% разработчиков регулярно используют AI` подтверждается JetBrains Developer Ecosystem Survey 2025. Это сильный вход в доклад, если оставить именно формулировку про использование AI-инструментов, а не делать из неё вывод про зрелость практик.
- Слайды 4-7: сдвиг от `prompt engineering` к `context engineering` хорошо опирается на Anthropic. Сам тезис про важность управления контекстом подтверждается напрямую; он звучит убедительно и современно.
- Слайды 6 и 9: наличие персистентных project-level инструкций у крупных инструментов подтверждается официальной документацией. У Claude Code это `CLAUDE.md`, у Cursor это `.cursor/rules`, у GitHub Copilot это `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md`, а также agent-instruction файлы `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`.
- Слайд 11: идея разделять исследование и реализацию подтверждается официальной документацией Claude Code и Cursor. У Claude Code есть явный `Plan Mode`; у Cursor есть `Ask` как read-only режим для изучения и планирования.
- Слайды 18 и 20: тезис `AI усиливает уже существующие сильные и слабые стороны` хорошо поддержан DORA 2025. Это один из самых надёжных каркасных выводов во всей презентации.

## Что требует оговорки
- Слайд 4: `AI помнит конвенции проекта между сессиями`
  - Почему: в таком виде звучит как внутренняя память модели. По источникам это достигается не "памятью" модели, а внешними механизмами: `CLAUDE.md`, project rules, custom instructions, `AGENTS.md`.
  - Как безопаснее сформулировать: `Проектные конвенции можно сделать доступными в каждой новой сессии через repo-level инструкции и memory files`.

- Слайд 7: `15-30 строк — идеальный размер. 500 строк — контрпродуктивно`
  - Почему: это похоже на полезную эвристику, но не на подтверждённый численный факт. Cursor пишет, что хорошие rules должны быть focused and actionable и рекомендует держать rules до 500 строк; Anthropic пишет про конечный attention budget. Бумага `arXiv:2602.14690` подтверждает важность context files, но не даёт нормы `15-30`.
  - Как безопаснее сформулировать: `Контекстный файл должен быть компактным и высокосигнальным; длинные файлы быстро теряют пользу`.

- Слайд 9: блок про `хуки в действии: Claude Code и Cursor`
  - Почему: пример с Claude Code действительно про hooks. Пример с Cursor — это rule, то есть системная инструкция в контексте, а не детерминированный хук. Это важное смешение понятий, потому что на предыдущем слайде они специально разведены.
  - Как безопаснее сформулировать: либо переименовать слайд в `Автоматизация и правила в действии`, либо оставить на нём только Claude Code как пример хуков, а Cursor вынести как пример project rules.

- Слайд 16: `Работает в Claude Code, Cursor, VS Code, Windsurf — настроил раз`
  - Почему: протокол действительно кросс-клиентный, но настройка, разрешения, transport и UX всё равно зависят от конкретного host-клиента. Фраза `настроил раз` завышает степень переносимости.
  - Как безопаснее сформулировать: `MCP снижает стоимость интеграции между клиентами и серверами, но настройка и permissions всё равно зависят от конкретного инструмента`.

- Слайд 17: `Copilot: reusable prompts`
  - Почему: идея подтверждается, но у GitHub Copilot prompt files сейчас находятся в `public preview`, а не выглядят как настолько же зрелый и устоявшийся механизм, как slash commands у Claude Code.
  - Как безопаснее сформулировать: `Copilot: custom instructions + prompt files (public preview)`.

- Слайд 18: `Git worktrees ... никаких конфликтов`
  - Почему: worktrees хорошо изолируют файловое состояние, но не изолируют БД, Docker, кэши, внешние сервисы и не отменяют merge conflicts при последующей интеграции.
  - Как безопаснее сформулировать: `Git worktrees дают изоляцию рабочего дерева и сильно упрощают параллельные сессии, но не устраняют все конфликты автоматически`.

- Слайд 20: `METR (2025) ... обновление (2026): на 18% быстрее`
  - Почему: февральский METR update действительно показывает оценку `-18%` для части выборки, но сами авторы пишут, что из-за selection effects сигнал слабый и размер speedup ненадёжен. Подавать это как просто "новый результат" слишком сильно.
  - Как безопаснее сформулировать: `METR 2025 зафиксировали 19% slowdown в раннем сетапе; в апдейте 2026 появились слабые признаки speedup, но авторы прямо предупреждают о сильных selection effects`.

## Возможные неточности
- Слайд 3: `41% кода уже генерируется AI`
  - Что вызывает сомнение: в исследовательских и официальных источниках из текущего набора нет надёжного первичного подтверждения именно этой цифры как общеиндустриального факта. В поиске она ходит в пересказах и блогах, но не в устойчивом первоисточнике уровня JetBrains, DORA, METR, Anthropic или GitHub Docs.
  - Что проверить дальше: либо найти первичный источник и честно ограничить scope, либо убрать цифру и заменить на более безопасный тезис про широкое проникновение AI в ежедневную разработку.

- Слайд 16: `97 млн скачиваний SDK/мес, 10 000+ серверов`
  - Что вызывает сомнение: в текущем проходе это подтверждается только через вторичный источник (`Pento.ai`). У официальных материалов MCP я нашёл подтверждение активного роста, запуск официального Registry и широкое распространение, но не надёжную первичную валидацию этих двух чисел.
  - Что проверить дальше: либо явно пометить как оценку стороннего рынка, либо убрать числа и оставить качественный тезис про быстрый рост экосистемы.

- Слайд 17: `5-10 команд в проекте = быстрый onboarding + живая документация`
  - Что вызывает сомнение: первая половина — разумный инженерный вывод, но численный порог `5-10` и implied effect на onboarding выглядят как авторская эвристика, а не подтверждённый факт.
  - Что проверить дальше: подавать как практику или рекомендацию, а не как будто это измеренный результат.

- Слайд 18: `Writer/Reviewer — самый высокоROI-ный паттерн AI-разработки`
  - Что вызывает сомнение: Lightspark и документация Anthropic поддерживают идею параллельных сессий и multi-agent workflows, но конкретное утверждение про `самый high-ROI` не выглядит количественно доказанным.
  - Что проверить дальше: ослабить до `один из самых практичных паттернов` или явно подать как наблюдение из практики.

## Источники
- JetBrains, `The State of Developer Ecosystem 2025`: https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/
- Anthropic, `Effective context engineering for AI agents`: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Anthropic Docs, `Manage Claude's memory`: https://docs.anthropic.com/en/docs/claude-code/memory
- Anthropic Docs, `Hooks reference`: https://docs.anthropic.com/en/docs/claude-code/hooks
- Anthropic Docs, `Slash commands`: https://docs.anthropic.com/en/docs/claude-code/slash-commands
- Anthropic Docs, `Common workflows` (Plan Mode, parallel worktrees): https://docs.anthropic.com/en/docs/claude-code/tutorials
- Cursor Docs, `Rules`: https://docs.cursor.com/context/rules-for-ai
- Cursor Docs, `Modes`: https://docs.cursor.com/agent/custom-modes
- GitHub Docs, `Adding repository custom instructions for GitHub Copilot`: https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot
- GitHub Docs, `About customizing GitHub Copilot responses`: https://docs.github.com/en/copilot/concepts/prompting/response-customization
- GitHub Docs, `About GitHub Copilot coding agent`: https://docs.github.com/copilot/concepts/coding-agent/coding-agent
- GitHub Docs, `Prompt files`: https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files
- arXiv, `Configuring Agentic AI Coding Tools: An Exploratory Study` (`arXiv:2602.14690`): https://arxiv.org/abs/2602.14690
- MCP Specification, `Overview`: https://modelcontextprotocol.io/specification/2025-06-18/basic
- MCP Specification, `Security Best Practices`: https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices
- MCP Registry, `About`: https://modelcontextprotocol.io/registry/about
- METR, `Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity`: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- METR, `We are Changing our Developer Productivity Experiment Design`: https://metr.org/blog/2026-02-24-uplift-update/
- DORA 2025, `State of AI-assisted Software Development`: https://dora.dev/dora-report-2025/
