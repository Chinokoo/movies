import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 px-5 py-4 rounded-full">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onFocus={onPress}
        placeholder={placeholder}
        onChangeText={() => {}}
        className="flex-1 ml-2 placeholder:text-white"
      />
    </View>
  );
};

export default SearchBar;
