"use client";

import React from 'react';

export interface TeamDetailsCardProps {
    teamName: string;
    onTeamNameChange: (name: string) => void;
}

/**
 * Card component for team name input
 */
export const TeamDetailsCard: React.FC<TeamDetailsCardProps> = ({
    teamName,
    onTeamNameChange
}) => {
    return (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                Team Details
            </h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1.5">
                        Team Name
                    </label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => onTeamNameChange(e.target.value)}
                        className="w-full px-4 py-2.5 bg-background/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/50 transition-all duration-200"
                        placeholder="Enter team name"
                    />
                </div>
            </div>
        </div>
    );
};

export default TeamDetailsCard;
