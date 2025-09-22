import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TouchableOpacity, View } from "react-native";
import { Schedule } from "@/utils/types/schedule";
import dayjs from "dayjs";
import { SaveFavoriteButton } from "@/components/buttons/save-route-button";
import { Icon } from "@/components/ui/icon";
import { Clock, Train } from "lucide-react-native";

interface ScheduleCardProps {
  schedule: Schedule;
  onPress: () => void;
}

export function ScheduleCard({ schedule, onPress }: ScheduleCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card className="m-2">
        <CardHeader className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            {/*
I decided to hide the origin station to reduce redundancy, as it is always the same as the current station.
*/}
            {/* <Text */}
            {/*   className="text-lg font-semibold" */}
            {/*   numberOfLines={1} */}
            {/*   ellipsizeMode="tail" */}
            {/* > */}
            {/*   {schedule.route?.originStation?.name ?? "-"} */}
            {/* </Text> */}
            <Text
              className="text-lg font-semibold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              → {schedule.route?.destinationStation?.name ?? "-"}
            </Text>
          </View>
          <View className="shrink-0 flex-row items-center gap-2">
            <View className="bg-blue-100 rounded-full px-2 py-1 flex-row items-center gap-1">
              <Icon as={Train} size={14} className="text-blue-700" />
              <Text className="text-blue-700 font-medium">{schedule.platform ?? "-"}</Text>
            </View>
            <SaveFavoriteButton scheduleId={schedule.id} />
          </View>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <View className="flex-row justify-between mb-2">
            <View className="flex-1">
              <View className="flex-row items-center gap-1">
                <Icon as={Clock} size={14} className="text-gray-500" />
                <Text className="text-xs text-gray-500">Departure</Text>
              </View>
              <Text className="text-base font-medium">{dayjs(schedule.departureTime).format("HH:mm")}</Text>
            </View>
            <View className="flex-1 items-end">
              <View className="flex-row items-center gap-1">
                <Icon as={Clock} size={14} className="text-gray-500" />
                <Text className="text-xs text-gray-500">Arrival</Text>
              </View>
              <Text className="text-base font-medium">{dayjs(schedule.arrivalTime).format("HH:mm")}</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-1">
            <Icon as={Train} size={14} className="text-gray-600" />
            <Text className="text-sm text-gray-600">
              {schedule.train?.name ?? "-"} • {schedule.train?.type ?? "-"}
            </Text>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}
