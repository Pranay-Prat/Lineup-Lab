"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { formations } from '@/lib/formations';
import { useLineupStore } from '@/store/lineupStore';
import { useExport } from '@/hooks/useExport';
import { generateShareableUrl, copyToClipboard } from '@/lib/lineup-utils';
import { PitchPanel } from '@/components/lineup-builder/PitchPanel';
import { RosterPanel } from '@/components/lineup-builder/RosterPanel';
import { StatsPanel } from '@/components/lineup-builder/StatsPanel';
import { PageHeader } from '@/components/ui/PageHeader';
import { TeamDetailsCard } from '@/components/lineup-builder/TeamDetailsCard';
import { ActionsPanel } from '@/components/lineup-builder/ActionsPanel';

const LineupBuilderPage = () => {
  const [teamName, setTeamName] = useState("My Team");
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const pitchRef = useRef<HTMLDivElement>(null);
  const { players, selectedFormationName, playerColor, pitchColor, setPlayers } = useLineupStore();

  // Use custom export hook
  const {
    isExporting,
    isExportOpen,
    toggleExportOpen,
    handleExportPng,
    handleExportSvg,
  } = useExport(pitchRef, teamName);

  // Initialize players on first load if empty
  useEffect(() => {
    if (!players || players.length === 0) {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('lineup-storage') : null;
      if (!stored) {
        const formation = formations.find(f => f.name === selectedFormationName) || formations[0];
        setPlayers(formation.positions.map(pos => ({ ...pos, name: `Player ${pos.id}` })));
      }
    }
  }, [setPlayers, selectedFormationName, players]);

  // Handle share button click
  const handleShare = async () => {
    const shareableUrl = generateShareableUrl({
      teamName,
      formationName: selectedFormationName,
      players,
      playerColor,
      pitchColor,
    });

    const success = await copyToClipboard(shareableUrl);
    if (success) {
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } else {
      setShareStatus('error');
      setTimeout(() => setShareStatus('idle'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans relative overflow-hidden">
      {/* Background Grid Pattern */}
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

      {/* Share Status Toast */}
      {shareStatus !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg ${shareStatus === 'copied'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
            }`}
        >
          {shareStatus === 'copied' ? '✓ Link copied to clipboard!' : '✗ Failed to copy link'}
        </motion.div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <PageHeader
          title="Lineup Builder"
          subtitle="Create and customize your perfect football formation with our interactive builder"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pitch Panel - Center */}
          <PitchPanel ref={pitchRef} teamName={teamName} players={players} playerColor={playerColor} />

          {/* Controls Panel - Shows second on mobile, first on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-3 space-y-4 order-2 lg:order-1"
          >
            {/* Team Details */}
            <TeamDetailsCard
              teamName={teamName}
              onTeamNameChange={setTeamName}
            />

            {/* Stats & Colors Panel */}
            <StatsPanel players={players} />

            {/* Action Buttons */}
            <ActionsPanel
              isExporting={isExporting}
              isExportOpen={isExportOpen}
              onToggleExport={toggleExportOpen}
              onExportPng={handleExportPng}
              onExportSvg={handleExportSvg}
              onShare={handleShare}
            />
          </motion.div>

          {/* Player Roster Panel - Right Side */}
          <RosterPanel players={players} playerColor={playerColor} />
        </div>
      </div>
    </div>
  );
}

export default LineupBuilderPage