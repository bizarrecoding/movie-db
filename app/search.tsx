import { useHeaderHeight } from "@react-navigation/elements"
import { useLocalSearchParams } from "expo-router"
import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet } from "react-native"
import { MovieDetails } from "../src/api/types"
import { ListEmptyComponent } from "../src/components/List/ListEmpty"
import Card from "../src/components/Movie/Card"
import SearchInput from "../src/components/SearchInput"
import { useSearchMovies } from "../src/hooks/use-search-movies"

const SearchScreen = () => {
  const paddingTop = useHeaderHeight()
  const { query } = useLocalSearchParams()
  const [search, setSearch] = useState<string>((query as string) || "")
  const { data, isLoading, error } = useSearchMovies(search)

  const renderItem: ListRenderItem<MovieDetails> = useCallback(({ item }) => {
    return <Card item={item} />
  }, [])

  useEffect(() => {
    //trigger search on param change, does not update input text
    setSearch(query as string)
  }, [query])

  return (
    <FlatList<MovieDetails>
      data={data?.results || []}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingTop }}
      ListHeaderComponent={<SearchInput defaultText={query as string} onSearch={setSearch} />}
      ListEmptyComponent={() => {
        if (isLoading) return <ActivityIndicator size={"large"} />
        if (error) console.log(error.message)
        return <ListEmptyComponent />
      }}
      style={styles.container}
    />
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: { flex: 1 },
})
