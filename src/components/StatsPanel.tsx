"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Shield, Compass, Target } from "lucide-react";
import { PlayerPositions } from "@/lib/formations";
import { playerColors, pitchColors } from "@/lib/colors";
import { useLineupStore } from "@/store/lineupStore";

// Helper to categorize roles
const getRoleCategory = (role: string): 'GK' | 'DEF' | 'MID' | 'FWD' => {
    const upperRole = role.toUpperCase();
    if (upperRole === 'GK') return 'GK';
    if (['CB', 'LCB', 'RCB', 'LB', 'RB', 'LWB', 'RWB'].includes(upperRole)) return 'DEF';
    if (['ST', 'CF', 'LW', 'RW', 'SS'].includes(upperRole)) return 'FWD';
    return 'MID';
};

type StatsPanelProps = {
    players: PlayerPositions[];
};

export const StatsPanel: React.FC<StatsPanelProps> = ({ players }) => {
    const { playerColor, pitchColor, setPlayerColor, setPitchColor } = useLineupStore();
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [isPitchColorPickerOpen, setIsPitchColorPickerOpen] = useState(false);

    const handleColorChange = (color: typeof playerColors[number]['hex']) => {
        setPlayerColor(color);
        setIsColorPickerOpen(false);
    };

    const handlePitchColorChange = (color: typeof pitchColors[number]) => {
        setPitchColor(color);
        setIsPitchColorPickerOpen(false);
    };

    return (
        <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            {/* Formation Stats */}
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Compass className="w-4 h-4" />
                    Formation Stats
                </h3>
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3 text-center">
                        <Shield className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                        <div className="text-xl font-bold text-blue-500">
                            {players.filter(p => getRoleCategory(p.role) === 'DEF').length}
                        </div>
                        <div className="text-xs text-muted-foreground">DEF</div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-md p-3 text-center">
                        <Compass className="w-5 h-5 mx-auto mb-1 text-green-500" />
                        <div className="text-xl font-bold text-green-500">
                            {players.filter(p => getRoleCategory(p.role) === 'MID').length}
                        </div>
                        <div className="text-xs text-muted-foreground">MID</div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-center">
                        <Target className="w-5 h-5 mx-auto mb-1 text-red-500" />
                        <div className="text-xl font-bold text-red-500">
                            {players.filter(p => getRoleCategory(p.role) === 'FWD').length}
                        </div>
                        <div className="text-xs text-muted-foreground">FWD</div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Player Color Picker */}
            <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Player Colors
                </h4>
                <div className="relative">
                    <button
                        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 bg-background border border-border rounded-md text-foreground hover:bg-accent transition-colors text-sm"
                    >
                        <div className="flex items-center space-x-2">
                            <div
                                className="w-4 h-4 rounded-full border border-border"
                                style={{ backgroundColor: playerColor }}
                            />
                            <span>{playerColors.find(color => color.hex === playerColor)?.label || playerColor}</span>
                        </div>
                    </button>
                    {isColorPickerOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-10 p-3"
                        >
                            <div className="grid grid-cols-4 gap-2">
                                {playerColors.map((color) => (
                                    <button
                                        key={color.label}
                                        onClick={() => handleColorChange(color.hex)}
                                        className={`w-7 h-7 rounded-full border-2 hover:scale-110 transition-transform ${color.hex === playerColor ? 'border-foreground' : 'border-border'}`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.label}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Pitch Color Picker */}
            <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Pitch Colors
                </h4>
                <div className="relative">
                    <button
                        onClick={() => setIsPitchColorPickerOpen(!isPitchColorPickerOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 bg-background border border-border rounded-md text-foreground hover:bg-accent transition-colors text-sm"
                    >
                        <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded border border-border ${pitchColor.previewClass}`} />
                            <span>{pitchColor.label}</span>
                        </div>
                    </button>
                    {isPitchColorPickerOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-10 p-3"
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {pitchColors.map((color) => (
                                    <button
                                        key={color.label}
                                        onClick={() => handlePitchColorChange(color)}
                                        className={`w-full h-8 rounded-md border-2 transition-all duration-200 relative overflow-hidden ${color.label === pitchColor.label
                                            ? "border-foreground shadow-lg ring-2 ring-primary/20"
                                            : "border-border hover:border-muted-foreground"
                                            }`}
                                        title={color.label}
                                    >
                                        <div className={`absolute inset-0 ${color.previewClass}`} />
                                        <div
                                            className="absolute inset-0 opacity-30"
                                            style={{
                                                backgroundImage: `
                          repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 4px,
                            rgba(255,255,255,0.2) 5px
                          )
                        `,
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
