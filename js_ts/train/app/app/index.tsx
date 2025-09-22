import { useAuth } from "@/utils/hooks/auth";
import { Redirect } from "expo-router";

export default function InitialRoute() {
  const auth = useAuth();

  if (auth.jwt) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/login" />;
  }
}
