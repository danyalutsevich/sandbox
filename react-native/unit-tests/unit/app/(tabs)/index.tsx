import { CreateUser } from "@/components/custom/create-user";
import { GET_USER, GET_USERS } from "@/gql/users.gql";
import { useQuery } from "@apollo/client/react";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

export const CustomText = ({ children }: PropsWithChildren) => (
  <Text>{children}</Text>
);

export default function HomeScreen() {
  const users = useQuery(GET_USERS);
  const user = useQuery(GET_USER, { variables: { id: 1 } });

  if (users.loading) {
    return <Text>Loading...</Text>;
  }
  if (users.error) {
    return <Text>Error: {users.error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <CustomText>Welcome!</CustomText>
      <Text>User: {JSON.stringify(user.data)} |</Text>
      {users.data?.users?.map((user: any) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
      <CreateUser />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
