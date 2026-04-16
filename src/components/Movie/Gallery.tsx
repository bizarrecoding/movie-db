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
  const maxHeight = horizontal ? 220 : undefined
  const renderItem: ListRenderItem<Movie> = useCallback(
    ({ item, index }) => {
      const goToDetails = () => router.push(`/details/${item.id}`)
      if (horizontal)
        return (
          <Poster
            id={item.id}
            imageUrl={item.poster_path}
            rank={index + 1}
            width={144}
            onPress={goToDetails}
            style={styles.poster}
            aspectRatio={2 / 3}
          />
        )
      return (
        <Poster
          id={item.id}
          imageUrl={item.poster_path}
          onPress={goToDetails}
          style={styles.poster}
          aspectRatio={2 / 3}
        />
      )
    },
    [horizontal],
  )

  return (
    <FlatList<Movie>
      horizontal={horizontal}
      numColumns={numColumns}
      data={data || []}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingHorizontal: horizontal ? 24 : 0,
        gap: 14,
      }}
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
