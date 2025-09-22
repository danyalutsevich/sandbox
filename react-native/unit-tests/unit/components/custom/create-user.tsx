import { CREATE_USER, GET_USERS } from "@/gql/users.gql";
import { useMutation } from "@apollo/client/react";
import { TouchableOpacity, Text } from "react-native";

export function CreateUser({ onPress }: { onPress?: () => void }) {
  const [createUser, meta] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  return (
    <TouchableOpacity
      onPress={() => {
        createUser({ variables: { name: "New User" } });
        onPress?.();
      }}
    >
      <Text>Create User</Text>
    </TouchableOpacity>
  );
}
