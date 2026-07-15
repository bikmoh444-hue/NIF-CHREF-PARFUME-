import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F6F4",
        ink: "#1A1A1A",
        gold: "#B8935F",
        "gold-light": "#D4B896",
        body: "#2B2B2B",
        muted: "#6B6B6B",
        line: "#E5E3DF"
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        arabic: ["var(--font-arabic)", "Tahoma", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(26, 26, 26, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
