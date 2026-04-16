import React from "react"
import { TouchableNativeFeedback } from "react-native"
import ImageIcon from "./ImageIcon"

type BackProps = {
  onPress: () => void
}

export const Back: React.FC<BackProps> = ({ onPress }) => {
  // const color = useThemeColor({}, `text`)
  // <MaterialIcons name="arrow-back-ios" size={24} color={color} />
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <ImageIcon name="back" size={24} style={{ marginHorizontal: 24 }} />
    </TouchableNativeFeedback>
  )
}
