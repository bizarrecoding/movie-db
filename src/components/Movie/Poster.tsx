import React from "react"
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { useThemeColor } from "../../hooks/use-theme-color"
import { ThemedText } from "../ThemedText"

type RankedImageProps = {
  id: number
  imageUrl: string
  rank?: number
  width?: number
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

const MEDIA_BASE_URL = "https://media.themoviedb.org/t/p/w440_and_h660_face"

const Poster: React.FC<RankedImageProps> = ({ id, imageUrl, width = 100, rank, onPress, style }) => {
  const color = useThemeColor({}, "background")
  const textShadowColor = useThemeColor({}, "tint")
  return (
    <TouchableOpacity style={[styles.container, { width }, style]} onPress={onPress}>
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
    aspectRatio: 2 / 3,
  },
  image: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 16,
  },
  rankContainer: {
    position: "absolute",
    bottom: -2,
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
    textShadowRadius: 3,
  },
})

export default Poster
