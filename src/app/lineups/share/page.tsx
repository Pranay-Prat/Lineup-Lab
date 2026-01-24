"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { decodeLineupData, ShareableLineupData } from "@/lib/lineup-utils";
import { SharedLineupHeader } from "@/components/shared-lineup/SharedLineupHeader";
import { ReadOnlyPitch } from "@/components/shared-lineup/ReadOnlyPitch";
import BallLoader from "@/components/ui/Loader";

/**
 * Shared lineup page - read-only view for shared lineups
 */
export default function SharedLineupPage() {
    const searchParams = useSearchParams();
    const [lineupData, setLineupData] = useState<ShareableLineupData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const data = searchParams.get("data");
        if (!data) {
            setError("No lineup found");
            return;
        }

        const decoded = decodeLineupData(data);
        if (!decoded) {
            setError("Invalid lineup data");
            return;
        }

        setLineupData(decoded);
    }, [searchParams]);

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30 pointer-events-none" />
                <div
                    className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(var(--foreground) 1px, transparent 1px),
                            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center relative z-10"
                >
                    <div className="text-5xl sm:text-6xl mb-4">⚽</div>
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Oops!</h1>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6">{error}</p>
                    <Link
                        href="/lineup-builder"
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Create Your Own Lineup
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (!lineupData) {
        return <BallLoader />;
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30 pointer-events-none" />
            <div
                className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(var(--foreground) 1px, transparent 1px),
                        linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />

            <SharedLineupHeader />

            <main className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
                <div className="max-w-4xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-6 sm:mb-8"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                            {lineupData.teamName || "My Team"}
                        </h2>
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card/50 border border-border/50 rounded-full">
                            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                            <span className="text-xs sm:text-sm font-medium text-foreground">
                                {lineupData.formationName}
                            </span>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="px-2 sm:px-0"
                    >
                        <ReadOnlyPitch
                            players={lineupData.players}
                            playerColor={lineupData.playerColor}
                            pitchColor={lineupData.pitchColor}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mt-6 sm:mt-8"
                    >
                        <Link
                            href="/lineup-builder"
                            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base"
                        >
                            Create Your Own Lineup
                        </Link>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
