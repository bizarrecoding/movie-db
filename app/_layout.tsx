import { ThemeProvider } from "@react-navigation/native"
import { QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"

import React, { useEffect } from "react"
import tmdbClient from "../src/api/client"
import { NetworkAlert } from "../src/components/NetworkAlert"
import { AppTheme } from "../src/constants/theme"
import { initDB } from "../src/db/client"
import { useNetwork } from "../src/hooks/use-network"
import { useThemeColor } from "../src/hooks/use-theme-color"

export default function RootLayout() {
  const networkAvailable = useNetwork()
  useEffect(() => {
    initDB()
  }, [])
  return (
    <ThemeProvider value={AppTheme}>
      <QueryClientProvider client={tmdbClient}>
        <NavLayout />
      </QueryClientProvider>
      <StatusBar style="light" />
      <NetworkAlert available={networkAvailable} />
    </ThemeProvider>
  )
}

const NavLayout = () => {
  const titleColor = useThemeColor({}, "text")
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="details/[id]"
        options={{
          headerTitle: "",
          headerTitleStyle: {
            color: titleColor,
            fontSize: 16,
            fontWeight: 600,
          },
          headerTransparent: true,
        }}
      />
    </Stack>
  )
}
