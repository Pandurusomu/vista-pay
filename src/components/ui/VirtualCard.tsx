import { motion } from "framer-motion";
import { Copy, Check, CreditCard } from "lucide-react";
import { useState } from "react";

interface VirtualCardProps {
  cardNumber: string;
  expiry: string;
  cvv: string;
  isActive?: boolean;
  onCopy?: (field: string, value: string) => void;
}

export const VirtualCard = ({ 
  cardNumber, 
  expiry, 
  cvv, 
  isActive = true,
  onCopy 
}: VirtualCardProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (field: string, value: string) => {
    await navigator.clipboard.writeText(value.replace(/\s/g, ''));
    setCopiedField(field);
    onCopy?.(field, value);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatCardNumber = (num: string) => {
    return num.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <motion.div 
      className={`virtual-card w-full max-w-sm aspect-[1.586/1] ${!isActive ? 'opacity-60 grayscale' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            <span className="text-sm font-medium opacity-80">Virtual Card</span>
          </div>
          {isActive && (
            <motion.div 
              className="px-2 py-1 bg-success/20 rounded-full text-xs font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              Active
            </motion.div>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-xs opacity-60 uppercase tracking-wider">Card Number</p>
            <button 
              onClick={() => handleCopy('number', cardNumber)}
              className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
            >
              <span className="text-xl font-mono tracking-wider">
                {formatCardNumber(cardNumber)}
              </span>
              {copiedField === 'number' ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          </div>

          <div className="flex gap-8">
            <div className="space-y-1">
              <p className="text-xs opacity-60 uppercase tracking-wider">Expiry</p>
              <button 
                onClick={() => handleCopy('expiry', expiry)}
                className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
              >
                <span className="text-lg font-mono">{expiry}</span>
                {copiedField === 'expiry' ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-xs opacity-60 uppercase tracking-wider">CVV</p>
              <button 
                onClick={() => handleCopy('cvv', cvv)}
                className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
              >
                <span className="text-lg font-mono">{cvv}</span>
                {copiedField === 'cvv' ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex gap-2">
            <div className="w-8 h-5 bg-warning/80 rounded" />
            <div className="w-8 h-5 bg-destructive/60 rounded-full" />
          </div>
          <span className="text-xs opacity-60">Powered by TimeBound</span>
        </div>
      </div>
    </motion.div>
  );
};

export default VirtualCard;