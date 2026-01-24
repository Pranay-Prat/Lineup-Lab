"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Save, Share2, Download, Image, FileCode, ChevronDown } from 'lucide-react';

export interface ActionsPanelProps {
    isExporting: boolean;
    isExportOpen: boolean;
    onToggleExport: () => void;
    onExportPng: () => void;
    onExportSvg: () => void;
    onSave?: () => void;
    onShare?: () => void;
}

/**
 * Actions panel with Save, Share, and Export buttons
 */
export const ActionsPanel: React.FC<ActionsPanelProps> = ({
    isExporting,
    isExportOpen,
    onToggleExport,
    onExportPng,
    onExportSvg,
    onSave,
    onShare,
}) => {
    return (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm rounded-xl p-6 space-y-3 transition-all duration-300 hover:shadow-md hover:border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Actions</h3>

            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={onSave}
                    className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-sm"
                >
                    <Save className="w-4 h-4" />
                    <span className="font-medium">Save</span>
                </button>

                <button
                    onClick={onShare}
                    className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-secondary text-secondary-foreground border border-border/50 rounded-lg hover:bg-secondary/80 transition-colors duration-200"
                >
                    <Share2 className="w-4 h-4" />
                    <span className="font-medium">Share</span>
                </button>
            </div>

            {/* Export Dropdown */}
            <div className="relative pt-1">
                <button
                    onClick={onToggleExport}
                    disabled={isExporting}
                    className="w-full flex items-center justify-between px-4 py-3 bg-background border border-border/50 rounded-lg text-foreground hover:bg-accent/50 hover:border-border transition-all duration-200 disabled:opacity-50 group"
                >
                    <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        <span className="font-medium">{isExporting ? 'Exporting...' : 'Export Lineup'}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isExportOpen ? 'rotate-180' : ''}`} />
                </button>

                {isExportOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute bottom-full left-0 right-0 mb-2 bg-card/95 backdrop-blur-md border border-border/50 rounded-lg shadow-xl z-20 overflow-hidden"
                    >
                        <button
                            onClick={onExportPng}
                            className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-accent/50 transition-colors text-left group"
                        >
                            <div className="p-2 bg-blue-500/10 rounded-md group-hover:bg-blue-500/20 transition-colors">
                                <Image className="w-4 h-4 text-blue-500" />
                            </div>
                            <div>
                                <div className="font-medium text-sm text-foreground">Export as PNG</div>
                                <div className="text-[10px] text-muted-foreground">Best for sharing</div>
                            </div>
                        </button>
                        <button
                            onClick={onExportSvg}
                            className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-accent/50 transition-colors text-left border-t border-border/50 group"
                        >
                            <div className="p-2 bg-green-500/10 rounded-md group-hover:bg-green-500/20 transition-colors">
                                <FileCode className="w-4 h-4 text-green-500" />
                            </div>
                            <div>
                                <div className="font-medium text-sm text-foreground">Export as SVG</div>
                                <div className="text-[10px] text-muted-foreground">Best for editing</div>
                            </div>
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ActionsPanel;
