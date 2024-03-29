import { useTheme } from "next-themes"

export default function HeroSection(): JSX.Element {
  const { resolvedTheme } = useTheme()

  return (
    <div className="relative overflow-hidden">
      <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
        <div className="relative h-full max-w-7xl mx-auto">
          <svg
            className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={784} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
          <svg
            className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-2/3 lg:-translate-x-1/2"
            width={404}
            height={770}
            fill="none"
            viewBox="0 0 404 770"
          >
            <defs>
              <pattern
                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={770} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
          </svg>
        </div>
      </div>

      <div className="relative my-16 mx-auto max-w-7xl px-4 sm:my-24 z-10">
        <div className="text-center">
          {resolvedTheme !== undefined && (
            <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl">
              <span
                className="block text-ray"
                style={{
                  textShadow: `0 0 8px ${resolvedTheme === "dark" ? "#000" : "#fff"} , #FF6363 0 0 24px`,
                }}
              >
                Unofficial Marketplace
              </span>{" "}
              <span className="block xl:inline">for Raycast Script Commands</span>
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}
