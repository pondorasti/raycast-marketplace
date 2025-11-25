import { AppProps } from "next/app"
import "tailwindcss/tailwind.css"
import { ThemeProvider } from "next-themes"
import NavigationBar from "@components/NavigationBar"

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider attribute="class" storageKey="marketplace-theme" defaultTheme="system">
      <NavigationBar />
      <div className="px-body">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}
