import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  variant?: "default" | "warning" | "danger";
  className?: string;
}

export const ProgressBar = ({ 
  progress, 
  showLabel = false,
  variant = "default",
  className = ""
}: ProgressBarProps) => {
  const getVariantColor = () => {
    if (variant === "danger" || progress < 20) return "bg-destructive";
    if (variant === "warning" || progress < 50) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Time remaining</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getVariantColor()}`}
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;