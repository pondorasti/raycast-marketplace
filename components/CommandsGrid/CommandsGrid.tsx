import { useState, ChangeEvent } from "react"
import CommandsGroup from "./types"
import { Command, CommandCard } from "../CommandCard"

interface ICommandsGrid {
  commandsGroups: CommandsGroup[]
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ")
}

export default function CommandsGrid({ commandsGroups }: ICommandsGrid): JSX.Element {
  // Sidebar
  const tabsHTML = commandsGroups.map(({ name }) => (
    <a
      key={name}
      href={`#${name}`}
      className={classNames(
        false ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900",
        "flex p-2 text-sm font-medium rounded-md"
      )}
    >
      {name}
    </a>
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

      return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-5">{cards}</div>
    }

    return groups.map((group: CommandsGroup) => (
      <div key={group.name} id={group.name} className={classNames(hasAtLeastOneCard ? "block" : "hidden")}>
        <p
          className={classNames(
            isSubGroup ? "text-2xl" : "text-3xl",
            "bg-gray-50 -mx-4 px-4 font-bold py-3 z-10 sticky top-0"
          )}
        >
          {group.name}
        </p>
        {group.scriptCommands.length !== 0 && commandsFactory(group.scriptCommands)}

        {/* Render subGroups */}
        {group.subGroups && groupsFactory(group.subGroups, true)}
      </div>
    ))
  }

  const [searchQuery, setSearchQuery] = useState("")
  const handleSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    // setSearchQuery(event.target.value)
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="flex flex-shrink-0 sticky top-0" style={{ height: "fit-content" }}>
        <div className="flex flex-col w-48">
          <div className="flex-1 flex-col">
            <nav className="flex-1 px-2 space-y-1">{tabsHTML}</nav>
          </div>
        </div>
      </div>

      <div className="flex-col px-4">{groupsFactory(commandsGroups)}</div>
    </div>
  )
}
