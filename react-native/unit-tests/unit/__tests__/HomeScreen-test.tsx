import { render } from "@testing-library/react-native";

import HomeScreen, { CustomText } from "@/app/(tabs)/index";
import { ApolloProviderMock } from "../__mocks__/apollo-provider-mock";

describe("<HomeScreen />", () => {
  test("Text renders correctly on HomeScreen", () => {
    const { getByText } = render(
      <ApolloProviderMock>
        <HomeScreen />
      </ApolloProviderMock>,
    );

    getByText("Loading...");
  });
});
