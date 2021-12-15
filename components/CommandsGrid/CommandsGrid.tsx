import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { SearchIcon } from "@heroicons/react/solid"
import debounce from "lodash.debounce"
import CommandCard from "@components/CommandCard"
import classNames from "@utils/classNames"
import { InView } from "react-intersection-observer"
import { useHotkeys } from "react-hotkeys-hook"

interface ICommandsGrid {
  commandsGroups: CommandsGroup[]
}

export default function CommandsGrid({ commandsGroups }: ICommandsGrid): JSX.Element {
  // Config
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  useHotkeys("⌘+k, ctrl+k, /", (event) => {
    event.preventDefault()
    searchInputRef.current?.focus()
  })

  // Debounced Search - Shallow URL Update
  const debouncedSearch = useCallback(
    debounce((newValue: string) => {
      let newQuery: string
      if (!newValue || newValue.length === 0) {
        newQuery = ""
      } else {
        newQuery = `?search=${newValue}`
      }

      router.push(newQuery, undefined, { shallow: true })
    }, 200),
    []
  )

  // Update <input> based on Router (URL query)
  const { search } = router.query
  useEffect(() => {
    if (!router.isReady) {
      return // exit early if it's rendering on the server
    }

    const searchInput = searchInputRef.current
    if (!searchInput) {
      return // exit early if searchInputRef is null
    }

    if (search !== undefined) {
      searchInput.value = String(search)
      setSearchQuery(String(search))
    } else {
      searchInput.value = ""
      setSearchQuery("")
    }
  }, [search])

  // Sidebar
  const tabsHTML = commandsGroups.map(({ name }) => (
    <a
      key={name}
      href={`#${name}`}
      className={classNames(
        // false ? "bg-gray-100 text-gray-900" :
        "text-gray-600 hover:bg-gray-200 dark:hover:bg-darkGray-800 hover:text-gray-900",
        "flex p-2 text-sm rounded-md"
      )}
      onClick={() => {
        formRef.current?.reset()
        setSearchQuery("")
      }}
    >
      {name}
    </a>
  ))

  // Grid
  function flattenCommandsGroups(rootGroups?: CommandsGroup[]): CommandsGroup[] {
    let result: CommandsGroup[] = []
    rootGroups?.forEach((group) => {
      result.push(group)
      result = result.concat(flattenCommandsGroups(group.subGroups))
    })

    return result
  }
  const flattenedCommandsGroup = flattenCommandsGroups(commandsGroups)
  function groupsFactory(groups: CommandsGroup[], isSubGroup = false): JSX.Element[] {
    // Inner factory for building the Grid of Cards
    function commandsFactory(group: CommandsGroup, isSubGroupPrime = false): JSX.Element {
      const filteredScriptCommands = group.scriptCommands.filter((command) => {
        const lowerSearchQuery = searchQuery.toLowerCase()
        const filteredAuthors = command.authors?.filter((author) =>
          author.name.toLowerCase().includes(lowerSearchQuery)
        )
        return (
          command.title.toLowerCase().includes(lowerSearchQuery) ||
          command.description?.toLowerCase().includes(lowerSearchQuery) ||
          command.language.toLowerCase().includes(lowerSearchQuery) ||
          (command.isTemplate && "template".includes(lowerSearchQuery)) ||
          (command.hasArguments && "arguments".includes(lowerSearchQuery)) ||
          (filteredAuthors !== undefined && filteredAuthors.length !== 0)
        )
      })

      // Return empty Fragment if there's nothing to show
      if (filteredScriptCommands.length === 0 && searchQuery !== "") {
        return <></>
      }

      const cards = filteredScriptCommands.map((command: Command) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <CommandCard key={command.identifier} {...command} />
      })

      // Compute section height
      const numberOfRows = Math.ceil(cards.length / 2)
      const headerHeight = isSubGroupPrime ? 52 : 56
      const gridGap = 16 * (numberOfRows - 1)
      const accumulatedCardsHeight = 136 * numberOfRows
      const gridBottomPadding = 20
      const height = `${
        headerHeight + (cards.length !== 0 ? accumulatedCardsHeight + gridGap + gridBottomPadding : 0)
      }px`

      // ‼️ DO NOT CHANGE component styling without updating the computed properties from above ^^^
      return (
        <InView key={group.name}>
          {({ inView, ref }) => (
            <div id={group.name} ref={ref} style={{ height }}>
              {inView && (
                <>
                  <p
                    className={classNames(
                      isSubGroupPrime ? "text-xl" : "text-2xl",
                      "-mx-5.5 px-5.5 font-semibold tracking-tight py-3 z-10 sticky text-gray-900 bg-blur top-navbar"
                    )}
                  >
                    {group.name}
                  </p>
                  {/* {cards.length !== 0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-5">{cards}</div>} */}
                </>
              )}
            </div>
          )}
        </InView>
      )
    }

    return flattenedCommandsGroup.map((group: CommandsGroup) => commandsFactory(group, isSubGroup))
    // {/* {group.subGroups && group.subGroups.map((subGroup: CommandsGroup) => commandsFactory(subGroup, true))} */}
    // {/* {group.subGroups && groupsFactory(group.subGroups, true)} */}
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className="flex flex-col flex-shrink-0 sticky mr-7 w-48 h-screen top-navbar"
        style={{ height: "fit-content" }}
      >
        <form
          className="relative rounded-md shadow-sm my-2 mx-1"
          ref={formRef}
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className={classNames(
              "bg-white text-gray-900 block w-full pl-10 text-sm border-gray-300 rounded-md",
              "focus:ring-ray focus:border-ray focus:ring-opacity-50 focus:ring-2", // focus utilties
              "pr-0 md:pr-12" // kbd logic
            )}
            placeholder="Search"
            ref={searchInputRef}
            onChange={(event) => debouncedSearch(event.target.value)}
          />
          <div className="hidden md:flex absolute inset-y-0 right-0 py-1.5 pr-1.5 pointer-events-none">
            <kbd>⌘K</kbd>
          </div>
        </form>
        <h3 className="p-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</h3>
        <nav className="flex-1 space-y-1">{tabsHTML}</nav>
      </div>

      {/* Grid */}
      <div className="flex-col w-full">{groupsFactory(commandsGroups)}</div>
    </div>
  )
}
