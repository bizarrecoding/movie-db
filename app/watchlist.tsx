import React from "react"
import { StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const WatchListScreen = () => {
  const { top } = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
      }}
    ></View>
  )
}

export default WatchListScreen

const styles = StyleSheet.create({
  container: { flex: 1 },
})
