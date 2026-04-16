import React, { useState } from "react"
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { useThemeColor } from "../hooks/use-theme-color"

export type Tab<T extends string> = {
  id: T
  label: string
}

export type SlidingTabsProps<T extends string> = {
  tabs: Tab<T>[]
  activeTab: T
  onTabChange: (tabId: T) => void
}

type TabMeasurement = {
  x: number
  width: number
}

const SlidingTabs = <T extends string>({ tabs, activeTab, onTabChange }: SlidingTabsProps<T>) => {
  const color = useThemeColor({}, "text")
  const backgroundColor = useThemeColor({ light: "#3A3F47", dark: "#3A3F47" }, "icon")
  const [measurements, setMeasurements] = useState<{ [key: string]: TabMeasurement }>({})

  const handleLayout = (event: LayoutChangeEvent, tabId: string) => {
    const { x, width } = event.nativeEvent.layout
    setMeasurements((prev) => ({
      ...prev,
      [tabId]: { x, width },
    }))
  }

  const activeMeasurement = measurements[activeTab]

  const indicatorStyle = useAnimatedStyle(() => {
    if (!activeMeasurement) {
      return {
        left: 0,
        width: 0,
        opacity: 0,
      }
    }

    return {
      left: withTiming(activeMeasurement.x, { duration: 150 }),
      width: withTiming(activeMeasurement.width, { duration: 150 }),
      opacity: withTiming(1, { duration: 150 }),
    }
  }, [activeMeasurement])

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            onLayout={(e) => handleLayout(e, tab.id)}
            onPress={() => onTabChange(tab.id)}
            style={styles.tabButton}
          >
            <Text style={[styles.tabText, { color }, activeTab === tab.id && styles.activeTabText]}>{tab.label}</Text>
          </Pressable>
        ))}
        <Animated.View style={[styles.indicator, { backgroundColor }, indicatorStyle]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  tabText: {
    fontSize: 14,
    lineHeight: 21,
  },
  activeTabText: {
    fontWeight: "600",
  },
  indicator: {
    position: "absolute",
    bottom: -1,
    height: 4,
    borderRadius: 3,
    zIndex: 2,
  },
})

export default SlidingTabs
