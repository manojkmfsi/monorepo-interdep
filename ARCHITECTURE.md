# Monorepo Dependency Hierarchy

## 3-Level Dependency Chain

```
LEVEL 1 (Base Utilities - No dependencies)
├── @monorepo/logger
│   └── Provides: Logger interface, LogLevel enum, ConsoleLogger implementation
└── @monorepo/utils
    └── Provides: delay, formatDate, capitalize, debounce functions


LEVEL 2 (Components - Depend on Level 1)
├── @monorepo/ui-components
│   ├── Depends on: logger, utils
│   ├── Provides: Button component, Input component
│   └── Used by: form, app
└── @monorepo/api-client
    ├── Depends on: logger, utils
    ├── Provides: ApiClient class, request methods (GET, POST)
    └── Used by: form, app


LEVEL 3 (High-Level Features - Depend on Level 1 & 2)
├── @monorepo/form
│   ├── Depends on: ui-components, api-client, logger
│   ├── Provides: Form class, field management, form submission
│   └── Used by: app
└── @monorepo/app
    ├── Depends on: form, ui-components, api-client, logger, utils
    ├── Provides: Application orchestration
    └── Main entry point
```

## Dependency Visualization

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                     LEVEL 3: APP & FORM                    │
│                                                             │
│  ┌──────────────────────┐    ┌──────────────────────┐     │
│  │     @monorepo/app    │    │   @monorepo/form     │     │
│  │  (Main Application)  │    │  (Form Management)   │     │
│  └──────┬───────────────┘    └──────┬───────────────┘     │
│         │                           │                      │
│         └───────────────┬───────────┘                      │
│                         │                                  │
├─────────────────────────┼──────────────────────────────────┤
│                         │                                  │
│                LEVEL 2: COMPONENTS                         │
│                         │                                  │
│  ┌──────────────────────┴──────────┬─────────────────────┐│
│  │                                 │                     ││
│  ▼                                 ▼                     ││
│┌──────────────────────┐  ┌──────────────────────┐       ││
││@monorepo/ui-        │  │  @monorepo/api-      │       ││
││components           │  │  client              │       ││
││(Button, Input)      │  │  (HTTP requests)     │       ││
│└──────────┬───────────┘  └──────────┬───────────┘       ││
│           │                         │                   ││
│           └─────────────┬───────────┘                   ││
│                         │                              ││
├─────────────────────────┼──────────────────────────────┤│
│                         │                              ││
│                 LEVEL 1: BASE UTILITIES                ││
│                         │                              ││
│           ┌─────────────┴──────────┐                  ││
│           │                        │                  ││
│           ▼                        ▼                  ││
│ ┌──────────────────┐   ┌──────────────────┐           ││
│ │ @monorepo/logger │   │  @monorepo/utils │           ││
│ │ (Logging)        │   │ (Utilities)      │           ││
│ └──────────────────┘   └──────────────────┘           ││
│                                                        ││
└────────────────────────────────────────────────────────┘│
```

## Cross-Package Imports

### @monorepo/app imports from:
- @monorepo/form
- @monorepo/ui-components
- @monorepo/api-client
- @monorepo/logger
- @monorepo/utils

### @monorepo/form imports from:
- @monorepo/ui-components (Button, Input)
- @monorepo/api-client (ApiClient)
- @monorepo/logger (logger)

### @monorepo/ui-components imports from:
- @monorepo/logger (logger)
- @monorepo/utils (capitalize)

### @monorepo/api-client imports from:
- @monorepo/logger (logger)
- @monorepo/utils (delay)

### @monorepo/logger imports:
- Nothing (base package)

### @monorepo/utils imports:
- Nothing (base package)

## Package Characteristics

| Package | Type | Dependencies | Exports | Tests |
|---------|------|--------------|---------|-------|
| logger | Base | 0 | Logger, LogLevel | ✅ |
| utils | Base | 0 | Functions | ✅ |
| ui-components | Level 2 | 2 | Button, Input | ✅ |
| api-client | Level 2 | 2 | ApiClient, types | ✅ |
| form | Level 3 | 3 | Form class | ✅ |
| app | Level 3 | 5 | Application class | ✅ |

## Test Results Summary

All 5 packages have passing tests:
- **Logger tests**: 2 tests ✅
- **Utils tests**: 3 tests ✅
- **UI Components tests**: 3 tests ✅
- **API Client tests**: 2 tests ✅
- **Form tests**: 4 tests ✅
- **App tests**: 3 tests ✅

**Total: 17 tests passing**

## Build Process

The monorepo uses Wireit for smart, cached builds with:
1. Automatic dependency detection
2. Parallel compilation when possible
3. Smart caching based on file changes
4. Clear build status indicators

Build order is automatically determined by Wireit based on dependencies.
