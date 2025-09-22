import { create } from "zustand";
import { createZustandAsyncStorage } from "../zustand/storage";
import { persist } from "zustand/middleware";

interface SettingsState {
  currentStationId: number | null;
  setCurrentStationId: (id: number) => void;
}

const storage = createZustandAsyncStorage<SettingsState>("settings");

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      currentStationId: null,
      setCurrentStationId: (id: number) => set({ currentStationId: id }),
    }),
    { name: "settings", storage },
  ),
);
