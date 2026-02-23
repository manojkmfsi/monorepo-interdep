# Pipeline Testing Checklist

This checklist helps you verify the CI/CD pipeline is working correctly.

## ✅ Pre-Setup Verification

- [ ] Repository is initialized with git
- [ ] All package.json files are valid (no syntax errors)
- [ ] tsconfig.json exists in all packages
- [ ] Source files exist in `packages/*/src/`

## ✅ Local Testing

### Run these commands locally first:

```bash
# 1. Install dependencies
npm ci

# 2. Build all packages
npm run build

# 3. Run all tests
npm run test

# 4. Run type checking
npm run test:types
```

Commands:
- [ ] `npm ci` completes without errors
- [ ] `npm run build` builds all packages
- [ ] `npm run test` passes all tests
- [ ] `npm run test:types` has no type errors

### Test changesets locally:

```bash
# Create a test changeset
npm run changeset:add

# Generate version bumps
npm run changeset:version

# Verify CHANGELOG.md was created
ls -la CHANGELOG.md
```

- [ ] `npm run changeset:add` prompts correctly
- [ ] New file created in `.changeset/`
- [ ] `npm run changeset:version` updates versions
- [ ] CHANGELOG.md is generated

## ✅ GitHub Setup

### 1. Repository Secrets

Go to: **Settings → Secrets and variables → Actions**

- [ ] Add `NPM_TOKEN` secret
  - Get from: https://www.npmjs.com/settings/~/tokens
  - Type: Automation
  - Paste the token value

### 2. GitHub Pages

Go to: **Settings → Pages**

- [ ] Source is set to "GitHub Actions"
- [ ] Documentation will deploy to GitHub Pages

### 3. Branch Protection (Optional)

Go to: **Settings → Branches → Branch protection rules**

- [ ] Require status checks to pass
- [ ] Select workflows to require:
  - CI workflow
  - Tests
  - Type checking

## ✅ Workflow File Validation

All workflow files exist and are valid:

- [ ] `.github/workflows/ci.yml` - CI/CD pipeline
- [ ] `.github/workflows/docs.yml` - Documentation deployment
- [ ] `.github/workflows/release.yml` - NPM release pipeline

Test workflow syntax:

```bash
# Check YAML syntax
npm install -g yaml-validator
yaml-validator .github/workflows/*.yml
```

- [ ] All YAML files are valid

## ✅ Configuration Files

Verify all configuration files are in place:

- [ ] `.changeset/config.json` - Changeset configuration
- [ ] `.changeset/README.md` - Changeset instructions
- [ ] `.npmrc` - NPM registry configuration
- [ ] Package.json files have `publishConfig`

Check files:
```bash
ls -la .changeset/config.json
ls -la .npmrc
grep -r "publishConfig" packages/*/package.json
```

- [ ] `.changeset/config.json` exists
- [ ] `.npmrc` exists
- [ ] All packages have `publishConfig`

## ✅ Documentation Setup

- [ ] `/docs/` directory exists
- [ ] `docs/index.html` exists
- [ ] `docs/CONTRIBUTING.md` exists
- [ ] `README.md` exists in root
- [ ] `ARCHITECTURE.md` exists in root

Verify:
```bash
ls -la docs/
ls -la *.md
```

## ✅ Testing Workflows

### Test 1: Commit and Push

```bash
# 1. Add a test changeset
npm run changeset:add

# 2. Commit
git add .
git commit -m "chore: add test changeset [skip ci]"

# 3. Push
git push origin main
```

- [ ] Commit pushed successfully
- [ ] GitHub Actions starts automatically
- [ ] Check "Actions" tab for workflow status

### Test 2: Monitor CI Workflow

Go to: **Actions → CI → Latest Run**

- [ ] Workflow triggered on push
- [ ] All jobs completed
- [ ] Type checking passed
- [ ] Tests passed
- [ ] Build passed
- [ ] Security checks passed

### Test 3: Monitor Release Workflow

Go to: **Actions → Release to NPM → Latest Run**

Expected if changesets exist:
- [ ] Workflow triggered
- [ ] Test job passed
- [ ] Release job created or updated PR
- [ ] Check for "Release PR" in Pull Requests

### Test 4: Create Release PR

The release workflow should create a release PR:

- [ ] Pull Request titled "chore: bump package versions" appears
- [ ] PR contains version bumps
- [ ] PR contains CHANGELOG updates
- [ ] PR has all changesets listed

### Test 5: Merge Release PR (Optional)

To test full release:
1. Go to the release PR
2. Review changes
3. Merge the PR

- [ ] Release PR can be merged
- [ ] CI passes on release commit
- [ ] Release workflow publishes packages
- [ ] Packages appear on npm registry (with test npm account)

## ✅ Documentation Deployment

### Test 1: Trigger Docs Workflow

Edit a markdown file and push:

```bash
echo "# Updated" >> ARCHITECTURE.md
git add ARCHITECTURE.md
git commit -m "docs: update architecture"
git push origin main
```

Go to: **Actions → Deploy Documentation → Latest Run**

- [ ] Docs workflow triggered
- [ ] Build job completed
- [ ] Deploy job completed
- [ ] No errors in logs

### Test 2: Verify GitHub Pages

Go to: **Settings → Pages**

- [ ] Deployment status shows success
- [ ] Shows deployment URL
- [ ] Environment shows "github-pages"

Visit the GitHub Pages URL:

- [ ] Landing page loads (docs/index.html)
- [ ] Links to documentation work
- [ ] Styling looks correct
- [ ] Can navigate between docs

## ✅ Full Pipeline Test

Complete end-to-end test:

```bash
# 1. Make a code change
echo "console.log('test');" >> packages/utils/src/index.ts

# 2. Add changeset
npm run changeset:add
# Select: utils package
# Type: patch
# Message: "Add test log statement"

# 3. Commit and push
git add .
git commit -m "feat: add test feature"
git push origin main

# 4. Monitor workflows
# Go to Actions tab and watch:
# - CI workflow runs and passes
# - Release workflow detects changeset
# - Release PR is created
```

- [ ] CI workflow passes
- [ ] Release PR created
- [ ] Version bumped correctly
- [ ] Changelog generated
- [ ] (Optional) Merge PR to publish

## ✅ Cleanup

After testing, clean up test changes:

```bash
# Remove test changeset
rm .changeset/test-*.md

# Remove test code
git checkout packages/utils/src/index.ts

# Commit cleanup
git add .
git commit -m "chore: cleanup test changes"
git push origin main
```

- [ ] Test changes removed
- [ ] Cleanup committed

## ✅ Final Verification

- [ ] All local tests pass
- [ ] All workflows exist
- [ ] NPM_TOKEN is set
- [ ] GitHub Pages is configured
- [ ] Workflow files are valid YAML
- [ ] Documentation is deployed
- [ ] Packages can be published

## Next Steps

Once everything is verified:

1. **Real Development**
   - Make actual code changes
   - Create changesets for changes
   - Push to trigger workflows

2. **Monitoring**
   - Check Actions tab regularly
   - Review workflow logs
   - Monitor package releases on npm

3. **Maintenance**
   - Keep dependencies updated
   - Review and update workflows as needed
   - Monitor GitHub advisories

## Troubleshooting

If something fails:

1. **Check Workflow Logs**
   - Go to Actions tab
   - Click the failed workflow
   - Expand the failed step
   - Read error message

2. **Test Locally**
   - Run failing command locally
   - Try to reproduce issue
   - Fix code locally
   - Push updated code

3. **Review Configuration**
   - Check package.json syntax
   - Verify workflow YAML
   - Check secret is set correctly
   - Ensure file paths are correct

4. **Get Help**
   - Check documentation files
   - Review workflow comments
   - Check tool documentation
   - Open GitHub issue if needed

## Success! 🎉

Once all checks pass, your CI/CD pipeline is ready for production!

- Automated testing on every commit
- Automatic documentation deployment
- Automatic package releases to npm
- Full version management with changesets
