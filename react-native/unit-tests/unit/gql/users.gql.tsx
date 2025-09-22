import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

export const GET_USER = gql`
  query ($id: Int!) {
    user(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;
