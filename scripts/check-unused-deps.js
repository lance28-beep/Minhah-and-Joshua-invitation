#!/usr/bin/env node
/**
 * Check for unused dependencies
 * Identifies potentially unused packages in package.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJson = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
);

const dependencies = Object.keys(packageJson.dependencies || {});
const devDependencies = Object.keys(packageJson.devDependencies || {});

console.log('🔍 Checking for unused dependencies...\n');

// Heavy dependencies that might be unused
const heavyDeps = [
  'expo',
  'expo-asset',
  'expo-file-system',
  'expo-gl',
  'react-native',
  'ogl',
  '@react-three/fiber',
  'three',
  'motion',
  'recharts',
];

console.log('⚠️  Heavy dependencies to verify:');
heavyDeps.forEach(dep => {
  if (dependencies.includes(dep) || devDependencies.includes(dep)) {
    console.log(`   - ${dep}`);
  }
});

console.log('\n💡 Run: npx depcheck to find unused dependencies');
console.log('   Or use: pnpm dlx depcheck');

