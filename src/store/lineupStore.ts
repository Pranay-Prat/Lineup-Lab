
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PlayerPositions, formations } from "@/lib/formations";
import { pitchColors, playerColors } from "@/lib/colors";

type LineupStore = {
  players: PlayerPositions[];
  selectedFormationName: string;
  playerColor: typeof playerColors[number]['hex'];
  pitchColor: typeof pitchColors[number];
  setPlayers: (players: PlayerPositions[]) => void;
  setSelectedFormation: (formationName: string) => void;
  setPlayerColor: (color: string) => void;
  setPitchColor: (color: typeof pitchColors[number]) => void;
  updatePlayerPosition: (id: number, top: number, left: number) => void;
  updatePlayerName: (id: number, name: string) => void;
};

export const useLineupStore = create<LineupStore>()(
  persist(
    (set) => ({
      players: [],
      selectedFormationName: formations[0].name, // Default to first formation name
      playerColor: "#ef4444", // Default to red
      pitchColor: pitchColors[0], // Default to Classic Green
      setPlayers: (players) => set({ players }),
      setSelectedFormation: (formationName) => {
        const formation = formations.find(f => f.name === formationName) || formations[0];
        set({
          selectedFormationName: formationName,
          players: formation.positions.map(pos => ({ ...pos, name: `Player ${pos.id}` }))
        });
      },
      setPlayerColor: (color) => set({ playerColor: color }),
      setPitchColor: (color) => set({ pitchColor: color }),
      updatePlayerPosition: (id, top, left) => set((state) => ({
        players: state.players.map(player =>
          player.id === id ? { ...player, top, left } : player
        )
      })),
      updatePlayerName: (id, name) => set((state) => ({
        players: state.players.map(player =>
          player.id === id ? { ...player, name } : player
        )
      })),
    }),
    {
      name: "lineup-storage", // name of the item in localStorage
      partialize: (state) => ({
        selectedFormationName: state.selectedFormationName,
        players: state.players,
        playerColor: state.playerColor,
        pitchColor: state.pitchColor,
      }),
    }
  )
);
