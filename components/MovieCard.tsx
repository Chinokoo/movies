import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/600x400/1a1a1a/ffffff.png",
          }}
          className="rounded-lg w-full h-52"
          resizeMode="cover"
        />
        <Text className="mt-2 font-bold text-white text-sm" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row justify-start items-center gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="font-bold text-white text-xs uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="mt-1 font-medium text-light-300 text-xs">
            {release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
