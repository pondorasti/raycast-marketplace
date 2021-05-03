/* eslint-disable */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    nightwind: {
      typography: {
        color: "#c2c7ca",
        h1: {
          color: "#f4f4f6",
        },
        h2: {
          color: "#f4f4f6",
        },
        h3: {
          color: "#f4f4f6",
        },
        h4: {
          color: "#f4f4f6",
        },
        pre: {
          color: "gray.200",
          backgroundColor: "#18191a",
        },
        a: {
          color: "gray.400",
        },
        code: {
          color: "gray.400",
        },
        "a code": {
          color: "gray.400",
        },
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        5.5: "1.375rem",
        15: "3.75rem",
        34: "8.5rem",
      },
      colors: {
        ray: "#FF6363",
        darkGray: {
          500: "#101111",
          600: "#000000",
          800: "#171717",
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
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("nightwind"),
    require("@tailwindcss/line-clamp"),
  ],
}
