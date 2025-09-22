import { Currency } from "@/utils/types/Currency";
import { View, Text } from "react-native";

export interface CurrencyCardProps {
  currency: Currency;
}

export function CurrencyCard({ currency }: CurrencyCardProps) {
  return (
    <View className="p-4 border-b border-gray-200">
      <Text>{currency.code}</Text>
    </View>
  );
}
