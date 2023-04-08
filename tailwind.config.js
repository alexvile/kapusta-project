/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'accent': {
        light: '#fb7c2f33',
        DEFAULT: '#FB7C2F',
      },
      'main': '#000000',
      'secondary': '#52555F',
      'placeholder': '#A6ABB9',
      'error': '#EB5757',
      'light': '#ffffff',
      'expenses': '#E7192E',
      'income': '#407946',
      'bg-main': '#F5F6FB',
      'bg-input': '#F6F7FB',
      'chart': {
        DEFAULT: '#FF751D',
        light: '#FFDAC0'
      }
    },
    extend: {
      backgroundImage: {
        'home-page': "url('../public/img/bg-desktop.png')",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}

