"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { formations, Formation } from '@/lib/formations'
import { playerColors, pitchColors } from '@/lib/colors'
import { useLineupStore } from '@/store/lineupStore'
import { Player } from '@/components/Player'
import { ChevronDown, Palette, Save, Share2, Download } from 'lucide-react'

const LineupBuilderPage = () => {
  const [isFormationOpen, setIsFormationOpen] = useState(false)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const [isPitchColorPickerOpen, setIsPitchColorPickerOpen] = useState(false)
  const [teamName, setTeamName] = useState("My Team")
  
  const { players, selectedFormation, playerColor, pitchColor, setPlayers, setSelectedFormation, setPlayerColor, setPitchColor } = useLineupStore()

  const handleFormationChange = (formation: Formation) => {
    setSelectedFormation(formation)
    setPlayers(formation.positions.map(pos => ({ ...pos, name: `Player ${pos.id}` })))
    setIsFormationOpen(false)
  }

  const handleColorChange = (color: typeof playerColors[number]['hex']) => {
    setPlayerColor(color)
    setIsColorPickerOpen(false)
  }

  const handlePitchColorChange = (color: typeof pitchColors[number]) => {
    setPitchColor(color)
    setIsPitchColorPickerOpen(false)
  }

  React.useEffect(() => {
    // Always initialize players from selected formation
    setPlayers(selectedFormation.positions.map(pos => ({ ...pos, name: `Player ${pos.id}` })))
  }, [selectedFormation, setPlayers])

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Lineup Builder
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create and customize your perfect football formation with our interactive builder
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Field Display - Shows first on mobile, second on desktop */}
          <div 
            
            className="lg:col-span-3 order-1 lg:order-2"
          >
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-foreground">{teamName}</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-foreground hidden lg:flex items-center px-3 py-1.5 bg-white/20 dark:bg-white/10 rounded-full border border-black/30 dark:border-white/20">
                    Formation: {selectedFormation.name}
                  </div>
                  {/* Formation Dropdown for mobile and desktop */}
                  <div className="relative">
                    <button
                      onClick={() => setIsFormationOpen(!isFormationOpen)}
                      className="flex items-center space-x-2 px-3 py-1.5 bg-background border border-border rounded-md text-foreground hover:bg-accent transition-colors text-sm"
                    >
                      <span className="font-medium lg:hidden">Formation:</span>
                      <span className="font-medium">{selectedFormation.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isFormationOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isFormationOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-20 max-h-60 overflow-y-auto min-w-48"
                      >
                        {formations.map((formation) => (
                          <button
                            key={formation.name}
                            onClick={() => handleFormationChange(formation)}
                            className={`w-full px-4 py-3 text-left hover:bg-accent transition-colors ${
                              formation.name === selectedFormation.name ? 'bg-accent' : ''
                            }`}
                          >
                            {formation.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Soccer Field */}
              <div className="relative mx-auto" style={{ maxWidth: '600px', aspectRatio: '2/3' }}>
                <div 
                  className={`w-full h-full ${pitchColor.value} rounded-lg relative overflow-hidden shadow-lg`}
                  style={{ 
                    backgroundImage: `
                      linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px),
                      linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                  }}
                >
                  {/* Field Lines */}
                  <div className="absolute inset-0">
                    {/* Outer Border */}
                    <div className="absolute inset-2 border-2 border-white/60 rounded-lg" />
                    
                    {/* Center Circle */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/60 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/60 rounded-full" />
                    
                    {/* Halfway Line */}
                    <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-white/60" />
                    
                    {/* Penalty Areas (18-yard box) */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-56 h-28 border-2 border-white/60 border-t-0 rounded-b-md" />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-56 h-28 border-2 border-white/60 border-b-0 rounded-t-md" />
                    
                    {/* Goal Areas (6-yard box) */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-12 border-2 border-white/60 border-t-0 rounded-b-sm" />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-12 border-2 border-white/60 border-b-0 rounded-t-sm" />
                    
                    {/* Penalty Spots */}
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white/60 rounded-full" />
                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white/60 rounded-full" />
                    
                    {/* Corner Arcs */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-2 border-white/60 rounded-br-full border-t-0 border-l-0" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-2 border-white/60 rounded-bl-full border-t-0 border-r-0" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-2 border-white/60 rounded-tr-full border-b-0 border-l-0" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-white/60 rounded-tl-full border-b-0 border-r-0" />
                    
                    {/* Goals */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-white/60 rounded-sm" />
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-white/60 rounded-sm" />
                  </div>
                  
                  {/* Players */}
                  {players.map((player, index) => (
                    
                      <Player
                        number={player.id}
                        key={index}
                        top={player.top}
                        left={player.left}
                        playerColor={playerColor}
                      />
                  
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Controls Panel - Shows second on mobile, first on desktop */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-1 space-y-6 order-2 lg:order-1"
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

            {/* Color Picker */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Player Colors</h3>
              <div className="relative">
                <button
                  onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-background border border-border rounded-md text-foreground hover:bg-accent transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: playerColor }}
                    />
                    <span>{playerColors.find(color => color.hex === playerColor)?.label || playerColor}</span>
                  </div>
                  <Palette className="w-4 h-4" />
                </button>
                
                {isColorPickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-10 p-4"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {playerColors.map((color) => (
                        <button
                          key={color.label}
                          onClick={() => handleColorChange(color.hex)}
                          className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${
                            color.hex === playerColor ? 'border-foreground' : 'border-border'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.label}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Pitch Color Picker */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Pitch Colors</h3>
              <div className="relative">
                <button
                  onClick={() => setIsPitchColorPickerOpen(!isPitchColorPickerOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-background border border-border rounded-md text-foreground hover:bg-accent transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      className={`w-4 h-4 rounded border border-border ${pitchColor.previewClass}`}
                    />
                    <span>{pitchColor.label}</span>
                  </div>
                  <Palette className="w-4 h-4" />
                </button>
                
                {isPitchColorPickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-10 p-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {pitchColors.map((color) => (
                        <button
                          key={color.label}
                          onClick={() => handlePitchColorChange(color)}
                          className={`w-full h-10 rounded-md border-2 transition-all duration-200 relative overflow-hidden ${
                            color.label === pitchColor.label
                              ? "border-foreground shadow-lg ring-2 ring-primary/20"
                              : "border-border hover:border-muted-foreground"
                          }`}
                          title={color.label}
                        >
                          <div className={`absolute inset-0 ${color.previewClass}`} />
                          {/* Grass texture overlay for preview */}
                          <div
                            className="absolute inset-0 opacity-30"
                            style={{
                              backgroundImage: `
                                repeating-linear-gradient(
                                  90deg,
                                  transparent,
                                  transparent 4px,
                                  rgba(255,255,255,0.2) 5px
                                )
                              `,
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

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
        </div>
      </div>
    </div>
  )
}

export default LineupBuilderPage