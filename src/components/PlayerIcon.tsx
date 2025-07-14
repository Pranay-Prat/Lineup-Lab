type PlayerIconProps = {
    number: number|string,
    borderColor: string
}
export const PlayerIcon: React.FC<PlayerIconProps> = ({ number, borderColor }) => {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="white"
        stroke={borderColor}
        strokeWidth="2.4"
      />
      <text
        x="12"
        y="15"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#000"
      >
        {number}
      </text>
    </svg>
  );
};