import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: '1rem',
      center: true,
    },
    extend: {
      colors: {
        primary: 'var(--colors-primary)',
      },
    },
  },
  plugins: [],
} satisfies Config;
