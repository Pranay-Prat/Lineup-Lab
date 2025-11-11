
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PlayerPositions, Formation, formations } from "@/lib/formations";
import { pitchColors, playerColors } from "@/lib/colors";

type LineupStore = {
  players: PlayerPositions[];
  selectedFormation: Formation;
  playerColor: typeof playerColors[number]['hex'];
  pitchColor: typeof pitchColors[number];
  setPlayers: (players: PlayerPositions[]) => void;
  setSelectedFormation: (formation: Formation) => void;
  setPlayerColor: (color: string) => void;
  setPitchColor: (color: typeof pitchColors[number]) => void;
};

export const useLineupStore = create<LineupStore>()(
  persist(
    (set) => ({
      players: [],
      selectedFormation: formations[0], // Default to first formation
      playerColor: "#ef4444", // Default to red
      pitchColor: pitchColors[0], // Default to Classic Green
      setPlayers: (players) => set({ players }),
      setSelectedFormation: (formation) => set({ selectedFormation: formation }),
      setPlayerColor: (color) => set({ playerColor: color }),
      setPitchColor: (color) => set({ pitchColor: color }),
    }),
    {
      name: "lineup-storage", // name of the item in localStorage
      partialize: (state) => ({
        selectedFormation: state.selectedFormation,
        playerColor: state.playerColor,
        pitchColor: state.pitchColor,
        // Don't persist players array - it will be derived from selectedFormation
      }),
    }
  )
);
