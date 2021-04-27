import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import remark from "remark"
import remarkHtml from "remark-html"
import remarkExternalLinks from "remark-external-links"
import HeroSection from "@components/HeroSection"
import { CommandsGrid, CommandsGroup } from "../components/CommandsGrid"

export default function Home({ commandsGroups }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <Head>
        <title>Raycast Marketplace</title>
      </Head>
      <main className="bg-gray-50 dark:bg-darkGray-600">
        <HeroSection />
        <CommandsGrid commandsGroups={commandsGroups} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const api = "https://raw.githubusercontent.com/raycast/script-commands/master/commands/extensions.json"
  const result = await fetch(api)
  const data = await result.json()
  const commandsGroups: CommandsGroup[] = data.groups
  commandsGroups.sort((a, b) => (a.name > b.name ? 1 : -1))

  function remarkCommands(groups: CommandsGroup[]) {
    groups.forEach(async (group) => {
      group.scriptCommands.forEach(async (script) => {
        const description = script.description || "N/A"
        const descriptionHtml = (
          await remark()
            .use(remarkExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] })
            .use(remarkHtml, { sanitize: true })
            .process(description)
        ).toString()
        // eslint-disable-next-line no-param-reassign
        script.descriptionHtml = descriptionHtml
      })

      if (group.subGroups) {
        remarkCommands(group.subGroups)
      }
    })
  }

  remarkCommands(commandsGroups)

  return {
    props: { commandsGroups },
  }
}
