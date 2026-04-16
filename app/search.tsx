import { useHeaderHeight } from "@react-navigation/elements"
import { useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import SearchInput from "../src/components/SearchInput"

const SearchScreen = () => {
  const headerTop = useHeaderHeight()
  const { query } = useLocalSearchParams()
  const [search, setSearch] = useState<string>((query as string) || "")

  useEffect(() => {
    setSearch((query as string) || "")
    console.log("🚀 ~ SearchScreen ~ setSearch:", query)
  }, [query])

  return (
    <View
      style={{
        flex: 1,
        paddingTop: headerTop,
      }}
    >
      <SearchInput defaultText={query as string} onSearch={setSearch} />
    </View>
  )
}

export default SearchScreen
