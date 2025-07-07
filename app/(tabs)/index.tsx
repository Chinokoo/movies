import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { useFetch } from "@/services/fetchData";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

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
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ height: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="mx-auto mt-20 mb-5 w-12 h-10" />
        {/* Extracted content */}
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
              <Text className="text-white">Error: {moviesError.message}</Text>
            );
          } else {
            return (
              <View className="flex-1">
                <SearchBar
                  onPress={() => router.push("/search")}
                  placeholder="Search for a movie"
                />
                <>
                  <Text className="mt-5 mb-3 font-bold text-white text-lg">
                    Latest Movies
                  </Text>
                </>
              </View>
            );
          }
        })()}
      </ScrollView>
    </View>
  );
}
