# Находки эксперта

## Подтверждённые сильные тезисы

- Слайд 5: Концепция «правило = identity + версии» и принцип «изменение = создание новой версии» точно соответствует каноническому определению: `new version` — "The correct business way to change an existing rule without mutating history" (rule-configuration-guide.md). PRD подтверждает через FR-05: "Treat edit as create-new-version rather than mutate-history."

- Слайд 6: Ограничения дефолтного правила (нельзя удалить, нельзя создать второе, нельзя привязать к селлеру или категории) полностью подтверждены. PRD FR-03 запрещает удаление и дублирование. Каноническое определение `untargeted default`: "The default rule must stay global rather than seller-targeted or category-targeted."

- Слайд 6: Тезис о complete custom rule — «все поля обязательны, наследования нет» — подтверждён через DR-04: "Custom rules must be fully specified and must not inherit missing outcome fields from the default rule." В PRD раздел "Explicitly Out of Scope" явно исключает partial inheritance.

- Слайд 9: Жизненный цикл DRAFT -> READY -> ACTIVE -> EXPIRED -> ARCHIVED точно воспроизводит терминологию из canonical/rule-configuration-guide.md (раздел Lifecycle Terms). Все пять состояний совпадают.

- Слайд 22: Пирамида приоритетов `seller-specific > category L4 > category L1 > default` дословно совпадает с каноническим определением `priority order` и PRD FR-20. Это ключевой тезис презентации и он абсолютно корректен.

- Слайд 22: Утверждение «два правила одного приоритета для одной ситуации = ошибка (блокируется)» подтверждено: `same-priority overlap` — "Two rules of the same priority would both match the same business case. This is invalid." PRD FR-24 требует блокировки вместо тихого выбора.

- Слайд 26: Все пять guardrails (immutable history, refund-safe replay, single default invariant, same-priority overlap, future-only changes) имеют прямое соответствие в каноническом документе (разделы Historical Safety Terms и Guardrail Terms).

- Слайд 14: Пример с «Электроникой» корректно демонстрирует приоритет L4 над L1. PRD DR-08 подтверждает: "Category specificity must be explicit, with L4 stronger than L1."

- Слайд 8: Утверждение что return handling fee — фиксированная сумма подтверждено каноническим определением: "A return-related fixed fee that may apply with the rule."

## Что требует оговорки

- Слайд 23: В описании параметров Preview перечислены «селлер, категория, цена, дата, fulfillment model», но отсутствует VAT-контекст.
- Почему: PRD FR-21 явно включает VAT context в параметры selection: "Evaluate seller, canonical category context, fulfilment, price, VAT context, and effective time during selection." VAT-контекст является полноценным measurement при выборе правила.
- Как безопаснее сформулировать: Добавить «VAT-контекст» в список параметров Preview на Слайде 23 (шаг 2): «селлер, категория, цена, дата, fulfillment model, VAT-контекст».

- Слайд 8 и Слайд 19: Marketing fee описан как «процент от базовой цены (например, 3%)».
- Почему: Каноническое определение говорит только: "An additional marketing-related fee that may apply with the rule" — формат (процент vs фиксированная сумма) не специфицирован в каноническом документе. PRD FR-17 тоже не уточняет формат: "The payload must support commission type and value, fulfilment fee, marketing fee, and return handling fee."
- Как безопаснее сформулировать: «Marketing fee — маркетинговый сбор (например, 3% от цены)» — сохранить пример, но убрать категоричное утверждение что это всегда процент. Или проверить с командой разработки текущую реализацию.

- Слайд 9: Переход Withdraw описан как «READY -> DRAFT (если ещё не активировалось)».
- Почему: Каноническое определение withdraw: "The lifecycle action that pulls a submitted future version back out of business use when allowed." Подтверждается что withdraw работает на submitted future versions, но целевое состояние (именно DRAFT) не зафиксировано явно в каноническом документе. Это может быть деталью реализации.
- Как безопаснее сформулировать: «Withdraw: READY -> возврат к редактированию (если версия ещё не вступила в силу)» — без указания конкретного целевого статуса, либо подтвердить с командой что target state действительно DRAFT.

- Слайд 11: «Submit -> правило проходит валидацию -> становится ACTIVE» — упрощение.
- Почему: Каноническое определение submit: "The lifecycle action that moves a validated version into business use, either immediately or for a future launch." Т.е. submit может привести и к READY (если effective_from в будущем), и к ACTIVE (если сегодня или раньше). На Слайде 9 это корректно показано (DRAFT -> READY/ACTIVE), но на Слайде 11 в инструкции для дефолтного правила указано только ACTIVE.
- Как безопаснее сформулировать: Допустимое упрощение для дефолтного правила (которое обычно активируется немедленно при bootstrap), но стоит добавить оговорку или ссылку на Слайд 9, где показаны оба варианта.

- Слайд 19: «Fulfillment fee обычно актуален для FBO-товаров» (в заметках спикера).
- Почему: Каноническое определение: "The fulfillment-side fee attached to the matched rule" — без ограничения по типу фулфилмента. Fulfillment applicability (FBO/DBS) — это dimension scope правила, а не характеристика конкретного типа fee. Правило с fulfillment fee может применяться и к DBS.
- Как безопаснее сформулировать: «Fulfillment fee — сбор за логистику, который задаётся в правиле независимо от fulfillment applicability scope» или просто убрать привязку к FBO из заметок.

## Возможные неточности

- Слайд 14: В примере подразумевается, что при наличии L4-правила для «Смартфонов» система не применяет L1-правило «Электроника» к смартфонам. Это корректно по приоритету (L4 > L1). Однако пример не упоминает механизм excluded categories и может создать впечатление, что excluded categories не нужны при наличии отдельных L4-правил.
- Что вызывает сомнение: Каноническая документация (PRD DR-08) утверждает: "exclusions removing matches before final resolution". Т.е. exclusions работают на этапе ДО приоритизации, а L4 vs L1 — это уже вопрос приоритета. Это два разных механизма. Без excluded categories L1-правило остаётся кандидатом (просто проигрывает L4), а с excluded categories оно вообще не рассматривается для данной подкатегории.
- Рекомендация: В заметках спикера Слайда 14 есть правильное пояснение об excluded categories. Рекомендую сделать его чуть заметнее на самом слайде — добавить примечание: «Здесь excluded categories не нужны, потому что отдельные L4-правила побеждают по приоритету. Excluded categories используются когда нужно чтобы для подкатегории сработал fallback (дефолтное правило), а не родительское L1.»

- Слайд 27: Не упомянут guardrail `category path unresolved`.
- Что вызывает сомнение: Каноническая документация перечисляет 6 guardrails, включая `category path unresolved` — "The system cannot confidently resolve the category path needed for targeting or preview." Презентация упоминает только 4 ошибки валидации.
- Рекомендация: Это не критическая неточность для целевой аудитории (менеджеры), т.к. category path unresolved — скорее системная проблема, чем ошибка пользователя. Но если стремиться к полноте, можно добавить пятый пункт: «Категория не распознана — обратитесь к команде продукта для уточнения каталога категорий.»

- Слайд 27: Не упомянут guardrail `untargeted default` как отдельная ошибка валидации.
- Что вызывает сомнение: Каноническая документация выделяет `untargeted default` ("The default rule must stay global rather than seller-targeted or category-targeted") как отдельный guardrail. Если менеджер попытается добавить seller assignment к дефолтному правилу — система должна заблокировать.
- Рекомендация: Эта ситуация частично покрыта Слайдом 6 (ограничения дефолтного правила), но не представлена как ошибка валидации на Слайде 27. Рассмотреть добавление: «Попытка привязать дефолтное правило к селлеру или категории — дефолтное должно оставаться глобальным.»

## Источники

- `canonical/rule-configuration-guide.md` — основной источник терминологии, определений scope, outcome, lifecycle, priority, guardrails
- `canonical/prd.md` — функциональные требования (FR-01 через FR-37), доменные требования (DR-01 через DR-10), нефункциональные требования, user journeys, product decisions
