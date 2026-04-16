import { router } from "expo-router"
import React from "react"
import { StyleSheet, TouchableNativeFeedback, View } from "react-native"
import { Movie, MovieDetails } from "../../api/types"
import { useThemeColor } from "../../hooks/use-theme-color"
import ImageIcon from "../ImageIcon"
import { ThemedText } from "../ThemedText"
import Poster from "./Poster"

type CardProps = {
  item: MovieDetails | Movie
}

const Card: React.FC<CardProps> = ({ item }) => {
  const color = useThemeColor({}, "icon")
  const onPress = () => router.push(`/details/${item.id}`)
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.content}>
        <Poster id={item.id} imageUrl={item.poster_path} onPress={onPress} />
        <View style={styles.infoContainer}>
          <ThemedText type="subtitle" style={styles.title} numberOfLines={2}>
            {item.title}
          </ThemedText>
          <View style={styles.infoRow}>
            <ImageIcon name="star" size={16} />
            <ThemedText style={{ color }}>{item.vote_average.toFixed(2)}</ThemedText>
          </View>
          {(item as MovieDetails)?.genres?.length ? (
            <View style={styles.infoRow}>
              <ImageIcon name="ticket" size={16} />
              <ThemedText>{getMainGenre(item)}</ThemedText>
            </View>
          ) : null}
          <View style={styles.infoRow}>
            <ImageIcon name="calendar" size={16} />
            <ThemedText>{getReleaseYear(item.release_date)}</ThemedText>
          </View>
          {(item as MovieDetails).runtime ? (
            <View style={styles.infoRow}>
              <ImageIcon name="clock" size={16} />
              <ThemedText>{(item as MovieDetails).runtime ?? 0} min</ThemedText>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

const getMainGenre = (movie: MovieDetails | Movie) => {
  const genres = (movie as MovieDetails)?.genres ?? []
  const [main] = genres ?? []
  if (main) return main.name
  if (movie.genre_ids) {
    const [first] = movie.genre_ids
    return [first]
  }
  return ""
}

const getReleaseYear = (date: string) => {
  const release = new Date(date)
  return release.getFullYear()
}

export default Card

const styles = StyleSheet.create({
  container: {},
  content: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12 },
  infoContainer: { flex: 1 },
  title: { flex: 2 },
  infoRow: { flex: 1, alignItems: "center", flexDirection: "row", gap: 4 },
})
