import { Text } from "@/components/ui/text";
import { TouchableOpacity, View } from "react-native";
import { Station } from "@/utils/types/station";

interface StationCardProps {
  station: Station;
  onPress: () => void;
}

export function StationCard({ station, onPress }: StationCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className="bg-white rounded-xl shadow-md p-4 m-2 flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-semibold text-gray-900">
            {station.name}
          </Text>
          <Text className="text-sm text-gray-500">
            {station.lat.toFixed(2)}, {station.lng.toFixed(2)}
          </Text>
        </View>
        <View className="bg-blue-100 rounded-full px-3 py-1">
          <Text className="text-blue-700 font-medium">{station.code}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
