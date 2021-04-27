import classNames from "@utils/classNames"
import { bluredBackground, navigationBarHeight, horizontalPadding } from "@utils/styles"
import { DarkModeSwitch } from "react-toggle-dark-mode"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function NavigationBar(): JSX.Element {
  const [, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // When mounted on client, show theme switcher
  useEffect(() => setMounted(true), [])

  function handleDarkModeSwitch() {
    if (resolvedTheme === "dark") {
      setTheme("light")
    } else if (resolvedTheme === "light") {
      setTheme("dark")
    }
  }

  return (
    <header className={classNames("sticky top-0 z-30", bluredBackground, horizontalPadding)}>
      <div
        className={classNames(
          "flex items-center justify-between py-5 border-b border-gray-200 dark:border-gray-800",
          navigationBarHeight
        )}
      >
        <a className="text-gray-900 text-md font-normal flex items-center" href="/">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-1104.000000, -1317.000000)" fill="#FF6363">
                <path
                  d="M1106.522,1335.319 L1111.536,1340.333 L1108.15169,1340.33309 L1106.522,1335.319 Z M1104.001,1327.556 L1116.778,1340.333 L1114.071,1340.333 L1105.303,1331.564 L1104.001,1327.556 Z M1105.86,1324.174 L1122.02,1340.333 L1119.314,1340.333 L1104.293,1325.312 L1105.86,1324.174 Z M1115.73307,1317 L1128,1325.91245 L1123.619,1339.396 L1107.329,1323.106 L1115.73307,1317 Z"
                  id="Combined-Shape"
                />
              </g>
            </g>
          </svg>
          Marketplace
        </a>
        <div className="flex items-center space-x-3">
          {resolvedTheme !== undefined && (
            <DarkModeSwitch
              className="opacity-70 hover:opacity-100"
              checked={resolvedTheme === "dark"}
              onChange={handleDarkModeSwitch}
              size={20}
            />
          )}
          <a
            className="text-black opacity-70 hover:opacity-100"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/raycast/script-commands"
          >
            <span className="sr-only">GitHub repository</span>
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
