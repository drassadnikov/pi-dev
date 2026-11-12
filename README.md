# pi-dev

Снапшот всех настроек агента [pi](https://pi.dev) на локальной машине
(HOME-PC, Windows, пользователь HOME-PC). Основной снапшот — в пакете `pi-homepc/config/`.
Дубликат лежат в корне (`agent/`, `models.json`) — для быстрого восстановления.
Снапшот обновлён: **2026-11-12**.

## Структура

```
pi-dev/
├── models.json                  # кастомные провайдеры (llama.cpp на 192.168.1.117:9931)
├── agent/                       # дубликат C:\Users\HOME-PC\.pi\agent
│   ├── APPEND_SYSTEM.md         # дописываемый системный промт (addendum)
│   ├── settings.json            # основные настройки: дефолтная модель, тема, пакеты
│   ├── models.json              # модели, доступные агенту
│   ├── models-store.json        # хранилище моделей
│   ├── auth.json                # авторизация провайдеров
│   ├── extensions/              # расширения (obsidian-context, obsidian-auto-note)
│   └── npm/                     # package.json / package-lock.json установленных пакетов
└── pi-homepc/                   # личный pi package (расширения + все настройки + pi-obsidian)
    ├── package.json             # name: pi-homepc, keywords: [pi-package], private: true
    ├── README.md
    ├── extensions/
    │   ├── obsidian-context.ts   # Obsidian-контекст перед ответом
    │   ├── obsidian-auto-note.ts # автосохранение сессий в pi-log
    │   └── git-stderr-guard.ts   # фикс «fatal: not a git repository» в TUI (stderr git)
    ├── packages/pi-obsidian/     # вендор @bacnh85/pi-obsidian 0.9.0 + HOME-PC патч
    │   ├── extensions/index.ts   #   (read-only allowlist: ls/du/cat/... разрешены на vault)
    │   └── skills/               #   skill obsidian-vault-discipline
    └── config/                  # полный снапшот настроек (C:\Users\HOME-PC\.pi)
        ├── models.json          # ~/.pi/models.json (llama.cpp: qwen3.8-27b, 256K контекст)
        └── agent/               # ~/.pi/agent: settings, models, mcp, auth,
            └── ...              # provider-keys, APPEND_SYSTEM.md, extensions/, prompts/
```

## Установленные пакеты (из `pi-homepc/config/agent/settings.json`)

| Пакет | Назначение |
|---|---|
| `bigpowers` | набор скиллов жизненного цикла разработки (TDD, планирование, QA и др.) |
| `pi-hashline-edit-pro` | редактирование файлов по hashline-якорям |
| `pi-web-access` | web_search / fetch_content / source_check |
| `pi-powerline-footer` | powerline-подвал TUI |
| `@moyai/pi-session-hoarder` | архивирование сессий |
| `@amaster.ai/pi-memory-mem0` | долговременная память (mem0, embedded-режим) |
| `pi-web-ui` | веб-интерфейс |
| `pi-prompt-template-model` | пользовательские prompt-шаблоны (slash-команды) |
| `pi-lsp-extension` | LSP-инструменты (diagnostics, hover, rename) |
| `pi-fff` | быстрый поиск файлов (find_files / fff_multi_grep) |
| `pi-lens` | pi-lens: LSP/ast-grep/outline-инструменты |
| `pi-interview` | интерактивные формы для сбора требований |
| `@plannotator/pi-extension` | планирование/аннотации |
| `pi-code-previews` | превью кода |
| `A:\PROJECTS\pi-homepc` | личный пакет: extensions Obsidian + pi-obsidian (см. ниже) |
| `git:github.com/IzumiSy/pi-file-tree-browser` | файловый браузер с шорт-листом |
| `npm:pi-editor` | редактор |

## Личный пакет `pi-homepc`

Каталог `pi-homepc/` — мой личный [pi package](https://pi.dev/packages):
три расширения + вендор pi-obsidian + полный снапшот настроек (актуальная копия —
`A:/PROJECTS/pi-homepc`).

```bash
pi install A:/PROJECTS/pi-homepc        # локальный путь
# из этого репозитория:
git clone https://github.com/drassadnikov/pi-dev
pi install /path/to/pi-dev/pi-homepc    # локальный путь к подкаталогу
```

- `extensions/obsidian-context.ts` — анализ Obsidian-хранилища перед ответом;
- `extensions/obsidian-auto-note.ts` — автосохранение сессий в `pi-log/`;
- `extensions/git-stderr-guard.ts` — патчит `child_process.execSync`/`execFileSync`:
  git-stderr больше не протекает в TUI («fatal: not a git repository»);
- `packages/pi-obsidian/` — вендор `@bacnh85/pi-obsidian 0.9.0` с патчем:
  read-only bash-команды на vault разрешены, блокируются только write;
- `config/` — полный снапшот настроек pi (settings, models, mcp, auth,
  provider-keys, APPEND_SYSTEM.md, extensions/, prompts/).

Расширения захардкожены под хранилище `\\192.168.1.1\backup\Obsidian\Obsidian`
— при переносе поправить константы.

## Текущая конфигурация (снапшот 2026-11-12)

- Модель: `llama.cpp/qwen3.8-27b` (Qwen 3.8 27B) через llama-server на `http://192.168.1.117:9931/v1`
- Контекст: 262144 (256K), maxTokens 32768, thinking off
- Режим: `offlineMode: true`, `quietStartup: true`, тема dark
- Compaction: включён, reserveTokens 65536
- Mem0: embedded (vLLM qwen3.8-27b + fastembed multilingual-e5-large)
- MCP: context7, chrome-devtools, playwright, postgres

## Восстановление на другой машине

1. Скопировать `agent/` в `%USERPROFILE%\.pi\agent` (Windows) или `~/.pi/agent` (Linux/macOS).
2. Скопировать `models.json` в `%USERPROFILE%\.pi\models.json` / `~/.pi/models.json`.
3. Установить пакеты: список — в `agent/settings.json`, секция `packages`
   (`pi install npm:bigpowers npm:pi-hashline-edit-pro ...`).
4. Локальный провайдер `llama.cpp` указывает на `http://192.168.1.117:9931`
   (llama.cpp) — при переносе на другую сеть заменить `baseUrl`
   в `models.json`, `auth.json` и `settings.json` (pi-memory-mem0.oss.llm.config).

## Что НЕ включено

- `agent/npm/node_modules` — ставится по `package.json` / `package-lock.json`;
- `pi-homepc/packages/pi-obsidian/node_modules` — ставится отдельно;
- `agent/sessions/`, `web-search-cache/`, `session-hoarder/`, `powerline-footer/inbox.jsonl` —
  кэши и данные сессий, не являются настройками;
- `agent/bin/` (fd.exe, rg.exe) — бинарники, поставляемые с pi.

## Секреты

`auth.json` (только локальный `llama.cpp` с `apiKey: "local-bypass"`) и
`provider-keys.json` (пустой) на момент снапшота 2026-11-12 не содержат секретов,
репозиторий может быть публичным. При добавлении API-ключей репозиторий
лучше сделать приватным.
