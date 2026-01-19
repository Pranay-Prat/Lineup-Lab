"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { PlayerPositions } from "@/lib/formations";
import { useLineupStore } from "@/store/lineupStore";

// Helper to categorize roles
const getRoleCategory = (role: string): 'GK' | 'DEF' | 'MID' | 'FWD' => {
    const upperRole = role.toUpperCase();
    if (upperRole === 'GK') return 'GK';
    if (['CB', 'LCB', 'RCB', 'LB', 'RB', 'LWB', 'RWB'].includes(upperRole)) return 'DEF';
    if (['ST', 'CF', 'LW', 'RW', 'SS'].includes(upperRole)) return 'FWD';
    return 'MID';
};

const categoryColors = {
    GK: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600',
    DEF: 'bg-blue-500/10 border-blue-500/30 text-blue-500',
    MID: 'bg-green-500/10 border-green-500/30 text-green-500',
    FWD: 'bg-red-500/10 border-red-500/30 text-red-500',
};

type RosterPanelProps = {
    players: PlayerPositions[];
    playerColor: string;
};

export const RosterPanel: React.FC<RosterPanelProps> = ({ players, playerColor }) => {
    const updatePlayerName = useLineupStore((state) => state.updatePlayerName);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="lg:col-span-3 order-3 lg:order-3"
        >
            <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Squad Roster
                </h3>
                <div className="space-y-2">
                    {players.map((player) => {
                        const category = getRoleCategory(player.role);
                        return (
                            <div
                                key={player.id}
                                className="flex items-center gap-3 p-2 rounded-md bg-background/50 hover:bg-accent/50 transition-colors border border-border"
                            >
                                {/* Player Number */}
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                                    style={{ backgroundColor: playerColor }}
                                >
                                    {player.id}
                                </div>
                                {/* Player Info */}
                                <div className="flex-1 min-w-0">
                                    <input
                                        type="text"
                                        value={player.name || ''}
                                        onChange={(e) => updatePlayerName(player.id, e.target.value)}
                                        placeholder={`Player ${player.id}`}
                                        className="w-full text-sm font-medium text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none transition-colors px-1 py-0.5"
                                    />
                                    <div className={`text-xs px-2 py-0.5 rounded-full inline-block border ${categoryColors[category]}`}>
                                        {player.role}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default RosterPanel;
