import Link from "next/link"
import { Tab, Tabs, Box, Typography, Grid } from "@material-ui/core"
// import { findIndex } from "lodash"
// import useScrollSpy from "../../utils/useScrollSpy"
import CommandsGroup from "./types"
import { Command, CommandCard } from "../CommandCard"

interface ICommandsGrid {
  commandsGroups: CommandsGroup[]
}

export default function CommandsGrid({ commandsGroups }: ICommandsGrid): JSX.Element {
  // Sidebar
  // const active = useScrollSpy({ items: commandsGroups })
  // const activeIndex = active ? findIndex(commandsGroups, ["name", active]) : false
  const tabsHTML = commandsGroups.map(({ name }) => (
    <Link key={name} href={`#${name}`}>
      <Tab label={name} />
    </Link>
  ))

  // Grid
  function commandsFactory(scriptCommands: Command[]): JSX.Element {
    return (
      <Grid container spacing={3}>
        {scriptCommands.map((command: Command) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <CommandCard key={command.title} {...command} />
        ))}
      </Grid>
    )
  }
  function groupsFactory(groups: CommandsGroup[], isSubGroup = false) {
    return groups.map((group: CommandsGroup) => (
      <Box key={group.name} id={group.name}>
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
        {group.subGroups && groupsFactory(group.subGroups, true)}
      </Box>
    ))
  }

  const sidebarWidth = "200px"

  return (
    <>
      <Box position="fixed" width={sidebarWidth}>
        <Tabs orientation="vertical">
          {/* value={activeIndex} */}
          {tabsHTML}
        </Tabs>
      </Box>

      <Box marginLeft={sidebarWidth} paddingLeft={2} display="flex" flexDirection="column">
        {groupsFactory(commandsGroups)}
      </Box>
    </>
  )
}
