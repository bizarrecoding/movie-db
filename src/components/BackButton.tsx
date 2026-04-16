import React from "react"
import { TouchableOpacity } from "react-native"
import ImageIcon from "./ImageIcon"

type BackProps = {
  onPress: () => void
}

export const Back: React.FC<BackProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageIcon name="back" size={24} style={{ marginHorizontal: 24 }} />
    </TouchableOpacity>
  )
}
