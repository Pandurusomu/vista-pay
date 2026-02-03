import { motion } from "framer-motion";
import { AlertCircle, RefreshCcw, Home, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { TrustBadge } from "@/components/ui/TrustBadge";

export default function Expired() {
  const location = useLocation();
  const navigate = useNavigate();
  const { platform, amount } = location.state || {
    platform: { name: "Netflix", icon: "🎬" },
    amount: "15.99",
  };

  const refundAmount = (parseFloat(amount) * 83.5).toFixed(2);

  return (
    <PageContainer>
      <Header />
      
      <div className="container py-12 md:py-20">
        <motion.div 
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Expired Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-warning/10 flex items-center justify-center"
          >
            <AlertCircle className="w-12 h-12 text-warning" />
          </motion.div>

          <motion.h1 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Card Expired
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Your virtual card has expired without being used. Don't worry, your money is safe!
          </motion.p>

          {/* Refund Card */}
          <motion.div 
            className="p-6 rounded-2xl bg-success/5 border border-success/20 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: 3, duration: 1, ease: "linear" }}
              >
                <RefreshCcw className="w-6 h-6 text-success" />
              </motion.div>
              <span className="font-semibold text-success">Refund Initiated</span>
            </div>
            <p className="text-3xl font-bold text-success mb-2">₹{refundAmount}</p>
            <p className="text-sm text-muted-foreground">
              Will be credited to your UPI account within 24 hours
            </p>
          </motion.div>

          {/* What Happened */}
          <motion.div 
            className="p-4 rounded-xl bg-muted/50 border border-border mb-8 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-semibold mb-3">What happened?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Your 10-minute virtual card expired
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                The card was not used for any transaction
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Full refund (₹{refundAmount}) has been initiated
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                You can create a new card anytime
              </li>
            </ul>
          </motion.div>

          {/* Trust Badge */}
          <motion.div 
            className="flex justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <TrustBadge type="refund" />
            <TrustBadge type="secure" />
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              className="flex-1 gap-2"
              onClick={() => navigate("/start")}
            >
              Try Again
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </PageContainer>
  );
}