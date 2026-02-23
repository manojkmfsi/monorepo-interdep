# Example changeset template
# Remove this file after creating your first real changeset

This is the .changeset directory. To create a changeset, run:

```bash
npx changeset add
```

This will prompt you to select the packages that changed and the type of change (major/minor/patch).

Example changeset file (e.g., `amazing-feature.md`):

```
---
"@monorepo/logger": patch
"@monorepo/utils": patch
"@monorepo/ui-components": minor
---

Added new logging utilities and fixed bug in utils package
```

For more information, visit: https://github.com/changesets/changesets
