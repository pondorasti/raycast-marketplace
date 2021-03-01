import { createMuiTheme } from "@material-ui/core/styles/"
import { Shadows } from "@material-ui/core/styles/shadows"

const themeOverrides = {
  palette: {
    info: {
      // blue
      main: "#0A84FF",
      dark: "#0A84FF",
    },
    text: {
      primary: "#FFFFFFE6", // label
      secondary: "#FFFFFF66", // secondary label
    },

    grey: {
      300: "#505050", // silence WCAG console.error()
      500: "#505050", // border color
      600: "#464646", // quaternary background
      700: "#2F2F30", // tertiary background
      800: "#1E1E1E", // secondary background
      900: "#141414", // background
    },

    action: {
      hoverOpacity: 0.2,
    },

    tonalOffset: 0,
    contrastThreshold: 0,
  },
  shadows: Array(25).fill("none") as Shadows,
  transitions: {
    duration: {
      shortest: 250, // IconButton
      shorter: 200,
      short: 250, // CardActionArea
      carousel: 750,
    },
  },
}

const RayTheme = createMuiTheme({
  ...themeOverrides,
  palette: {
    mode: "dark",
  },
  components: {
    // Textfield
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
  },
})

export default RayTheme
