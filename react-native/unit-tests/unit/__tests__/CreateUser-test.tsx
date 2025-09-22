import { CreateUser } from "../components/custom/create-user";
import { render, fireEvent } from "@testing-library/react-native";
import { ApolloProviderMock } from "../__mocks__/apollo-provider-mock";

test("CreateUser component renders and functions correctly", () => {
  const mockOnPress = jest.fn();
  const { getByText } = render(
    <ApolloProviderMock>
      <CreateUser onPress={mockOnPress} />
    </ApolloProviderMock>,
  );

  const button = getByText("Create User");
  expect(button).toBeTruthy();

  fireEvent.press(button);
  expect(mockOnPress).toHaveBeenCalled();
});
