import { StationCard } from "@/components/cards/station-card";
import { axiosInstance } from "@/utils/axiosInstance";
import { useSettings } from "@/utils/hooks/settings";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectStation() {
  const router = useRouter();
  const settings = useSettings();
  const stations = useQuery({
    queryKey: ["stations"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/station`,
      );
      return res.data;
    },
  });

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1">
      <FlatList
        data={stations.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StationCard
            station={item}
            onPress={() => {
              settings.setCurrentStationId(item.id);
              router.push("/(tabs)");
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}
