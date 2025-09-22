import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PersistStorage, StorageValue } from "zustand/middleware";

export const createZustandAsyncStorage = <T>(
  storageKey: string,
): PersistStorage<T> => {
  return {
    setItem: async (key, value) => {
      try {
        await AsyncStorage.setItem(
          `${storageKey}:${key}`,
          JSON.stringify(value),
        );
      } catch (e) {
        console.warn(
          `[AsyncStorage:${storageKey}] Failed to set key "${key}"`,
          e,
        );
      }
    },

    getItem: async (key) => {
      try {
        const raw = await AsyncStorage.getItem(`${storageKey}:${key}`);
        if (!raw) return null;
        return JSON.parse(raw) as StorageValue<T>;
      } catch (e) {
        console.warn(
          `[AsyncStorage:${storageKey}] Failed to get key "${key}"`,
          e,
        );
        return null;
      }
    },

    removeItem: async (key) => {
      try {
        await AsyncStorage.removeItem(`${storageKey}:${key}`);
      } catch (e) {
        console.warn(
          `[AsyncStorage:${storageKey}] Failed to remove key "${key}"`,
          e,
        );
      }
    },
  };
};
