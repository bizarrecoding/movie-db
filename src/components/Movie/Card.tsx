import { router } from "expo-router"
import React from "react"
import { StyleSheet, TouchableNativeFeedback, View } from "react-native"
import { MovieDetails } from "../../api/types"
import { useThemeColor } from "../../hooks/use-theme-color"
import { ThemedText } from "../ThemedText"
import { getMainGenre, getReleaseYear } from "./helpers"
import MovieAttribute from "./MovieAttribute"
import Poster from "./Poster"

type CardProps = {
  item: MovieDetails
}

const Card: React.FC<CardProps> = ({ item }) => {
  const ratingColor = useThemeColor({}, "icon")
  const onPress = () => router.push(`/details/${item.id}`)
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Poster id={item.id} imageUrl={item.poster_path} onPress={onPress} width={95} />
        <View style={styles.infoContainer}>
          <ThemedText type="subtitle" style={styles.title} numberOfLines={2}>
            {item.title}
          </ThemedText>
          <MovieAttribute icon="star" label={item.vote_average.toFixed(2)} color={ratingColor} />
          <MovieAttribute icon="ticket" label={getMainGenre(item)} />
          <MovieAttribute icon="calendar" label={getReleaseYear(item.release_date)} />
          <MovieAttribute icon="clock" label={`${item.runtime ?? 0} minutes`} />
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

export default Card

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12 },
  infoContainer: { flex: 1, rowGap: 4 },
  title: { fontSize: 16, lineHeight: 24 },
})
