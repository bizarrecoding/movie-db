import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { HomeFeed } from "../../src/components/Movie/HomeFeed"

export default function Index() {
  const { top } = useSafeAreaInsets()
  return (
    <View style={{ flex: 1, paddingTop: top }}>
      <HomeFeed />
    </View>
  )
}
