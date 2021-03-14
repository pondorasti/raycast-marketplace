import { createMuiTheme } from "@material-ui/core/styles/"
import { Shadows } from "@material-ui/core/styles/shadows"

const paletteOverrides = {
  info: {
    // blue
    main: "#0A84FF",
    dark: "#0A84FF",
  },
  text: {
    primary: "#FFFFFFE6", // label
    secondary: "#FFFFFF66", // secondary label
  },

  background: {
    paper: "#18191a",
    default: "#000000",
  },

  action: {
    hoverOpacity: 0.2,
  },

  tonalOffset: 0,
  contrastThreshold: 0,
}

const RayTheme = createMuiTheme({
  palette: {
    mode: "dark",
    ...paletteOverrides,
  },
  shadows: Array(25).fill("none") as Shadows,
  transitions: {
    duration: {
      shortest: 250, // IconButton
      shorter: 200,
      short: 250, // CardActionArea
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: "12px",
        },
      },
    },
    MuiTextField: {
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
