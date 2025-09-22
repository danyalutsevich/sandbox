import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import type { LucideIcon } from "lucide-react-native";

interface EmptyListProps {
  message?: string;
  icon?: LucideIcon;
}

export function EmptyList({ message = "No items found", icon: IconComp }: EmptyListProps) {
  return (
    <View className="items-center justify-center py-10 px-6">
      {IconComp ? <Icon as={IconComp} size={28} className="text-muted-foreground mb-2" /> : null}
      <Text className="text-muted-foreground text-sm text-center">{message}</Text>
    </View>
  );
}


