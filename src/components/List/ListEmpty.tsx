import { StyleSheet, View } from "react-native"
import MagicBox from "../SVGr/MagicBox"
import NoResults from "../SVGr/NoResults"
import { ThemedText } from "../ThemedText"

type ListEmptyProps = {
  minHeight?: number
}

export const ListEmptyComponent: React.FC<ListEmptyProps> = ({ minHeight = 600 }) => (
  <View style={[styles.container, { minHeight }]}>
    <NoResults style={styles.icon} />
    <ThemedText style={styles.title}>We Are Sorry, We Can{"\n"}Not Find The Movies :(</ThemedText>
    <ThemedText style={styles.subtitle}>Find you movie by Type title, categories, years,</ThemedText>
  </View>
)

export const WatchListEmptyComponent: React.FC<ListEmptyProps> = ({ minHeight = 600 }) => (
  <View style={[styles.container, { minHeight }]}>
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
    width: "50%",
    margin: "auto",
  },
  icon: {
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 24,
    marginBottom: 8,
  },
  subtitle: {
    color: "#687076",
    textAlign: "center",
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 18,
  },
})
