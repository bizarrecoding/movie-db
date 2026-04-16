import { router } from "expo-router"
import React, { useCallback } from "react"
import { FlatList, ListRenderItem, StyleSheet } from "react-native"
import { Movie } from "../../api/types"
import Poster from "./Poster"

type GalleryProps = {
  data: Movie[]
  horizontal?: boolean
  numColumns?: number
  ListHeader?: React.ReactNode
}

export const Gallery: React.FC<GalleryProps> = ({ data, horizontal = false, numColumns, ListHeader }) => {
  const maxHeight = horizontal ? 260 : undefined
  const renderItem: ListRenderItem<Movie> = useCallback(
    ({ item, index }) => {
      const goToDetails = () => router.push(`/details/${item.id}`)
      if (horizontal)
        return (
          <Poster
            id={item.id}
            imageUrl={item.poster_path}
            rank={index + 1}
            width={180}
            onPress={goToDetails}
            style={styles.poster}
          />
        )
      return <Poster id={item.id} imageUrl={item.poster_path} width={120} onPress={goToDetails} style={styles.poster} />
    },
    [horizontal],
  )

  return (
    <FlatList<Movie>
      horizontal={horizontal}
      numColumns={numColumns}
      data={data || []}
      renderItem={renderItem}
      style={{ maxHeight, minHeight: maxHeight }}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

const styles = StyleSheet.create({
  poster: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
})
