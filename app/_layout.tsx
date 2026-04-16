import { ThemeProvider } from "@react-navigation/native"
import { QueryClientProvider } from "@tanstack/react-query"
import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"

import React from "react"
import tmdbClient from "../src/api/client"
import HomeSVG from "../src/components/SVGr/Home"
import SaveSVG from "../src/components/SVGr/Save"
import SearchSVG from "../src/components/SVGr/Search"
import { ThemedText } from "../src/components/ThemedText"
import { AppTheme } from "../src/constants/theme"
import { useThemeColor } from "../src/hooks/use-theme-color"

export default function RootLayout() {
  return (
    <ThemeProvider value={AppTheme}>
      <QueryClientProvider client={tmdbClient}>
        <NavLayout />
      </QueryClientProvider>
      <StatusBar style="light" />
    </ThemeProvider>
  )
}

const NavLayout = () => {
  const active = useThemeColor({}, "tabIconSelected")
  const inactive = useThemeColor({}, "tabIconDefault")

  return (
    <Tabs
      screenOptions={{
        headerTransparent: true,
        tabBarStyle: { borderTopColor: active, borderTopWidth: 2 },
        tabBarLabel(props) {
          const { focused, children } = props
          const color = focused ? active : inactive
          return <ThemedText style={{ color, fontSize: 14 }}>{children}</ThemedText>
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ size, focused }) => <HomeSVG color={focused ? active : inactive} size={size} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ size, focused }) => <SearchSVG color={focused ? active : inactive} size={size} />,
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: "Watchlist",
          tabBarIcon: ({ size, focused }) => <SaveSVG color={focused ? active : inactive} size={size} />,
        }}
      />
      <Tabs.Screen
        name="details/[id]"
        options={{
          href: null,
          headerTitle: "",
        }}
      />
    </Tabs>
  )
}
