# Дизайн-спецификация презентации

## Концепция
Чистый, современный корпоративный стиль с акцентом на читаемость и структурированность. Тёмные заголовочные слайды создают визуальный ритм с светлыми контентными. Минимум декора, максимум белого пространства — информация должна восприниматься за секунды при самостоятельном чтении.

## Цвета
| Роль              | HEX       | Использование                              |
|-------------------|-----------|--------------------------------------------|
| primary-dark      | #1B2A4A   | Фон title/section/divider слайдов          |
| primary-medium    | #2C4470   | Вторичный тёмный фон, градиенты            |
| accent            | #3B82F6   | Заголовки на светлом фоне, ссылки, акценты |
| accent-warm       | #F59E0B   | Предупреждения, warning-слайды, выделения  |
| accent-green      | #10B981   | Успех, подтверждение, позитивные маркеры   |
| accent-red        | #EF4444   | Ошибки, блокировки, запреты                |
| bg-light          | #F8FAFC   | Фон контентных слайдов                     |
| bg-white          | #FFFFFF   | Фон блоков, карточек                       |
| text-dark         | #1E293B   | Основной текст на светлом фоне             |
| text-medium       | #64748B   | Вторичный текст, подписи                   |
| text-light        | #F1F5F9   | Основной текст на тёмном фоне              |
| text-light-muted  | #94A3B8   | Подзаголовки на тёмном фоне                |
| bullet-marker     | #3B82F6   | Маркеры буллетов и нумерация               |
| border            | #E2E8F0   | Границы таблиц, разделители                |
| card-bg           | #FFFFFF   | Фон карточек на светлом слайде             |
| card-shadow       | #0000001A | Тень карточек (10% opacity)                |

## Типографика
| Элемент              | Шрифт          | Размер | Вес  | Цвет         |
|----------------------|----------------|--------|------|--------------|
| Title (тёмный фон)  | Inter          | 44pt   | 700  | text-light   |
| Title (светлый фон)  | Inter          | 36pt   | 700  | text-dark    |
| Section title        | Inter          | 52pt   | 800  | text-light   |
| Subtitle             | Inter          | 22pt   | 400  | text-light-muted / text-medium |
| Body/bullets         | Inter          | 18pt   | 400  | text-dark    |
| Body bold            | Inter          | 18pt   | 600  | text-dark    |
| Small text           | Inter          | 14pt   | 400  | text-medium  |
| Step number          | Inter          | 24pt   | 700  | accent       |
| Warning text         | Inter          | 18pt   | 500  | accent-warm  |
| Speaker notes        | Inter          | 12pt   | 300  | text-medium  |

## Геометрия слайда
- Размер: 16:9 (1920x1080 px / 25.4 x 14.29 cm)
- Поля: 80px слева/справа, 60px сверху/снизу
- Отступ заголовка от верха: 60px
- Отступ контента от заголовка: 48px
- Межстрочный интервал: 1.5
- Отступ между буллетами: 28px
- Радиус скругления карточек: 12px

## Лэйауты

### layout: title
- Фон: primary-dark (сплошной или с subtle градиентом к primary-medium в правый нижний)
- Заголовок: центр по горизонтали, верхняя треть по вертикали, 44pt/700
- Подзаголовок: под заголовком, 22pt/400, text-light-muted
- Докладчик и дата: нижняя часть слайда, 14pt, text-light-muted
- Декор: тонкая горизонтальная линия accent (2px) между заголовком и подзаголовком, ширина 200px, по центру

### layout: hook
- Фон: bg-light
- Заголовок: 36pt/700, text-dark, верхняя часть
- Контент: два визуальных блока «Раньше» и «Теперь» расположены горизонтально
- Блок «Раньше»: карточка с border accent-red (2px left border), фон white
- Блок «Теперь»: карточка с border accent-green (2px left border), фон white
- Стрелка между блоками: accent, →

### layout: agenda
- Фон: bg-light
- Заголовок: 36pt/700, text-dark, выравнивание по левому краю
- Пункты: нумерованный список, номер в accent (24pt/700), текст 18pt/400
- Каждый пункт — на отдельной строке с подписью (14pt, text-medium)
- Вертикальная линия accent (2px) слева от номеров, как progress indicator

### layout: section_divider
- Фон: primary-dark
- Заголовок: 52pt/800, text-light, центр по горизонтали, чуть выше центра по вертикали
- Тизер: 20pt/400, text-light-muted, под заголовком
- Декор: тонкая горизонтальная линия accent (2px), 120px ширина, между заголовком и тизером

### layout: concept
- Фон: bg-light
- Заголовок: 36pt/700, text-dark, верхняя часть
- Контент: буллеты с иконками-маркерами (кружки accent, 8px)
- Ключевые термины выделены bold (18pt/600)
- Англоязычные термины в скобках: 16pt/400, text-medium, italic

### layout: step_by_step
- Фон: bg-light
- Заголовок: 36pt/700, text-dark
- Шаги: нумерованный список в карточках
- Каждый шаг: карточка bg-white с тонкой границей border, внутри: номер (accent, 24pt/700) + текст (18pt/400)
- Шаги располагаются вертикально с отступом 16px между карточками
- Последний шаг или «Важно» — выделен accent-warm left border

### layout: example
- Фон: bg-light
- Заголовок: 36pt/700, text-dark
- Контент: разделён на секции (условие → результат)
- Секция «условие»: карточка с заголовком и параметрами
- Секция «результат»: карточка с accent-green left border, содержит итоговую таблицу/список
- Стрелка (→) между секциями

### layout: diagram
- Фон: bg-light
- Заголовок: 36pt/700, text-dark
- Диаграмма: центрирована, занимает ~60% площади слайда
- Используем цветовое кодирование уровней
- Текстовые подписи: 16pt/400
- Для пирамиды приоритетов: градиент от accent (верх) к text-medium (низ)

### layout: warning
- Фон: bg-light
- Заголовок: 36pt/700, text-dark
- Иконка предупреждения: accent-warm, слева от заголовка (треугольник с «!»)
- Контент: карточка с accent-warm left border (4px)
- Пример внутри: вложенная карточка bg-white с числами выделенными bold
- Слово «Правило» или рекомендация: accent-green border, отдельный блок внизу

### layout: summary
- Фон: bg-light (или gradient от bg-light к чуть голубоватому)
- Заголовок: 36pt/700, text-dark
- Пункты: 5 пронумерованных блоков
- Каждый блок: номер в accent circle (32px), текст 18pt/600 (bold первая часть) + 18pt/400

### layout: action
- Фон: primary-dark
- Заголовок: 44pt/700, text-light, верхняя часть
- Контент: checklist-стиль, каждый пункт с квадратным маркером (☐), text-light, 20pt
- Финальная строка: accent, 20pt/600, выделена

## Маппинг слайдов
| N  | Тип из outline    | Лэйаут         | Фон     |
|----|-------------------|-----------------|---------|
| 1  | title             | title           | dark    |
| 2  | hook              | hook            | light   |
| 3  | agenda            | agenda          | light   |
| 4  | section_divider   | section_divider | dark    |
| 5  | concept           | concept         | light   |
| 6  | concept           | concept         | light   |
| 7  | concept           | concept         | light   |
| 8  | concept           | concept         | light   |
| 9  | diagram           | diagram         | light   |
| 10 | section_divider   | section_divider | dark    |
| 11 | step_by_step      | step_by_step    | light   |
| 12 | step_by_step      | step_by_step    | light   |
| 13 | step_by_step      | step_by_step    | light   |
| 14 | example           | example         | light   |
| 15 | step_by_step      | step_by_step    | light   |
| 16 | step_by_step      | step_by_step    | light   |
| 17 | section_divider   | section_divider | dark    |
| 18 | concept           | concept         | light   |
| 19 | concept           | concept         | light   |
| 20 | warning           | warning         | light   |
| 21 | section_divider   | section_divider | dark    |
| 22 | diagram           | diagram         | light   |
| 23 | step_by_step      | step_by_step    | light   |
| 24 | example           | example         | light   |
| 25 | section_divider   | section_divider | dark    |
| 26 | concept           | concept         | light   |
| 27 | warning           | warning         | light   |
| 28 | summary           | summary         | light   |
| 29 | action            | action          | dark    |

## Декоративные элементы
- **Иконки:** Не использовать реальные иконки (сложно при программной генерации). Вместо них — цветные геометрические маркеры: кружки для буллетов, квадраты для чеклистов, линии для разделителей.
- **Номера шагов:** Крупные цифры в кружках accent цвета (контрастные на белом фоне).
- **Разделители:** Тонкие горизонтальные линии border (1px) между логическими блоками внутри слайда.
- **Тени карточек:** Мягкая тень card-shadow для блоков на светлом фоне (offset 0 4px, blur 12px).
- **Цветовые индикаторы:** Left-border на карточках (4px) для семантического выделения: accent = нейтральный, accent-green = позитивное, accent-warm = предупреждение, accent-red = запрет.

## Специальные указания для builder-агента
1. **Размер слайда:** Стандартный widescreen 16:9 (emu: 12192000 x 6858000)
2. **Шрифт Inter:** Если не доступен — fallback на Calibri (визуально похож, есть на всех ОС)
3. **Фон тёмных слайдов:** Сплошная заливка primary-dark (#1B2A4A), БЕЗ градиентов (для простоты генерации)
4. **Фон светлых слайдов:** Сплошная заливка bg-light (#F8FAFC)
5. **Карточки:** Реализовать как rounded rectangle shapes с заливкой white и тонкой границей border
6. **Left-border на карточках:** Реализовать как отдельный тонкий прямоугольник (shape) слева от карточки
7. **Буллеты:** Стандартные PowerPoint bullet lists с кастомным цветом маркера (accent)
8. **Speaker notes:** Добавлять как текст в notes pane каждого слайда
9. **Пирамида приоритетов (слайд 22):** Реализовать как 4 горизонтальных прямоугольника разной ширины (пирамида сверху вниз), каждый с текстом и цветовым кодированием
10. **Жизненный цикл (слайд 9):** Реализовать как 5 прямоугольников со стрелками между ними (горизонтальная flow-диаграмма)
11. **Не использовать placeholder-based layouts** — создавать все элементы программно через add_textbox, add_shape
12. **Кодировка текста:** UTF-8, весь текст на русском языке
