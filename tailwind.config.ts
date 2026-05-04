import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          DEFAULT: "#3b82f6",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          hover: "#2563eb"
        },
        success: "#059669",
        warning: "#d97706",
        danger: "#dc2626"
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem"
      },
      fontFamily: {
        display: ['"DM Sans"', '"Inter"', 'sans-serif'],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"]
      },
      boxShadow: {
        'card':       '0 0 0 1px rgba(15,23,42,0.06), 0 2px 4px rgba(15,23,42,0.03), 0 8px 20px -6px rgba(15,23,42,0.07)',
        'card-hover': '0 0 0 1px rgba(37,99,235,0.14), 0 4px 8px rgba(15,23,42,0.04), 0 16px 32px -8px rgba(37,99,235,0.11)',
        'nav':        '0 1px 0 rgba(15,23,42,0.07)',
        'btn-primary':'0 1px 2px rgba(15,23,42,0.05), 0 3px 8px -2px rgba(37,99,235,0.35)',
      },
      transitionDuration: {
        DEFAULT: "200ms"
      }
    }
  },
  plugins: []
};

export default config;
