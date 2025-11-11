
import React, { useRef, useEffect } from "react";
import { PlayerPositions } from "@/lib/formations";
import { PlayerColor, PitchColor } from "@/lib/colors";
import { useLineupStore } from "@/store/lineupStore";
import { DraggablePlayer } from "./SoccerFieldDraggablePlayer";
import { useDrop, DropTargetMonitor } from "react-dnd";

type SoccerFieldProps = {
  players: PlayerPositions[];
  playerColor: PlayerColor;
  pitchColor: PitchColor;
};
const SoccerField: React.FC<SoccerFieldProps> = ({ players, playerColor, pitchColor }) => {
  const updatePlayerPosition = useLineupStore((state) => state.updatePlayerPosition);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'PLAYER',
    drop: (item: { id: number }, monitor: DropTargetMonitor) => {
      const clientOffset = monitor.getClientOffset();
      const rect = fieldRef.current?.getBoundingClientRect();
      if (!rect || !clientOffset) return;
      const left = ((clientOffset.x - rect.left) / rect.width) * 100;
      const top = ((clientOffset.y - rect.top) / rect.height) * 100;
      updatePlayerPosition(item.id, top, left);
    },
  });

  useEffect(() => {
    if (fieldRef.current) {
      drop(fieldRef.current);
    }
  }, [drop]);

  return (
    <div className="relative mx-auto" style={{ maxWidth: '600px', aspectRatio: '2/3' }} ref={fieldRef}>
      {/* Pitch background */}
      <div className={`w-full h-full ${pitchColor.value} rounded-lg relative overflow-hidden shadow-lg`}>
        {/* Field Lines and Grass grid overlays (z-0, behind players) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Grass grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: '50px 50px',
            }}
          />
          {/* Field Lines overlay */}
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
        </div>
        {/* Players (z-10, above overlays) */}
        <div className="relative z-10 w-full h-full">
          {players.map((player, index) => (
            <DraggablePlayer
              key={index}
              id={player.id}
              top={player.top}
              left={player.left}
              playerColor={playerColor}
              number={player.id}
              name={player.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoccerField;
