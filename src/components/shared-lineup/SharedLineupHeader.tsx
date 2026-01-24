"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { copyToClipboard } from "@/lib/lineup-utils";

export const SharedLineupHeader: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        const success = await copyToClipboard(window.location.href);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
                <Link
                    href="/lineup-builder"
                    className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs sm:text-sm font-medium">Back</span>
                </Link>
                <h1 className="text-sm sm:text-lg font-bold text-foreground">Shared Lineup</h1>
                <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm"
                >
                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {copied ? "Copied!" : "Share"}
                </button>
            </div>
        </header>
    );
};

export default SharedLineupHeader;
