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
      fontSize:{
        xxs: '0.5rem',
      },
      colors: {
        'primaryBackground': "#242526",
        'secondaryBackground': "#3a3b3c",
        'tertiaryBackground': "#252f3c",
        'iconFill': "#acafb4",
        'icons': "#8f9295",
        'accent': "#38393a",
        'primaryHighlight': "#0084ff",
        'secondaryHighlight': "#3e4042",
        'white': "#e4e6eb",
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
