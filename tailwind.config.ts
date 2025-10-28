import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "var(--font-sans)"]
      },
      colors: {
        brand: {
          DEFAULT: "#4f46e5",
          subtle: "#eef2ff",
          bold: "#4338ca"
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
