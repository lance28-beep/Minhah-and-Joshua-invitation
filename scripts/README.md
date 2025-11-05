# Performance Audit Scripts

This directory contains scripts for auditing and analyzing the performance of the wedding invitation application.

## Available Scripts

### 1. `audit-performance.js`
Runs Lighthouse scans for both mobile and desktop configurations.

**Usage:**
```bash
# Start the development server first
pnpm dev

# In another terminal, run the audit
pnpm audit:performance

# Or with custom URL
BASE_URL=http://localhost:3000 node scripts/audit-performance.js
```

**Output:**
- `performance-reports/mobile.html` - Mobile Lighthouse report
- `performance-reports/mobile.report.json` - Mobile JSON data
- `performance-reports/desktop.html` - Desktop Lighthouse report
- `performance-reports/desktop.report.json` - Desktop JSON data

**Requirements:**
- Lighthouse CLI installed globally: `npm install -g lighthouse`
- Or use npx: `npx lighthouse ...`

---

### 2. `analyze-bundle.js`
Analyzes the production bundle to identify large chunks and optimization opportunities.

**Usage:**
```bash
pnpm audit:bundle
```

**Output:**
- Lists top 20 largest chunks
- Shows file sizes in KB and MB
- Sorted by size (largest first)

**What it does:**
1. Builds the production bundle
2. Analyzes `.next/static/chunks/` directory
3. Reports chunk sizes

---

### 3. `check-unused-deps.js`
Identifies potentially unused heavy dependencies.

**Usage:**
```bash
pnpm audit:deps
```

**Output:**
- Lists heavy dependencies that should be verified
- Suggests running `depcheck` for detailed analysis

**Recommended:**
```bash
# Install and run depcheck for detailed analysis
pnpm dlx depcheck
```

---

## Package.json Scripts

These scripts are available via `pnpm`:

```bash
# Run performance audit
pnpm audit:performance

# Analyze bundle
pnpm audit:bundle

# Check unused dependencies
pnpm audit:deps

# Run Lighthouse (manual)
pnpm lighthouse

# Run Lighthouse CI
pnpm lighthouse:ci
```

---

## Continuous Integration

### GitHub Actions Example

```yaml
name: Performance Audit

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm start &
      - run: sleep 10
      - run: pnpm lighthouse:ci
```

---

## Interpreting Results

### Lighthouse Scores

- **90-100:** Excellent
- **50-89:** Needs improvement
- **0-49:** Poor

### Bundle Sizes

- **< 200KB:** Excellent
- **200-500KB:** Good
- **500KB-1MB:** Needs optimization
- **> 1MB:** Poor

### Core Web Vitals

- **LCP (Largest Contentful Paint):** < 2.5s (good), < 4.0s (needs improvement)
- **FID (First Input Delay):** < 100ms (good), < 300ms (needs improvement)
- **CLS (Cumulative Layout Shift):** < 0.1 (good), < 0.25 (needs improvement)

---

## Troubleshooting

### Lighthouse not found
```bash
# Install globally
npm install -g lighthouse

# Or use npx
npx lighthouse http://localhost:3000
```

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
```

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

---

## Additional Tools

### Bundle Analyzer
For detailed bundle visualization:

```bash
# Install
pnpm add -D @next/bundle-analyzer

# Add to next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

# Run
ANALYZE=true pnpm build
```

### WebPageTest
For real-world testing:
- Visit https://www.webpagetest.org/
- Enter your URL
- Test from multiple locations

### Chrome DevTools
- Performance tab for runtime analysis
- Network tab for loading analysis
- Coverage tab for unused code detection

