/**
 * Lineup sharing utilities for URL-based encoding/decoding
 * Uses pako deflate compression + compact keys for shorter URLs
 */

import { PlayerPositions } from "./formations";
import { deflate, inflate } from "pako";

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
 * Compact data format with short keys to minimize JSON size
 */
type CompactPlayer = {
    i: number;   // id
    t: number;   // top
    l: number;   // left
    r: string;   // role
    n?: string;  // name
};

type CompactData = {
    t: string;   // teamName
    f: string;   // formationName
    p: CompactPlayer[]; // players
    c: string;   // playerColor
    pc: {        // pitchColor
        l: string;  // label
        v: string;  // value
        p: string;  // previewClass
    };
};

/** Convert full data to compact format */
const toCompact = (data: ShareableLineupData): CompactData => ({
    t: data.teamName,
    f: data.formationName,
    p: data.players.map(pl => {
        const cp: CompactPlayer = { i: pl.id, t: pl.top, l: pl.left, r: pl.role };
        if (pl.name) cp.n = pl.name;
        return cp;
    }),
    c: data.playerColor,
    pc: { l: data.pitchColor.label, v: data.pitchColor.value, p: data.pitchColor.previewClass },
});

/** Convert compact format back to full data */
const fromCompact = (compact: CompactData): ShareableLineupData => ({
    teamName: compact.t,
    formationName: compact.f,
    players: compact.p.map(cp => ({
        id: cp.i,
        top: cp.t,
        left: cp.l,
        role: cp.r,
        name: cp.n,
    })),
    playerColor: compact.c,
    pitchColor: { label: compact.pc.l, value: compact.pc.v, previewClass: compact.pc.p },
});

/** Standard base64 → URL-safe base64 */
const toUrlSafe = (b64: string): string =>
    b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

/** URL-safe base64 → standard base64 */
const fromUrlSafe = (urlSafe: string): string => {
    let b64 = urlSafe.replace(/-/g, "+").replace(/_/g, "/");
    const pad = 4 - (b64.length % 4);
    if (pad < 4) b64 += "=".repeat(pad);
    return b64;
};

/**
 * Encode lineup data: compact keys → JSON → deflate → URL-safe base64
 */
export const encodeLineupData = (data: ShareableLineupData): string => {
    const json = JSON.stringify(toCompact(data));
    const compressed = deflate(new TextEncoder().encode(json));
    const binary = String.fromCharCode(...compressed);
    return toUrlSafe(btoa(binary));
};

/**
 * Decode lineup data with backward compatibility for old uncompressed links
 */
export const decodeLineupData = (encoded: string): ShareableLineupData | null => {
    // Try new compressed format first
    try {
        const binary = atob(fromUrlSafe(encoded));
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
        const json = new TextDecoder().decode(inflate(bytes));
        const compact = JSON.parse(json) as CompactData;
        return fromCompact(compact);
    } catch {
        // Ignore — fall through to legacy format
    }

    // Fallback: legacy uncompressed base64 format
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
