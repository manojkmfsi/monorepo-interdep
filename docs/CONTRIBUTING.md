# Contributing to Monorepo

Thank you for your interest in contributing to this project!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/monorepo-interdep.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/my-feature`

## Making Changes

### Workflow

1. Make your changes to the code
2. Run tests: `npm run test`
3. Run build: `npm run build`
4. Create a changeset: `npx changeset add`
5. Commit your changes: `git commit -m "feat: description of changes"`
6. Push to your fork and create a Pull Request

## Creating a Changeset

Changesets help us manage versioning and generate changelogs automatically.

```bash
npx changeset add
```

This will prompt you to:
- Select which packages changed
- Choose the type of change (major/minor/patch)
- Write a summary of the changes

### Changeset File Format

Changeset files are YAML with frontmatter:

```yaml
---
"@monorepo/package-name": minor
"@monorepo/other-package": patch
---

Description of the changes made in this changeset.
Can span multiple lines and include markdown formatting.
```

## Code Standards

- Use TypeScript for type safety
- Follow the existing code style
- Write tests for new features
- Update documentation when needed
- Keep commits atomic and well-described

## Package Structure

The monorepo is organized as follows:

```
packages/
├── logger/              (Level 1: Base utility)
├── utils/               (Level 1: Base utility)
├── ui-components/       (Level 2: Depends on Level 1)
├── api-client/          (Level 2: Depends on Level 1)
└── form/                (Level 3: Depends on Level 2 + Level 1)
```

## Available Scripts

- `npm run build` - Build all packages
- `npm run test` - Run tests in all packages
- `npm run dev` - Run dev mode in all packages
- `npm run clean` - Clean build artifacts and reinstall

## Pull Request Process

1. Update relevant documentation
2. Add or update tests
3. Ensure all tests pass: `npm run test`
4. Create a changeset: `npx changeset add`
5. Submit your PR with a clear description

## Publishing

Releases are handled automatically by GitHub Actions. Once your PR is merged:

1. Changesets are detected
2. A release PR is created automatically
3. When merged, packages are published to npm
4. A GitHub release is created with release notes

## Questions?

Open an issue or contact the maintainers via GitHub.
