import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import "react-native-reanimated";
import "../utils/global";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const client = new ApolloClient({
    link: new HttpLink({
      uri:
        "https://swop.cx/graphql?api-key=" +
        process.env.EXPO_PUBLIC_SWOP_API_KEY,
      headers: {
        Authorization: `ApiKey ${process.env.EXPO_PUBLIC_SWOP_API_KEY}`,
      },
    }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen */}
          {/*   name="modal" */}
          {/*   options={{ presentation: "modal", title: "Modal" }} */}
          {/* /> */}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ApolloProvider>
  );
}
