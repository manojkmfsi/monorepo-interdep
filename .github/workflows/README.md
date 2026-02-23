# GitHub Actions Workflows

This directory contains the GitHub Actions workflows for the monorepo's CI/CD pipeline.

## Workflows Overview

### 1. Continuous Integration (ci.yml)
**Purpose:** Test and validate code on every push and pull request

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Manual trigger via workflow dispatch

**Jobs:**
- `lint-and-test` - Runs on Node 18 & 20
  - Type checking
  - Linting
  - Tests
  - Builds
- `security` - Security checks with npm audit
- `code-quality` - Workspace structure validation

**Status:** ✅ Green = All checks pass | ❌ Red = Build failed

### 2. Documentation Deployment (docs.yml)
**Purpose:** Build and deploy documentation to GitHub Pages

**Triggers:**
- Changes to docs/, .md files
- Changes to this workflow file
- Manual trigger via workflow dispatch

**Jobs:**
- `build` - Builds documentation
- `deploy` - Deploys to GitHub Pages

**Deployment:**
- Automatically deployed to: `https://<owner>.github.io/<repo>/`
- Files: `/docs/` directory
- Index: `docs/index.html`

**Files Included:**
- README.md
- ARCHITECTURE.md
- QUICKSTART.md
- CONTRIBUTING.md
- Custom index.html with landing page

### 3. Release to NPM (release.yml)
**Purpose:** Automatically publish packages to npm based on changesets

**Triggers:**
- Changes to `packages/` directory
- Changes to `.changeset/` directory
- Manual trigger via workflow dispatch

**Jobs:**
- `test` - Run full test suite
- `release` - Uses @changesets/action to:
  - Detect changed packages
  - Update versions
  - Publish to npm
  - Create GitHub release
  - Generate changelog

**Changesets:**
- Workflow uses [@changesets/action](https://github.com/changesets/action)
- Automatically creates release PRs
- One-click merging for releases

## Configuration Files

### .changeset/config.json
Main configuration for changesets:
- Base branch: main
- Registry: npm
- Access: public
- Ignored packages: monodog

### .npmrc
NPM registry and authentication configuration:
- Registry: https://registry.npmjs.org/
- Scoped packages: @monorepo/*

### Secrets Required

Set these in GitHub repository settings:

1. **NPM_TOKEN** (Required for releases)
   - Create at: https://www.npmjs.com/settings/~/tokens
   - Type: Automation token
   - Set in: Settings → Secrets and variables → Actions

2. **GITHUB_TOKEN** (Auto-provided)
   - Used for GitHub API operations
   - No setup needed - provided automatically

## Environment Setup

### Local Testing

Run the test script to simulate CI locally:

```bash
./test-ci-locally.sh
```

This runs:
- Dependency installation
- Type checking
- Linting (if configured)
- Tests
- Builds
- Changeset validation

### Creating Changesets

When you've made changes to packages:

```bash
npm run changeset:add
```

Prompts you to:
1. Select changed packages
2. Choose version bump (major/minor/patch)
3. Write a description

Creates a file like: `.changeset/my-feature-xyz.md`

### Running Workflows Locally

Tests workflow steps before pushing:

```bash
# Install dependencies
npm ci

# Run type checks
npm run test:types --workspaces --if-present

# Run tests
npm run test --workspaces --if-present

# Build packages
npm run build --workspaces --if-present
```

## Workflow Status

Monitor in GitHub:
1. Go to **Actions** tab
2. Select workflow to view runs
3. Click run to see detailed logs
4. Red ✗ = failure, Green ✓ = success

## Package Publishing

### Requirements for Publishing

Each package needs:

```json
{
  "name": "@monorepo/package-name",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  }
}
```

### Publishing Process

1. Make changes to package
2. Create changeset: `npm run changeset:add`
3. Commit and push to main
4. CI workflow runs tests
5. Release workflow:
   - Bumps versions from changesets
   - Publishes to npm
   - Creates GitHub release
   - Updates CHANGELOG.md

### Manual Publishing (if needed)

```bash
npm run changeset:version
npm run changeset:publish
```

## Troubleshooting

### Workflow Won't Trigger
- Check branch name (main/develop)
- Verify workflow file syntax
- Check file paths in `paths:` filter
- View error logs in Actions tab

### NPM Publish Fails
- Verify `NPM_TOKEN` is set
- Check package name uniqueness
- Ensure version bump in changeset
- Verify `publishConfig` in package.json

### Tests Fail
- Check Node version compatibility
- Run locally: `npm run test`
- View workflow logs for errors
- Check package dependencies

### GitHub Pages Not Deploying
- Verify Pages uses "GitHub Actions" source
- Check docs/ folder exists
- Ensure index.html is valid
- Wait 1-2 minutes for deployment

## Performance Tips

1. **Cache Dependencies**
   - Workflows use `npm ci` for clean install
   - Cache: `npm` is pre-configured

2. **Skip Workflows**
   - Add `[skip ci]` to commit message
   - Prevents running unnecessary checks

3. **Conditional Steps**
   - Use `continue-on-error: true` for optional checks
   - Use `if:` conditions for job dependencies

## Security Notes

- `NPM_TOKEN` is a secret - never print it
- GitHub token is auto-scoped to repository
- Workflows run in isolated environments
- Use branch protection rules

## Further Reading

- [Changesets Documentation](https://github.com/changesets/changesets)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/package-json-and-package-locks)

## Support

For issues:
1. Check workflow logs
2. Review this documentation
3. Test locally with test script
4. Check tool documentation
