
import { create } from "zustand";

type Player = {
  id: string;
  number: number;
  top: number;
  left: number;
};

type LineupStore = {
  players: Player[];
  playerColor: string;
  setPlayers: (players: Player[]) => void;
  setPlayerColor: (color: string) => void;
};

export const useLineupStore = create<LineupStore>((set) => ({
  players: [],
  playerColor: "#2563eb", 
  setPlayers: (players) => set({ players }),
  setPlayerColor: (color) => set({ playerColor: color }),
}));
