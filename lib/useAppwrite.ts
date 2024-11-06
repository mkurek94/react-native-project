import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";

interface UseAppWrite {
  data: Models.Document[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const useAppWrite = (
  fn: () => Promise<Models.Document[]>
): UseAppWrite => {
  const [data, setData] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};
