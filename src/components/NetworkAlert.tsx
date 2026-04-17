import React from "react"
import { StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { useThemeColor } from "../hooks/use-theme-color"
import { ThemedText } from "./ThemedText"

type NetworkAlertProps = {
  available: boolean
}

export const NetworkAlert: React.FC<NetworkAlertProps> = ({ available }) => {
  const backgroundColor = useThemeColor({}, "card") + "EE"

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(available ? 0 : 1, { duration: 1000 }),
      bottom: withTiming(available ? -100 : 100, { duration: 1000 }),
    }
  }, [available])

  return (
    <Animated.View style={[styles.container, { backgroundColor }, style]}>
      <ThemedText style={styles.label}>Network is not available!</ThemedText>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // bottom: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#8884",
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 600,
  },
})
