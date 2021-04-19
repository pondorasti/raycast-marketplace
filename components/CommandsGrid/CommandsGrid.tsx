import { useState, useCallback, ChangeEvent, useRef } from "react"
import { SearchIcon } from "@heroicons/react/solid"
import debounce from "lodash.debounce"
import CommandsGroup from "./types"
import { Command, CommandCard } from "../CommandCard"

interface ICommandsGrid {
  commandsGroups: CommandsGroup[]
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ")
}

export default function CommandsGrid({ commandsGroups }: ICommandsGrid): JSX.Element {
  const searchInputRef = useRef<HTMLFormElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearch = useCallback(
    debounce((newValue: string) => setSearchQuery(newValue), 200),
    []
  )
  const handleSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    debouncedSearch(event.target.value.toLowerCase())
  }

  // Sidebar
  const tabsHTML = commandsGroups.map(({ name }) => (
    <a
      key={name}
      href={`#${name}`}
      className={classNames(
        // false ? "bg-gray-100 text-gray-900" :
        "text-gray-600 hover:bg-gray-200 hover:text-gray-900",
        "flex p-2 text-sm font-medium rounded-md"
      )}
      onClick={() => {
        searchInputRef.current?.reset()
        setSearchQuery("")
      }}
    >
      {name}
    </a>
  ))

  // Grid
  function groupsFactory(groups: CommandsGroup[], isSubGroup = false): JSX.Element[] {
    // Inner factory for building the Grid of Cards
    function commandsFactory(group: CommandsGroup, isSubGroupPrime = false): JSX.Element {
      const filteredScriptCommands = group.scriptCommands.filter((command) => {
        const filteredAuthors = command.authors?.filter((author) => author.name.toLowerCase().includes(searchQuery))
        return (
          command.title.toLowerCase().includes(searchQuery) ||
          command.description?.toLowerCase().includes(searchQuery) ||
          command.language.toLowerCase().includes(searchQuery) ||
          (command.isTemplate && "template".includes(searchQuery)) ||
          (command.hasArguments && "arguments".includes(searchQuery)) ||
          (filteredAuthors !== undefined && filteredAuthors.length !== 0)
        )
      })

      // Return empty Fragment if there's nothing to show
      if (filteredScriptCommands.length === 0 && searchQuery !== "") {
        return <></>
      }

      const cards = filteredScriptCommands.map((command: Command) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <CommandCard key={command.title} {...command} />
      })

      return (
        <div key={group.name} id={group.name}>
          <p
            className={classNames(
              isSubGroupPrime ? "text-2xl" : "text-3xl",
              "-mx-5.5 px-5.5 font-bold tracking-tight py-3 z-10 sticky top-0 backdrop-filter backdrop-blur"
            )}
          >
            {group.name}
          </p>
          {cards.length !== 0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-5">{cards}</div>}
        </div>
      )
    }

    return groups.map((group: CommandsGroup) => {
      return (
        <>
          {commandsFactory(group, isSubGroup)}
          {group.subGroups && groupsFactory(group.subGroups, true)}
        </>
      )
    })
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="flex flex-shrink-0 sticky top-0 pt-15 mr-7" style={{ height: "fit-content" }}>
        <div className="flex flex-col w-48">
          <div className="flex-1 flex-col">
            <form
              className="mt-1 relative rounded-md shadow-sm"
              ref={searchInputRef}
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                className="focus:ring-ray focus:border-ray focus:ring-opacity-50 focus:ring-2 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search"
                onChange={handleSearchQuery}
              />
            </form>
            {/* <p className="p-2 opacity-25">{numb} Results</p> */}
            <h3 className="p-2 mt-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</h3>
            <nav className="flex-1 space-y-1">{tabsHTML}</nav>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-col w-full">{groupsFactory(commandsGroups)}</div>
    </div>
  )
}
