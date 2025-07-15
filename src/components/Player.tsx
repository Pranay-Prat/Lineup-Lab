import { PlayerColor} from "@/lib/colors";
import { PlayerIcon } from "./PlayerIcon";
import { useLineupStore } from "@/store/lineupStore";

type PlayerProps = {
  number: number;
  top: number;   
  left: number; 
  color: PlayerColor
};

export const Player: React.FC<PlayerProps> = ({ number, top, left }) => {
  const color = useLineupStore((s) => s.playerColor);

  return (
    <div
      className="absolute"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <PlayerIcon number={number} borderColor={color} />
    </div>
  );
};
