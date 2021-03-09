import Head from "next/head"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import CssBaseline from "@material-ui/core/CssBaseline"
import { StylesProvider, Grid, Box, Typography } from "@material-ui/core/"
import { ThemeProvider } from "@material-ui/core/styles"

import RayTheme from "../components/RayTheme"
import { Command } from "../components/CommandCard"
import CommandCard from "../components/CommandCard/CommandCard"

interface CommandsGroup {
  name: string
  path: string
  scriptCommands: Command[]
  subGroups?: CommandsGroup[]
}

export default function Home({ commandsGroups }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  // console.log(commands[0].subGroups[0].scriptCommands[0].title)

  function commandsFactory(scriptCommands: Command[]): JSX.Element {
    return (
      <Grid container spacing={2}>
        {scriptCommands.map((command: Command) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <CommandCard key={command.title} {...command} />
        ))}
      </Grid>
    )
  }

  function groupsFactory(groups: CommandsGroup[], isSubGroup = false) {
    return groups.map((group: CommandsGroup) => (
      <div key={group.name}>
        <Typography key={group.name} variant={isSubGroup ? "h6" : "h5"}>
          {group.name}
        </Typography>
        {group.scriptCommands.length !== 0 && commandsFactory(group.scriptCommands)}
        {group.subGroups && groupsFactory(group.subGroups, true)}
      </div>
    ))
  }

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
          <Box display="flex" flexDirection="column">
            {groupsFactory(commandsGroups)}
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

  return {
    props: { commandsGroups },
  }
}
