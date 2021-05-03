type Author = {
  name: string
  url: string
}

type Icon = {
  light?: string
  dark?: string
}

type Command = {
  identifier: string

  title: string
  description?: string
  descriptionHtml: string
  icon: Icon

  authors?: Author[]

  language: string
  isTemplate: boolean
  hasArguments: boolean

  path: string
  filename: string
}

interface CommandsGroup {
  name: string
  path: string
  scriptCommands: Command[]
  subGroups?: CommandsGroup[]
}
