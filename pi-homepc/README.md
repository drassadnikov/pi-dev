# pi-homepc

Личный [pi](https://pi.dev) пакет пользователя HOME-PC (Windows).
Собирает в один installable-юнит все мои кастомные расширения.

## Что внутри

| Ресурс | Файл | Назначение |
|---|---|---|
| Extension | `extensions/obsidian-context.ts` | Перед ответом на ЛЮБОЙ промпт агент сначала анализирует md-заметки Obsidian-хранилища (`\\192.168.1.1\backup\Obsidian\Obsidian`) инструментом `obsidian` (files / search / read) и учитывает их в ответе. |
| Extension | `extensions/obsidian-auto-note.ts` | После каждого завершённого хода дописывает блок «prompt + result» в заметку `pi-log/session-<id>.md` в хранилище. Основная запись — прямой FS-write на шару (работает без приложения Obsidian), fallback — `obsidian` CLI. Ошибки не рвут сессию. |
| Config | `config/` | Полный снапшот настроек pi (HOME-PC): `settings.json`, `models.json`, `mcp.json`, `auth.json`, `provider-keys.json`, `models-store.json`, `APPEND_SYSTEM.md`, `extensions/pi-fff.json`, `prompts/diag-continue.md` |

## Установка

```bash
# локальный путь (личный, персональный scope → ~/.pi/agent/settings.json)
pi install A:/PROJECTS/pi-homepc

# посмотреть установленные
pi list

# удалить
pi remove A:/PROJECTS/pi-homepc
```

Локальный пакет загружается по пути без копирования. Если `A:\` недоступна —
пакет не загрузится (проверь шар).

## Настройки (`config/`)

Зеркало локальной директории pi (`C:\Users\HOME-PC\.pi`), снапшот от 2026-10-23:

```
config/
├── models.json                  # ~/.pi/models.json (кастомные провайдеры)
└── agent/                       # ~/.pi/agent
    ├── APPEND_SYSTEM.md         # системный addendum
    ├── settings.json            # основные настройки
    ├── models.json              # модели агента
    ├── models-store.json        # хранилище моделей
    ├── mcp.json                 # MCP-серверы
    ├── auth.json                # авторизация провайдеров
    ├── provider-keys.json       # ключи провайдеров
    ├── extensions/pi-fff.json   # конфиг расширения pi-fff
    └── prompts/diag-continue.md # prompt-шаблон /diag-continue
```

Восстановление:

```powershell
# Windows
Copy-Item -Recurse pi-homepc/config/agent/* $env:USERPROFILE\.pi\agent\
Copy-Item pi-homepc/config/models.json $env:USERPROFILE\.pi\models.json
```

НЕ включено: `npm/node_modules` (ставится по `package.json`), `sessions/`,
`memories/`, `web-search-cache/`, `session-hoarder/`, `bin/` — кэши и данные,
не настройки.

`auth.json` и `provider-keys.json` содержат ключи — при публикации пакета
в npm или открытии репозитория секреты проверить.

## Издание (опционально)

Пакет помечен `private: true` — `npm publish` заблокирован, пока флаг не убрать.
Для публикации: убери `private`, пожелай имя в npm-registry (например
`@homepc/pi`), затем `npm publish`. `keywords: ["pi-package"]` уже на месте —
пакет будет виден в [Pi package gallery](https://pi.dev/packages).

## Зависимости

- `@earendil-works/pi-coding-agent: *` — declared в `peerDependencies`
  (host-provided пакет, поставляется самим pi, не бандлится).
- Node built-ins: `node:fs`, `node:path`, `node:child_process` (в auto-note).

## Важно при переносе

Оба расширения захардкожены под хранилище `\\192.168.1.1\backup\Obsidian\Obsidian`.
При переносе на другую машину/хранилище поправь константы `VAULT` (auto-note)
и путь в `GUIDELINE` (context) — или вынеси в настройки.
