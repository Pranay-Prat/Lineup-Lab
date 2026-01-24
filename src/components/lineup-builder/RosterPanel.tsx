"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { PlayerPositions } from "@/lib/formations";
import { useLineupStore } from "@/store/lineupStore";
import { getRoleCategory, categoryColors } from "@/lib/player-utils";


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
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:border-border">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2 tracking-tight">
                    <Users className="w-5 h-5" />
                    Squad Roster
                </h3>
                <div className="space-y-2">
                    {players.map((player) => {
                        const category = getRoleCategory(player.role);
                        return (
                            <div
                                key={player.id}
                                className="group flex items-center gap-3 p-3 rounded-lg bg-background/40 hover:bg-accent/40 transition-all border border-transparent hover:border-border/50"
                            >
                                {/* Player Number */}
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-sm ring-2 ring-white/10"
                                    style={{ backgroundColor: playerColor }}
                                >
                                    {player.id}
                                </div>
                                {/* Player Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <input
                                            type="text"
                                            value={player.name || ''}
                                            onChange={(e) => updatePlayerName(player.id, e.target.value)}
                                            placeholder={`Player ${player.id}`}
                                            className="w-full text-sm font-medium text-foreground bg-transparent border-none focus:ring-0 p-0 placeholder:text-muted-foreground/50"
                                        />
                                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full border opacity-70 group-hover:opacity-100 transition-opacity ${categoryColors[category]}`}>
                                            {player.role}
                                        </div>
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
