import { Command } from "../CommandCard"

export default interface CommandsGroup {
  name: string
  path: string
  scriptCommands: Command[]
  subGroups?: CommandsGroup[]
}
