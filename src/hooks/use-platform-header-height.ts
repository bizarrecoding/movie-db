import { useHeaderHeight } from "@react-navigation/elements"
import { useRef } from "react"
import { Platform } from "react-native"

/**
 * This is an open issue in React-navigation where useHeaderHeight initially
 * returns the correct value but updates to 0 in android
 * @link https://github.com/react-navigation/react-navigation/issues/12692
 */
const usePlatformHeaderHeight = () => {
  const navHeaderHeight = useHeaderHeight()
  const androidHeaderHeight = useRef(navHeaderHeight)

  return Platform.select({
    ios: navHeaderHeight,
    android: Math.max(navHeaderHeight, androidHeaderHeight.current),
  })
}

export default usePlatformHeaderHeight