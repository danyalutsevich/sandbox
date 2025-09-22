import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/hooks/auth";
import { axiosInstance } from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { Heart } from "lucide-react-native";

interface SaveFavoriteButtonProps {
  scheduleId: number;
}

export function SaveFavoriteButton({ scheduleId }: SaveFavoriteButtonProps) {
  const { jwt } = useAuth();
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorite", "bySchedule", scheduleId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/favorite?filter=schedule.id||$eq||${scheduleId}`,
        jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : undefined,
      );
      return res.data;
    },
  });

  const isSaved = Array.isArray(favoritesQuery.data?.data)
    ? favoritesQuery.data.data.length > 0
    : Array.isArray(favoritesQuery.data)
      ? favoritesQuery.data.length > 0
      : false;

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post(
        "/favorite",
        { schedule: { id: scheduleId } },
        jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : undefined,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite"] });
      queryClient.invalidateQueries({ queryKey: ["favorite", "bySchedule", scheduleId] });
    },
  });

  return (
    <Button
      variant={"ghost"}
      size="sm"
      onPress={() => saveMutation.mutate()}
      disabled={saveMutation.isPending}
    >
      <Icon
        as={Heart}
        className={isSaved ? "text-red-500" : saveMutation.isPending ? "opacity-50" : ""}
        size={16}
        fill={isSaved ? "currentColor" : "none"}
      />
    </Button>
  );
}
