import { useHeaderHeight } from "@react-navigation/elements"
import { useFocusEffect } from "expo-router"
import React, { useCallback } from "react"
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native"
import { MovieDetails } from "../../src/api/types"
import { WatchListEmptyComponent } from "../../src/components/List/ListEmpty"
import Card from "../../src/components/Movie/Card"
import { useWatchlist } from "../../src/hooks/use-watchlist"

const WatchListScreen = () => {
  const paddingTop = useHeaderHeight()
  const { data, isLoading, error, refetch } = useWatchlist()
  const renderItem: ListRenderItem<MovieDetails> = useCallback(({ item }) => {
    if (!item) return null
    return <Card item={item} />
  }, [])

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch]),
  )

  if (isLoading) {
    return <View style={[styles.container, { paddingTop }]} />
  }

  if (error) {
    return <View style={[styles.container, { paddingTop }]} />
  }

  return (
    <FlatList<MovieDetails>
      data={data || []}
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
