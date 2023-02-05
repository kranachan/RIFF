/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/*.{vue,js,ts}', './src/**/*.{vue,js,ts}'],
  darkMode: 'jit',
  theme: {
    colors: {
      primary: 'rgb(var(--colors-primary))',
      foreground: 'rgb(var(--colors-foreground))',
      background: 'rgb(var(--colors-background))',
      surface: 'rgb(var(--colors-surface))',
      placeholder: 'rgb(var(--colors-placeholder))',
      hint: 'rgb(var(--colors-hint))'
    },
  },
  plugins: [],
}
