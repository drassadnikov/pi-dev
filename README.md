# pi-dev

Снапшот всех настроек агента [pi](https://pi.dev), выставленных на локальной машине
(HOME-PC, Windows, пользователь HOME-PC). Снапшот от **16-11-2026**: после ревизии
и оптимизации промтов (APPEND_SYSTEM.md пересобран в структурированный вид).

## Структура

```
pi-dev/
├── models.json                  # кастомные провайдеры (~/.pi/models.json: llama.cpp на 192.168.1.117:9931)
├── agent/                       # содержимое C:\Users\HOME-PC\.pi\agent
│   ├── APPEND_SYSTEM.md         # дописываемый системный промт (addendum), структурированный по секциям
│   ├── settings.json            # основные настройки: дефолтная модель, тема, пакеты, транспорт и т.д.
│   ├── models.json              # модели, доступные агенту
│   ├── models-store.json        # хранилище моделей
│   ├── auth.json                # авторизация провайдеров
│   ├── mcp.json                 # MCP-серверы
│   ├── provider-keys.json       # ключи провайдеров
│   ├── extensions/
│   │   ├── git-stderr-guard.ts      # (stub; активный — в pi-homepc/extensions)
│   │   ├── obsidian-auto-note.ts    # (stub; активный — в pi-homepc/extensions)
│   │   ├── obsidian-context.ts      # (stub; активный — в pi-homepc/extensions)
│   │   ├── pi-i18n-ru.ts            # ЦЕНТРАЛЬНЫЙ словарь русификации: команды, инструменты, настройки
│   │   └── pi-fff.json              # конфиг pi-fff
│   ├── prompts/
│   │   └── diag-continue.md         # prompt-шаблон: диагностика плагина Continue
│   └── npm/
│       ├── package.json         # список установленных npm-пакетов (расширения, скиллы)
│       └── package-lock.json    # точные версии пакетов
└── pi-homepc/                   # личный pi package (первый в packages[] в settings.json)
    ├── package.json             # name: pi-homepc, keywords: [pi-package], private: true
    ├── README.md
    ├── extensions/
    │   ├── git-stderr-guard.ts  # патч child_process (git stderr guard), должен грузиться ПЕРВЫМ
    │   ├── obsidian-context.ts  # Obsidian-контекст перед ответом
    │   ├── obsidian-auto-note.ts# автосохранение сессий в pi-log
    │   └── pi-i18n-ru.ts        # копия центрального словаря русификации
    ├── packages/
    │   └── pi-obsidian/         # вендор @bacnh85/pi-obsidian 0.9.0 + HOME-PC патч (guard vault)
    └── config/                  # полный снапшот настроек (C:\Users\HOME-PC\.pi)
        ├── models.json          # ~/.pi/models.json
        └── agent/               # ~/.pi/agent: settings, models, mcp, auth, provider-keys, APPEND_SYSTEM.md
```

## Ключевые особенности

- **Модель по умолчанию**: `llama.cpp/qwen3.8-27b` (локальный llama.cpp-сервер), thinking off, offlineMode.
- **pi-homepc — ПЕРВЫЙ** в `packages[]`: git-stderr-guard патчит `child_process.execSync` через
  CJS-биндинг; ESM-import снапшотирует экспорты при первом `import()`, поэтому порядок важен.
- **Русификация**: все slash-команды расширений переведены централизованно в
  `agent/extensions/pi-i18n-ru.ts` (патч `pi.registerCommand`); hotkeys-template и
  initEmbeddingModel (fastembed cacheDir на C:) — патчами в dist-файлах пакетов.
- **Obsidian guard**: vault `k:\Obsidian\Obsidian` защищён от write через bash — только
  инструмент `obsidian`; read-only bash разрешён (pi-obsidian в pi-homepc/packages).

## Восстановление

1. Скопировать `agent/` в `C:\Users\HOME-PC\.pi\agent\` (кроме sessions/кэшей).
2. Скопировать `models.json` в `C:\Users\HOME-PC\.pi\models.json`.
3. Репозиторий `A:\PROJECTS\pi-homepc` должен существовать (первый элемент packages[]).
4. `pi update --extensions` для актуальных версий npm-пакетов; затем повторные патчи
   русификации (см. APPEND_SYSTEM.md, секция «Русификация»).
