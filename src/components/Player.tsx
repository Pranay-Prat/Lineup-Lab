import { PlayerColor } from "@/lib/colors";
import { motion } from "framer-motion";

type PlayerProps = {
  number: number;
  top: number;   
  left: number; 
  playerColor: PlayerColor;
};

export const Player: React.FC<PlayerProps> = ({ number, top, left, playerColor }) => {
  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{ top: `${top}%`, left: `${left}%` }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Player Circle */}
      <div
        className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center relative overflow-hidden group-hover:shadow-xl transition-all duration-200"
        style={{ backgroundColor: playerColor }}
      >
        {/* Jersey Number */}
        <span className="text-white font-bold text-xs md:text-sm select-none">{number}</span>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
      </div>

      {/* Player Shadow */}
      <div
        className="absolute top-full left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black/20 rounded-full blur-sm"
        style={{ marginTop: "2px" }}
      />
    </motion.div>
  );
};
