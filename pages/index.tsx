import Head from "next/head"
import dynamic from "next/dynamic"
import { GetStaticProps, InferGetStaticPropsType } from "next"

import { CommandsGroup } from "../components/CommandsGrid"

import HeroSection from "../components/HeroSection/HeroSection"

// Required for using `window` and `document` from the scrollSpy utils
const CommandsGrid = dynamic(() => import("../components/CommandsGrid/CommandsGrid"), { ssr: false })

export default function Home({ commandsGroups }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  // console.log(commands[0].subGroups[0].scriptCommands[0].title)

  return (
    <>
      <Head>
        <title>Raycast Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-50">
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

  return {
    props: { commandsGroups },
  }
}
