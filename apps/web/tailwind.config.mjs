// apps/web/tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // 1. Scan app/web files
    "./{app,src,pages}/**/*.{js,jsx,ts,tsx}",
    
    // 2. CRUCIAL: Scan all shared UI package files
    // Adjust path if your shared package is named differently (e.g., packages/ui)
    "../../packages/ui/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {},
  },
  // In Tailwind v4, presets are often managed via the CSS import, 
  // but if you have a theme config, you can use `presets: [...]` here.
  // For this simple setup, no preset needed.
};