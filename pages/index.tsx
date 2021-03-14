import Head from "next/head"
import dynamic from "next/dynamic"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import CssBaseline from "@material-ui/core/CssBaseline"
import { StylesProvider, Box, Typography } from "@material-ui/core/"
import { ThemeProvider } from "@material-ui/core/styles"

import RayTheme from "../components/RayTheme"
import { CommandsGroup } from "../components/CommandsGrid"

// Required for using `window` and `document` from the scrollSpy utils
const CommandsGrid = dynamic(() => import("../components/CommandsGrid/CommandsGrid"), { ssr: false })

export default function Home({ commandsGroups }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  // console.log(commands[0].subGroups[0].scriptCommands[0].title)

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={RayTheme}>
        <CssBaseline />
        <Head>
          <title>Raycast Marketplace</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Box padding="64px">
            <Typography variant="h3" textAlign="center" paddingBottom={4}>
              Unofficial Marketplace <br /> for Raycast Script Commands
            </Typography>

            <CommandsGrid commandsGroups={commandsGroups} />
          </Box>
        </main>
      </ThemeProvider>
    </StylesProvider>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const api = "https://raw.githubusercontent.com/raycast/script-commands/master/commands/extensions.json"
  const result = await fetch(api)
  const data = await result.json()
  const commandsGroups: CommandsGroup[] = data.groups
  commandsGroups.sort((a, b) => (a.name > b.name ? 1 : -1))

  return {
    props: { commandsGroups },
  }
}
