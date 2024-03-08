/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          // DEFAULT: "1rem",
          // sm: "2rem",
          // md: "5rem",
          // lg: "4rem",
          // xl: "5rem",
          // "2xl": "6rem",
        },
        screens: {
          // md: "768px",
        },
      },
      colors: {
        accent: {
          light: "#fb7c2f33",
          DEFAULT: "#FB7C2F",
        },
        navLinks: {
          activeBg: "#FEFEFE",
          normalBg: "#FAFBFD",
          activeText: "#FF751D",
          normalText: "#000000",
          pendingText: "#00FF00",
        },
        main: "#000000",
        secondary: "#52555F",
        placeholder: "#A6ABB9",
        error: "#EB5757",
        light: "#ffffff",
        white: "#ffffff",
        expenses: "#E7192E",
        expenses2: "#E53935",
        incomes: "#407946",
        mainBg: "#F5F6FB",
        lightBg: "#F5F6FA",
        tableBorder: "#F5F6FB",
        inputBorder: "#F6F7FC",
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
        mmm: ["14px", "14px"],
      },
      letterSpacing: {
        // 2%
        small: "0.24px",
        medium: "0.48px",
        big: "0.56px",
      },
      screens: {
        dt: "1024px",
      },
    },
    plugins: [],
  },
};

// todo: remove extend at production
// todo - lg screen - 1024 for develop, 1280 for prod
// todo -rename some values
