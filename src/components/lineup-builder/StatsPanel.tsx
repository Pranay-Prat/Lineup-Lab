"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Shield, Compass, Target } from "lucide-react";
import { PlayerPositions } from "@/lib/formations";
import { playerColors, pitchColors } from "@/lib/colors";
import { useLineupStore } from "@/store/lineupStore";
import { getZoneFromPosition } from "@/lib/player-utils";


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
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm rounded-xl p-6 space-y-6 transition-all duration-300 hover:shadow-md hover:border-border relative z-20">
            {/* Formation Stats */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <Compass className="w-4 h-4" />
                    Formation Stats
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 text-center transition-transform hover:scale-105">
                        <Shield className="w-5 h-5 mx-auto mb-2 text-blue-500" />
                        <div className="text-2xl font-bold text-blue-500 mb-1">
                            {players.filter(p => p.role !== 'GK' && getZoneFromPosition(p.top) === 'DEF').length}
                        </div>
                        <div className="text-[10px] font-bold text-blue-500/70 tracking-wider">DEF</div>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 text-center transition-transform hover:scale-105">
                        <Compass className="w-5 h-5 mx-auto mb-2 text-green-500" />
                        <div className="text-2xl font-bold text-green-500 mb-1">
                            {players.filter(p => p.role !== 'GK' && getZoneFromPosition(p.top) === 'MID').length}
                        </div>
                        <div className="text-[10px] font-bold text-green-500/70 tracking-wider">MID</div>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 text-center transition-transform hover:scale-105">
                        <Target className="w-5 h-5 mx-auto mb-2 text-red-500" />
                        <div className="text-2xl font-bold text-red-500 mb-1">
                            {players.filter(p => p.role !== 'GK' && getZoneFromPosition(p.top) === 'ATT').length}
                        </div>
                        <div className="text-[10px] font-bold text-red-500/70 tracking-wider">ATT</div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/50" />

            {/* Player Color Picker */}
            <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-2 uppercase tracking-wider">
                    <Palette className="w-3.5 h-3.5" />
                    Player Kit Color
                </h4>
                <div className="relative">
                    <button
                        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                        className="w-full flex items-center justify-between px-4 py-2.5 bg-background/50 border border-border/50 rounded-lg text-foreground hover:bg-accent/50 hover:border-border transition-all duration-200 text-sm shadow-sm group"
                    >
                        <div className="flex items-center space-x-3">
                            <div
                                className="w-5 h-5 rounded-full border border-border ring-2 ring-transparent group-hover:ring-border/50 transition-all shadow-sm"
                                style={{ backgroundColor: playerColor }}
                            />
                            <span className="font-medium text-sm">{playerColors.find(color => color.hex === playerColor)?.label || playerColor}</span>
                        </div>
                    </button>
                    {isColorPickerOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md border border-border/50 rounded-lg shadow-xl z-10 p-4"
                        >
                            <div className="grid grid-cols-5 gap-3">
                                {playerColors.map((color) => (
                                    <button
                                        key={color.label}
                                        onClick={() => handleColorChange(color.hex)}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${color.hex === playerColor ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-border/50'}`}
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
                <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-2 uppercase tracking-wider">
                    <Palette className="w-3.5 h-3.5" />
                    Pitch Style
                </h4>
                <div className="relative">
                    <button
                        onClick={() => setIsPitchColorPickerOpen(!isPitchColorPickerOpen)}
                        className="w-full flex items-center justify-between px-4 py-2.5 bg-background/50 border border-border/50 rounded-lg text-foreground hover:bg-accent/50 hover:border-border transition-all duration-200 text-sm shadow-sm"
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`w-5 h-5 rounded border border-border shadow-sm ${pitchColor.previewClass}`} />
                            <span className="font-medium text-sm">{pitchColor.label}</span>
                        </div>
                    </button>
                    {isPitchColorPickerOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md border border-border/50 rounded-lg shadow-xl z-10 p-3"
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {pitchColors.map((color) => (
                                    <button
                                        key={color.label}
                                        onClick={() => handlePitchColorChange(color)}
                                        className={`w-full h-10 rounded-lg border transition-all duration-200 relative overflow-hidden group ${color.label === pitchColor.label
                                            ? "border-primary ring-2 ring-primary/20"
                                            : "border-border/50 hover:border-border"
                                            }`}
                                        title={color.label}
                                    >
                                        <div className={`absolute inset-0 ${color.previewClass} group-hover:scale-105 transition-transform duration-500`} />
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
                                        <span className="absolute bottom-1 left-2 text-[10px] font-bold text-white shadow-black/50 drop-shadow-md">
                                            {color.label}
                                        </span>
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
