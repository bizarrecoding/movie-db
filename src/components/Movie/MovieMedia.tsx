import { Image, ImageBackground } from "expo-image"
import { ImageStyle, Linking, StyleProp, TouchableOpacity } from "react-native"
import { MovieVideo } from "../../api/types"
import PlaySvg from "../SVGr/Play"

type MovieImageProps = {
  imageUrl: string
  style?: StyleProp<ImageStyle>
  link?: MovieVideo
}

export const MovieImage: React.FC<MovieImageProps> = ({ imageUrl, style, link }) => {
  if (!link)
    return (
      <Image
        cachePolicy="memory-disk"
        source={`https://media.themoviedb.org/t/p/w440_and_h660_face${imageUrl}`}
        style={style}
        contentFit="cover"
      />
    )
  const onPress = () => {
    if (link.site === "YouTube" && link.key) {
      Linking.openURL(`https://www.youtube.com/watch?v=${link.key}`)
    }
    // I would like to test other sites but haven't got a different result from YouTube
  }
  return (
    <ImageBackground
      cachePolicy="memory-disk"
      source={`https://media.themoviedb.org/t/p/w440_and_h660_face${imageUrl}`}
      style={style}
      contentFit="cover"
    >
      <TouchableOpacity onPress={onPress} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <PlaySvg size={60} />
      </TouchableOpacity>
    </ImageBackground>
  )
}
