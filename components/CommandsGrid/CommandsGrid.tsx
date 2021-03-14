import { useState, ChangeEvent } from "react"
import Link from "next/link"
import { Tab, Tabs, Box, Typography, Grid, TextField } from "@material-ui/core"
import CommandsGroup from "./types"
import { Command, CommandCard } from "../CommandCard"

interface ICommandsGrid {
  commandsGroups: CommandsGroup[]
}

export default function CommandsGrid({ commandsGroups }: ICommandsGrid): JSX.Element {
  // Sidebar
  const tabsHTML = commandsGroups.map(({ name }) => (
    <Link key={name} href={`#${name}`}>
      <Tab label={name} />
    </Link>
  ))

  // Grid
  function shouldHideCard(command: Command): boolean {
    return command.title.toLowerCase().includes("shell")
  }

  function groupsFactory(groups: CommandsGroup[], isSubGroup = false) {
    let hasAtLeastOneCard = false

    // Inner factory for building the Grid of Cards
    function commandsFactory(scriptCommands: Command[]): JSX.Element {
      const cards = scriptCommands.map((command: Command) => {
        const isHidden = shouldHideCard(command)

        // Logic for detecting if at least one card is shown
        hasAtLeastOneCard = hasAtLeastOneCard || !isHidden

        // TODO: use props={command} after fixing null icon
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <CommandCard key={command.title} {...command} isHidden={isHidden} />
      })

      return (
        <Grid container spacing={3}>
          {cards}
        </Grid>
      )
    }

    return groups.map((group: CommandsGroup) => (
      <Box key={group.name} id={group.name} display={hasAtLeastOneCard ? "block" : "none"}>
        <Typography
          key={group.name}
          variant={isSubGroup ? "h6" : "h5"}
          position="sticky"
          top="120px"
          zIndex={1}
          bgcolor="background.default"
        >
          {group.name}
        </Typography>
        {group.scriptCommands.length !== 0 && commandsFactory(group.scriptCommands)}

        {/* Render subGroups */}
        {group.subGroups && groupsFactory(group.subGroups, true)}
      </Box>
    ))
  }

  const sidebarWidth = "200px"
  const [searchQuery, setSearchQuery] = useState("")
  const handleSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <>
      <Box
        position="sticky"
        top="0"
        paddingTop={4}
        paddingBottom={4}
        zIndex={10}
        width="100%"
        bgcolor="background.default"
      >
        <TextField label="Search" value={searchQuery} onChange={handleSearchQuery} fullWidth />
      </Box>

      <Box display="flex">
        <Box position="sticky" top="120px" height="fit-content" width={sidebarWidth}>
          <Tabs orientation="vertical">{tabsHTML}</Tabs>
        </Box>
        <Box paddingLeft={2} display="flex" flexDirection="column">
          {groupsFactory(commandsGroups)}
        </Box>
      </Box>
    </>
  )
}
