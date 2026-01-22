"use client";

import React, { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { formations } from "@/lib/formations";
import { PlayerPositions } from "@/lib/formations";
import { useLineupStore } from "@/store/lineupStore";
import SoccerField from "@/components/lineup-builder/SoccerField";

type PitchPanelProps = {
    teamName: string;
    players: PlayerPositions[];
    playerColor: string;
};

export const PitchPanel = forwardRef<HTMLDivElement, PitchPanelProps>(
    ({ teamName, players, playerColor }, ref) => {
        const { pitchColor, selectedFormationName, setSelectedFormation } = useLineupStore();
        const [isFormationOpen, setIsFormationOpen] = useState(false);

        const selectedFormation = formations.find(f => f.name === selectedFormationName) || formations[0];

        const handleFormationChange = (formationName: string) => {
            setSelectedFormation(formationName);
            setIsFormationOpen(false);
        };

        return (
            <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
                <div className="w-full max-w-[600px] mx-auto bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:border-border">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-foreground tracking-tight">{teamName}</h3>
                        <div className="flex items-center space-x-4">

                            {/* Formation Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsFormationOpen(!isFormationOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border/50 rounded-lg text-foreground hover:bg-accent/50 hover:border-border transition-all duration-200 text-sm font-medium shadow-sm"
                                >
                                    <span className="text-muted-foreground lg:inline hidden">Formation:</span>
                                    <span>{selectedFormation.name}</span>
                                    <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isFormationOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isFormationOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute top-full right-0 mt-2 bg-card/95 backdrop-blur-md border border-border/50 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto min-w-48 py-1"
                                    >
                                        {formations.map((formation) => (
                                            <button
                                                key={formation.name}
                                                onClick={() => handleFormationChange(formation.name)}
                                                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-accent/50 transition-colors ${formation.name === selectedFormation.name ? 'bg-accent/50 font-medium text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                            >
                                                {formation.name}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Soccer Field - this div is captured for export */}
                    <div ref={ref}>
                        <SoccerField players={players} playerColor={playerColor} pitchColor={pitchColor} />
                    </div>
                </div>
            </div>
        );
    }
);

PitchPanel.displayName = "PitchPanel";

export default PitchPanel;
