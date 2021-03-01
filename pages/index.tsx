import Head from "next/head"
import CssBaseline from "@material-ui/core/CssBaseline"
import { StylesProvider } from "@material-ui/core/"
import TextField from "@material-ui/core/TextField"
import { ThemeProvider } from "@material-ui/core/styles"
import RayTheme from "../components/RayTheme"

export default function Home(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={RayTheme}>
        <CssBaseline />
        <Head>
          <title>Raycast Marketplace</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1>hello</h1>
          <TextField label="Language" />
        </main>
      </ThemeProvider>
    </StylesProvider>
  )
}
