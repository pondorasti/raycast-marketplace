import React from "react"
import Image from "next/image"

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
  // Source: https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
  const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)

  const iconElement = () => {
    const pTag = (emoji: string) => <p className="text-xl font-semibold">{emoji}</p>

    // Undefined Icon
    if (icon === undefined) return pTag("👋")

    // prioritize light over dark
    const iconString = icon.light || icon.dark

    // Empty Icon String
    if (iconString === undefined) return pTag("👋")
    // Github Image
    if (iconString?.includes("images") && !iconString?.includes("http")) {
      const githubPath = `https://raw.githubusercontent.com/raycast/script-commands/master/commands/${path}${iconString}`
      return <Image src={githubPath} alt="" width="24px" height="24px" />
    }
    // External URL Image
    if (iconString?.includes("http")) return <img src={iconString} alt="" width="24px" height="24px" />
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
      className="flex flex-col bg-white dark:bg-darkGray-500 p-4 shadow-lg rounded-lg"
    >
      <div className="flex items-center">
        {iconElement()}
        <p className="ml-2 text-xl font-semibold text-gray-900">{title}</p>
      </div>

      {/* eslint-disable-next-line react/no-danger */}
      <div className="my-2 text-base text-gray-500 prose" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      <p className="mt-auto text-sm text-gray-500">
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
