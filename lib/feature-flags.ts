/**
 * Feature Flags for Performance Optimization
 * 
 * Use these flags to conditionally disable heavy features for better performance.
 * Set via environment variables or feature detection.
 */

// Check if user prefers reduced motion
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

// Check device capabilities
const isLowEndDevice = typeof window !== 'undefined' 
  ? (navigator.hardwareConcurrency || 4) <= 2 || 
    (navigator.deviceMemory || 4) <= 2
  : false;

export const featureFlags = {
  // Disable Three.js background animation on low-end devices or reduced motion
  enableSilkBackground: !prefersReducedMotion && !isLowEndDevice,
  
  // Enable background music (can be disabled for better performance)
  enableBackgroundMusic: process.env.NEXT_PUBLIC_ENABLE_MUSIC !== 'false',
  
  // Enable GSAP animations (can be disabled for better performance)
  enableGSAPAnimations: !prefersReducedMotion,
  
  // Lazy load heavy components
  lazyLoadComponents: true,
  
  // Enable image optimization
  enableImageOptimization: true,
} as const;

export type FeatureFlag = keyof typeof featureFlags;

