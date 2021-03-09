type Author = {
  name: string
  url: string
}

type Icon = {
  light?: string
  dark?: string
}

type Command = {
  title: string
  description?: string
  icon: Icon

  authors?: Author[]

  language: string
  isTemplate: boolean
  hasArguments: boolean
}

export default Command
