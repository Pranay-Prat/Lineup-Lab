"use client";

import React from "react";
import { PlayerPositions } from "@/lib/formations";

interface ReadOnlyPlayerProps {
    player: PlayerPositions;
    playerColor: string;
}

export const ReadOnlyPlayer: React.FC<ReadOnlyPlayerProps> = ({ player, playerColor }) => {
    return (
        <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
                top: `${Math.min(player.top, 92)}%`,
                left: `${player.left}%`,
            }}
        >
            <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
                <div
                    className="w-8 h-8 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xs sm:text-lg font-bold text-white shadow-lg ring-2 ring-white/30"
                    style={{ backgroundColor: playerColor }}
                >
                    {player.number ?? player.id}
                </div>
                {player.name && (
                    <span className="text-[8px] sm:text-xs font-semibold text-white bg-black/50 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-lg backdrop-blur-sm text-center max-w-[70px] sm:max-w-[100px] leading-tight break-words">
                        {player.name}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ReadOnlyPlayer;
