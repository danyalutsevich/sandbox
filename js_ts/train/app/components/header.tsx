import { Text } from "@/components/ui/text";
import { TouchableOpacity, View } from "react-native";
import { useSettings } from "@/utils/hooks/settings";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Station } from "@/utils/types/station";
import { axiosInstance } from "@/utils/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/utils/hooks/auth";

interface HeaderProps {
  // station?: Station | null;
}

export function Header({ }: HeaderProps) {
  const settings = useSettings();
  const auth = useAuth();
  const router = useRouter();

  const station = useQuery<Station>({
    queryKey: ["station", settings.currentStationId],
    queryFn: async () => {
      if (!settings.currentStationId) return null;
      const res = await axiosInstance.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/station/${settings.currentStationId}`,
      );
      return res.data;
    },
    enabled: !!settings.currentStationId,
  });

  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/station/select");
      }}
      activeOpacity={0.7}
    >
      <View className="bg-white px-4 py-5 flex-row items-center justify-between">
        {settings.currentStationId ? (
          <View className="bg-blue-100 rounded-full px-3 py-1">
            <Text className="text-blue-700 font-medium">
              {station.data ? station.data.name : "Loading..."}
            </Text>
          </View>
        ) : (
          <Text className="text-green-700 font-medium">Select Station</Text>
        )}

        <TouchableOpacity
          onPress={() => {
            router.push("/settings");
          }}
          activeOpacity={0.7}
        >
          <Avatar alt="User Avatar" className="w-10 h-10 border">
            <AvatarImage source={{ uri: auth.user?.avatarUrl || undefined }} />
            <AvatarFallback>
              <Text>{auth.user?.username.slice(0, 2)}</Text>
            </AvatarFallback>
          </Avatar>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
