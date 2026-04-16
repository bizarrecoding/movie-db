import { useHeaderHeight } from "@react-navigation/elements"
import { useLocalSearchParams, useNavigation } from "expo-router"
import React, { useEffect, useState } from "react"
import { Image, ImageStyle, StyleProp, StyleSheet, View } from "react-native"
import { Back } from "../../src/components/BackButton"
import { ToggleIcon } from "../../src/components/ImageIcon"
import { getMainGenre, getReleaseYear } from "../../src/components/Movie/helpers"
import MovieAttribute from "../../src/components/Movie/MovieAttribute"
import { ThemedText } from "../../src/components/ThemedText"
import { useMovie } from "../../src/hooks/use-movie"
import { useThemeColor } from "../../src/hooks/use-theme-color"

const DetailsScreen = () => {
  const navigation = useNavigation()
  const paddingTop = useHeaderHeight()
  const ratingColor = useThemeColor({}, "icon")
  const attributesColor = useThemeColor({ light: "#92929D", dark: "#92929D" }, "border")
  const { id } = useLocalSearchParams() as { id: string }
  const { data, isLoading, error } = useMovie(Number(id))
  const [saved, setSaved] = useState(false)

  const onToggleSaved = () => {
    setSaved((s) => !s)
    //TODO: add to watchlist store
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title || "",
      headerLeft: () => <Back onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <ToggleIcon tintColor="#FFF" style={{ marginHorizontal: 24 }} value={saved} setValue={onToggleSaved} />
      ),
    })
  }, [data?.title, saved, navigation])

  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>
  }

  if (error || !data) {
    return <ThemedText>Error: {error?.message}</ThemedText>
  }

  return (
    <View style={[styles.container, { paddingTop }]}>
      <MovieImage imageUrl={data?.backdrop_path || ""} style={styles.backdrop} />
      <View style={styles.HeaderWrapper}>
        <MovieImage imageUrl={data?.poster_path || ""} style={styles.poster} />
        <View style={styles.infoOverlay}>
          <ThemedText type="subtitle">{data?.title}</ThemedText>
          <MovieAttribute
            icon="star"
            label={data.vote_average.toFixed(1)}
            color={ratingColor}
            style={styles.rating}
            textStyle={styles.ratingLabel}
          />
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <View style={styles.center}>
          <MovieAttribute icon="calendar" label={getReleaseYear(data.release_date)} color={attributesColor} />
          <View style={styles.divider} />
          <MovieAttribute icon="clock" label={`${data.runtime ?? 0} minutes`} color={attributesColor} />
          <View style={styles.divider} />
          <MovieAttribute icon="ticket" label={getMainGenre(data)} color={attributesColor} />
        </View>
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
  center: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  HeaderWrapper: { flexDirection: "row", paddingVertical: 12, paddingHorizontal: 24, gap: 12, marginTop: -70 },
  infoOverlay: { flex: 1, flexDirection: "column-reverse", justifyContent: "space-between" },
  backdrop: {
    resizeMode: "cover",
    width: "100%",
    aspectRatio: 5 / 3,
    borderRadius: 16,
  },
  rating: {
    flex: 0,
    alignSelf: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#333A",
    borderRadius: 40,
  },
  ratingLabel: {
    fontWeight: 600,
  },
  poster: {
    width: 95,
    aspectRatio: 19 / 24,
    borderRadius: 16,
  },
  divider: {
    width: 2,
    height: 16,
    marginHorizontal: 12,
    backgroundColor: "#888",
  },
})
