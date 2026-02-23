# Quick Start Guide

## Overview

This is a fully functional monorepo with 5 interdependent packages organized across 3 dependency levels. Perfect for learning or demonstrating monorepo concepts!

**Location**: `/home/manoj/Documents/monorepo-interdep`

## Getting Started

### 1. Navigate to the monorepo
```bash
cd /home/manoj/Documents/monorepo-interdep
```

### 2. Install dependencies
```bash
npm install
```

### 3. Build all packages
```bash
npm run build
```

You'll see Wireit automatically handling the dependency order:
- First builds Level 1 (logger, utils) 
- Then Level 2 (ui-components, api-client)
- Then Level 3 (form, app)

### 4. Run all tests
```bash
npm run test
```

Expected output: **17 tests passing** across 6 packages

### 5. Run the main application
```bash
npm run dev --workspace=@monorepo/app
```

## Common Commands

### Build specific package
```bash
npm run build --workspace=@monorepo/logger
```

### Test specific package
```bash
npm run test --workspace=@monorepo/form
```

### Build and run the app
```bash
npm run dev --workspace=@monorepo/app
```

### Clean all build artifacts
```bash
npm run clean
```

## Project Structure

```
monorepo-interdep/
├── packages/
│   ├── logger/           # Level 1: Base logging utility
│   ├── utils/            # Level 1: Base utility functions
│   ├── ui-components/    # Level 2: UI components (uses L1)
│   ├── api-client/       # Level 2: HTTP client (uses L1)
│   ├── form/             # Level 3: Form management (uses L2)
│   └── app/              # Level 3: Main application (uses all)
├── package.json          # Root workspace config
├── tsconfig.base.json    # Shared TypeScript config
├── README.md             # Full documentation
├── ARCHITECTURE.md       # Detailed architecture
└── QUICKSTART.md         # This file
```

## Dependency Hierarchy

```
              ┌─────────────────────┐
              │   @monorepo/app     │
              │   (Level 3 - Main)  │
              └──────────┬──────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   ┌─────────┐   ┌──────────────┐   ┌─────────┐
   │  form   │   │ui-components │   │api-client
   │(Level 3)│   │  (Level 2)   │   │(Level 2)
   └────┬────┘   └──────┬───────┘   └────┬────┘
        │                │              │
        └────────────────┼──────────────┘
                         │
            ┌────────────┴────────────┐
            ▼                         ▼
       ┌────────────┐         ┌──────────┐
       │  logger    │         │  utils   │
       │(Level 1)   │         │(Level 1) │
       └────────────┘         └──────────┘
```

## Package Capabilities

### @monorepo/logger
- Logging with different levels (DEBUG, INFO, WARN, ERROR)
- Used by all other packages

### @monorepo/utils
- `delay(ms)` - Async delay
- `formatDate(date)` - ISO date formatting
- `capitalize(str)` - String capitalization
- `debounce(fn, ms)` - Function debouncing

### @monorepo/ui-components
- `Button` - Button component with disabled state
- `Input` - Input component with placeholder

### @monorepo/api-client
- `ApiClient` - HTTP client for simulated API calls
- Methods: `get()`, `post()`, `request()`

### @monorepo/form
- `Form` - Form management with fields and submission
- Field management
- Form rendering to HTML

### @monorepo/app
- `Application` - Main application class
- Form orchestration
- Multi-form management
- Full integration of all packages

## Key Features

✅ **TypeScript** - Full type safety
✅ **Workspaces** - NPM monorepo management
✅ **Wireit** - Smart, cached builds
✅ **Testing** - Node's built-in test framework
✅ **3-Level Dependencies** - Real-world complexity
✅ **5 Packages** - Rich interaction patterns
✅ **17 Tests** - Comprehensive test coverage

## Testing Individual Packages

### Logger Tests
```bash
npm run test --workspace=@monorepo/logger
```

### Utils Tests
```bash
npm run test --workspace=@monorepo/utils
```

### UI Components Tests
```bash
npm run test --workspace=@monorepo/ui-components
```

### API Client Tests
```bash
npm run test --workspace=@monorepo/api-client
```

### Form Tests
```bash
npm run test --workspace=@monorepo/form
```

### App Tests
```bash
npm run test --workspace=@monorepo/app
```

## Understanding the Build System

This monorepo uses **Wireit** for smart builds:

1. **Dependency Detection**: Wireit automatically knows that `form` must build after `ui-components` and `api-client`
2. **Parallel Builds**: Independent packages build in parallel
3. **Smart Caching**: Only rebuilds if source files change
4. **Clear Status**: Shows which tasks ran and which were skipped

### Example Build Output
```
> @monorepo/app@1.0.0 build
> wireit

✅ Ran 2 scripts and skipped 4 in 0.9s.
```

This means:
- 2 scripts were actually executed
- 4 scripts were skipped (due to caching)
- Total time: 0.9 seconds

## Troubleshooting

### Issue: Build fails with missing dependencies
**Solution**: Run `npm install` again to ensure all packages are linked

### Issue: Tests fail 
**Solution**: Run `npm run build` first, then `npm run test`

### Issue: Can't find module '@monorepo/...'
**Solution**: Ensure the package.json has proper paths in tsconfig.base.json

## Next Steps

1. **Explore the code**: Look at how packages import from each other
2. **Modify a package**: Change something in `@monorepo/utils` and see how it cascades
3. **Add a new package**: Create a new package that depends on existing ones
4. **Experiment with Wireit**: Check out `.wireit/` folders to see caching in action

## Resources

- [README.md](./README.md) - Full documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture and dependency diagrams
- [Wireit Docs](https://github.com/google/wireit) - Learn more about the build system
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) - Monorepo management

---

**Happy coding!** 🚀
