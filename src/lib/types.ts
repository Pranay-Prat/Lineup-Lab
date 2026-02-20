/**
 * Centralized type definitions for the football lineup maker.
 * All shared types are defined here for modularity.
 */

// ─── Player & Formation Types ──────────────────────────────────────

export type PlayerPositions = {
    id: number;
    top: number;
    left: number;
    role: string;
    name?: string;
    number?: number;
};

export type Formation = {
    name: string;
    positions: Omit<PlayerPositions, "name" | "number">[];
};

// ─── Color Types ───────────────────────────────────────────────────

import { playerColors, pitchColors } from "@/lib/colors";

export type PlayerColor = (typeof playerColors)[number]["hex"];
export type PitchColor = (typeof pitchColors)[number];

// ─── Role Types ────────────────────────────────────────────────────

export type RoleCategory = "GK" | "DEF" | "MID" | "ATT";

// ─── Lineup Sharing Types ──────────────────────────────────────────

export type ShareableLineupData = {
    teamName: string;
    formationName: string;
    players: PlayerPositions[];
    playerColor: string;
    pitchColor: {
        label: string;
        value: string;
        previewClass: string;
    };
};
