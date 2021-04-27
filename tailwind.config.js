/* eslint-disable */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        5.5: "1.375rem",
        15: "3.75rem",
      },
      colors: {
        ray: "#FF6363",
        darkGray: {
          500: "#101111",
          600: "#000000",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              a: {
                color: theme("colors.gray.500"),
              },
              code: {
                color: theme("colors.gray.500"),
              },
              "a code": {
                color: theme("colors.gray.500"),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require("nightwind")],
}
