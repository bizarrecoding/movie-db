import { ThemeProvider } from "@react-navigation/native"
import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"

import { AppTheme } from "../constants/theme"
import HomeSVG from "../src/components/Home"
import SaveSVG from "../src/components/Save"
import SearchSVG from "../src/components/Search"

export default function RootLayout() {
  return (
    <ThemeProvider value={AppTheme}>
      <NavLayout />
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
      <Tabs.Screen name="details/[id]" options={{ href: null }} />
    </Tabs>
  )
}
