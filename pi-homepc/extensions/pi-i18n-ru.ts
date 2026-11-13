/**
 * pi-i18n-ru.ts — Русификация TUI pi (pi.dev) на русском языке.
 *
 * Как работает
 * ------------
 * 1. Патчит `Theme.prototype.fg/bold/italic/underline/inverse` (пи-TUI): все
 *    строки, проходящие через тему (заголовки диалогов, подписи, статусы),
 *    прогоняются через словарь RUS.
 * 2. Патчит `pi.registerTool`: описания инструментов и аргументов для TUI.
 * 3. Патчит `pi.registerCommand`: описания slash-команд (автодополнение).
 * 4. Патчит `KeybindingsManager.prototype.create`: описания хоткеев.
 * 5. Патчит `process.stdout.write`: финальная страховка — переводит строки,
 *    которые не прошли через тему (hint-строки редактора, статусы).
 *
 * Словари RUS / RUS_PARTIAL ниже — и есть «файл русификации». Правь в
 * ОДНОМ месте — в источнике пакета:
 *
 *   A:\PROJECTS\pi-homepc\extensions\pi-i18n-ru.ts   <- ИСТИННЫЙ ИСТОЧНИК
 *   A:\PROJECTS\pi-dev\pi-homepc\extensions\pi-i18n-ru.ts  (git-копия)
 *   C:\Users\HOME-PC\.pi\agent\extensions\pi-i18n-ru.ts    (активная копия)
 *
 * После `pi update` просто скопируй свежий словарь из этого файла в
 * C:\Users\HOME-PC\.pi\agent\extensions\ (пакет pi-homepc не дистрибутирует
 * его как npm-пакет). Словарь переживает обновления: ключи — английские
 * строки ядра, они стабильны между версиями.
 *
 * Индикатор: строка `[RU] i18n-ru активен` в статус-баре (pi.setStatus).
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// ---------------------------------------------------------------------------
// СЛОВАРЬ: английская строка -> русская (точное совпадение)
// ---------------------------------------------------------------------------
const RUS: Record<string, string> = {
	// === Заголовки и диалоги ===
	"What's New": "Что нового",
	"Extension Updates": "Обновления расширений",
	"Package Updates Available": "Доступны обновления пакетов",
	"Update Available": "Доступно обновление",
	"Session Info": "Информация о сессии",
	"Rename Session": "Переименовать сессию",
	"Resume Session (All)": "Возобновить сессию (все)",
	"Resume Session (Current Folder)": "Возобновить сессию (текущая папка)",
	"Fork from Message": "Ветвление от сообщения",
	"Import session": "Импорт сессии",
	"Import Session": "Импорт сессии",
	"Keyboard Shortcuts": "Горячие клавиши",
	"Select authentication method:": "Выберите способ авторизации:",
	"Select provider to configure:": "Выберите провайдера для настройки:",
	"Select provider to logout:": "Выберите провайдера для выхода:",
	"Sign in with an API key": "Вход по API-ключу",
	"Sign in with an account": "Вход по аккаунту",
	"Sign in with Radius": "Вход через Radius",
	"Log in to a provider or configure an API key first": "Сначала войдите в провайдера или укажите API-ключ",
	"Authentication": "Авторизация",
	"Model Configuration": "Настройка модели",
	"Thinking Level": "Уровень мышления",
	"Project trust": "Доверие к проекту",
	"Project settings": "Настройки проекта",
	"User settings": "Пользовательские настройки",
	"Global Resources": "Глобальные ресурсы",
	"Project Local Resources": "Локальные ресурсы проекта",
	"Built-in": "Встроенные",
	"Built-in (project override)": "Встроенные (переопределение проекта)",
	"Current folder": "Текущая папка",
	"◉ Current Folder": "◉ Текущая папка",
	"○ Current Folder | ": "○ Текущая папка | ",
	"◉ All": "◉ Все",
	"Session deleted": "Сессия удалена",
	"Session moved to trash": "Сессия перемещена в корзину",
	"Cannot delete the currently active session": "Нельзя удалить активную сессию",
	"Pick a theme.": "Выберите тему.",
	"Automatic Theme": "Автоматическая тема",
	"System (matches your terminal colors)": "Системная (цвета вашего терминала)",
	"Dark theme": "Тёмная тема",
	"Light theme": "Светлая тема",
	"Dark": "Тёмная",
	"Light": "Светлая",
	"Theme created from your terminal's colors": "Тема, созданная из цветов вашего терминала",
	"Choose themes for terminal light and dark appearance.": "Выберите темы для светлого и тёмного оформления терминала.",
	"Light/dark detection requires terminal support.": "Определение светлого/тёмного требует поддержки терминала.",
	"Select a theme, or choose automatic to follow terminal appearance.": "Выберите тему или «автоматически» для следования оформлению терминала.",
	"Select the theme to use for dark terminal appearance": "Тема для тёмного оформления терминала",
	"Select the theme to use for light terminal appearance": "Тема для светлого оформления терминала",
	"Save and go back": "Сохранить и вернуться",
	"Switch to one theme for light and dark": "Одна тема для светлого и тёмного",
	"Use separate themes for light and dark terminal appearance": "Раздельные темы для светлого и тёмного терминала",
	"Theme to use in automatic mode when the terminal is dark": "Тема в авто-режиме для тёмного терминала",
	"Theme to use in automatic mode when the terminal is light": "Тема в авто-режиме для светлого терминала",
	"Color theme for the interface": "Цветовая тема интерфейса",
	"Select a model to configure": "Выберите модель для настройки",
	"Select default thinking level for this model": "Модель мышления по умолчанию для этой модели",
	"No models available": "Нет доступных моделей",
	"No providers available": "Нет доступных провайдеров",
	"No matching providers": "Нет подходящих провайдеров",
	"No API key providers available.": "Нет провайдеров с API-ключом.",
	"No account providers available.": "Нет провайдеров с аккаунтом.",
	"No login methods available.": "Нет способов входа.",
	"No login providers available.": "Нет провайдеров для входа.",
	"Model catalogs refreshed.": "Каталоги моделей обновлены.",
	"Model refresh timed out; showing cached models.": "Тайм-аут обновления моделей; показаны кэшированные модели.",
	"Model refresh timed out; searching cached models.": "Тайм-аут обновления моделей; поиск по кэшированным.",
	"Only showing models from configured providers. Use /login to add providers.": "Показаны только модели настроенных провайдеров. /login — добавить провайдера.",
	"Model selection saved to settings": "Выбор модели сохранён в настройках",
	"Model unavailable": "Модель недоступна",
	"Only one model available": "Доступна только одна модель",
	"Only one model in scope": "В скоупе только одна модель",
	"Current model does not support thinking": "Текущая модель не поддерживает мышление",
	"Waiting for authentication...": "Ожидание авторизации...",
	"Login cancelled": "Вход отменён",
	"Import cancelled": "Импорт отменён",
	"Resume cancelled": "Возобновление отменено",
	"Navigation cancelled": "Навигация отменена",
	"Compaction cancelled": "Сжатие отменено",
	"Auto-compaction cancelled": "Авто-сжатие отменено",
	"Branch summarization cancelled": "Суммаризация ветки отменена",
	"Retry cancelled": "Повтор отменён",
	"Nothing to clone yet": "Пока нечего клонировать",
	"Cloned to new session": "Склонировано в новую сессию",
	"Forked to new session": "Ветвление в новую сессию",
	"Resumed session": "Сессия восстановлена",
	"Navigated to selected point": "Переход к выбранной точке",
	"Already at this point": "Уже в этой точке",
	"No entries in session": "Нет записей в сессии",
	"No messages to fork from": "Нет сообщений для ветвления",
	"No queued messages to restore": "Нет ожидающих сообщений",
	"No summary": "Нет саммари",
	"No content to summarize": "Нет контента для саммари",
	"No summary generated": "Саммари не сгенерировано",
	"No changelog entries found.": "Записи changelog не найдены.",
	"No agent messages to copy yet.": "Сообщений агента пока нет.",
	"Selected entry has no text to copy": "В выбранной записи нет текста для копирования",
	"Copied last agent message to clipboard": "Последнее сообщение агента скопировано",
	"Copied selected message to clipboard": "Выбранное сообщение скопировано",
	"Code copied to clipboard": "Код скопирован в буфер",
	"Copied URL to clipboard": "URL скопирован в буфер",
	"Copy code manually": "Скопируйте код вручную",
	"Copying code...": "Копирование кода...",
	"Browser open requested": "Запрос открытия браузера",
	"Queued message for after compaction": "Сообщение поставлено в очередь после сжатия",
	"Context overflow detected, ": "Обнаружен переполнение контекста, ",
	"Completed compaction is missing from the session context": "Завершённое сжатие отсутствует в контексте сессии",
	"Startup is still in progress": "Запуск ещё идёт",
	"Close active overlays before changing TUI mode": "Закройте активные оверлеи перед сменой режима TUI",
	"Fullscreen layout is not initialized": "Полноэкранный режим не инициализирован",
	"Suspend to background is not supported on Windows": "Приостановка в фон не поддерживается на Windows",
	"Clipboard file path contains control characters": "Путь к файлу в буфере содержит управляющие символы",
	"A bash command is already running. Press Esc to cancel it first.": "Bash-команда уже выполняется. Сначала отмените её (Esc).",
	"Operation aborted": "Операция прервана",
	"Request was aborted": "Запрос прерван",
	"Response was truncated before completion.": "Ответ был усечён до завершения.",
	"Unknown error": "Неизвестная ошибка",
	"Unknown error occurred": "Произошла неизвестная ошибка",
	"Empty regex": "Пустой regex",
	"Failed to create session": "Не удалось создать сессию",
	"Failed to fork session": "Не удалось выполнить ветвление",
	"Failed to import session": "Не удалось импортировать сессию",
	"Failed to resume session": "Не удалось возобновить сессию",
	"Custom summarization instructions": "Пользовательские инструкции саммари",
	"Summarize (cmd)": "Саммари",
	"Summarize branch?": "Суммаризировать ветку?",
	"Summarize with custom prompt": "Саммари с пользовательским промптом",
	"Branch summary": "Саммари ветки",
	"To resume this session:": "Для возобновления этой сессии:",
	"Read the blog post:": "Прочитать блог-пост:",
	"Opt-in to anonymous usage data sharing?": "Отправить анонимные данные о использовании?",
	"Share anonymous usage data": "Анонимные данные о использовании",
	"Install telemetry": "Установить телеметрию",
	"Reloaded keybindings, extensions, skills, prompts, themes, and context files": "Перезагружены: клавиши, расширения, скиллы, промты, темы, контекстные файлы",
	"Reloaded keybindings, extensions, skills, prompts, themes, and context files; saved project trust": "Перезагружены: клавиши, расширения, скиллы, промты, темы, контекстные файлы; доверие проекта сохранено",
	"Reloading keybindings, extensions, skills, prompts, themes, and context files...": "Перезагрузка: клавиши, расширения, скиллы, промты, темы, контекстные файлы...",
	"Cache miss": "Пропуск кэша",
	"Cache miss after model switch": "Пропуск кэша после смены модели",
	"Package updates are available. Run ": "Доступны обновления пакетов. Выполните ",
	"Radius is a service crafted for Pi by the builders of Pi, Earendil Works": "Radius — сервис для Pi от создателей Pi, Earendil Works",

	// === Статусы ===
	"Thinking...": "Думаю...",
	"Working": "Работаю",
	"Idle": "Ожидание",
	"Compaction": "Сжатие",
	"Error": "Ошибка",
	"Warning": "Предупреждение",
	"aborted": "прервано",
	"cancelled": "отменено",
	"complete": "завершено",
	"running": "выполняется",
	"updated": "обновлено",
	"no results": "ничего не найдено",

	// === Подписи-один-слово (селекторы, футер) ===
	"All": "Все",
	"Named": "Именованные",
	"Recent": "Недавние",
	"Threaded": "По веткам",
	"Fuzzy": "Размытый",
	"Apply": "Применить",
	"Ask": "Спросить",
	"Always trust": "Всегда доверять",
	"Never trust": "Никогда не доверять",
	"Do not trust": "Не доверять",
	"Summarize": "Саммари",
	"Messages": "Сообщения",
	"Context": "Контекст",
	"Cost": "Стоимость",
	"Tokens": "Токены",
	"Input": "Ввод",
	"Output": "Выход",
	"Theme": "Тема",
	"Themes": "Темы",
	"Prompts": "Промты",
	"Skills": "Скиллы",
	"Extensions": "Расширения",
	"Transport": "Транспорт",
	"Total:": "Итого:",
	"Status:": "Статус:",
	"Mode:": "Режим:",
	"Scope: ": "Скоуп: ",
	"Sort: ": "Сортировка: ",
	"Name: ": "Имя: ",
	"ID:": "ID:",
	"File:": "Файл:",
	"User:": "Пользователь:",
	"Assistant:": "Ассистент:",
	"Tools:": "Инструменты:",
	"See:": "См.:",
	"Changelog: ": "Changelog: ",
	"Packages:": "Пакеты:",
	"Type to search:": "Введите для поиска:",
	"Label (empty to remove):": "Метка (пусто — удалить):",
	"Yes": "Да",
	"No": "Нет",
	"OK": "ОК",
	"Cancel": "Отмена",

	// === Настройки (/settings) ===
	"Action when pressing Escape twice with empty editor": "Действие при двойном Esc с пустым редактором",
	"Double-escape action": "Действие двойного Esc",
	"Default project trust": "Доверие к проекту по умолчанию",
	"Default thinking level per model": "Уровень мышления по умолчанию для моделей",
	"Per-Model Thinking Level": "Уровень мышления по моделям",
	"Editor padding": "Отступ редактора",
	"Horizontal padding for input editor (0-3)": "Горизонтальный отступ редактора (0-3)",
	"Output padding": "Отступ вывода",
	"Horizontal padding for messages, tool output, and command output": "Горизонтальный отступ сообщений и вывода инструментов",
	"Image width": "Ширина изображений",
	"Preferred inline image width in terminal cells": "Ширина inline-изображений в ячейках терминала",
	"Auto-resize images": "Авто-ресайз изображений",
	"Resize large images to 2000x2000 max for better model compatibility": "Ресайз больших изображений до 2000x2000 для совместимости",
	"Show images": "Показывать изображения",
	"Render images inline in terminal": "Рендер изображений inline в терминале",
	"Show images inline in terminal": "Показывать изображения inline в терминале",
	"Block images": "Блокировать изображения",
	"Prevent images from being sent to LLM providers": "Не отправлять изображения в LLM-провайдеры",
	"Show text placeholder instead": "Показывать текстовый плейсхолдер",
	"Autocomplete max items": "Максимум элементов автодополнения",
	"Max visible items in autocomplete dropdown (3-20)": "Максимум видимых элементов автодополнения (3-20)",
	"Auto-compact": "Авто-сжатие",
	"Automatically compact context when it gets too large": "Автоматически сжимать контекст при переполнении",
	"Hide thinking": "Скрывать мышление",
	"Hide thinking blocks in assistant responses": "Скрывать блоки мышления в ответах ассистента",
	"Terminal progress": "Прогресс в терминале",
	"Show OSC 9;4 progress indicators in the terminal tab bar": "Индикаторы прогресса OSC 9;4 в вкладке терминала",
	"Clear on shrink": "Очистка при сжатии",
	"Clear empty rows when content shrinks (may cause flicker)": "Очистка пустых строк при уменьшении контента (может мигать)",
	"Show hardware cursor": "Аппаратный курсор",
	"Use the terminal cursor instead of Pi's drawn cursor": "Курсор терминала вместо нарисованного",
	"Show condensed changelog after updates": "Сокращённый changelog после обновлений",
	"Collapse changelog": "Сворачивать changelog",
	"Quiet startup": "Тихий запуск",
	"Disable verbose printing at startup (header: keep only the startup header)": "Без подробного вывода при старте (только заголовок)",
	"Mermaid diagrams": "Диаграммы Mermaid",
	"Render Mermaid code blocks as Unicode diagrams": "Рендер Mermaid-блоков как Unicode-диаграммы",
	"Skill commands": "Команды скиллов",
	"Register skills as /skill:name commands": "Скиллы как команды /skill:name",
	"TUI mode": "Режим TUI",
	"Interface layout; regular mode uses the terminal's normal scrollback": "Раскладка интерфейса; обычный режим — обычный скроллбэк терминала",
	"Fullscreen scrollbar": "Скроллбар в полноэкранном режиме",
	"Scrollbar behavior in fullscreen mode; has no effect in regular mode": "Скроллбар в полноэкранном режиме; в обычном не действует",
	"Fullscreen wheel scrolling": "Колесо мыши в полноэкранном режиме",
	"Lines per mouse-wheel event in fullscreen mode; 'auto' speeds up fast wheel spins where the terminal does not": "Строк на событие колеса в полноэкранном режиме; 'auto' ускоряет быстрое вращение",
	"Fullscreen copy on select": "Копирование при выделении (полноэкранный)",
	"Automatically copy selected text in fullscreen mode; disable to copy selections with Ctrl+X": "Автокопирование выделенного в полноэкранном режиме; Ctrl+X — вручную",
	"Fullscreen exit output": "Вывод при выходе из полноэкранного",
	"Print the transcript or only a session resume hint when exiting fullscreen mode": "Транскрипт или только подсказка возобновления при выходе",
	"Tree filter mode": "Режим фильтра дерева",
	"Default filter when opening /tree": "Фильтр по умолчанию при открытии /tree",
	"Steering mode": "Режим управления",
	"Enter while streaming queues steering messages. 'one-at-a-time': deliver one, wait for response. 'all': deliver all at once.": "Enter во время стриминга ставит сообщения в очередь. 'one-at-a-time': по одному; 'all': все сразу.",
	"Follow-up mode": "Режим follow-up",
	"Change mode": "Сменить режим",
	"Session share destination": "Адрес шаринга сессий",
	"Where to upload sessions with /share (auto prefers Radius when authenticated, otherwise GitHub Gist)": "Куда /share загружает сессии (auto: Radius при авторизации, иначе GitHub Gist)",
	"Cache warming": "Прогрев кэша",
	"off; streaming while the agent runs; idle also between runs while continuation stays profitable": "off; стриминг во время работы агента; idle — между запусками, пока продолжение остаётся выгодным",
	"(clear override)": "(сбросить override)",
	"  automatic": "  автоматический",
	"Cache miss notices": "Уведомления о пропусках кэша",
	"Show transcript notices for cache costs and provider recovery diagnostics": "Заметки о стоимости кэша и диагностике восстановления",
	"Anthropic extra usage": "Доп. использование Anthropic",
	"Warn when Anthropic subscription auth may use paid extra usage": "Предупреждать о платном доп. использовании Anthropic",
	"Enable or disable individual warnings": "Включать/выключать отдельные предупреждения",
	"Warnings": "Предупреждения",
	"Fallback behavior when no extension or saved trust decision decides project trust": "Поведение, если расширение и сохранённое решение не определяют доверие",
	"HTTP idle timeout": "HTTP idle-тайм-аут",
	"Maximum idle gap while waiting for HTTP headers or body chunks. Disable for local models that pause longer than five minutes.": "Макс. пауза ожидания HTTP-заголовков/чанков. Для локальных моделей, паузящих >5 мин, отключите.",
	"Preferred transport for providers that support multiple transports": "Предпочтительный транспорт для провайдеров с несколькими",

	// === Уровни мышления ===
	"No reasoning": "Без мышления",
	"Very brief reasoning (~1k tokens)": "Очень короткое мышление (~1k токенов)",
	"Light reasoning (~2k tokens)": "Лёгкое мышление (~2k токенов)",
	"Moderate reasoning (~8k tokens)": "Среднее мышление (~8k токенов)",
	"Deep reasoning (~16k tokens)": "Глубокое мышление (~16k токенов)",
	"Extra-high reasoning (~32k tokens)": "Очень высокое мышление (~32k токенов)",
	"Maximum reasoning": "Максимальное мышление",

	// === Инструменты (описания и аргументы) ===
	"Read file contents": "Чтение содержимого файла",
	"Path to the file to read (relative or absolute)": "Путь к файлу (относительный или абсолютный)",
	"Line number to start reading from (1-indexed)": "Номер строки для начала чтения (с 1)",
	"Maximum number of lines to read": "Максимум строк для чтения",
	"Use read to examine files instead of cat or sed.": "Используйте read для просмотра файлов, а не cat или sed.",
	"Execute bash commands (ls, grep, find, etc.)": "Выполнение bash-команд (ls, grep, find и т.д.)",
	"Shell command to execute": "Shell-команда для выполнения",
	"Combined stdout and stderr, possibly truncated": "Совмещённый stdout и stderr, возможно усечён",
	"Full output, when truncated": "Полный вывод (при усечении)",
	"Timeout in seconds (optional, no default timeout)": "Тайм-аут в секундах (опционально)",
	"Invalid timeout: must be a finite number of seconds": "Неверный тайм-аут: нужно конечное число секунд",
	"Command aborted": "Команда прервана",
	"Command terminated without an exit code": "Команда завершилась без кода выхода",
	"You can inspect PI_* environment variables for current model and session details.": "Доступны переменные окружения PI_* с деталями текущей модели и сессии.",
	"Execute PowerShell commands": "Выполнение PowerShell-команд",
	"Create or overwrite files": "Создание или перезапись файлов",
	"Content to write to the file": "Содержимое для записи в файл",
	"Path to the file to write (relative or absolute)": "Путь к файлу для записи",
	"Use write only for new files or complete rewrites.": "write — только для новых файлов или полной перезаписи.",
	"Make precise file edits with exact text replacement, including multiple disjoint edits in one call": "Точные правки файла с заменой текста, включая несколько непересекающихся правок за один вызов",
	"Path to the file to edit (relative or absolute)": "Путь к файлу для правки",
	"Replacement text for this targeted edit.": "Текст замены для этой правки.",
	"Use edit for targeted changes. Batch changes to one file in a single call.": "edit — точечные правки. Несколько правок одного файла — за один вызов.",
	"Find files by glob pattern (respects .gitignore)": "Поиск файлов по glob-шаблону (учитывает .gitignore)",
	"Glob pattern to match files, e.g. '*.ts', '**/*.json', or 'src/**/*.spec.ts'": "Glob-шаблон, напр. '*.ts', '**/*.json', 'src/**/*.spec.ts'",
	"Search file contents for patterns (respects .gitignore)": "Поиск содержимого файлов по шаблону (учитывает .gitignore)",
	"Search pattern (regex or literal string)": "Шаблон поиска (regex или литерал)",
	"List directory contents": "Список содержимого каталога",
	"Operation aborted (tool)": "Операция прервана (инструмент)",
	"No files found matching pattern": "Файлы по шаблону не найдены",
	"No matches found": "Совпадений не найдено",
	"Elapsed": "Затрачено",
	"Took": "Заняло",
	"some lines truncated": "часть строк усечена",
	"to expand": "развернуть",
	"to collapse": "свернуть",

	// === Slash-команды (BUILTIN_SLASH_COMMANDS) ===
	"Open settings menu": "Открыть меню настроек",
	"Select model (opens selector UI)": "Выбрать модель (открывает селектор)",
	"Navigate session tree (switch branches)": "Дерево сессии (переключение веток)",
	"Set thinking level": "Задать уровень мышления",
	"Enable/disable models for Ctrl+P cycling": "Вкл/выкл модели для цикла Ctrl+P",
	"Export session (HTML default, or specify path: .html/.jsonl)": "Экспорт сессии (по умолчанию HTML, или путь: .html/.jsonl)",
	"Import a JSONL session, preserving its ID and working directory": "Импорт JSONL-сессии с сохранением ID и рабочей папки",
	"Share session via a Radius artifact or a GitHub gist": "Шаринг сессии через Radius или GitHub gist",
	"Report a bug to the Pi developers": "Сообщить об ошибке разработчикам Pi",
	"Copy last agent message to clipboard": "Копировать последнее сообщение агента",
	"Set session display name": "Задать имя сессии",
	"Show session info and stats": "Информация и статистика сессии",
	"Show changelog entries": "Показать записи changelog",
	"Show all keyboard shortcuts": "Показать все горячие клавиши",
	"Create a new fork from a previous user message": "Новое ветвление от предыдущего сообщения",
	"Duplicate the current session at the current position": "Дублировать сессию в текущей позиции",
	"Save project trust decision for future sessions": "Сохранить решение о доверии проекта",
	"Configure provider authentication": "Настроить авторизацию провайдера",
	"Remove provider authentication": "Убрать авторизацию провайдера",
	"Start a new session (cmd)": "Новая сессия",
	"Manually compact the session context": "Ручное сжатие контекста сессии",
	"Resume another session": "Возобновить другую сессию",
	"Reload keybindings, extensions, skills, prompts, themes, and context files": "Перезагрузка клавиш, расширений, скиллов, промтов, тем, контекстных файлов",

	// === Хоткеи (keybindings) ===
	"Cancel or abort": "Отмена / прерывание",
	"Clear editor": "Очистить редактор",
	"Exit when editor is empty": "Выход при пустом редакторе",
	"Suspend to background": "Приостановить в фон",
	"Cycle thinking level": "Цикл уровня мышления",
	"Cycle to next model": "Следующая модель",
	"Cycle to previous model": "Предыдущая модель",
	"Select model": "Выбрать модель",
	"Open model selector": "Открыть селектор моделей",
	"Toggle thinking blocks": "Показать/скрыть блоки мышления",
	"Toggle tool output (cmd)": "Показать/скрыть вывод инструментов",
	"Open external editor": "Открыть внешний редактор",
	"Copy selection or last assistant message": "Копировать выделение или последнее сообщение",
	"Queue follow-up message": "Поставить follow-up в очередь",
	"Restore queued messages": "Восстановить ожидающие сообщения",
	"Fork current session": "Ветвление текущей сессии",
	"Start a new session": "Новая сессия",
	"Resume a session": "Возобновить сессию",
	"Open session tree": "Открыть дерево сессии",
	"Delete session": "Удалить сессию",
	"Delete session when query is empty": "Удалить сессию (пустой запрос)",
	"Rename session": "Переименовать сессию",
	"Toggle named session filter": "Фильтр именованных сессий",
	"Toggle session path display": "Показывать пути сессий",
	"Toggle session sort mode": "Сменить сортировку сессий",
	"Save model selection": "Сохранить выбор модели",
	"Save thinking level": "Сохранить уровень мышления",
	"Clear all models": "Очистить все модели",
	"Enable all models": "Включить все модели",
	"Toggle all models for provider": "Все модели провайдера",
	"Move model down in order": "Модель ниже",
	"Move model up in order": "Модель выше",
	"Edit tree label": "Править метку дерева",
	"Fold tree branch or move up": "Свернуть ветку или вверх",
	"Unfold tree branch or move down": "Развернуть ветку или вниз",
	"Toggle tree label timestamps": "Таймстампы меток дерева",
	"Tree filter: cycle backward": "Фильтр дерева: назад",
	"Tree filter: cycle forward": "Фильтр дерева: вперёд",
	"Tree filter: default view": "Фильтр дерева: по умолчанию",
	"Tree filter: hide tool results": "Фильтр дерева: скрыть результаты",
	"Tree filter: labeled entries only": "Фильтр дерева: только с метками",
	"Tree filter: show all entries": "Фильтр дерева: все записи",
	"Tree filter: user messages only": "Фильтр дерева: только сообщения",
	"Paste files on macOS, images, or text from clipboard": "Вставить файлы (macOS), изображения или текст",
	"Toggle tool output": "Показать/скрыть вывод инструментов",

	// === Подсказки редактора (hint-строки) ===
	"for commands": "команды",
	"for external editor": "внешний редактор",
	"to attach": "прикрепить",
	"to clear": "очистить",
	"to cycle models": "цикл моделей",
	"to cycle thinking level": "цикл мышления",
	"to delete to end": "удалить до конца",
	"to edit all queued messages": "править все ожидающие",
	"to exit": "выход",
	"to exit (empty)": "выход (пусто)",
	"to expand thinking": "развернуть мышление",
	"to expand tools": "развернуть инструменты",
	"to interrupt": "прервать",
	"to queue follow-up": "follow-up в очередь",
	"to run bash": "bash",
	"to run bash (no context)": "bash (без контекста)",
	"to select model": "выбрать модель",
	"to suspend": "приостановить",
	"to cancel": "отмена",
	"to cancel,": "отмена,",
	"to close": "закрыть",
	"to copy": "копировать",
	"to copy code": "копировать код",
	"to open browser": "открыть браузер",
	"to open browser and copy code": "браузер + копировать код",
	"to submit": "отправить",
	"more": "ещё",
	"drop files": "бросьте файлы",
	"stored credential": "сохранённое удостоверение",
	"not set": "не задано",

	// === Прочие строки ===
	"all enabled": "все включены",
	"no providers": "нет провайдеров",
	"skip setup": "пропустить настройку",
	"switch mode": "сменить режим",
	"switch to single theme": "одна тема",
	"external editor": "внешний редактор",
	"branch summary": "саммари ветки",
	"context edit": "правка контекста",
	"label time": "время метки",
	"name commands": "именованные команды",
	"Cmd+click to open": "Cmd+клик — открыть",
	"Ctrl+click to open": "Ctrl+клик — открыть",
	"Already compacted": "Уже сжато",
	"Nothing to compact (session too small)": "Нечего сжимать (сессия слишком мала)",
	"No model selected": "Модель не выбрана",
	"No model available for summarization": "Нет модели для саммари",
	"No assistant message issued this call": "Нет сообщения ассистента в этом вызове",
	"Nested tool calls are not available in this context": "Вложенные вызовы инструментов здесь недоступны",
	"UI not available": "UI недоступен",
	"Compaction failed": "Ошибка сжатия",
	"compaction failed": "ошибка сжатия",
	"Can't compact": "Нельзя сжать",
	"Cannot append to a finished output accumulator": "Нельзя добавить в завершённый аккумулятор вывода",
	"Cannot preserve unchanged lines because the base content has a different line count.": "Нельзя сохранить неизменные строки: другое число строк в базе.",
	"Edit tool input is invalid. edits must contain at least one replacement.": "Неверный ввод edit: нужен минимум один replacement.",
	"Replacement range is outside the base content.": "Диапазон замены вне базового содержимого.",
	"Failed to acquire settings lock": "Не удалось получить замок настроек",
	"Failed to acquire trust store lock": "Не удалось получить замок хранилища доверия",
	"Auth storage lock was compromised": "Замок хранилища авторизации скомпрометирован",
	"Session header is missing": "Нет заголовка сессии",
	"Persisted session is missing a session file": "У сохранённой сессии нет файла",
	"Prompt template path does not exist": "Пути к шаблону промта нет",
	"Skill path does not exist": "Пути к скиллу нет",
	"Theme path does not exist": "Пути к теме нет",
	"Provider config is required when registering by name": "При регистрации по имени нужен конфиг провайдера",
	"Missing git install root": "Нет корня установки git",
	"Missing upstream branch name": "Нет имени upstream-ветки",
	"Extension runtime not initialized": "Runtime расширений не инициализирован",
	"Failed to create forked session": "Не удалось создать ветвлённую сессию",
	"Agent is already processing. Specify streamingBehavior ('steer' or 'followUp') to queue the message.": "Агент уже работает. Укажите streamingBehavior ('steer'/'followUp'), чтобы поставить в очередь.",
	"Cannot submit a prompt while compaction is in progress. Wait for compaction to finish and retry.": "Нельзя отправить промт во время сжатия. Дождитесь завершения и повторите.",
	"Truncated response recovery failed after one compact-and-retry attempt.": "Восстановление усечённого ответа не удалось после compact-and-retry.",
	"Wait for compaction to finish before reloading.": "Дождитесь завершения сжатия перед перезагрузкой.",
	"Wait for the current compaction or tree navigation to finish before navigating the session tree.": "Дождитесь завершения сжатия/навигации по дереву.",
	"Wait for the current response to finish before reloading.": "Дождитесь завершения ответа перед перезагрузкой.",
	"Wait for the current response to finish before navigating the session tree.": "Дождитесь завершения ответа перед навигацией по дереву.",
	"fd is not available and could not be downloaded": "fd недоступен и не скачался",
	"Bug report summary": "Саммари баг-репорта",
	"Bug report summary was cancelled": "Саммари баг-репорта отменён",
	"Bug report summary was empty": "Саммари баг-репорта пуст",
	"Turn prefix summarization": "Саммари префикса хода",
	"Copy link to this message": "Скопировать ссылку на сообщение",
	"Paste the authorization code": "Вставьте код авторизации",
	"Virtual model": "Виртуальная модель",
	"Decision now": "Решение сейчас",

	// === Титульная страница (pi-powerline-footer welcome) ===
	"Welcome back!": "С возвращением!",
	"Tips": "Подсказки",
	"Loaded": "Загружено",
	"Recent sessions": "Недавние сессии",
	"No recent sessions": "Нет недавних сессий",
	"No context files, skills, or prompts loaded": "Контекстные файлы, скиллы и промты не загружены",
	" initial prompt tokens": " токенов начального промта",
	"context file": "контекстный файл",
	"context files": "контекстных файла",
	" skill": "скилл",
	" skills": "скиллов",
	" prompt template": "шаблон промта",
	" prompt templates": "шаблонов промта",
	"Press any key to continue": "Нажмите любую клавишу для продолжения",
	"d ago": "дн назад",
	"h ago": "ч назад",
	"m ago": "мин назад",
	"just now": "только что",

	// === Подсказки списков настроек (settings-list) ===
	"Type to search · Enter/Space to change · Esc to cancel": "Введите для поиска · Enter/Пробел — сменить · Esc — отмена",
	"Enter/Space to change · Esc to cancel": "Enter/Пробел — сменить · Esc — отмена",
};

// ---------------------------------------------------------------------------
// Частичные (подстроковые) переводы: [фрагмент, замена]
// ---------------------------------------------------------------------------
const RUS_PARTIAL: Array<[string, string]> = [
	["update available", "доступно обновление"],
	["updates available", "доступны обновления"],
	["new version", "новая версия"],
	["no sessions found", "сессии не найдены"],
	["no sessions in current folder", "нет сессий в текущей папке"],
	["press tab to view all", "Tab — показать все"],
	// Титульная страница (welcome) — точные фрагменты
	["Welcome back!", "С возвращением!"],
	[" Tips", " Подсказки"],
	[" Loaded", " Загружено"],
	["Recent sessions", "Недавние сессии"],
	["No recent sessions", "Нет недавних сессий"],
	[" for commands", " для команд"],
	[" to run bash", " запустить bash"],
	[" cycle thinking", " цикл мышления"],
	[" initial prompt tokens", " токенов начального промта"],
	[" press any key to continue", " нажмите любую клавишу для продолжения"],
	// Счётчики (welcome)
	[" skills", " скиллов"],
	[" skill", " скилл"],
	[" prompt templates", " шаблонов промта"],
	[" prompt template", " шаблон промта"],
	[" context files", " контекстных файла"],
	[" context file", " контекстный файл"],
	// Время (welcome)
	["d ago", "дн назад"],
	["h ago", "ч назад"],
	["m ago", "мин назад"],
	["just now", "только что"],
	// Подсказки настроек (settings-list)
	["Type to search", "Введите для поиска"],
	["Enter/Space to change", "Enter/Пробел — сменить"],
	["Esc to cancel", "Esc — отмена"],
	["No settings available", "Нет доступных настроек"],
	["No matching settings", "Нет подходящих настроек"],
	["Press any key to continue", "Нажмите любую клавишу для продолжения"],
	// Динамические строки настроек (шаблоны с подстановкой значений)
	["Thinking Level for ", "Уровень мышления для "],
	["Revert to global default", "Возврат к глобальному значению по умолчанию"],
	[" queues follow-up messages until agent stops. 'one-at-a-time': deliver one, wait for response. 'all': deliver all at once.", " ставит follow-up сообщения в очередь, пока агент работает. 'one-at-a-time': по одному; 'all': все сразу."],
	["configured", "настроено"],
	[" to set as default", " сделать по умолчанию"],
	[" to select", " выбрать"],
	[" to save to settings", " сохранить в настройках"],
];

// ---------------------------------------------------------------------------
// Перевод строки
// ---------------------------------------------------------------------------
function ru(v: string): string {
	const exact = RUS[v];
	if (exact) return exact;
	// Быстрый выход: если в строке нет ни одного известного фрагмента — не тратим время
	let hasAny = false;
	for (const [from] of RUS_PARTIAL) {
		if (v.toLowerCase().includes(from.toLowerCase())) { hasAny = true; break; }
	}
	if (!hasAny) return v;
	let out = v;
	for (const [from, to] of RUS_PARTIAL) {
		if (out.toLowerCase().includes(from.toLowerCase())) out = out.replace(new RegExp(from, "gi"), to);
	}
	return out;
}

// ---------------------------------------------------------------------------
// Патчи
// ---------------------------------------------------------------------------
export default async function (pi: ExtensionAPI) {
	// 1. Theme.prototype — все строки через тему
	const ThemeCtor = (pi as any).Theme;
	if (ThemeCtor?.prototype) {
		for (const method of ["fg", "bold", "italic", "underline", "inverse", "strikethrough"] as const) {
			const original = ThemeCtor.prototype[method];
			if (typeof original !== "function") continue;
			ThemeCtor.prototype[method] = function patched(this: any, ...args: any[]) {
				for (let i = 0; i < args.length; i++) {
					if (typeof args[i] === "string") args[i] = ru(args[i]);
				}
				return original.apply(this, args);
			};
		}
	}

	// 2. registerTool — описания инструментов
	const originalRegisterTool = pi.registerTool.bind(pi);
	pi.registerTool = (tool: any, ...rest: any[]) => {
		if (tool && typeof tool === "object") {
			if (typeof tool.label === "string") tool.label = ru(tool.label);
			if (typeof tool.description === "string") tool.description = ru(tool.description);
			if (tool.parameters && typeof tool.parameters.description === "string") {
				tool.parameters.description = ru(tool.parameters.description);
			}
			if (tool.parameters?.properties) {
				for (const key of Object.keys(tool.parameters.properties)) {
					const prop = tool.parameters.properties[key];
					if (prop && typeof prop.description === "string") {
						prop.description = ru(prop.description);
					}
				}
			}
		}
		return originalRegisterTool(tool, ...rest);
	};

	// 3. registerCommand — описания slash-команд
	const originalRegisterCommand = pi.registerCommand.bind(pi);
	pi.registerCommand = (name: string, options: any, ...rest: any[]) => {
		if (options && typeof options.description === "string") {
			options.description = ru(options.description);
		}
		return originalRegisterCommand(name, options, ...rest);
	};
	// 3b. BUILTIN_SLASH_COMMANDS — встроенные команды не проходят через registerCommand
	try {
		const mod = await import("@earendil-works/pi-coding-agent/dist/core/slash-commands.js");
		for (const cmd of (mod.BUILTIN_SLASH_COMMANDS as any[])) {
			if (cmd && typeof cmd.description === "string") cmd.description = ru(cmd.description);
			if (cmd && typeof cmd.argumentHint === "string") cmd.argumentHint = ru(cmd.argumentHint);
		}
	} catch {
		// не критично
	}

	// 4. KeybindingsManager.prototype.create — описания хоткеев
	const KBM = (pi as any).KeybindingsManager;
	if (KBM?.prototype?.create) {
		const originalCreate = KBM.prototype.create;
		KBM.prototype.create = function patchedCreate(this: any, ...args: any[]) {
			const instance = originalCreate.apply(this, args);
			try {
				const definitions = instance.getDefinitions?.();
				if (definitions) {
					for (const key of Object.keys(definitions)) {
						const def = definitions[key];
						if (def && typeof def.description === "string") {
							def.description = ru(def.description);
						}
					}
				}
			} catch {
				// не критично
			}
			return instance;
		};
	}

	// 5. process.stdout.write — финальная страховка для hint-строк
	const originalWrite = process.stdout.write;
	(process.stdout as any).write = function patchedWrite(this: any, chunk: any, ...args: any[]) {
		const translateChunk = (c: any): any => {
			if (typeof c === "string") return ru(c);
			if (Buffer.isBuffer(c)) {
				try {
					return Buffer.from(ru(c.toString("utf8")), "utf8");
				} catch {
					return c;
				}
			}
			return c;
		};
		if (Array.isArray(chunk)) {
			for (let i = 0; i < chunk.length; i++) chunk[i] = translateChunk(chunk[i]);
		} else {
			chunk = translateChunk(chunk);
		}
		return originalWrite.call(this, chunk, ...args);
	};

	// Индикатор активности (setStatus живёт на ui-контексте; на этапе загрузки
	// ui может отсутствовать — например, режим print/RPC, поэтому защищаемся)
	const setStatus = (pi as any).ui?.setStatus;
	if (typeof setStatus === "function") {
		setStatus.call((pi as any).ui, "ru", `[RU] i18n-ru: ${Object.keys(RUS).length} строк`);
	}
}
