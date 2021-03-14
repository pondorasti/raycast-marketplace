/* eslint-disable */
// Source: https://github.com/mui-org/material-ui/issues/16359#issuecomment-617365879

import { useEffect, useMemo } from "react"
import throttle from "lodash/throttle"

const noop = () => {}

const useThrottledOnScroll = (callback, delay) => {
  const throttledCallback = useMemo(() => (callback ? throttle(callback, delay) : noop), [callback, delay])

  useEffect(() => {
    if (throttledCallback === noop) {
      return undefined
    }

    window.addEventListener("scroll", throttledCallback)
    return () => {
      window.removeEventListener("scroll", throttledCallback)
      throttledCallback.cancel()
    }
  }, [throttledCallback])
}

export default useThrottledOnScroll
