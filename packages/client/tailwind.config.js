module.exports = {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        'primaryBlue': '#4E69A3',
        'secondaryBlue': '#5085E8',
        'gray': {
          100: "#dadada",
          200: "#cdcdcd",
          300: "#c0c0c0",
          400: "#b4b4b4",
          500: "#a7a7a7",
          900: '#454545',
        },
        'white': "#D8D8D8"
      },
      fontFamily: {
        'montserrat': ['montserrat', 'sans-serif']
      }
    },
  },
  variants: {
    extend: {}
  },
  content: [
    "./src/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    plugins: [
      require('tailwindcss-debug-screens'),
      require("daisyui")
    ],
}
