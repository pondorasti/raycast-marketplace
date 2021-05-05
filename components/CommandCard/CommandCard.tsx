import React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

function CommandCard({
  title,
  descriptionHtml,
  icon,
  authors,
  language,
  isTemplate,
  hasArguments,
  path,
  filename,
}: Command): JSX.Element {
  const { resolvedTheme } = useTheme()
  // Source: https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
  const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)

  const iconElement = () => {
    const defaultIcon = "👋"
    const iconSize = "24px" // ⬇️ If changed, update height, width and line-height for `pTag`
    const pTag = (emoji: string) => <p className="text-2xl font-semibold text-center h-6 w-6 leading-6">{emoji}</p>

    // Undefined Icon
    if (icon === null) return pTag(defaultIcon)

    // prioritize light over dark
    let iconString: string | undefined
    if (resolvedTheme === "dark") {
      iconString = icon.dark || icon.light
    } else {
      iconString = icon.light || icon.dark
    }

    // Empty Icon String
    if (iconString === undefined) return pTag(defaultIcon)
    // Github Image
    if (iconString?.includes("images") && !iconString?.includes("http")) {
      const githubPath = `https://raw.githubusercontent.com/raycast/script-commands/master/commands/${path}${iconString}`
      return <Image src={githubPath} alt="" width={iconSize} height={iconSize} />
    }
    // External URL Image
    if (iconString?.includes("http")) return <img src={iconString} alt="" width={iconSize} height={iconSize} />
    // Emoji
    return pTag(iconString)
  }

  // onClick={() => openInNewTab(author.url)}
  // const openInNewTab = (url: string) => {
  //   const newWindow = window.open(url, "_blank", "noopener,noreferrer")
  //   if (newWindow) newWindow.opener = null
  // }

  // {/* {index === 0 ? " • By " : " and "} */}
  const authorElements = authors?.map((author, index) => (
    <>
      {index === 0 ? " • By " : " and "}
      <a
        key={author.name}
        href={author.url}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline hover:underline"
      >
        {author.name}
      </a>
    </>
  ))

  return (
    <a
      href={`https://github.com/raycast/script-commands/blob/master/commands/${path}${filename}`}
      target="_blank"
      rel="noopener noreferrer"
      className="h-34 flex flex-col bg-white dark:bg-darkGray-500 p-4 shadow-lg rounded-lg"
    >
      <div className="flex items-center">
        {iconElement()}
        <p className="ml-2 text-base font-semibold line-clamp-1 text-gray-900">{title}</p>
      </div>

      <div
        className="mt-2 text-sm line-clamp-2 text-gray-500 dark:text-gray-400 prose"
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
      <p className="mt-auto text-sm line-clamp-1 text-gray-500">
        {isTemplate ? "Template • " : ""}
        {hasArguments ? "Arguments • " : ""}
        {capitalize(language)}
        {!!authorElements && authorElements}
      </p>
    </a>
  )
}

const memoizedCommandCard = React.memo(CommandCard)

export default memoizedCommandCard
