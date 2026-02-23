# Monorepo with Interdependent Packages

A comprehensive monorepo example with 5 interdependent packages across 3 levels of dependency hierarchy.

## Project Structure

```
monorepo-interdep/
├── packages/
│   ├── logger/              (Level 1: Base utility)
│   ├── utils/               (Level 1: Base utility)
│   ├── ui-components/       (Level 2: Depends on Level 1)
│   ├── api-client/          (Level 2: Depends on Level 1)
│   ├── form/                (Level 3: Depends on Level 2 + Level 1)
│   └── app/                 (Level 3: Main app, depends on all)
└── package.json
```

## Dependency Chain

```
Level 1 (Base):
  - logger: Provides logging utilities
  - utils: Provides utility functions

Level 2 (Components):
  - ui-components: Depends on logger + utils
  - api-client: Depends on logger + utils

Level 3 (Higher-level):
  - form: Depends on ui-components + api-client + logger
  - app: Depends on form + ui-components + api-client + logger + utils
```

## Installation

```bash
cd /home/manoj/Documents/monorepo-interdep
npm install
```

## Available Commands

### Build all packages
```bash
npm run build
```

### Run tests across all packages
```bash
npm run test
```

### Run the main application
```bash
npm run dev --workspace=@monorepo/app
```

### Clean build artifacts
```bash
npm run clean
```

## Package Details

### @monorepo/logger
- Provides a logger interface with different log levels
- Used by: All other packages

### @monorepo/utils
- Utility functions: delay, formatDate, capitalize, debounce
- Used by: ui-components, api-client, form, app

### @monorepo/ui-components
- UI components: Button, Input
- Uses: logger, utils

### @monorepo/api-client
- HTTP client for API calls
- Uses: logger, utils

### @monorepo/form
- Form management with validation
- Uses: ui-components, api-client, logger

### @monorepo/app
- Main application that orchestrates all packages
- Uses: form, ui-components, api-client, logger, utils

## Testing

Each package has unit tests using Node's built-in test framework. Run tests with:

```bash
# Test a specific package
npm run test --workspace=@monorepo/logger

# Test all packages
npm run build && npm run test
```

## Wireit Build System

This monorepo uses Wireit for build orchestration with:
- Automatic dependency detection
- Parallel builds when possible
- Smart caching based on file changes
- Clear visibility of build status

## Features

✅ TypeScript support across all packages
✅ Npm workspaces for monorepo management
✅ Wireit for smart, cached builds
✅ Multi-level dependency chains
✅ Built-in testing framework
✅ Proper exports and type definitions
