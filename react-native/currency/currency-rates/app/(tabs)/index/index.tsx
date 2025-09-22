import { CurrencyCard } from "@/components/cards/currency-card";
import { GET_CURRENCIES } from "@/utils/gql/currency.gql";
import { Currency } from "@/utils/types/Currency";
import { useQuery } from "@apollo/client/react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const currencies = useQuery<{ currencies: Currency[] }>(GET_CURRENCIES);

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1">
      <FlatList
        data={currencies?.data?.currencies}
        renderItem={({ item }) => <CurrencyCard currency={item} />}
        keyExtractor={(item) => item.code}
      />
    </SafeAreaView>
  );
}
