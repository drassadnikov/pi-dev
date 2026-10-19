# pi-dev

Снапшот всех настроек агента [pi](https://pi.dev), выставленных на локальной машине
(HOME-PC, Windows, пользователь HOME-PC) на момент 2026-10-19.

## Структура

```
pi-dev/
├── models.json                  # кастомные провайдеры (local-llama → llama.cpp на 192.168.1.117:9931)
└── agent/                       # содержимое C:\Users\HOME-PC\.pi\agent
    ├── APPEND_SYSTEM.md         # дописываемый системный промт (addendum)
    ├── settings.json            # основные настройки: дефолтная модель, тема, пакеты, транспорт и т.д.
    ├── models.json              # модели, доступные агенту
    ├── models-store.json        # хранилище моделей (пустое {})
    ├── auth.json                # авторизация провайдеров (пустая {})
    ├── extensions/
    │   ├── obsidian-auto-note.ts  # авто-сохранение результата сессии в Obsidian
    │   └── obsidian-context.ts    # подхват контекста из Obsidian-хранилища
    └── npm/
        ├── package.json         # список установленных npm-пакетов (скиллы, инструменты)
        └── package-lock.json    # точные версии пакетов
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

`auth.json` и `models.json` на момент снапшота не содержат секретов
(локальный провайдер с `apiKey: "local-bypass"`), репозиторий может быть публичным.
При добавлении API-ключей репозиторий лучше сделать приватным.
