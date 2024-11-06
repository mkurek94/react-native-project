import { View, Text, Image } from "react-native";
import React from "react";

import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState = ({ subtitle, title }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-white text-center text-xl mt-2 font-psemibold">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButton title="Create video" handlePress={() => router.push('/create')} containerStyles="w-full my-5 "/>
    </View>
  );
};

export default EmptyState;