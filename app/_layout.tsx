import { ThemeProvider } from "@react-navigation/native"
import { QueryClientProvider } from "@tanstack/react-query"
import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"

import React from "react"
import tmdbClient from "../src/api/client"
import HomeSVG from "../src/components/Home"
import SaveSVG from "../src/components/Save"
import SearchSVG from "../src/components/Search"
import { AppTheme } from "../src/constants/theme"

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
  return (
    <Tabs screenOptions={{ headerTransparent: true }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => <HomeSVG color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => <SearchSVG color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: "Watchlist",
          tabBarIcon: ({ color, size }) => <SaveSVG color={color} size={size} />,
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
