import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { FlatList, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { TrainCard } from "@/components/cards/train-card";
import { Header } from "@/components/header";
import { Text } from "@/components/ui/text";
import { useSettings } from "@/utils/hooks/settings";
import { ScheduleCard } from "@/components/cards/schedule-card";

export default function HomeScreen() {
  const router = useRouter();
  const settings = useSettings();
  // const trains = useQuery({
  //   queryKey: ["trains"],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get(
  //       process.env.EXPO_PUBLIC_BASE_URL + "/train",
  //     );
  //     return res.data;
  //   },
  // });

  const schedules = useQuery({
    queryKey: ["schedule", settings.currentStationId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        process.env.EXPO_PUBLIC_BASE_URL + "/schedule",
        {
          params: {
            join: ["route", "route.originStation", "route.destinationStation"],
            filter: [
              "route.originStation.id||eq||" + settings.currentStationId,
            ],
          },
        },
      );
      return res.data;
    },
  });

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1">
      <Header />
      {/* <ScrollView> */}
      {/*   <Text>{JSON.stringify(trains.data, null, 2)}</Text> */}
      {/* </ScrollView> */}
      <FlatList
        data={settings.currentStationId ? schedules.data : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ScheduleCard
            schedule={item}
            onPress={() => router.push("/train?trainId=" + item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}
