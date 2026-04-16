import { router } from "expo-router"
import { useCallback, useState } from "react"
import { FlatList, ListRenderItem, StyleSheet, useWindowDimensions } from "react-native"
import { Movie } from "../../api/types"
import { useNowPlayingMovies } from "../../hooks/use-now-playing"
import { usePopularMovies } from "../../hooks/use-popular-movies"
import { useTopRatedMovies } from "../../hooks/use-top-rated"
import { useUpcomingMovies } from "../../hooks/use-upcoming"
import { ListEmptyComponent } from "../List/ListEmpty"
import SearchInput from "../SearchInput"
import SlidingTabs, { Tab } from "../SlidingTabs"
import { ThemedText } from "../ThemedText"
import { Gallery } from "./Gallery"
import Poster from "./Poster"

type HomeFeedTabs = "now_playing" | "upcoming" | "top_rated"

const Tabs: Tab<HomeFeedTabs>[] = [
  { id: "now_playing", label: "Now Playing" },
  { id: "upcoming", label: "Upcoming" },
  { id: "top_rated", label: "Top Rated" },
]

const PopularGallery = () => {
  const { data, isLoading, error } = usePopularMovies()

  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>
  }
  if (error) {
    return <ThemedText>Error loading movies.</ThemedText>
  }
  if (!data?.results?.length) return <ListEmptyComponent />
  return <Gallery horizontal data={data?.results || []} />
}

export const HomeFeed = () => {
  const { data, isLoading, error } = useNowPlayingMovies()
  const { data: upcomingData, isLoading: upcomingLoading, error: upcomingError } = useUpcomingMovies()
  const { data: topRatedData, isLoading: topRatedLoading, error: topRatedError } = useTopRatedMovies()

  const width = useWindowDimensions().width
  const [active, setActive] = useState<HomeFeedTabs>("now_playing")

  const renderHeader = useCallback(
    () => (
      <>
        <ThemedText style={styles.header}>What do you want to watch?</ThemedText>
        <SearchInput />
        <PopularGallery />
      </>
    ),
    [],
  )
  const renderItem: ListRenderItem<Movie> = useCallback(({ item }) => {
    const goToDetails = () => router.push(`/details/${item.id}`)
    return (
      <Poster
        id={item.id}
        imageUrl={item.poster_path}
        onPress={goToDetails}
        style={styles.poster}
        aspectRatio={2 / 3}
      />
    )
  }, [])

  const moviesByCategory: Record<HomeFeedTabs, Movie[]> = {
    now_playing: data?.results || [],
    upcoming: upcomingData?.results || [],
    top_rated: topRatedData?.results || [],
  }

  return (
    <FlatList<Movie>
      numColumns={3}
      data={moviesByCategory[active] || []}
      ListHeaderComponent={
        <>
          {renderHeader()}
          <SlidingTabs<HomeFeedTabs> tabs={Tabs} activeTab={active} onTabChange={setActive} />
        </>
      }
      ListEmptyComponent={() => {
        if (isLoading || upcomingLoading || topRatedLoading) {
          return <ThemedText>Loading...</ThemedText>
        }
        if (error || upcomingError || topRatedError) {
          return <ThemedText>Error loading movies.</ThemedText>
        }
        return <ListEmptyComponent />
      }}
      contentContainerStyle={{ rowGap: 18 }}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 24,
  },
  poster: {
    margin: "auto",
  },
})
