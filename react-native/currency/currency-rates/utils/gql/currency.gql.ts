import { gql } from "@apollo/client";

export const GET_CURRENCIES = gql`
  query CurrencyInfo {
    currencies {
      code
      name
      numericCode
      decimalDigits
      active
    }
  }
`;
