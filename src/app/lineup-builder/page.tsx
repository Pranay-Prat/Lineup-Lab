
"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formations } from '@/lib/formations';
import { useLineupStore } from '@/store/lineupStore';
import { PitchPanel } from '@/components/PitchPanel';
import { RosterPanel } from '@/components/RosterPanel';
import { StatsPanel } from '@/components/StatsPanel';
import { Save, Share2, Download } from 'lucide-react';


const LineupBuilderPage = () => {
  const [teamName, setTeamName] = useState("My Team")
  const { players, selectedFormationName, playerColor, setPlayers } = useLineupStore()
  // Ensure players are initialized on first load if empty and only if players are not already persisted
  useEffect(() => {
    // Only initialize if players are empty and there is no stored players in localStorage
    if (!players || players.length === 0) {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('lineup-storage') : null;
      if (!stored) {
        const formation = formations.find(f => f.name === selectedFormationName) || formations[0];
        setPlayers(formation.positions.map(pos => ({ ...pos, name: `Player ${pos.id}` })));
      }
    }
  }, [setPlayers, selectedFormationName, players]);


  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Lineup Builder
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Create and customize your perfect football formation with our interactive builder
          </p>
        </motion.div>



        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pitch Panel - Center */}
          <PitchPanel teamName={teamName} players={players} playerColor={playerColor} />

          {/* Controls Panel - Shows second on mobile, first on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-3 space-y-4 order-2 lg:order-1"
          >
            {/* Team Name */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Team Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter team name"
                  />
                </div>
              </div>
            </div>

            {/* Stats & Colors Panel */}
            <StatsPanel players={players} />

            {/* Action Buttons */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-foreground mb-4">Actions</h3>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                <Save className="w-4 h-4" />
                <span>Save Lineup</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </motion.div>

          {/* Player Roster Panel - Right Side */}
          <RosterPanel players={players} playerColor={playerColor} />
        </div>
      </div>
    </div>
  );
}

export default LineupBuilderPage