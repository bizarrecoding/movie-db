import { StyleSheet, View } from "react-native"
import MagicBox from "../SVGr/MagicBox"
import NoResults from "../SVGr/NoResults"
import { ThemedText } from "../ThemedText"

export const ListEmptyComponent = () => (
  <View style={styles.container}>
    <NoResults style={styles.icon} />
    <ThemedText type="subtitle" style={{ textAlign: "center" }}>
      We Are Sorry, We Can{"\n"}Not Find The Movies :(
    </ThemedText>
  </View>
)

export const WatchListEmptyComponent = () => (
  <View style={styles.container}>
    <MagicBox style={styles.icon} />
    <ThemedText style={styles.title}>There Is No Movie Yet!</ThemedText>
    <ThemedText style={styles.subtitle}>Find your movie by Type title, categories, years, etc</ThemedText>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 600,
  },
  icon: {
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "600",
    textAlign: "center",
    width: "70%",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    width: "70%",
    color: "#687076",
    lineHeight: 19,
  },
})
