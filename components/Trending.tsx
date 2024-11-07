import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet
} from "react-native";
import React, { useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import { Video, ResizeMode, AVPlaybackStatusSuccess } from "expo-av";
import { icons } from "@/constants";

interface Post {
  $id: string;
  thumbnail: string;
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
  prompt: string;
}

interface TrendingProps {
  posts: Post[];
}

interface TrendingItemProps {
  activeItem: any;
  item: Post;
}

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.0,
  },
};

const zoomOut = {
  from: {
    scale: 1,
  },
  to: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);
  const video = React.useRef(null);

  const styles = StyleSheet.create({
    video: {
      width: 208,
      height: 288,
      borderRadius: 33,
      marginTop: -35,
      backgroundColor: "rgb(255 255 255 / 0.1)",
    }
  })
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : (zoomOut as any)}
    >
      {play ? (
        <Video
        ref={video}
        source={{ uri: item.video }}
        style={styles.video}
        className="w-52 h-72 rounded-[33px] bg-white/10"
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={(status) => {
          if ((status as AVPlaybackStatusSuccess).didJustFinish) {
            setPlay(false);
          }
        }}
      />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] mr-5 overflow-hidden shadow-lg shadow-black/40 "
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };


  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{itemVisiblePercentThreshold: 70}}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
