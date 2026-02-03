import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  initialSeconds: number;
  onExpire?: () => void;
  size?: "sm" | "md" | "lg";
}

export const CountdownTimer = ({ 
  initialSeconds, 
  onExpire,
  size = "md" 
}: CountdownTimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isExpired, setIsExpired] = useState(false);

  const sizeClasses = {
    sm: { container: "w-20 h-20", text: "text-lg", stroke: 4 },
    md: { container: "w-32 h-32", text: "text-2xl", stroke: 6 },
    lg: { container: "w-40 h-40", text: "text-3xl", stroke: 8 },
  };

  const { container, text, stroke } = sizeClasses[size];

  useEffect(() => {
    if (seconds <= 0) {
      setIsExpired(true);
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onExpire]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const progress = seconds / initialSeconds;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - progress);

  const getColor = () => {
    if (progress > 0.5) return "hsl(var(--success))";
    if (progress > 0.2) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  return (
    <div className={`countdown-ring ${container}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={stroke}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={getColor()}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className={`${text} font-bold ${isExpired ? 'text-destructive' : 'text-foreground'}`}
          key={seconds}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isExpired ? "Expired" : `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`}
        </motion.span>
        {!isExpired && (
          <span className="text-xs text-muted-foreground mt-1">remaining</span>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;