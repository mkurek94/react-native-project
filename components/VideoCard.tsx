import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Models } from "react-native-appwrite";
import { icons } from "@/constants";
import { AVPlaybackStatusSuccess, ResizeMode, Video } from "expo-av";

interface VideoCardProps {
  item: Models.Document;
}

const VideoCard = ({ item }: VideoCardProps) => {
  const [play, setPlay] = useState(false);
  const video = React.useRef(null);

  const styles = StyleSheet.create({
    video: {
      width: '100%',
      height: 240,
      marginTop: 12,
      borderRadius: 12,
    }
  })

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: item.creator?.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center gap-y-1 flex-1 ml-3">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {item.creator?.username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} resizeMode="contain" className="w-5 h-5" />
        </View>
      </View>

      {play ? (
        <Video
          ref={video}
          source={{ uri: item.video }}
          className="w-full h-60 rounded-xl mt-3"
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if((status as AVPlaybackStatusSuccess).didJustFinish) {
                setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: item.thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
