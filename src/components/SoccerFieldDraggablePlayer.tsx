
import React from "react";
import { useDrag } from "react-dnd";
import { Player } from "@/components/Player";
import { PlayerColor } from "@/lib/colors";
import { useLineupStore } from "@/store/lineupStore";

type DraggablePlayerProps = {
  id: number;
  top: number;
  left: number;
  playerColor: PlayerColor;
  number: number;
  name?: string;
};

export const DraggablePlayer: React.FC<DraggablePlayerProps> = ({ id, top, left, playerColor, number, name = "" }) => {
  const updatePlayerName = useLineupStore((state) => state.updatePlayerName);
  const [{ isDragging }, drag] = useDrag<{ id: number }, void, { isDragging: boolean }>(
    () => ({
      type: "PLAYER",
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id]
  );

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      style={{
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
  opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        zIndex: 10,
        width: 60,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Player
        number={number}
        playerColor={playerColor}
      />
      <input
        type="text"
        value={name}
        onChange={(e) => updatePlayerName(id, e.target.value)}
        placeholder="Name"
        className="mt-1 w-full rounded text-xs text-center"
        style={{ marginTop: 4, background: "transparent", border: "none", outline: "none" }}
      />
    </div>
  );
};