import React, { useCallback } from "react"
import { FlatList, ListRenderItem, useWindowDimensions } from "react-native"
import { Movie } from "../../api/types"
import Poster from "./Poster"

type GalleryProps = {
  data: Movie[]
  horizontal?: boolean
  numColumns?: number
  ListHeader?: React.ReactNode
}

export const Gallery: React.FC<GalleryProps> = ({ data, horizontal = false, numColumns, ListHeader }) => {
  const { width } = useWindowDimensions()
  const maxHeight = horizontal ? 240 : undefined
  const renderItem: ListRenderItem<Movie> = useCallback(
    ({ item, index }) => {
      if (horizontal) return <Poster imageUrl={item.poster_path} rank={index + 1} width={width / 2} />
      return <Poster imageUrl={item.poster_path} width={width / 3} />
    },
    [horizontal, width],
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
