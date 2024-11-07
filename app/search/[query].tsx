import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { searchPosts } from "@/lib/appwrite";

import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { useAppWrite } from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { user } = useGlobalContext();
  const { query } = useLocalSearchParams();
  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppWrite(() => searchPosts(query as string));
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    onRefresh();
  }, [query]);

  const onRefresh = async () => {
    setRefreshing(true);

    await refetch();

    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard item={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search results
            </Text>
            <Text className="text-white text-2xl font-psemibold">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput
                initialQuery={query as string}
                placeholder="Search for a video topic"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query."
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
