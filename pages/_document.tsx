import NextDocument, { Html, Head, Main, NextScript } from "next/document"

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en" className="nightwind">
        <Head>
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />

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
