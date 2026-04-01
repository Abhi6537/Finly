import { useEffect, useState } from "react";

interface SavingsRingProps {
  current: number;
  goal: number;
}

const SavingsRing = ({ current, goal }: SavingsRingProps) => {
  const [offset, setOffset] = useState(283);
  const pct = Math.min((current / goal) * 100, 100);
  const targetOffset = 283 - (283 * pct) / 100;

  useEffect(() => {
    const timer = setTimeout(() => setOffset(targetOffset), 100);
    return () => clearTimeout(timer);
  }, [targetOffset]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="max-w-[120px] max-h-[120px] mx-auto">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#C8F557"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="283"
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
        <text
          x="50"
          y="46"
          textAnchor="middle"
          className="font-mono"
          fill="#F0F2F8"
          fontSize="14"
          fontWeight="600"
          fontFamily="JetBrains Mono"
        >
          {pct.toFixed(1)}%
        </text>
        <text
          x="50"
          y="60"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="6"
          fontFamily="Inter"
        >
          of goal
        </text>
      </svg>
    </div>
  );
};

export default SavingsRing;
