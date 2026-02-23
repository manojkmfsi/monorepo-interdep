# Quick Reference Guide

## Common Commands

### Development
```bash
# Install dependencies
npm ci

# Build all packages
npm run build

# Run tests
npm run test

# Check types
npm run test:types

# Run in dev mode
npm run dev

# Clean build artifacts
npm run clean
```

### Changesets (Version Management)
```bash
# Create a new changeset
npm run changeset:add

# Generate version bumps
npm run changeset:version

# Publish to npm
npm run changeset:publish

# List pending changesets
npx changeset status
```

### Local Testing
```bash
# Test CI locally
./test-ci-locally.sh

# Test build
npm run build

# Test all
npm run test && npm run build
```

## Workflow Triggers

| Workflow | Trigger | When It Runs |
|----------|---------|-------------|
| CI | Push/PR to main/develop | Always |
| Docs | Changes to .md or docs/ | When docs change |
| Release | Changes to packages/ or .changeset/ | When packages change |

## GitHub Setup Checklist

- [ ] Add `NPM_TOKEN` secret
  - Go: Settings → Secrets and variables → Actions
  - Value: npm automation token from https://npmjs.com/settings/~/tokens

- [ ] Enable GitHub Pages
  - Go: Settings → Pages
  - Source: GitHub Actions

## Changeset Workflow

1. Make code changes
2. Run: `npm run changeset:add`
3. Select packages that changed
4. Choose: major / minor / patch
5. Describe your changes
6. Commit and push
7. GitHub creates release PR
8. Merge PR to auto-publish

## File Locations

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | Tests & builds |
| `.github/workflows/docs.yml` | Deploy docs to GitHub Pages |
| `.github/workflows/release.yml` | Publish to npm |
| `.changeset/config.json` | Changeset settings |
| `.npmrc` | NPM configuration |
| `SETUP.md` | Detailed setup guide |
| `TESTING_CHECKLIST.md` | Complete testing guide |
| `PIPELINE_SUMMARY.md` | This pipeline overview |

## GitHub Actions Links

| Section | URL |
|---------|-----|
| Workflows | Actions tab in GitHub |
| Secrets | Settings → Secrets and variables → Actions |
| Pages | Settings → Pages |
| Releases | Releases tab in GitHub |

## Documentation

| Doc | Location | Purpose |
|-----|----------|---------|
| Setup | `SETUP.md` | How to configure |
| Testing | `TESTING_CHECKLIST.md` | How to test |
| Workflows | `.github/workflows/README.md` | Workflow details |
| Contributing | `docs/CONTRIBUTING.md` | How to contribute |
| Changesets | `.changeset/README.md` | How to use changesets |

## Workflow Status

Check in **Actions** tab:
- 🟢 Green = Success
- 🔴 Red = Failed
- 🟡 Yellow = In Progress
- ⚪ Gray = Skipped

## Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| Workflow won't trigger | Check branch name, verify YAML syntax |
| NPM publish fails | Check NPM_TOKEN secret, verify publishConfig |
| Tests fail | Run locally: `npm run test` |
| Docs don't deploy | Check Pages settings, verify docs/ folder |
| Type errors | Run: `npm run test:types` |

## Important Notes

⚠️ **Before Publishing**
- Create changeset: `npm run changeset:add`
- Run tests locally: `npm run test`
- Build locally: `npm run build`

⚠️ **Keep Secret Safe**
- Never commit npm tokens
- Keep NPM_TOKEN value private
- Never share token

🎯 **Best Practices**
- Commit changesets with code changes
- Keep commits atomic
- Write clear change descriptions
- Test locally before pushing

## Version Bumping

| Type | Command | Usage |
|------|---------|-------|
| Patch | `patch` | Bug fixes (1.0.0 → 1.0.1) |
| Minor | `minor` | New features (1.0.0 → 1.1.0) |
| Major | `major` | Breaking changes (1.0.0 → 2.0.0) |

## Environment Variables

In GitHub Actions:
- `GITHUB_TOKEN` - Auto-provided (read/write)
- `NPM_TOKEN` - You must set this secret

## Monitoring

Watch real-time:
1. Go to **Actions** tab
2. Click active workflow
3. See logs as workflow runs
4. Check for errors

## After Merge

When release PR is merged:
1. ✅ Versions bump automatically
2. ✅ CHANGELOG.md updates
3. ✅ Packages publish to npm
4. ✅ GitHub release created
5. ✅ All automated!

## Resources

- [Changesets Docs](https://github.com/changesets/changesets)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [NPM Publishing](https://docs.npmjs.com/)

---

**Need help?** See:
- `SETUP.md` for detailed setup
- `TESTING_CHECKLIST.md` for testing
- `.github/workflows/README.md` for workflow details
