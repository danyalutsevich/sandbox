import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, View } from "react-native";
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
      );
      return res.data;
    },
  });

  return (
    <SafeAreaView>
      <View>
        <Text>Train ID: {params.trainId}</Text>
        <Text>Train : {JSON.stringify(train.data)}</Text>
      </View>
    </SafeAreaView>
  );
}
