import React from "react"
import { Image, StyleProp, View, ViewStyle } from "react-native"

export type ImageIconName = "star" | "clock" | "calendar" | "ticket" | "popcorn"

type ImageIconProps = {
  name: ImageIconName
  size?: number
  tintColor?: string
  style?: StyleProp<ViewStyle>
}

const Icons: Record<ImageIconName, any> = {
  star: require("../../assets/images/Star.png"),
  clock: require("../../assets/images/Clock.png"),
  calendar: require("../../assets/images/CalendarBlank.png"),
  ticket: require("../../assets/images/Ticket.png"),
  popcorn: require("../../assets/images/Popcorn.png"),
}

const ImageIcon = ({ name, size = 24, style, tintColor }: ImageIconProps) => {
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Image source={Icons[name]} style={{ width: size, height: size }} tintColor={tintColor} />
    </View>
  )
}

export default ImageIcon
