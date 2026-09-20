/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050707",
        void: {
          900: "#050707",
          850: "#080B0C",
          800: "#0D1214",
          750: "#12181B",
          700: "#182226",
          600: "#222F35",
        },
        brand: {
          green: "#00E599",
          mint: "#00FFA3",
          emerald: "#10B981",
          darkGreen: "#065F46",
          gold: "#00E599",
          silver: "#E2E8F0",
          platinum: "#F8FAFC",
          muted: "#94A3B8",
        },
      },
      boxShadow: {
        "glow-green": "0 0 35px -5px rgba(0, 229, 153, 0.45)",
        "glow-green-sm": "0 0 15px -2px rgba(0, 229, 153, 0.5)",
        "glow-gold": "0 0 35px -5px rgba(0, 229, 153, 0.45)",
        "glow-gold-sm": "0 0 15px -2px rgba(0, 229, 153, 0.5)",
        "glow-mint": "0 0 35px -5px rgba(0, 255, 163, 0.45)",
        "glow-mint-sm": "0 0 15px -2px rgba(0, 255, 163, 0.5)",
        "glow-subtle": "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ticker": "ticker 25s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
