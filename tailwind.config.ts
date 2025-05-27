import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: "var(--font-sans)",
      display: "var(--font-display)",
    },
    container: {
      padding: "1rem",
      center: true,
    },
    extend: {
      colors: {
        primary: "var(--colors-primary)",
        offwhite: "var(--colors-off-white)",
      },
    },
  },
  plugins: [],
} satisfies Config;
