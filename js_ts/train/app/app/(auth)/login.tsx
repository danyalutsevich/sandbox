import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/utils/hooks/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function Login() {
  const auth = useAuth();

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-background px-4 ">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View className="flex-1 justify-center">
            <Card className="space-y-4 p-4">
        <Label className="px-2">Email</Label>

        <Controller
          control={loginForm.control}
          rules={{ required: true, pattern: /^\S+@\S+$/i }}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email"
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
              spellCheck={false}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        {loginForm.formState.errors.email && (
          <Text className="px-2 text-destructive">Email is required.</Text>
        )}

        <Label className="px-2">Password</Label>
        <Controller
          control={loginForm.control}
          rules={{ required: true }}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Password"
              secureTextEntry
              textContentType="password"
              autoComplete="password"
              spellCheck={false}
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {loginForm.formState.errors.password && (
          <Text className="px-2 text-destructive">Password is required.</Text>
        )}

        <Button
          onPress={loginForm.handleSubmit((data) => {
            console.log(data);
            auth.login(data.email, data.password);
          })}
        >
          <Text>Login</Text>
        </Button>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
