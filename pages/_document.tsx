import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import nightwind from "nightwind/helper"
import { horizontalPadding } from "@utils/styles"
import NavigationBar from "@components/NavigationBar"

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          {/* eslint-disable-next-line react/no-danger */}
          <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
        </Head>
        <body className="max-w-7xl mx-auto bg-gray-50 dark:bg-darkGray-600">
          <NavigationBar />
          <div className={horizontalPadding}>
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    )
  }
}
