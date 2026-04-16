import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import ImageIcon, { ImageIconName } from "../ImageIcon"
import { ThemedText } from "../ThemedText"

type MoveAttributeProps = {
  icon: ImageIconName
  label: string | number
  color?: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const MovieAttribute: React.FC<MoveAttributeProps> = ({ icon, label, color, style, textStyle }) => {
  return (
    <View style={[styles.container, style]}>
      <ImageIcon name={icon} tintColor={color} size={16} />
      <ThemedText style={[styles.label, textStyle, color ? { color } : undefined]}>{label}</ThemedText>
    </View>
  )
}

export default MovieAttribute

const styles = StyleSheet.create({
  container: { alignItems: "center", flexDirection: "row", gap: 4 },
  label: { fontSize: 12, lineHeight: 15 },
})
