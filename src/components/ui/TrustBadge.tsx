import { motion } from "framer-motion";
import { Shield, Lock, RefreshCcw, Clock } from "lucide-react";

type BadgeType = "secure" | "refund" | "instant" | "protected";

interface TrustBadgeProps {
  type: BadgeType;
  className?: string;
}

const badgeConfig = {
  secure: {
    icon: Shield,
    text: "Bank-Grade Security",
    color: "bg-success/10 text-success",
  },
  refund: {
    icon: RefreshCcw,
    text: "100% Refund Guaranteed",
    color: "bg-primary/10 text-primary",
  },
  instant: {
    icon: Clock,
    text: "Instant Activation",
    color: "bg-accent/10 text-accent-foreground",
  },
  protected: {
    icon: Lock,
    text: "RBI Compliant",
    color: "bg-warning/10 text-warning",
  },
};

export const TrustBadge = ({ type, className = "" }: TrustBadgeProps) => {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.color} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{config.text}</span>
    </motion.div>
  );
};

export default TrustBadge;