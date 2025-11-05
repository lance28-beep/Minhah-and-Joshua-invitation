#!/usr/bin/env node
/**
 * Bundle Analyzer Script
 * Analyzes bundle sizes and identifies optimization opportunities
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Analyzing bundle sizes...\n');

// Build the project first
console.log('🔨 Building project...');
try {
  execSync('pnpm build', { stdio: 'inherit' });
} catch (e) {
  console.error('❌ Build failed:', e.message);
  process.exit(1);
}

// Analyze .next directory
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  console.error('❌ .next directory not found. Build may have failed.');
  process.exit(1);
}

console.log('\n📊 Bundle Analysis:\n');

// Analyze static chunks
const staticDir = path.join(nextDir, 'static/chunks');
if (fs.existsSync(staticDir)) {
  const chunks = fs.readdirSync(staticDir);
  const chunkSizes = chunks
    .map(file => {
      const filePath = path.join(staticDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        sizeKB: (stats.size / 1024).toFixed(2),
        sizeMB: (stats.size / (1024 * 1024)).toFixed(2),
      };
    })
    .sort((a, b) => b.size - a.size)
    .slice(0, 20);

  console.log('Top 20 Largest Chunks:');
  console.log('─'.repeat(60));
  chunkSizes.forEach((chunk, i) => {
    console.log(`${(i + 1).toString().padStart(2)}. ${chunk.name.padEnd(40)} ${chunk.sizeMB} MB (${chunk.sizeKB} KB)`);
  });
}

console.log('\n💡 Tip: Use @next/bundle-analyzer for detailed visualization');
console.log('   Add to next.config.mjs:');
console.log('   const withBundleAnalyzer = require("@next/bundle-analyzer")({');
console.log('     enabled: process.env.ANALYZE === "true",');
console.log('   });');

