import { ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import React, { useEffect } from "react"
import tmdbClient, { persistOptions } from "../src/api/client"
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
      <PersistQueryClientProvider client={tmdbClient} persistOptions={persistOptions}>
        <NavLayout />
      </PersistQueryClientProvider>
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
