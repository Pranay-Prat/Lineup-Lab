/**
 * Player utility functions for role categorization and styling
 * Extracted from StatsPanel.tsx and RosterPanel.tsx to avoid duplication
 */

import type { RoleCategory } from "@/lib/types";
export type { RoleCategory } from "@/lib/types";

/**
 * Categorizes a player role into one of four categories: GK, DEF, MID, or FWD
 */
export const getRoleCategory = (role: string): RoleCategory => {
    const upperRole = role.toUpperCase();
    if (upperRole === 'GK') return 'GK';
    if (['CB', 'LCB', 'RCB', 'LB', 'RB', 'LWB', 'RWB'].includes(upperRole)) return 'DEF';
    if (['ST', 'CF', 'LW', 'RW', 'SS'].includes(upperRole)) return 'ATT';
    return 'MID';
};

/**
 * Get zone category based on player's vertical position on pitch
 * top: 0% = attacking goal, 100% = defensive goal
 */
export const getZoneFromPosition = (top: number): RoleCategory => {
    if (top <= 33) return 'ATT';
    if (top <= 66) return 'MID';
    return 'DEF';
};

/**
 * Color mappings for each role category - used for consistent styling across components
 */
export const categoryColors: Record<RoleCategory, string> = {
    GK: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600',
    DEF: 'bg-blue-500/10 border-blue-500/30 text-blue-500',
    MID: 'bg-green-500/10 border-green-500/30 text-green-500',
    ATT: 'bg-red-500/10 border-red-500/30 text-red-500',
};
