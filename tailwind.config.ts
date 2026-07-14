import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "#7C3AED",
          foreground: "#FFFFFF"
        },

        secondary: {
          DEFAULT: "#2563EB",
          foreground: "#FFFFFF"
        },

        card: {
          DEFAULT: "#111827",
          foreground: "#F9FAFB"
        }
      },

      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem"
      }
    }
  },
  plugins: []
};

export default config;
