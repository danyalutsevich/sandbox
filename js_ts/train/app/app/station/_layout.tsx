import { Stack } from "expo-router";

export default function StationLayout() {
  return (
    <Stack>
      <Stack.Screen name="select" options={{ headerShown: false }} />
    </Stack>
  );
}
