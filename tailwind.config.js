/* eslint-disable */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        15: "3.75rem",
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
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}
