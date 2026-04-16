import React from "react"
import { Image, StyleProp, View, ViewStyle } from "react-native"

export type ImageIconName = "star" | "clock" | "calendar" | "ticket" | "popcorn" | "back"

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
  back: require("../../assets/images/arrow-left.png"),
}

const ImageIcon: React.FC<ImageIconProps> = ({ name, size = 24, style, tintColor }) => {
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Image source={Icons[name]} style={{ width: size, height: size }} tintColor={tintColor} />
    </View>
  )
}

export default ImageIcon

type ToggleIconProps = Omit<ImageIconProps, "name"> & {
  value: boolean
}

export const ToggleIcon: React.FC<ToggleIconProps> = ({ value, size = 24, style, tintColor }) => {
  const toggleIcon = value
    ? require("../../assets/images/bookmark-on.png")
    : require("../../assets/images/bookmark-off.png")
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Image source={toggleIcon} style={{ width: size, height: size }} tintColor={tintColor} />
    </View>
  )
}
