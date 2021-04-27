import NextDocument, { Html, Head, Main, NextScript } from "next/document"

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en" className="nightwind">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <body className="max-w-7xl mx-auto bg-gray-50 dark:bg-darkGray-600">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
