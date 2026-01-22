
import React from "react";
import { Player } from "@/components/lineup-builder/Player";
import { PlayerColor } from "@/lib/colors";
import { useLineupStore } from "@/store/lineupStore";

import type { RefObject } from "react";
type DraggablePlayerProps = {
  id: number;
  top: number;
  left: number;
  playerColor: PlayerColor;
  number: number;
  name?: string;
  fieldRef: RefObject<HTMLDivElement | null>;
};

export const DraggablePlayer: React.FC<DraggablePlayerProps> = ({ id, top, left, playerColor, number, name = "", fieldRef }) => {
  const updatePlayerName = useLineupStore((state) => state.updatePlayerName);
  const updatePlayerPosition = useLineupStore((state) => state.updatePlayerPosition);
  const draggingRef = React.useRef(false);
  const offsetRef = React.useRef<{ x: number, y: number }>({ x: 0, y: 0 });

  // Helper to get mouse/touch position relative to field
  const getRelativePosition = (clientX: number, clientY: number) => {
    if (!fieldRef.current) return { top, left };
    const rect = fieldRef.current.getBoundingClientRect();
    const relX = ((clientX - rect.left) / rect.width) * 100;
    const relY = ((clientY - rect.top) / rect.height) * 100;
    return { top: Math.max(0, Math.min(100, relY)), left: Math.max(0, Math.min(100, relX)) };
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    draggingRef.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    if (fieldRef.current) {
      const rect = fieldRef.current.getBoundingClientRect();
      offsetRef.current = {
        x: startX - (rect.left + (left / 100) * rect.width),
        y: startY - (rect.top + (top / 100) * rect.height),
      };
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return;
    const { x, y } = offsetRef.current;
    const pos = getRelativePosition(e.clientX - x, e.clientY - y);
    updatePlayerPosition(id, pos.top, pos.left);
  };
  const onMouseUp = () => {
    draggingRef.current = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    draggingRef.current = true;
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    if (fieldRef.current) {
      const rect = fieldRef.current.getBoundingClientRect();
      offsetRef.current = {
        x: startX - (rect.left + (left / 100) * rect.width),
        y: startY - (rect.top + (top / 100) * rect.height),
      };
    }
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  };
  const onTouchMove = (e: TouchEvent) => {
    if (!draggingRef.current || e.touches.length !== 1) return;
    const { x, y } = offsetRef.current;
    const touch = e.touches[0];
    const pos = getRelativePosition(touch.clientX - x, touch.clientY - y);
    updatePlayerPosition(id, pos.top, pos.left);
  };
  const onTouchEnd = () => {
    draggingRef.current = false;
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
  };

  React.useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
        cursor: "grab",
        zIndex: 10,
        width: 60,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <Player
        number={number}
        playerColor={playerColor}
      />
      <span
        className="mt-1 w-full rounded text-sm text-center text-white font-semibold truncate block"
        style={{
          marginTop: 4,
          padding: "2px 4px",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
        }}
      >
        {name || ""}
      </span>
    </div>
  );
};