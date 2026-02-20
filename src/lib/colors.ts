
export const playerColors = [
  { label: "Red", value: "bg-red-500", hex: "#ef4444" },
  { label: "Blue", value: "bg-blue-500", hex: "#3b82f6" },
  { label: "Green", value: "bg-green-500", hex: "#22c55e" },
  { label: "Yellow", value: "bg-yellow-500", hex: "#eab308" },
  { label: "Purple", value: "bg-purple-500", hex: "#a855f7" },
  { label: "Orange", value: "bg-orange-500", hex: "#f97316" },
  { label: "Pink", value: "bg-pink-500", hex: "#ec4899" },
  { label: "Teal", value: "bg-teal-500", hex: "#14b8a6" },
  { label: "Indigo", value: "bg-indigo-500", hex: "#6366f1" },
];

export const pitchColors = [
  {
    label: "Classic Green",
    value: "bg-gradient-to-br from-green-500 to-green-600",
    previewClass: "bg-gradient-to-br from-green-500 to-green-600",
  },
  {
    label: "Light Green",
    value: "bg-gradient-to-br from-lime-500 to-lime-600",
    previewClass: "bg-gradient-to-br from-lime-500 to-lime-600",
  },
  {
    label: "Ocean Blue",
    value: "bg-gradient-to-br from-sky-500 to-sky-600",
    previewClass: "bg-gradient-to-br from-sky-500 to-sky-600",
  },
  {
    label: "Cadet Green",
    value: "bg-gradient-to-br from-emerald-600 to-emerald-700",
    previewClass: "bg-gradient-to-br from-emerald-600 to-emerald-700",
  },
  {
    label: "Forest Green",
    value: "bg-gradient-to-br from-green-700 to-green-800",
    previewClass: "bg-gradient-to-br from-green-700 to-green-800",
  },
  {
    label: "Emerald",
    value: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    previewClass: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  },
];

// Types are re-exported from the centralized types file
export type { PlayerColor, PitchColor } from "@/lib/types";