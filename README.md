# pi-dev

Снапшот всех настроек агента [pi](https://pi.dev), выставленных на локальной машине
(HOME-PC, Windows, пользователь HOME-PC). Полный снапшот — в пакете `pi-homepc/config/`.
## Структура

```
pi-dev/
├── models.json                  # кастомные провайдеры (local-llama → llama.cpp на 192.168.1.117:9931)
├── agent/                       # содержимое C:\Users\HOME-PC\.pi\agent
│   ├── APPEND_SYSTEM.md         # дописываемый системный промт (addendum)
│   ├── settings.json            # основные настройки: дефолтная модель, тема, пакеты, транспорт и т.д.
│   ├── models.json              # модели, доступные агенту
│   ├── models-store.json        # хранилище моделей (пустое {})
│   ├── auth.json                # авторизация провайдеров (пустая {})
│   ├── extensions/
│   │   ├── obsidian-auto-note.ts  # авто-сохранение результата сессии в Obsidian
│   │   └── obsidian-context.ts    # подхват контекста из Obsidian-хранилища
│   └── npm/
│       ├── package.json         # список установленных npm-пакетов (скиллы, инструменты)
│       └── package-lock.json    # точные версии пакетов
└── pi-homepc/                   # личный pi package (расширения Obsidian + все настройки)
    ├── package.json             # name: pi-homepc, keywords: [pi-package], private: true
    ├── README.md
    ├── extensions/
    │   ├── obsidian-context.ts  # Obsidian-контекст перед ответом
    │   └── obsidian-auto-note.ts# автосохранение сессий в pi-log
    └── config/                  # полный снапшот настроек (C:\Users\HOME-PC\.pi)
        ├── models.json          # ~/.pi/models.json (кастомные провайдеры)
        └── agent/               # ~/.pi/agent: settings, models, mcp, auth,
            └── ...              # provider-keys, APPEND_SYSTEM.md, prompts/
```

## Установленные пакеты (из `agent/npm/package.json`)

| Пакет | Назначение |
|---|---|
| `bigpowers` | набор скиллов жизненного цикла разработки (TDD, планирование, QA и др.) |
| `pi-hashline-edit-pro` | редактирование файлов по hashline-якорям |
| `pi-web-access` | web_search / fetch_content / source_check |
| `pi-powerline-footer` | powerline-подвал TUI |
| `@moyai/pi-session-hoarder` | архивирование сессий |
| `@amaster.ai/pi-memory-mem0` | долговременная память (mem0) |
| `pi-web-ui` | веб-интерфейс |
| `pi-prompt-template-model` | пользовательские prompt-шаблоны (slash-команды) |
| `@bacnh85/pi-obsidian` | инструмент `obsidian` для работы с хранилищем |
| `pi-lsp-extension` | LSP-инструменты (diagnostics, hover, rename) |
| `pi-fff` | быстрый поиск файлов (find_files / fff_multi_grep) |
| `pi-nvim` | мост pi ↔ Neovim |
| `A:\PROJECTS\pi-homepc` | личный пакет: extensions Obsidian (см. раздел ниже) |
## Личный пакет `pi-homepc`

Каталог `pi-homepc/` — мой личный [pi package](https://pi.dev/packages):
два расширения Obsidian в одном installable-юните (актуальная копия —
`A:/PROJECTS/pi-homepc`).

```bash
pi install A:/PROJECTS/pi-homepc        # локальный путь
# из этого репозитория:
git clone https://github.com/drassadnikov/pi-dev
pi install /path/to/pi-dev/pi-homepc    # локальный путь к подкаталогу
```

- `extensions/obsidian-context.ts` — анализ Obsidian-хранилища перед ответом;
- `extensions/obsidian-auto-note.ts` — автосохранение сессий в `pi-log/`;
- `config/` — полный снапшот настроек pi (`settings.json`, `models.json`,
  `mcp.json`, `auth.json`, `provider-keys.json`, `APPEND_SYSTEM.md`, `prompts/`).

Оба расширения захардкожены под хранилище `\\192.168.1.1\backup\Obsidian\Obsidian`
— при переносе поправить константы.

## Восстановление на другой машине

1. Скопировать `agent/` в `%USERPROFILE%\.pi\agent` (Windows) или `~/.pi/agent` (Linux/macOS).
2. Скопировать `models.json` в `%USERPROFILE%\.pi\models.json` / `~/.pi/models.json`.
3. Установить пакеты: `pi install npm:bigpowers npm:pi-hashline-edit-pro ...`
   (список — в `agent/settings.json`, секция `packages`) либо
   `npm install` в папке `agent/npm`.
4. Локальный провайдер `local-llama` указывает на `http://192.168.1.117:9931`
   (llama.cpp) — при переносе на другую сеть заменить `baseUrl`.

## Что НЕ включено

- `agent/npm/node_modules` (384 МБ) — ставится по `package.json` / `package-lock.json`;
- `agent/sessions/`, `web-search-cache/`, `session-hoarder/`, `powerline-footer/inbox.jsonl` —
  кэши и данные сессий, не являются настройками;
- `agent/bin/` (fd.exe, rg.exe) — бинарники, поставляемые с pi.

## Секреты

`auth.json` (только локальный `llama.cpp` с `apiKey: "local-bypass"`) и
`provider-keys.json` (пустой) на момент снапшота 2026-10-23 не содержат секретов,
репозиторий может быть публичным. При добавлении API-ключей репозиторий
лучше сделать приватным.
