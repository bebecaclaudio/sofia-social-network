// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme') // Importe o tema padrão

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Adicione Roboto à família de fontes sans-serif
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans], // Coloca Roboto primeiro, com fallback para as fontes padrão
      },
      // Suas outras extensões de tema (cores, etc.)
      colors: {
        'sofia-green-light': '#C3EACB',
        'sofia-green-dark': '#0e3e20',
        'sofia-accent': '#2ECC71',
        'sofia-accent-dark': '#27ae60',
      }
    },
  },
  plugins: [],
}
// Adicione o plugin do Tailwind CSS Forms se necessário
// plugins: [
//   require('@tailwindcss/forms'),
// ],
