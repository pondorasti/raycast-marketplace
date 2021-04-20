import React from "react"
import Command from "./types"

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
    if (icon === null) {
      return <p className="text-xl font-semibold">👋</p>
    }

    let emojiIcon = icon.dark || icon.light
    if (emojiIcon.includes("images")) {
      emojiIcon = "👋"
    }

    return <p className="text-xl font-semibold">{emojiIcon}</p>
  }

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
      className="flex flex-col bg-white p-4 shadow-lg rounded-lg"
    >
      <div className="flex items-baseline">
        {iconElement()}
        <p className="ml-2 text-xl font-semibold text-gray-900">{title}</p>
      </div>

      {/* eslint-disable-next-line react/no-danger */}
      <div className="my-2 text-base text-gray-500 prose" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      <p className="mt-auto text-sm text-gray-500">
        {isTemplate ? "Template • " : ""}
        {hasArguments ? "Arguments • " : ""}
        {capitalize(language)}
        {authorElements}
      </p>
    </a>
  )
}

/* <img
  src="https://raw.githubusercontent.com/raycast/script-commands/master/commands/dashboard/images/speedtest-logo.png"
  alt="test"
  height={32}
  width={32}
/> */

const memoizedCommandCard = React.memo(CommandCard)

export default memoizedCommandCard
