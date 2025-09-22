import { CREATE_USER, GET_USER, GET_USERS } from "@/gql/users.gql";
import { MockedProvider } from "@apollo/client/testing/react";

export const apolloProviderMocks = [
  {
    request: {
      query: CREATE_USER,
      variables: { name: "John" },
    },
    result: {
      data: { createUser: { id: "1", name: "John" } },
    },
  },
  {
    request: { query: GET_USERS },
    result: { data: { users: [] } },
  },
  {
    request: { query: GET_USER },
    result: { data: { user: { id: 1, name: "Mocked User" } } },
  },
];

export const ApolloProviderMock = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MockedProvider mocks={apolloProviderMocks}>{children}</MockedProvider>
  );
};
