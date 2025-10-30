import React, { useEffect, useState } from "react";

interface CircularCountdownProps {
  duration: number;
  size?: number;
  strokeWidth?: number;
}

const CircularCountdown: React.FC<CircularCountdownProps> = ({
  duration,
  size = 120,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const progress = timeLeft / duration;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          stroke="rgba(255,255,255,0.2)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="rgb(59,130,246)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <span className="absolute flex items-center justify-center text-white font-bold text-xs">
        {timeLeft}
      </span>
    </div>
  );
};

export default CircularCountdown;
