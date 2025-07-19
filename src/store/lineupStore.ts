
import { create } from "zustand";

import { PlayerPositions } from "@/lib/formations";

type LineupStore = {
  players: PlayerPositions[];
  playerColor: string;
  setPlayers: (players: PlayerPositions[]) => void;
  setPlayerColor: (color: string) => void;
};

export const useLineupStore = create<LineupStore>((set) => ({
  players: [],
  playerColor: "#2563eb", 
  setPlayers: (players) => set({ players }),
  setPlayerColor: (color) => set({ playerColor: color }),
}));
