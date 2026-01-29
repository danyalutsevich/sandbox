import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className="">
        <Text className="text-red-500 p-10">main</Text>
      </View>
    </SafeAreaView>
  );
}
