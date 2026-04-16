import { useHeaderHeight } from "@react-navigation/elements"
import React, { useCallback } from "react"
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native"
import { Movie } from "../../src/api/types"
import { WatchListEmptyComponent } from "../../src/components/List/ListEmpty"
import Card from "../../src/components/Movie/Card"
import { usePopularMovies } from "../../src/hooks/use-popular-movies"

const WatchListScreen = () => {
  const paddingTop = useHeaderHeight()
  const { data, isLoading, error } = usePopularMovies()
  const renderItem: ListRenderItem<Movie> = useCallback(({ item }) => {
    return <Card item={item} />
  }, [])

  if (isLoading) {
    return <View style={[styles.container, { paddingTop }]} />
  }

  if (error) {
    return <View style={[styles.container, { paddingTop }]} />
  }

  return (
    <FlatList<Movie>
      data={data?.results || []}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingTop }}
      ListEmptyComponent={<WatchListEmptyComponent />}
      style={styles.container}
    />
  )
}

export default WatchListScreen

const styles = StyleSheet.create({
  container: { flex: 1 },
  itemWrapper: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12 },
  infoContainer: { flex: 1, justifyContent: "space-between" },
})
