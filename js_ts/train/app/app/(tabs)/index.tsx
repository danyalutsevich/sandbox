import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { TrainCard } from "@/components/cards/train-card";

export default function HomeScreen() {
  const router = useRouter();
  const trains = useQuery({
    queryKey: ["trains"],
    queryFn: async () => {
      const res = await axiosInstance.get("http://localhost:3000/train");
      return res.data;
    },
  });

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1">
      <FlatList
        data={trains.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TrainCard
            train={item}
            onPress={() => router.push("/train?trainId=" + item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}
