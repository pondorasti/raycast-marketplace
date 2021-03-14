/* eslint-disable */
// Source: https://github.com/mui-org/material-ui/issues/16359#issuecomment-617365879

import { useState, useEffect, useRef, useCallback } from "react"
import useThrottledOnScroll from "./usethrottledOnScroll"

const getItemsClient = (items) => items.map(({ name }) => ({ hash: name, node: document.getElementById(name) }))

const useScrollSpy = ({ items = [], target = window } = {}) => {
  const itemsWithNodeRef = useRef([])
  useEffect(() => {
    itemsWithNodeRef.current = getItemsClient(items)
  }, [items])

  const [activeState, setActiveState] = useState(null)

  const findActiveIndex = useCallback(() => {
    let active
    for (let i = itemsWithNodeRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 200) {
        active = { name: null }
        break
      }

      const item = itemsWithNodeRef.current[i]

      if (process.env.NODE_ENV !== "production") {
        if (!item.node) {
          console.error(`Missing node on the item ${JSON.stringify(item, null, 2)}`)
        }
      }

      if (
        item.node &&
        item.node.offsetTop < document.documentElement.scrollTop + document.documentElement.clientHeight / 8
      ) {
        active = item
        break
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash)
    }
  }, [activeState])

  useThrottledOnScroll(items.length > 0 ? findActiveIndex : null, 166)

  return activeState
}

export default useScrollSpy
