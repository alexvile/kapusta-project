/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          light: "#fb7c2f33",
          DEFAULT: "#FB7C2F",
        },
        main: "#000000",
        secondary: "#52555F",
        placeholder: "#A6ABB9",
        error: "#EB5757",
        light: "#ffffff",
        white: "#ffffff",
        expenses: "#E7192E",
        income: "#407946",
        "bg-main": "#F5F6FB",
        lightBg: "#F5F6FA",
        "bg-input": "#F6F7FB",
        chart: {
          DEFAULT: "#FF751D",
          light: "#FFDAC0",
        },
      },
      backgroundImage: {
        "home-page": "url('../public/img/bg-desktop.png')",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        label: ["12px", "12px"],
      },
      letterSpacing: {
        small: "0.24px",
        medium: "0.48px",
      },
      screens: {
        dt: "1024px",
      },
    },
    plugins: [],
  },
};

// todo: remove extend at production
