import React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { useThemeColor } from "../../hooks/use-theme-color"
import { ThemedText } from "../ThemedText"

type RankedImageProps = {
  imageUrl: string
  rank?: number
  width?: number
}

const MEDIA_BASE_URL = "https://media.themoviedb.org/t/p/w440_and_h660_face"

const Poster: React.FC<RankedImageProps> = ({ imageUrl, width = 100, rank }) => {
  const color = useThemeColor({}, "background")
  const textShadowColor = useThemeColor({}, "tint")
  return (
    <TouchableOpacity style={[styles.container, { width }]}>
      <Image source={{ uri: MEDIA_BASE_URL + imageUrl }} style={styles.image} />
      {rank ? (
        <View style={styles.rankContainer}>
          <ThemedText type="defaultSemiBold" style={[styles.rankText, { color, textShadowColor }]}>
            {rank}
          </ThemedText>
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingHorizontal: 12,
    aspectRatio: 2 / 3,
  },
  image: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 16,
  },
  rankContainer: {
    position: "absolute",
    bottom: -20,
    left: 0,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  rankText: {
    fontSize: 96,
    lineHeight: 96,
    elevation: 2,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 13,
  },
})

export default Poster
