import { useLocalSearchParams } from "expo-router";
import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function Train() {
  const params = useLocalSearchParams();

  const train = useQuery({
    queryKey: ["train", params.trainId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/train/${params.trainId}`,
        {
          params: {
            join: ["schedules", "route", "nextStation"],
          },
        },
      );
      return res.data;
    },
  });

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={train.refetch}
            refreshing={train.isLoading}
          />
        }
      >
        <View>
          <Text>Train ID: {params.trainId}</Text>
          <Text>Train : {JSON.stringify(train.data)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
