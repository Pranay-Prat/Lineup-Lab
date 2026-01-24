"use client";

import React from "react";
import { PlayerPositions } from "@/lib/formations";
import { PitchColor } from "@/lib/colors";
import { ReadOnlyPlayer } from "./ReadOnlyPlayer";

interface ReadOnlyPitchProps {
    players: PlayerPositions[];
    playerColor: string;
    pitchColor: PitchColor;
}

export const ReadOnlyPitch: React.FC<ReadOnlyPitchProps> = ({
    players,
    playerColor,
    pitchColor
}) => {
    return (
        <div className="relative mx-auto w-full" style={{ maxWidth: '600px', aspectRatio: '2/3' }}>
            <div className={`w-full h-full ${pitchColor.value} rounded-lg relative overflow-hidden shadow-lg`}>
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                            backgroundSize: '50px 50px',
                        }}
                    />
                    <div className="absolute inset-0">
                        <div className="absolute inset-1 sm:inset-2 border-2 border-white/60 rounded-lg" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-24 sm:h-24 border-2 border-white/60 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 rounded-full" />
                        <div className="absolute top-1/2 left-1 sm:left-2 right-1 sm:right-2 h-0.5 bg-white/60" />
                        <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 w-40 sm:w-56 h-20 sm:h-28 border-2 border-white/60 border-t-0 rounded-b-md" />
                        <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 w-40 sm:w-56 h-20 sm:h-28 border-2 border-white/60 border-b-0 rounded-t-md" />
                        <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-8 sm:h-12 border-2 border-white/60 border-t-0 rounded-b-sm" />
                        <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-8 sm:h-12 border-2 border-white/60 border-b-0 rounded-t-sm" />
                        <div className="absolute top-12 sm:top-16 left-1/2 transform -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/60 rounded-full" />
                        <div className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/60 rounded-full" />
                        <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/60 rounded-br-full border-t-0 border-l-0" />
                        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/60 rounded-bl-full border-t-0 border-r-0" />
                        <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/60 rounded-tr-full border-b-0 border-l-0" />
                        <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/60 rounded-tl-full border-b-0 border-r-0" />
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-1.5 sm:h-2 bg-white/60 rounded-sm" />
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-1.5 sm:h-2 bg-white/60 rounded-sm" />
                    </div>
                </div>

                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-0 pointer-events-none opacity-50">
                    <span className="text-white/80 font-bold text-xs sm:text-sm tracking-widest uppercase drop-shadow-md font-sans">
                        lineuplab
                    </span>
                </div>

                <div className="relative z-10 w-full h-full">
                    {players.map((player) => (
                        <ReadOnlyPlayer
                            key={player.id}
                            player={player}
                            playerColor={playerColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReadOnlyPitch;
