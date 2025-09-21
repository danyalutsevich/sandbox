import { Train } from "@/utils/types/train";
import { Text } from "@/components/ui/text";
import { TouchableOpacity, View } from "react-native";

interface TrainCardProps {
  train: Train;
  onPress: () => void;
}

export function TrainCard({ train, onPress }: TrainCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="p-4 border-b border-gray-200">
        <Text className="text-lg font-bold"> {train.name} </Text>
        <Text className="text-sm text-gray-600"> Type: {train.type} </Text>
        <Text className="text-sm text-gray-600"> Status: {train.status} </Text>
      </View>
    </TouchableOpacity>
  );
}
