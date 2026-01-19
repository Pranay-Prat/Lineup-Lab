"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { formations } from "@/lib/formations";
import { PlayerPositions } from "@/lib/formations";
import { useLineupStore } from "@/store/lineupStore";
import SoccerField from "@/components/SoccerField";

type PitchPanelProps = {
    teamName: string;
    players: PlayerPositions[];
    playerColor: string;
};

export const PitchPanel: React.FC<PitchPanelProps> = ({ teamName, players, playerColor }) => {
    const { pitchColor, selectedFormationName, setSelectedFormation } = useLineupStore();
    const [isFormationOpen, setIsFormationOpen] = useState(false);

    const selectedFormation = formations.find(f => f.name === selectedFormationName) || formations[0];

    const handleFormationChange = (formationName: string) => {
        setSelectedFormation(formationName);
        setIsFormationOpen(false);
    };

    return (
        <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
            <div className="w-full max-w-[600px] mx-auto bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-foreground">{teamName}</h3>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-foreground hidden lg:flex items-center px-3 py-1.5 bg-white/20 dark:bg-white/10 rounded-full border border-black/30 dark:border-white/20">
                            Formation: {selectedFormation.name}
                        </div>
                        {/* Formation Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsFormationOpen(!isFormationOpen)}
                                className="flex items-center space-x-2 px-3 py-1.5 bg-background border border-border rounded-md text-foreground hover:bg-accent transition-colors text-sm"
                            >
                                <span className="font-medium lg:hidden">Formation:</span>
                                <span className="font-medium">{selectedFormation.name}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isFormationOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isFormationOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-20 max-h-60 overflow-y-auto min-w-48"
                                >
                                    {formations.map((formation) => (
                                        <button
                                            key={formation.name}
                                            onClick={() => handleFormationChange(formation.name)}
                                            className={`w-full px-4 py-3 text-left hover:bg-accent transition-colors ${formation.name === selectedFormation.name ? 'bg-accent' : ''}`}
                                        >
                                            {formation.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Soccer Field */}
                <SoccerField players={players} playerColor={playerColor} pitchColor={pitchColor} />
            </div>
        </div>
    );
};

export default PitchPanel;
