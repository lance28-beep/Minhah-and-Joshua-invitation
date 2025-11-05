#!/usr/bin/env node
/**
 * Performance Audit Script
 * Runs Lighthouse scans and generates performance reports
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(process.cwd(), 'performance-reports');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🚀 Starting Performance Audit...\n');
console.log(`Target URL: ${BASE_URL}\n`);

// Check if Lighthouse CLI is installed
try {
  execSync('which lighthouse', { stdio: 'ignore' });
} catch (e) {
  console.error('❌ Lighthouse CLI not found. Install with: npm install -g lighthouse');
  console.log('   Or use: npx lighthouse --version');
  process.exit(1);
}

// Run Lighthouse for mobile
console.log('📱 Running Lighthouse (Mobile)...');
try {
  execSync(
    `lighthouse ${BASE_URL} ` +
    `--output=html,json ` +
    `--output-path=${OUTPUT_DIR}/mobile ` +
    `--only-categories=performance,accessibility,best-practices,seo ` +
    `--preset=desktop ` +
    `--chrome-flags="--headless --no-sandbox" ` +
    `--quiet`,
    { stdio: 'inherit' }
  );
  console.log('✅ Mobile scan complete\n');
} catch (e) {
  console.error('❌ Mobile scan failed:', e.message);
}

// Run Lighthouse for desktop
console.log('🖥️  Running Lighthouse (Desktop)...');
try {
  execSync(
    `lighthouse ${BASE_URL} ` +
    `--output=html,json ` +
    `--output-path=${OUTPUT_DIR}/desktop ` +
    `--only-categories=performance,accessibility,best-practices,seo ` +
    `--preset=desktop ` +
    `--chrome-flags="--headless --no-sandbox" ` +
    `--quiet`,
    { stdio: 'inherit' }
  );
  console.log('✅ Desktop scan complete\n');
} catch (e) {
  console.error('❌ Desktop scan failed:', e.message);
}

console.log(`\n📊 Reports saved to: ${OUTPUT_DIR}/`);
console.log('   - mobile.html / mobile.report.json');
console.log('   - desktop.html / desktop.report.json');

