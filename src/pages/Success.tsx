import { motion } from "framer-motion";
import { CheckCircle2, Download, Home, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { TrustBadge } from "@/components/ui/TrustBadge";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const { platform, amount, currency } = location.state || {
    platform: { name: "Netflix", icon: "🎬" },
    amount: "15.99",
    currency: "USD"
  };

  useEffect(() => {
    // Trigger confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#14B8A6', '#22C55E']
    });
  }, []);

  return (
    <PageContainer>
      <Header />
      
      <div className="container py-12 md:py-20">
        <motion.div 
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle2 className="w-12 h-12 text-success" />
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Payment Complete!
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your {platform?.name} subscription has been successfully paid.
          </motion.p>

          {/* Transaction Summary */}
          <motion.div 
            className="p-6 rounded-2xl bg-card border border-border shadow-card mb-8 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-semibold mb-4">Transaction Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform</span>
                <span className="font-medium flex items-center gap-2">
                  <span>{platform?.icon}</span>
                  {platform?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">${amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">INR Paid</span>
                <span className="font-medium">₹{(parseFloat(amount) * 83.5).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-success">Completed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-sm">TXN{Date.now()}</span>
              </div>
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
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
              New Payment
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