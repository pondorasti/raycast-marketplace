import NextDocument, { Html, Head, Main, NextScript } from "next/document"

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en" className="bg-gray-50">
        <Head>
          <title>Raycast Marketplace</title>

          <link rel="icon" href="/favicon.ico" />

          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <body className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <Main />
          <NextScript />
          <script> </script>
        </body>
      </Html>
    )
  }
}
