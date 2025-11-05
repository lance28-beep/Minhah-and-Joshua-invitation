# Unused Dependencies Analysis

This document lists potentially unused dependencies that should be reviewed and removed if not needed.

## High Priority (Large Size, Likely Unused)

### 1. Expo Packages (~50-100MB total)
**Packages:**
- `expo` (latest)
- `expo-asset` (latest)
- `expo-file-system` (latest)
- `expo-gl` (latest)
- `react-native` (latest)

**Size:** ~50-100MB  
**Status:** ⚠️ Likely unused - This is a Next.js web application, not a React Native app

**Action Required:**
1. Search codebase for imports from these packages
2. If no imports found, remove from package.json
3. Run `pnpm install` to update lockfile

**Commands:**
```bash
# Check for usage
grep -r "from ['\"]expo" .
grep -r "from ['\"]react-native" .

# If unused, remove
pnpm remove expo expo-asset expo-file-system expo-gl react-native
```

**Impact:** ~50-100MB saved in node_modules

---

### 2. OGL (~200KB)
**Package:** `ogl` (^1.0.11)

**Size:** ~200KB  
**Status:** ⚠️ Possibly unused - Three.js is already present for WebGL

**Action Required:**
1. Search for `ogl` imports
2. Check if used in any components
3. Remove if unused

**Commands:**
```bash
# Check for usage
grep -r "from ['\"]ogl" .
grep -r "import.*ogl" .

# If unused, remove
pnpm remove ogl
```

**Impact:** ~200KB saved in bundle

---

### 3. Motion (~150KB)
**Package:** `motion` (latest)

**Size:** ~150KB  
**Status:** ⚠️ Possibly unused - GSAP is already present for animations

**Action Required:**
1. Search for `motion` imports
2. Check if used in any components
3. Remove if unused

**Commands:**
```bash
# Check for usage
grep -r "from ['\"]motion" .
grep -r "import.*motion" .

# If unused, remove
pnpm remove motion
```

**Impact:** ~150KB saved in bundle

---

## Medium Priority (Medium Size, Check Usage)

### 4. Recharts (~300KB)
**Package:** `recharts` (2.15.4)

**Size:** ~300KB  
**Status:** ⚠️ Check if used in dashboard

**Action Required:**
1. Check if used in `app/dashboard/page.tsx`
2. If only used in dashboard, ensure it's not in main bundle
3. If not used, remove

**Commands:**
```bash
# Check for usage
grep -r "from ['\"]recharts" .
grep -r "import.*recharts" .

# If unused in main app, consider lazy loading or removing
```

**Impact:** ~300KB saved in bundle (if not used)

---

## Low Priority (Small Size, Keep if Used)

### 5. Three.js & React Three Fiber (~500KB)
**Packages:**
- `three` (latest)
- `@react-three/fiber` (latest)

**Size:** ~500KB combined  
**Status:** ✅ Used - Required for Silk background animation

**Action:** Keep - Already optimized with lazy loading

---

### 6. GSAP (~100KB)
**Package:** `gsap` (^3.13.0)

**Size:** ~100KB  
**Status:** ✅ Used - Required for BounceCards animations

**Action:** Keep - Already optimized with lazy loading

---

## How to Check for Unused Dependencies

### Method 1: Using depcheck
```bash
# Install depcheck
pnpm add -D depcheck

# Run analysis
pnpm dlx depcheck
```

### Method 2: Manual Search
```bash
# Search for package imports
grep -r "from ['\"]package-name" .
grep -r "import.*package-name" .
grep -r "require(['\"]package-name" .
```

### Method 3: Bundle Analysis
```bash
# Build and analyze bundle
pnpm build
pnpm audit:bundle

# Check which packages are included
```

---

## Recommended Removal Order

1. **First:** Remove Expo packages (if unused)
   - Largest impact: ~50-100MB
   - Low risk if unused

2. **Second:** Remove OGL (if unused)
   - Medium impact: ~200KB
   - Low risk if unused

3. **Third:** Remove Motion (if unused)
   - Medium impact: ~150KB
   - Low risk if unused

4. **Fourth:** Review Recharts usage
   - Check if only used in dashboard
   - Ensure lazy loading if only in dashboard

---

## After Removal

After removing unused dependencies:

1. **Test the application:**
   ```bash
   pnpm build
   pnpm start
   ```

2. **Check for errors:**
   - Build errors
   - Runtime errors
   - Missing imports

3. **Verify bundle size:**
   ```bash
   pnpm audit:bundle
   ```

4. **Run Lighthouse:**
   ```bash
   pnpm lighthouse
   ```

5. **Test all features:**
   - Homepage
   - Dashboard (if applicable)
   - All interactive components

---

## Summary

**Potential Savings:**
- Expo packages: ~50-100MB (if unused)
- OGL: ~200KB (if unused)
- Motion: ~150KB (if unused)
- Recharts: ~300KB (if unused in main app)

**Total Potential Savings:** ~50-100MB + ~650KB

**Estimated Bundle Size Reduction:** 10-20% if all unused packages are removed

---

**Note:** Always test thoroughly after removing dependencies. Some packages may be used indirectly or in ways that aren't immediately obvious from a simple grep search.

