# CI/CD Pipeline Setup Guide

This guide walks you through setting up the GitHub Actions workflows for this monorepo.

## Overview

The monorepo includes three main workflows:

1. **CI (Continuous Integration)** - `ci.yml`
2. **Documentation Deployment** - `docs.yml`
3. **NPM Release** - `release.yml`

## Prerequisites

- GitHub repository with Actions enabled
- NPM account for publishing packages
- Node.js 18 or later

## Setup Steps

### 1. NPM Token Configuration

To publish packages to npm, you need to configure your npm authentication token:

**Steps:**
1. Go to https://www.npmjs.com/settings/~/tokens and create a new token
2. Use an "Automation" token for CI/CD
3. Copy the token value
4. In GitHub repository:
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
   - Click **Add secret**

### 2. GitHub Pages Configuration

To enable GitHub Pages documentation deployment:

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: Select **GitHub Actions**
3. The `docs.yml` workflow will automatically deploy on pushes to main

### 3. Creating Changesets

Changesets manage versioning and changelogs automatically.

**To add a changeset:**

```bash
npm run changeset:add
# or
npx changeset add
```

**What happens:**
- You'll be prompted to select changed packages
- Choose version bump (major/minor/patch)
- Write a summary of changes
- A new markdown file is created in `.changeset/`

**Example changeset file:**
```yaml
---
"@monorepo/logger": patch
"@monorepo/utils": minor
---

Added new logging utilities and improved error handling in utils
```

### 4. Workflow Triggers

#### CI Workflow (ci.yml)
- Triggers on: Push to main/develop, Pull Requests to main/develop
- Tests Node 18 and 20
- Runs linting, type checking, tests, and builds
- Runs on every commit automatically

#### Docs Workflow (docs.yml)
- Triggers on: Changes to docs, markdown files, or workflow file
- Builds and deploys to GitHub Pages
- Runs automatically on push to main
- Can be triggered manually via workflow dispatch

#### Release Workflow (release.yml)
- Triggers on: Changes to `packages/` or `.changeset/` directories
- Only runs when changesets are detected
- Publishes packages to npm
- Creates GitHub releases with notes
- Runs only on push to main branch

## Testing Locally

### Test the build
```bash
npm install
npm run build
```

### Test the tests
```bash
npm run test
```

### Test type checking
```bash
npm run test:types
```

### Create and test changesets
```bash
npm run changeset:add
npm run changeset:version
```

## Workflow Files Location

All workflow files are in: `.github/workflows/`

- `ci.yml` - Continuous Integration
- `docs.yml` - Documentation Deployment
- `release.yml` - NPM Release Pipeline

## Documentation

Documentation files are stored in `/docs/` directory:

- `index.html` - Landing page
- `README.md` - Project README
- `ARCHITECTURE.md` - Architecture documentation
- `CONTRIBUTING.md` - Contribution guidelines

These are automatically deployed to GitHub Pages.

## Monitoring Workflows

1. Go to repository **Actions** tab
2. Select a workflow to view history
3. Click on a run to see logs
4. Red ✗ indicates failure
5. Green ✓ indicates success

## Common Issues

### Workflow doesn't trigger
- Check branch protection rules
- Ensure you're pushing to `main` or `develop`
- Verify workflow file syntax (YAML)

### NPM publish fails
- Check `NPM_TOKEN` is set correctly
- Verify package names don't conflict on npm
- Ensure `publishConfig` is in package.json

### GitHub Pages doesn't deploy
- Check Pages settings use "GitHub Actions"
- Verify `docs.yml` workflow succeeded
- Wait a few minutes for deployment

## Package Configuration

Each package in `packages/` needs:

```json
{
  "name": "@monorepo/package-name",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  },
  "scripts": {
    "build": "wireit",
    "test": "node --test **/*.test.js",
    "test:types": "tsc --noEmit"
  }
}
```

## Advanced Configuration

### Changesets Configuration

File: `.changeset/config.json`

Key settings:
- `baseBranch`: The main branch
- `access`: "public" for publicly available packages
- `ignore`: Packages to skip (e.g., monodog)
- `updateInternalDependencies`: How to version internal dependencies

### Custom Release Strategy

To customize how releases work, edit `.github/workflows/release.yml`:

- Modify version bumping logic
- Add pre-release steps
- Change publish conditions
- Add notifications

## Next Steps

1. ✅ Configure `NPM_TOKEN` secret
2. ✅ Verify GitHub Pages settings
3. ✅ Test workflow locally with `npm run build`
4. ✅ Create first changeset with `npm run changeset:add`
5. ✅ Push to main branch to trigger workflows
6. ✅ Monitor workflows in Actions tab

## Support

For issues or questions:
1. Check workflow logs in GitHub Actions
2. Review this setup guide
3. Check Changesets documentation: https://github.com/changesets/changesets
4. GitHub Actions docs: https://docs.github.com/en/actions
