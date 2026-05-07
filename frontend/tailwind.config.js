/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#0f0e0c',
          soft: '#2a2824',
          muted: '#6b6860',
          faint: '#b8b5ae',
        },
        cream: {
          DEFAULT: '#faf7f2',
          warm: '#f4efe6',
          deep: '#ece5d8',
        },
        amber: {
          DEFAULT: '#d4850a',
          light: '#f5b942',
          pale: '#fef3da',
        },
        teal: {
          DEFAULT: '#0d7a6e',
          light: '#1aab9b',
          pale: '#d6f5f2',
        },
      },
      boxShadow: {
        card: '0 2px 8px rgba(15,14,12,0.08), 0 0 1px rgba(15,14,12,0.04)',
        'card-hover': '0 8px 24px rgba(15,14,12,0.12), 0 0 1px rgba(15,14,12,0.06)',
        lifted: '0 16px 40px rgba(15,14,12,0.15)',
      },
    },
  },
  plugins: [],
};
