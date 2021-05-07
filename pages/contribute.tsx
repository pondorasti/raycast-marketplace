import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import remark from "remark"
import remarkHtml from "remark-html"
import remarkExternalLinks from "remark-external-links"
import remarkGfm from "remark-gfm"
import remarkSlug from "remark-slug"

export default function Home({ markdown }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <Head>
        <title>Raycast Marketplace - About</title>
      </Head>
      <main>
        <div
          className="mx-auto my-24 prose prose-sm sm:prose lg:prose-lg"
          /* eslint-disable-next-line react/no-danger */
          dangerouslySetInnerHTML={{ __html: markdown }}
        />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const api = "https://raw.githubusercontent.com/raycast/script-commands/master/CONTRIBUTING.md"
  const result = await fetch(api)
  const data = await result.text()

  const markdown = (
    await remark()
      .use(remarkExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] })
      .use(remarkHtml)
      .use(remarkGfm)
      .use(remarkSlug)
      .process(data)
  ).toString()

  return {
    props: { markdown },
  }
}
