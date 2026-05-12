const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.title = 'AI-Assisted Development — полная мощность';

const C = {
  bgDark:    '0F1B2D',
  bgDarkSec: '162236',
  bgLight:   'F0F4F8',
  accent:    '00D4FF',
  textDark:  'E8EDF2',
  textLight: '1A2332',
  textMuted: '7A8BA0',
  codeBg:    '0B1222',
  codeText:  'A8F0D4',
  positive:  '34D399',
  negative:  'F87171',
};

const FM = 'Inter';
const FC = 'Consolas';

const W = 13.3;
const H = 7.5;
const p  = (px) => px * W / 1920;
const ph = (px) => px * H / 1080;
const ML = p(80);
const MT = ph(60);

// v1.2: font sizes — bigger to fill space, fix overlap
const TFS  = 40;   // content slide title (was 36)
const BFS  = 26;   // body bullets (was 22)
const BPS  = 20;   // bullet paraSpaceAfter (was 26)
const CFS  = 16;   // code (was 12)
const NFS  = 14;   // footnotes (was 12)
const AFSS = 20;   // annotations (was 18)

const TH_CONTENT = 1.1;  // title height for content slides (was 1.0)
const TH_CODE    = 0.85; // title height for code slides (was 0.75)

function contentY(titleH) {
  return MT + titleH + 0.07 + ph(3) + 0.25;  // increased gap (was 0.15)
}

// ── Helpers ──────────────────────────────────────────────────

function darkBg(slide) {
  slide.background = { color: C.bgDark };
  slide.addShape(pres.shapes.RECTANGLE, {
    x: W * 0.55, y: 0, w: W * 0.45, h: H,
    fill: { color: C.bgDarkSec, transparency: 70 },
    line: { color: C.bgDark, width: 0 },
  });
}

function accentLine(slide, x, y, w) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: w || p(80), h: ph(3),
    fill: { color: C.accent }, line: { color: C.accent, width: 0 },
  });
}

function lightHeader(slide, title, titleH) {
  const th = titleH !== undefined ? titleH : TH_CONTENT;
  slide.addText(title, {
    x: ML, y: MT, w: W - 2 * ML, h: th,
    fontFace: FM, fontSize: TFS, bold: true,
    color: C.textLight, valign: 'top', margin: 0,
  });
  const ly = MT + th + 0.07;
  accentLine(slide, ML, ly, p(80));
  return ly + ph(3) + 0.25;  // increased gap (was 0.15)
}

function addBullets(slide, items, y, h, opts) {
  const fs  = (opts && opts.fs)  || BFS;
  const ps  = (opts && opts.ps)  !== undefined ? opts.ps : BPS;
  const rich = [];
  items.forEach((text, i) => {
    rich.push({ text: '— ', options: { bold: true, color: C.accent, fontFace: FM, fontSize: fs } });
    rich.push({ text, options: {
      color: C.textLight, fontFace: FM, fontSize: fs,
      breakLine: i < items.length - 1, paraSpaceAfter: ps,
    }});
  });
  slide.addText(rich, { x: ML, y, w: W - 2 * ML, h: h || (H - y - ML), valign: 'top', margin: 0 });
}

function addFootnotes(slide, lines) {
  slide.addText(lines.join('\n'), {
    x: ML, y: H - ph(70), w: W - 2 * ML, h: ph(60),
    fontFace: FM, fontSize: NFS, color: C.textMuted, valign: 'bottom', margin: 0,
  });
}

function codeBlock(slide, x, y, w, h, code, fontSize) {
  const fs = fontSize || CFS;
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.codeBg }, line: { color: '1E3048', width: 1 } });
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w: p(4), h, fill: { color: C.accent }, line: { color: C.accent, width: 0 } });
  slide.addText(code, {
    x: x + p(16), y: y + 0.15, w: w - p(20), h: h - 0.30,
    fontFace: FC, fontSize: fs, color: C.codeText, valign: 'top', margin: 0,
  });
}

function annotationList(slide, items, y) {
  const rich = [];
  items.forEach((text, i) => {
    rich.push({ text: '→ ', options: { bold: true, color: C.accent, fontFace: FM, fontSize: AFSS } });
    rich.push({ text, options: {
      color: C.textLight, fontFace: FM, fontSize: AFSS,
      breakLine: i < items.length - 1, paraSpaceAfter: 12,
    }});
  });
  slide.addText(rich, { x: ML, y, w: W - 2 * ML, h: H - y - ML, valign: 'top', margin: 0 });
}

function sectionSlide(title, teaser, notes) {
  const slide = pres.addSlide();
  darkBg(slide);
  const ty = H * 0.36;
  slide.addText(title, {
    x: W * 0.07, y: ty, w: W * 0.86, h: 0.85,
    fontFace: FM, fontSize: 52, bold: true,
    color: C.accent, align: 'center', valign: 'middle', margin: 0,
  });
  const ly = ty + 0.9;
  accentLine(slide, (W - p(80)) / 2, ly, p(80));
  if (teaser) {
    slide.addText(teaser, {
      x: W * 0.10, y: ly + 0.12, w: W * 0.80, h: 0.7,
      fontFace: FM, fontSize: 24, italic: true,
      color: C.textDark, align: 'center', margin: 0,
    });
  }
  slide.addNotes(notes || '');
  return slide;
}

// ── SLIDE 1: Title ───────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);
  const ty = H * 0.27;
  slide.addText('AI-Assisted Development\n— полная мощность', {
    x: W * 0.07, y: ty, w: W * 0.86, h: 1.5,
    fontFace: FM, fontSize: 56, bold: true,
    color: C.accent, align: 'center', margin: 0,
  });
  const ly = ty + 1.55;
  accentLine(slide, (W - p(120)) / 2, ly, p(120));
  slide.addText('Практики и инструменты, которые вы (вероятно) не используете', {
    x: W * 0.12, y: ly + 0.12, w: W * 0.76, h: 0.5,
    fontFace: FM, fontSize: 26, color: C.textDark, align: 'center', margin: 0,
  });
  slide.addText('{{SPEAKER_NAME}} · {{DATE}}', {
    x: W - ML - 3.0, y: H - 0.5, w: 2.9, h: 0.35,
    fontFace: FM, fontSize: 18, color: C.textMuted, align: 'right', margin: 0,
  });
  slide.addNotes('Открывающая реплика: «Поднимите руку, кто использует AI при написании кода. Отлично — почти все. А теперь: кто настроил контекстный файл проекта? Хуки? MCP? Вот об этом и поговорим — о 80% возможностей, которые вы пока не трогаете.»');
}

// ── SLIDE 2: Agenda ──────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const th = TH_CONTENT;
  slide.addText('О чём поговорим', {
    x: ML, y: MT, w: W - 2 * ML, h: th,
    fontFace: FM, fontSize: TFS, bold: true, color: C.textLight, valign: 'top', margin: 0,
  });
  accentLine(slide, ML, MT + th + 0.07, p(80));

  const items = [
    'Разрыв: как используем AI vs. что он умеет',
    'Фундамент: context engineering — «память» для AI',
    'Workflow: plan → implement → verify',
    'Масштабирование: MCP, команды, параллельные сессии',
    'Антипаттерны и что говорят исследования',
    'Чеклист: 5 действий на сегодня',
  ];
  const startY = contentY(th);
  const stepH = (H - startY - ML) / items.length;
  items.forEach((item, i) => {
    const y = startY + i * stepH;
    slide.addText(String(i + 1), {
      x: ML, y, w: 0.45, h: stepH,
      fontFace: FM, fontSize: 32, bold: true, color: C.accent, align: 'right', valign: 'middle', margin: 0,
    });
    slide.addText(item, {
      x: ML + 0.55, y, w: W - 2 * ML - 0.55, h: stepH,
      fontFace: FM, fontSize: BFS, color: C.textLight, valign: 'middle', margin: 0,
    });
  });
  slide.addNotes('Каждый блок заканчивается конкретикой — конфигурациями, командами, примерами, которые можно забрать в свой проект. Это не евангелизм — это практический доклад для тех, кто уже в теме. Если вы ждёте слайд «AI заменит разработчиков» — его не будет.');
}

// ── SLIDE 3: Hook/Problem ────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const cy = lightHeader(slide, 'Как это обычно выглядит');
  addBullets(slide, [
    '85% разработчиков используют AI регулярно ¹',
    'AI уже встроился в повседневную разработку',
    'Но каждая новая сессия — с нуля, без контекста',
    'AI не знает ваш стек, конвенции и архитектуру',
    'Результат: generic код → переписывание руками',
  ], cy, H - cy - 0.6);
  addFootnotes(slide, ['¹ JetBrains Developer Ecosystem Survey 2025']);
  slide.addNotes('Задайте залу вопрос: «Сколько раз вы объясняли AI одно и то же — какой у вас стек, как запускать тесты, какой стиль кода?» Вот этот цикл — каждый раз заново — и есть главная потеря. Мы используем AI как продвинутый автокомплит, а он умеет гораздо больше.');
}

// ── SLIDE 4: Gap ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const cy = lightHeader(slide, 'Разрыв: что возможно vs. что есть');
  addBullets(slide, [
    '«Реализуй фичу из JIRA-тикета, напиши тесты, открой PR» — уже достижимо',
    'Параллельные AI-сессии возможны, но требуют хорошей настройки',
    'Repo-level instructions и memory files переносят конвенции между сессиями',
    'Автоформатирование и блокировка опасных операций — без участия человека',
    'Сдвиг: от prompt engineering к context engineering ¹',
  ], cy, H - cy - 0.6);
  addFootnotes(slide, ['¹ Anthropic, «Effective Context Engineering for AI Agents», 2025']);
  slide.addNotes('Это уже можно собрать сегодня, если у команды есть внятный контекст, интеграции и дисциплина изоляции. Но важно не путать «технически возможно» с «это уже рыночная норма». Context engineering — это управление не одним промптом, а всей экосистемой контекста вокруг агента: файлами памяти, правилами, инструментами и ограничениями.');
}

// ── SLIDE 5: Section ─────────────────────────────────────────
sectionSlide(
  'Фундамент: Context Engineering',
  'Качество вывода AI определяется не промптом, а всей экосистемой контекста вокруг него.',
  ''
);

// ── SLIDE 6: Persistent Context ──────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const cy = lightHeader(slide, 'Персистентный контекст проекта');
  addBullets(slide, [
    'CLAUDE.md, .cursor/rules, copilot-instructions.md, AGENTS.md — похожие механизмы, не единый стандарт',
    'Автоматически читается при старте каждой сессии',
    'Хранит: команды сборки, code style, архитектурные решения, gotchas',
    'Подход «один файл — все инструменты»: markdown + симлинки',
    'Инвестиция в практику, а не в конкретный продукт',
  ], cy);
  slide.addNotes('У этих механизмов общая функция, но это не один стандарт. У Claude Code — CLAUDE.md, у Cursor — rules, у Copilot — copilot-instructions.md, и у каждого свой формат и scope. Практическая идея при этом общая: один раз описать проект так, чтобы новая сессия не стартовала вслепую. Продвинутые команды часто ведут один канонический markdown-файл и адаптируют его под нужные точки входа.');
}

// ── SLIDE 7: Context File Example ────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const th = TH_CODE;
  slide.addText('Что включать в контекстный файл (и что нет)', {
    x: ML, y: MT, w: W - 2 * ML, h: th,
    fontFace: FM, fontSize: TFS, bold: true, color: C.textLight, valign: 'top', margin: 0,
  });
  const ly = MT + th + 0.07;
  accentLine(slide, ML, ly, p(80));

  const descY = ly + ph(3) + 0.08;
  slide.addText('Пример эффективного контекстного файла — компактного и конкретного.', {
    x: ML, y: descY, w: W - 2 * ML, h: 0.28,
    fontFace: FM, fontSize: AFSS, color: C.textMuted, margin: 0,
  });

  const codeY = descY + 0.28 + 0.1;
  const codeH = 3.5;
  codeBlock(slide, ML, codeY, W - 2 * ML, codeH,
`# Стек
- TypeScript, React, PostgreSQL
- Тесты: vitest — запускать отдельные, не весь набор
- Линтер: ESLint + prettier, bun вместо npm

# Соглашения
- ES modules (import/export), не CommonJS
- Компоненты — functional, никаких классов
- State management: Zustand (см. src/stores/)

# Gotchas
- API rate limit: не больше 10 req/sec к /api/external
- Legacy-модуль src/billing — не трогать без ревью`);

  const ay = codeY + codeH + 0.15;
  annotationList(slide, [
    'Тест для каждой строки: «Без этого AI ошибётся?» — если нет, удалить',
    'Не включать: «пиши чистый код», общие конвенции языка, описание каждого файла',
    'Держите файл компактным: каждая строка должна снижать риск ошибки',
  ], ay);
  slide.addNotes('Главная ловушка — раздутый файл. Когда в нём десятки второстепенных правил, важные ограничения теряются в шуме. AI не игнорирует их намеренно — контекст просто становится менее полезным. Исследование реальных репозиториев (arXiv:2602.14690) показало, что контекстные файлы — часто единственный механизм конфигурации AI-агентов, но большинство разработчиков используют их поверхностно.');
}

// ── SLIDE 8: Hooks ───────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const cy = lightHeader(slide, 'Хуки: от рекомендаций к принуждению');
  addBullets(slide, [
    'Контекстный файл — рекомендация (AI может проигнорировать)',
    'Хук — детерминированное действие (выполняется всегда)',
    'Автоформатирование после каждого редактирования (prettier, black, gofmt)',
    'Блокировка изменений в .env, credentials, секретах',
    'Нотификация когда агент ждёт ввода',
  ], cy);
  slide.addNotes('Правило большого пальца: если инструкция должна соблюдаться в 100% случаев — это хук, не строка в конфиге. Контекстный файл говорит «используй prettier». Хук берёт и запускает prettier автоматически после каждого изменения файла. Первое — просьба, второе — принуждение. Начните с deny rules: заблокируйте git push --force, rm -rf, git reset --hard — это занимает 5 минут и может спасти от катастрофы.');
}

// ── SLIDE 9: Hooks Config (two horizontal code blocks) ───────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const th = TH_CODE;
  slide.addText('Автоматизация и правила в действии', {
    x: ML, y: MT, w: W - 2 * ML, h: th,
    fontFace: FM, fontSize: TFS, bold: true, color: C.textLight, valign: 'top', margin: 0,
  });
  const ly = MT + th + 0.07;
  accentLine(slide, ML, ly, p(80));

  const descY = ly + ph(3) + 0.08;
  slide.addText('Пример hook-конфигурации в Claude Code и rule-конфигурации в Cursor.', {
    x: ML, y: descY, w: W - 2 * ML, h: 0.28,
    fontFace: FM, fontSize: AFSS, color: C.textMuted, margin: 0,
  });

  const codeY  = descY + 0.28 + 0.1;
  const colGap = 0.35;
  const colW   = (W - 2 * ML - colGap) / 2;
  const codeH  = 3.2;

  codeBlock(slide, ML, codeY, colW, codeH,
`// Claude Code: settings.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "jq -r '.tool_input.file_path'
  | xargs npx prettier --write"
      }]
    }]
  }
}`);

  codeBlock(slide, ML + colW + colGap, codeY, colW, codeH,
`# Cursor: .cursor/rules/format.mdc
---
description: Форматирование TypeScript
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: true
---
After editing any TypeScript file,
run npx prettier --write on it.

Never modify .env files.`);

  const ay = codeY + codeH + 0.15;
  annotationList(slide, [
    'Claude Code: хук на событие PostToolUse — работает после Edit и Write',
    'Cursor: auto-attach правило с glob-скоупом — это rule, а не hook',
    'Обязательно: deny rules для git push --force, rm -rf, git reset --hard',
  ], ay);
  slide.addNotes('Обратите внимание: здесь важно не смешивать термины. В Claude Code это настоящий hook на событие, а в Cursor — rule с auto-attach логикой. Принцип общий: часть поведения можно автоматизировать, часть — жёстче ограничить. Но конкретный синтаксис, права и список событий зависят от инструмента, так что конфигурации всегда проверяйте по документации.');
}

// ── SLIDE 10: Section ────────────────────────────────────────
sectionSlide(
  'Workflow: Plan → Implement → Verify',
  'Для нетривиальных задач разделение фаз почти всегда повышает управляемость и качество.',
  ''
);

// ── SLIDE 11: Planning Mode ──────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const cy = lightHeader(slide, 'Режим планирования и 4-фазный workflow');
  addBullets(slide, [
    '4 фазы: Explore → Plan → Implement → Commit',
    'Полный цикл нужен для задач с несколькими файлами, интеграциями или риском',
    'Plan Mode: AI только читает и анализирует, не пишет код',
    'Markdown план-файл > встроенное планирование (переживает сброс контекста)',
    'Нумерованные задачи: «Сделай 1.1–1.3, пропусти 1.4»',
    'Тривиальные правки можно вести короче (опечатка, импорт, локальный rename)',
  ], cy);
  slide.addNotes('Самая частая ошибка — сразу бросаться в реализацию. «Добавь Google OAuth» — и AI начинает писать код, принимая архитектурные решения за вас. Разделите: сначала Explore — «прочитай src/auth и объясни, как работают сессии». Потом Plan — «я хочу OAuth, какие файлы менять? составь план». И только потом — реализация по плану. Ключевой трюк: записывайте план в markdown-файл, а не полагайтесь на встроенное планирование. Файл переживёт сброс контекста, смену инструмента и передачу задачи коллеге.');
}

// ── SLIDE 12: Iterative Decomposition ───────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const cy = lightHeader(slide, 'Итеративная декомпозиция вместо монолитных промптов');
  const items = [
    { text: '❌ «Implement the entire auth system with OAuth, MFA, and password reset»', color: C.negative, dash: false },
    { text: '✅ Определить scope → итеративный цикл → ревью каждого шага', color: C.positive, dash: false },
    { text: '«Интервью» перед фичей: попроси AI задать вопросы о реализации', color: C.textLight, dash: true },
    { text: 'Результат интервью → спек-файл → новая сессия для реализации', color: C.textLight, dash: true },
    { text: '4 навыка: Instructing, Constraining, Providing context, Evaluating', color: C.textLight, dash: true },
  ];
  const rich = [];
  items.forEach((item, i) => {
    if (item.dash) rich.push({ text: '— ', options: { bold: true, color: C.accent, fontFace: FM, fontSize: BFS } });
    rich.push({ text: item.text, options: {
      color: item.color, fontFace: FM, fontSize: BFS,
      breakLine: i < items.length - 1, paraSpaceAfter: BPS,
    }});
  });
  slide.addText(rich, { x: ML, y: cy, w: W - 2 * ML, h: H - cy - ML, valign: 'top', margin: 0 });
  slide.addNotes('Для сложных задач монолитный промпт — это как дать джуниору ТЗ на 10 страниц и уйти на неделю. AI примет десятки архитектурных решений, с которыми вы бы не согласились. Вместо этого — «интервью»: попросите AI задать вам вопросы перед реализацией. «Какой OAuth-провайдер? Как хранить токены? Нужен ли refresh? Какие edge cases?» Запишите ответы в спек-файл — и дайте его новой сессии. Это кардинально меняет качество результата. Для мелких и локальных задач такой ceremony не обязателен.');
}

// ── SLIDE 13: TDD ────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const cy = lightHeader(slide, 'TDD с AI: заставить агента быть дисциплинированным');
  addBullets(slide, [
    'По умолчанию агент оптимизирует на закрытие задачи, а не на чистую TDD-дисциплину',
    'Стратегия 1: явное разделение — «Ты тестер. НЕ ПИШИ реализацию»',
    'Стратегия 2: принуждение через контекстный файл (TDD Rules)',
    'Стратегия 3: отдельные сессии для Red и Green фаз',
    'Самый ценный use case: «Сгенерируй 10 edge case тестов для этой функции»',
  ], cy);
  slide.addNotes('AI по умолчанию оптимизирует на завершение — ему «хочется» написать и тесты, и реализацию сразу. Тесты при этом получаются подогнанные под код, а не наоборот. Три рабочих подхода: явно запретить писать реализацию на первом шаге; прописать TDD-правила в контекстном файле; или физически разделить сессии — одна пишет тесты, другая пишет код. Но даже без полного TDD — попросите AI сгенерировать edge case тесты. Это то, в чём AI реально силён: он находит кейсы, о которых вы не подумали.');
}

// ── SLIDE 14: TDD Example (two vertical code blocks) ─────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const th = TH_CODE;
  slide.addText('В действии: TDD-сессия и план-файл', {
    x: ML, y: MT, w: W - 2 * ML, h: th,
    fontFace: FM, fontSize: TFS, bold: true, color: C.textLight, valign: 'top', margin: 0,
  });
  const ly = MT + th + 0.07;
  accentLine(slide, ML, ly, p(80));

  const descY = ly + ph(3) + 0.08;
  slide.addText('Конкретные промпты для TDD и структура план-файла, которые можно использовать завтра.', {
    x: ML, y: descY, w: W - 2 * ML, h: 0.28,
    fontFace: FM, fontSize: AFSS, color: C.textMuted, margin: 0,
  });

  const cy1 = descY + 0.28 + 0.1;
  const ch1  = 2.3;
  const codeFsSmall = CFS - 2;  // 14pt for dense two-block slides
  codeBlock(slide, ML, cy1, W - 2 * ML, ch1,
`# Шаг 1 — Red (тестер)
"Напиши failing тесты для rate limiter:
- 100 req/min, 429 после лимита, сброс через 60 сек
НЕ ПИШИ реализацию. Покажи output падающих тестов."
# Шаг 2 — Green
"Реализуй RateLimiter, чтобы пройти все тесты. Минимальная реализация."
# Шаг 3 — Refactor
"Тесты проходят. Рефактори, не ломая тесты."`, codeFsSmall);

  const cy2 = cy1 + ch1 + 0.12;
  const ch2  = 1.9;
  codeBlock(slide, ML, cy2, W - 2 * ML, ch2,
`# feature-rate-limiter.md
| #   | Задача                 | Статус | Комментарий       |
| 1.1 | Failing тесты          | done   | 6 тестов, red     |
| 1.2 | Реализация             | done   | Тесты green       |
| 1.3 | Рефакторинг            | wip    | Sliding window    |
## Лог: sliding window вместо fixed window`, codeFsSmall);

  const ay = cy2 + ch2 + 0.15;
  annotationList(slide, [
    'Чёткое разделение Red/Green/Refactor — AI получает одну роль за раз',
    'План-файл с нумерацией: «Сделай 1.3» — точная команда агенту',
    'Коммит после каждого успешного шага = точка отката',
  ], ay);
  slide.addNotes('Обратите внимание на план-файл. Нумерация задач позволяет давать точные команды: «Сделай 1.3, пропусти 1.4». Лог решений — бесценен при сбросе контекста или передаче задачи. И главное — коммит после каждого зелёного шага. Если AI поведёт код не туда — вы всегда можете откатиться. Без коммитов придётся начинать заново.');
}

// ── SLIDE 15: Section ────────────────────────────────────────
sectionSlide(
  'Масштабирование: от Writer к Orchestrator',
  'Самые ценные навыки — декомпозиция задач, курирование контекста и интеграция результатов.',
  ''
);

// ── SLIDE 16: MCP ────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const cy = lightHeader(slide, 'MCP: подключаем рабочее пространство');
  addBullets(slide, [
    'MCP — «USB-C для AI»: универсальный стандарт подключения инструментов',
    'MCP быстро стал стандартным способом подключать внешние инструменты',
    'GitHub, Playwright, Sentry, PostgreSQL, Jira, Figma — всё через MCP',
    'Сценарий: «Реализуй фичу из JIRA-тикета и создай PR» — одна команда',
    'Один и тот же подход переиспользуется в разных AI-инструментах',
  ], cy);
  slide.addNotes('MCP решает проблему M×N интеграций. Раньше каждый AI-инструмент писал свой коннектор к каждому сервису. Теперь один MCP-сервер для GitHub или Jira можно подключать в разных средах, снижая стоимость интеграции и переиспользуя один и тот же протокол. Реальный сценарий: вы говорите «реализуй фичу из JIRA-тикета ENG-4521, напиши тесты, открой PR на GitHub» — AI читает тикет через Jira MCP, пишет код, запускает тесты и создаёт PR через GitHub MCP. Важный нюанс: MCP-серверы от третьих лиц — потенциальный вектор для prompt injection, используйте только из доверенных источников.');
}

// ── SLIDE 17: Custom Commands ─────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const cy = lightHeader(slide, 'Кастомные команды и скиллы');
  addBullets(slide, [
    'Claude Code: slash commands, Cursor: notepads + custom modes, Copilot: reusable prompts',
    '/fix-issue — от тикета до PR за одну команду',
    '/review — проверка ветки перед пушем (безопасность, тесты, breaking changes)',
    '/component — новый React-компонент по конвенциям проекта',
    'Небольшой набор повторно используемых команд делает процессы проекта явными',
  ], cy);
  slide.addNotes('Кастомные команды превращают 20-шаговый workflow в одну команду. Но ещё важнее — они становятся живой документацией проекта. Новый разработчик видит набор команд и сразу понимает, как здесь работают: как создавать компоненты, как ревьюить код, как чинить баги. В отличие от обычной документации, команды не просто описывают процесс, а помогают его воспроизвести. Даже небольшой набор таких команд может заметно ускорить onboarding и сделать процессы проекта более явными.');
}

// ── SLIDE 18: Parallel Sessions ──────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const cy = lightHeader(slide, 'Параллельные сессии и паттерн Writer/Reviewer');
  addBullets(slide, [
    'Git worktrees: несколько рабочих директорий из одного репозитория',
    'Writer/Reviewer: свежая сессия ревьюит — ловит то, к чему «писатель» привык',
    'Writer/Tester: естественное TDD через разделение ролей',
    'Параллельная разработка: несколько задач из бэклога одновременно',
    'Требование: чёткие границы задач, непересекающиеся файлы',
  ], cy);
  slide.addNotes('Это следующий уровень — человек как оркестратор нескольких AI-сессий. Git worktrees дают изоляцию рабочего дерева, но не убирают необходимость думать об интеграции, конфликтах и порядке слияния. Паттерн Writer/Reviewer — один из самых практичных способов начать: сессия A пишет код, сессия B со свежим контекстом ревьюит. Свежий контекст ловит проблемы, к которым «писатель» уже привык. Но параллельные сессии работают только если задачи хорошо декомпозированы и мало пересекаются по файлам.');
}

// ── SLIDE 19: Antipatterns (comparison) ──────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const th = TH_CONTENT;
  slide.addText('Антипаттерны: 5 способов сделать AI бесполезным', {
    x: ML, y: MT, w: W - 2 * ML, h: th,
    fontFace: FM, fontSize: TFS, bold: true, color: C.textLight, valign: 'top', margin: 0,
  });
  const ly = MT + th + 0.07;
  accentLine(slide, ML, ly, p(80));
  const colY  = ly + ph(3) + 0.2;
  const colH  = H - colY - ML;
  const colGap = 0.35;
  const colW  = (W - 2 * ML - colGap) / 2;
  const CFS_COL = 21;
  const CPS_COL = 18;

  // Left: bad
  slide.addShape(pres.shapes.RECTANGLE, { x: ML, y: colY, w: colW, h: colH, fill: { color: 'FEF2F2' }, line: { color: 'FECACA', width: 1 } });
  slide.addText('❌  Антипаттерны', {
    x: ML + 0.2, y: colY + 0.18, w: colW - 0.4, h: 0.38,
    fontFace: FM, fontSize: 21, bold: true, color: C.negative, margin: 0,
  });
  const badRich = [];
  ['«fix the login bug» — без контекста',
   'Монолитный промпт на всю фичу',
   'Accept All без ревью',
   'Kitchen sink: мешать задачи в одной сессии',
   'Нет git-дисциплины, нет коммитов'].forEach((t, i, arr) => {
    badRich.push({ text: '❌  ', options: { color: C.negative, fontFace: FM, fontSize: CFS_COL, bold: true } });
    badRich.push({ text: t, options: { color: C.textLight, fontFace: FM, fontSize: CFS_COL, breakLine: i < arr.length - 1, paraSpaceAfter: CPS_COL } });
  });
  slide.addText(badRich, { x: ML + 0.2, y: colY + 0.65, w: colW - 0.4, h: colH - 0.8, valign: 'top', margin: 0 });

  // Separator
  slide.addShape(pres.shapes.RECTANGLE, {
    x: ML + colW + colGap / 2 - 0.01, y: colY, w: 0.02, h: colH,
    fill: { color: 'D0D8E0' }, line: { color: 'D0D8E0', width: 0 },
  });

  // Right: good
  const rx = ML + colW + colGap;
  slide.addShape(pres.shapes.RECTANGLE, { x: rx, y: colY, w: colW, h: colH, fill: { color: 'ECFDF5' }, line: { color: 'A7F3D0', width: 1 } });
  slide.addText('✅  Правильно', {
    x: rx + 0.2, y: colY + 0.18, w: colW - 0.4, h: 0.38,
    fontFace: FM, fontSize: 21, bold: true, color: C.positive, margin: 0,
  });
  const goodRich = [];
  ['Контекст + конкретика + ограничения',
   'Explore → Plan → Implement',
   'Тесты, верификация, ручная проверка',
   'Сброс контекста между задачами',
   'Коммит после каждого успешного шага'].forEach((t, i, arr) => {
    goodRich.push({ text: '✅  ', options: { color: C.positive, fontFace: FM, fontSize: CFS_COL, bold: true } });
    goodRich.push({ text: t, options: { color: C.textLight, fontFace: FM, fontSize: CFS_COL, breakLine: i < arr.length - 1, paraSpaceAfter: CPS_COL } });
  });
  slide.addText(goodRich, { x: rx + 0.2, y: colY + 0.65, w: colW - 0.4, h: colH - 0.8, valign: 'top', margin: 0 });

  slide.addNotes('Пройдёмся быстро. Первое: слишком общие промпты — AI «изобретает модель данных», когда не получает контекст. Второе: монолитные запросы — AI принимает десятки решений за вас. Третье: слепое принятие — одна из самых опасных ошибок и быстрый путь к ложному ощущению продуктивности. Код выглядит правдоподобно, но edge cases не обработаны. Четвёртое: мешать несвязанные задачи в одной сессии — контекст загрязняется, AI начинает «забывать». Пятое: не коммитить — когда AI поведёт код не туда, без точек отката придётся начинать с нуля.');
}

// ── SLIDE 20: Research Data ───────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const cy = lightHeader(slide, 'Что говорят данные');
  addBullets(slide, [
    'METR (2025): опытные devs на 19% медленнее с AI ¹',
    'Апдейт METR (2026): сигнал на ускорение, но с оговорками по выборке ²',
    'DORA 2025: AI «усиливает существующие сильные и слабые стороны» ³',
    'AI хорош для: boilerplate, тесты, документация, изолированные баги',
    'AI плох для: архитектура, кросс-модульные зависимости, доменная логика',
    'Вывод: инвестируйте в практики — AI даст мультипликативную отдачу',
  ], cy, H - cy - 0.7);
  addFootnotes(slide, [
    '¹ METR, «Measuring AI Impact on Experienced Developers», июль 2025',
    '² METR, «Developer Productivity Experiment Update», февраль 2026',
    '³ Google DORA Report 2025',
  ]);
  slide.addNotes('Вот это важно. METR провели рандомизированное контролируемое исследование — 16 опытных разработчиков, 246 реальных задач. Первый устойчивый результат: с AI на 19% медленнее. Причина: время на промпты, ожидание и ревью вывода AI превышало экономию. В апдейте 2026 появился сигнал на ускорение, но сами авторы отдельно оговаривают слабость сигнала и selection effects, поэтому подавать это как «новый окончательный итог» нельзя. Главный урок — не про конкретные цифры, а про принцип из DORA: AI усиливает то, что уже есть. Хорошие практики → кратная отдача. Плохие практики → кратный технический долг. Инвестируйте в тесты, ревью, CI/CD — и AI станет мультипликатором.');
}

// ── SLIDE 21: Action Items ────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  const th = TH_CONTENT;
  slide.addText('Что сделать в понедельник', {
    x: ML, y: MT, w: W - 2 * ML, h: th,
    fontFace: FM, fontSize: TFS, bold: true, color: C.textLight, valign: 'top', margin: 0,
  });
  const ly = MT + th + 0.07;
  accentLine(slide, ML, ly, p(80));

  const actions = [
    { text: 'Создать контекстный файл проекта (CLAUDE.md / .cursorrules)', time: '15 минут', color: C.positive },
    { text: 'Добавить deny rules или эквивалентные ограничения инструмента', time: '5 минут', color: C.positive },
    { text: 'Попробовать Plan Mode на следующей нетривиальной задаче', time: '30 минут', color: 'FBBF24' },
    { text: 'Оформить один повторяющийся workflow как кастомную команду', time: '30 минут', color: 'FBBF24' },
    { text: 'Подключить MCP-сервер (GitHub или Jira) и попробовать end-to-end сценарий', time: '1 час', color: C.negative },
  ];

  const startY  = ly + ph(3) + 0.18;
  const totalH  = H - startY - ML;
  const cardGap = 0.1;
  const cardH   = (totalH - 4 * cardGap) / 5;

  actions.forEach((action, i) => {
    const y = startY + i * (cardH + cardGap);
    slide.addShape(pres.shapes.RECTANGLE, { x: ML, y, w: W - 2 * ML, h: cardH, fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1 } });
    const circleSize = 0.2;
    slide.addShape(pres.shapes.OVAL, {
      x: ML + 0.2, y: y + (cardH - circleSize) / 2,
      w: circleSize, h: circleSize,
      fill: { color: action.color }, line: { color: action.color, width: 0 },
    });
    slide.addText(action.text, {
      x: ML + 0.52, y, w: W - 2 * ML - 0.52 - 1.5, h: cardH,
      fontFace: FM, fontSize: 22, color: C.textLight, valign: 'middle', margin: 0,
    });
    slide.addText(action.time, {
      x: W - ML - 1.4, y, w: 1.3, h: cardH,
      fontFace: FM, fontSize: 18, color: C.textMuted, align: 'right', valign: 'middle', margin: 0,
    });
  });

  slide.addNotes('Пять шагов, упорядоченных по усилию. Зелёные — можно сделать за обеденный перерыв: создать контекстный файл проекта и заблокировать опасные команды. Жёлтые — попробовать на следующей задаче: Plan Mode и кастомная команда. Красная — выделить час на настройку MCP. Каждый пункт — маленькая победа, которая сразу даёт результат. Не нужно делать всё за раз — начните с контекстного файла и deny rules, это займёт 20 минут и изменит каждую следующую сессию.');
}

// ── SLIDE 22: Finale ─────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  slide.addText('Вопросы?', {
    x: 0, y: H * 0.25, w: W, h: 1.1,
    fontFace: FM, fontSize: 64, bold: true,
    color: C.accent, align: 'center', valign: 'middle', margin: 0,
  });
  slide.addText('Ссылки и ресурсы — в QR-коде', {
    x: W * 0.2, y: H * 0.25 + 1.2, w: W * 0.6, h: 0.45,
    fontFace: FM, fontSize: 26, color: C.textDark, align: 'center', margin: 0,
  });

  const qrS = 1.8;
  const qrX = (W - qrS) / 2;
  const qrY = H * 0.25 + 1.8;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: qrX, y: qrY, w: qrS, h: qrS,
    fill: { color: C.bgDark }, line: { color: C.accent, width: 2 },
  });
  slide.addText('QR', {
    x: qrX, y: qrY, w: qrS, h: qrS,
    fontFace: FM, fontSize: 20, color: C.textMuted, align: 'center', valign: 'middle', margin: 0,
  });

  slide.addNotes('Спасибо. QR-код ведёт на страницу со всеми ссылками из доклада — исследования, примеры конфигураций, шаблоны контекстных файлов и план-файлов. Буду рад ответить на вопросы — и про конкретные настройки, и про workflow, и про то, что не вошло в доклад.');
}

// ── Save ──────────────────────────────────────────────────────
pres.writeFile({ fileName: '/Users/kirillivanov/Documents/Презентация/output/presentation_v1.2.pptx' })
  .then(() => console.log('Done: output/presentation_v1.2.pptx'))
  .catch(err => { console.error(err); process.exit(1); });
