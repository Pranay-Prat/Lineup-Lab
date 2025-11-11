import React from "react";
import { useDragLayer } from "react-dnd";
import { Player } from "@/components/Player";
import { useLineupStore } from "@/store/lineupStore";

const layerStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh",
};

function getItemStyles(currentOffset: { x: number; y: number } | null) {
  if (!currentOffset) {
    return { display: "none" };
  }
  const { x, y } = currentOffset;
  return {
    transform: `translate(${x}px, ${y}px)`,
  };
}

export const CustomDragLayer: React.FC = () => {
  const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));
  const players = useLineupStore((state) => state.players);
  if (!isDragging || itemType !== "PLAYER" || !item) {
    return null;
  }
  const player = players.find((p) => p.id === item.id);
  if (!player) return null;
  // Get the global player color from the store
  const playerColor = useLineupStore.getState().playerColor;
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(currentOffset)}>
  <Player number={player.id} playerColor={playerColor} />
        {player.name && (
          <div style={{ marginTop: 4, color: "white", textAlign: "center", fontSize: 12 }}>{player.name}</div>
        )}
      </div>
    </div>
  );
};
