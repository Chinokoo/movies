import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { useFetch } from "@/services/fetchData";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="z-20 absolute w-full" />
      {/* Extracted conditional rendering */}
      {(() => {
        if (moviesLoading) {
          return (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="self-center mt-10"
            />
          );
        } else if (moviesError) {
          return (
            <View className="flex-1 px-5">
              <Image
                source={icons.logo}
                className="mx-auto mt-20 mb-5 w-12 h-10"
              />
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for a movie"
              />
              <Text className="mt-5 mb-3 font-bold text-white text-lg">
                Latest Movies
              </Text>
              <Text>Error: {moviesError.message}</Text>
            </View>
          );
        } else {
          return (
            <FlatList
              className="flex-1 px-5"
              ListHeaderComponent={
                <>
                  <Image
                    source={icons.logo}
                    className="mx-auto mt-20 mb-5 w-12 h-10"
                  />
                  <SearchBar
                    onPress={() => router.push("/search")}
                    placeholder="Search for a movie"
                  />
                  <Text className="mt-5 mb-3 font-bold text-white text-lg">
                    Latest Movies
                  </Text>
                </>
              }
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              key={3}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
            />
          );
        }
      })()}
    </View>
  );
}
