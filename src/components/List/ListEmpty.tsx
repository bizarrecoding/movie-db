import { View } from "react-native"
import NoResults from "../SVGr/NoResults"
import { ThemedText } from "../ThemedText"

export const ListEmptyComponent = () => (
  <View>
    <NoResults style={{ alignSelf: "center", marginVertical: 24 }} />
    <ThemedText type="subtitle" style={{ textAlign: "center" }}>
      We Are Sorry, We Can{"\n"}Not Find The Movies :(
    </ThemedText>
  </View>
)
