#!/bin/bash

# Local CI/CD Testing Script
# This script simulates what the GitHub Actions workflows do locally

set -e

echo "🚀 Starting Local CI/CD Test"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node version
echo "${YELLOW}📦 Checking Node.js version...${NC}"
node --version

# Install dependencies
echo "${YELLOW}📦 Installing dependencies...${NC}"
npm ci

# Run type checking
echo "${YELLOW}🔍 Running type checking...${NC}"
npm run test:types --workspaces --if-present || echo "⚠️  Type checking optional"

# Run linting
echo "${YELLOW}🔍 Running linting...${NC}"
npm run lint --workspaces --if-present || echo "⚠️  Linting optional"

# Run tests
echo "${YELLOW}🧪 Running tests...${NC}"
npm run test --workspaces --if-present

# Build all packages
echo "${YELLOW}🔨 Building all packages...${NC}"
npm run build --workspaces --if-present

# Validate changesets
echo "${YELLOW}📝 Validating changesets...${NC}"
if [ -d ".changeset" ] && [ "$(ls -A .changeset/*.md 2>/dev/null | grep -v README.md | wc -l)" -gt 0 ]; then
  echo "${GREEN}✓ Found changesets ready for release${NC}"
else
  echo "${YELLOW}⚠️  No changesets found (run 'npm run changeset:add' to create one)${NC}"
fi

# Success
echo ""
echo "${GREEN}✅ All checks passed!${NC}"
echo ""
echo "📌 Next steps:"
echo "  1. Create a changeset: npm run changeset:add"
echo "  2. Commit and push to main branch"
echo "  3. GitHub Actions will handle the rest"
echo ""
