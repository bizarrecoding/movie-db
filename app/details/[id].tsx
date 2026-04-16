import { useHeaderHeight } from "@react-navigation/elements"
import { useLocalSearchParams, useNavigation } from "expo-router"
import React, { useEffect } from "react"
import { Image, ImageStyle, StyleProp, StyleSheet, View } from "react-native"
import { ThemedText } from "../../src/components/ThemedText"
import { useMovie } from "../../src/hooks/use-movie"

const DetailsScreen = () => {
  const navigation = useNavigation()
  const paddingTop = useHeaderHeight()
  const { id } = useLocalSearchParams() as { id: string }
  const { data, isLoading, error } = useMovie(Number(id))

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title || "",
    })
  }, [data?.title, navigation])

  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>
  }

  if (error) {
    return <ThemedText>Error: {error.message}</ThemedText>
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop,
      }}
    >
      <MovieImage imageUrl={data?.backdrop_path || ""} style={styles.backdrop} />
      <View style={{ flexDirection: "row", padding: 12, gap: 12, marginTop: -60 }}>
        <MovieImage imageUrl={data?.poster_path || ""} style={styles.poster} />
        <View style={{ flex: 1, flexDirection: "column-reverse", justifyContent: "space-between" }}>
          <ThemedText type="subtitle">{data?.title}</ThemedText>
          <ThemedText style={{ textAlign: "right" }}>{data?.vote_average}</ThemedText>
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <ThemedText style={{ textAlign: "center", marginBottom: 12 }}>
          {data?.release_date}| {0} min|{data?.genres[0]?.name}
        </ThemedText>
        <ThemedText style={{ padding: 12 }}>{data?.overview}</ThemedText>
      </View>
    </View>
  )
}

export default DetailsScreen

type MovieImageProps = {
  imageUrl: string
  style?: StyleProp<ImageStyle>
}

const MovieImage: React.FC<MovieImageProps> = ({ imageUrl, style }) => {
  return <Image source={{ uri: `https://media.themoviedb.org/t/p/w440_and_h660_face${imageUrl}` }} style={style} />
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backdrop: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 16,
  },
  poster: {
    width: "20%",
    aspectRatio: 2 / 3,
    borderRadius: 16,
  },
})
