import { router } from "expo-router"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { useThemeColor } from "../hooks/use-theme-color"
import SearchSvg from "./Search"

type SearchInputProps = {
  defaultText?: string
  onSearch: Dispatch<SetStateAction<string>> | ((value: string) => void)
  debounceTime?: number
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, defaultText, debounceTime = 500 }) => {
  const [searchText, setSearchText] = useState(defaultText ?? "")
  const [isFocused, setIsFocused] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const backgroundColor = useThemeColor({ light: "#3A3F47", dark: "#3A3F47" }, "icon")
  const borderColor = useThemeColor({ light: "#67686D", dark: "#67686D" }, "icon")

  useEffect(() => {
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Set new timeout
    debounceRef.current = setTimeout(() => {
      onSearch(searchText)
    }, debounceTime)

    // Cleanup function
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [searchText, onSearch, debounceTime])

  const handleSubmit = () => {
    router.push(`/search?query=${encodeURIComponent(searchText)}`)
    setSearchText("")
    onSearch("")
  }

  return (
    <View
      style={[styles.container, { backgroundColor, borderColor }, isFocused && { elevation: 3, shadowOpacity: 0.2 }]}
    >
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#888"
        value={searchText}
        defaultValue={defaultText}
        onChangeText={setSearchText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.iconButton} activeOpacity={0.7}>
        <SearchSvg size={24} color="#666" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 24,
    marginVertical: 18,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    color: "#ECECEC",
  },
  iconButton: {
    padding: 4,
  },
})

export default SearchInput
