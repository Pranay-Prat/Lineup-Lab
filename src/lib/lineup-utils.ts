/**
 * Lineup sharing utilities for URL-based encoding/decoding
 */

import { PlayerPositions } from "./formations";

export type ShareableLineupData = {
    teamName: string;
    formationName: string;
    players: PlayerPositions[];
    playerColor: string;
    pitchColor: {
        label: string;
        value: string;
        previewClass: string;
    };
};

/**
 * Encode lineup data to a base64 string for URL sharing
 */
export const encodeLineupData = (data: ShareableLineupData): string => {
    const jsonString = JSON.stringify(data);
    // Use btoa for base64 encoding (works in browser)
    return btoa(encodeURIComponent(jsonString));
};

/**
 * Decode base64 string back to lineup data
 */
export const decodeLineupData = (encoded: string): ShareableLineupData | null => {
    try {
        const jsonString = decodeURIComponent(atob(encoded));
        return JSON.parse(jsonString) as ShareableLineupData;
    } catch (error) {
        console.error("Failed to decode lineup data:", error);
        return null;
    }
};

/**
 * Generate a shareable URL for the current lineup
 */
export const generateShareableUrl = (data: ShareableLineupData): string => {
    const encoded = encodeLineupData(data);
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/lineups/share?data=${encoded}`;
};

/**
 * Copy text to clipboard and return success status
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        return false;
    }
};
