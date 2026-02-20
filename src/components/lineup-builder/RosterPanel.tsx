"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { toast } from "sonner";
import type { PlayerPositions } from "@/lib/types";
import { useLineupStore } from "@/store/lineupStore";
import { getRoleCategory, categoryColors } from "@/lib/player-utils";


type NumberInputProps = {
    player: PlayerPositions;
    allPlayers: PlayerPositions[];
    playerColor: string;
    onCommit: (playerId: number, num: number) => void;
};

/**
 * Editable jersey number badge.
 * - Uses local string state so backspace/clear works freely
 * - Commits only on blur or Enter
 * - Shows red ring if number is already taken by another player
 */
const NumberInput: React.FC<NumberInputProps> = ({ player, allPlayers, playerColor, onCommit }) => {
    const currentNumber = player.number ?? player.id;
    const [localValue, setLocalValue] = useState(String(currentNumber));
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync local value when store changes externally (e.g. formation switch)
    useEffect(() => {
        if (!isFocused) {
            setLocalValue(String(player.number ?? player.id));
        }
    }, [player.number, player.id, isFocused]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        // Allow empty (user is clearing) or up to 2 digits
        if (raw.length <= 2) {
            setLocalValue(raw);
        }
    };

    const commitValue = () => {
        const num = parseInt(localValue, 10);
        if (!isNaN(num) && num >= 1 && num <= 99) {
            const takenBy = allPlayers.find(p => p.id !== player.id && (p.number ?? p.id) === num);
            if (takenBy) {
                toast.error(`Jersey #${num} is already taken by ${takenBy.name || `Player ${takenBy.id}`}`);
                setLocalValue(String(currentNumber));
            } else {
                onCommit(player.id, num);
            }
        } else {
            // Revert to current stored value
            setLocalValue(String(currentNumber));
        }
        setIsFocused(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            inputRef.current?.blur();
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        // Select all text on focus so user can just type a new number
        setTimeout(() => inputRef.current?.select(), 0);
    };

    return (
        <div className="relative shrink-0">
            <input
                ref={inputRef}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={localValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={commitValue}
                onKeyDown={handleKeyDown}
                className={`w-10 h-10 rounded-full text-sm font-bold text-white text-center bg-transparent border-2 focus:outline-none cursor-pointer appearance-none select-all transition-all duration-200
                    ${isFocused ? 'border-white ring-2 ring-primary/50' : 'border-white/20'}
                    [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]`}
                style={{ backgroundColor: playerColor }}
                title="Tap to change jersey number"
            />
        </div>
    );
};


type RosterPanelProps = {
    players: PlayerPositions[];
    playerColor: string;
};

export const RosterPanel: React.FC<RosterPanelProps> = ({ players, playerColor }) => {
    const updatePlayerName = useLineupStore((state) => state.updatePlayerName);
    const updatePlayerNumber = useLineupStore((state) => state.updatePlayerNumber);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3}}
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
                                {/* Editable Player Number */}
                                <NumberInput
                                    player={player}
                                    allPlayers={players}
                                    playerColor={playerColor}
                                    onCommit={updatePlayerNumber}
                                />
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

