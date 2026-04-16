import React from "react"
import { Image, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"

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

const ImageIcon: React.FC<ImageIconProps> = ({ name, size = 24, style, tintColor = "#FFFFFF" }) => {
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Image source={Icons[name]} style={{ width: size, height: size, resizeMode: "contain" }} tintColor={tintColor} />
    </View>
  )
}

export default ImageIcon

type ToggleIconProps = Omit<ImageIconProps, "name"> & {
  value: boolean
  setValue: () => void
}

export const ToggleIcon: React.FC<ToggleIconProps> = ({ value, setValue, size = 20, style, tintColor }) => {
  const toggleIcon = value
    ? require("../../assets/images/bookmark-on.png")
    : require("../../assets/images/bookmark-off.png")
  return (
    <TouchableOpacity style={[{ width: size, height: size }, style]} onPress={setValue}>
      <Image source={toggleIcon} style={{ width: size, height: size, resizeMode: "contain" }} tintColor={tintColor} />
    </TouchableOpacity>
  )
}
