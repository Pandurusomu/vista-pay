import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertCircle, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { VirtualCard } from "@/components/ui/VirtualCard";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { TrustBadge } from "@/components/ui/TrustBadge";

const TOTAL_SECONDS = 600; // 10 minutes

export default function CardActivation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [secondsRemaining, setSecondsRemaining] = useState(TOTAL_SECONDS);
  const [isExpired, setIsExpired] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { platform, amount, currency } = location.state || {
    platform: { name: "Netflix", icon: "🎬" },
    amount: "15.99",
    currency: "USD"
  };

  // Generate mock card details
  const cardDetails = {
    number: "4532015112830366",
    expiry: "12/25",
    cvv: "847"
  };

  useEffect(() => {
    if (secondsRemaining <= 0) {
      setIsExpired(true);
      return;
    }
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const progress = (secondsRemaining / TOTAL_SECONDS) * 100;

  const handleCopyAll = async () => {
    const text = `Card: ${cardDetails.number}\nExpiry: ${cardDetails.expiry}\nCVV: ${cardDetails.cvv}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkComplete = () => {
    navigate("/success", { state: { platform, amount, currency } });
  };

  const handleExpire = () => {
    navigate("/expired", { state: { platform, amount, currency } });
  };

  if (isExpired) {
    return (
      <PageContainer>
        <Header />
        <div className="container py-12">
          <motion.div 
            className="max-w-md mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-warning/10 flex items-center justify-center"
            >
              <AlertCircle className="w-10 h-10 text-warning" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Card Expired</h1>
            <p className="text-muted-foreground mb-6">
              Your virtual card has expired. The unused balance will be refunded to your UPI account within 24 hours.
            </p>
            <div className="p-4 rounded-xl bg-success/10 border border-success/20 mb-6">
              <p className="text-success font-medium">₹{(parseFloat(amount) * 83.5).toFixed(2)} refund initiated</p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate("/start")}>Start New Payment</Button>
              <Button variant="outline" onClick={() => navigate("/dashboard")}>View Dashboard</Button>
            </div>
          </motion.div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header />
      
      <div className="container py-8 md:py-12">
        <motion.div 
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success text-success-foreground text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 h-1 bg-success rounded" />
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success text-success-foreground text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 h-1 bg-primary rounded" />
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              3
            </div>
          </div>

          {/* Header with Timer */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Card is Active!</h1>
              <p className="text-muted-foreground">
                Use these details to complete your {platform?.name} payment.
              </p>
            </div>
            <CountdownTimer 
              initialSeconds={secondsRemaining} 
              onExpire={() => setIsExpired(true)}
              size="md"
            />
          </div>

          {/* Progress Bar */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ProgressBar progress={progress} showLabel />
          </motion.div>

          {/* Virtual Card */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <VirtualCard
              cardNumber={cardDetails.number}
              expiry={cardDetails.expiry}
              cvv={cardDetails.cvv}
              isActive={!isExpired}
            />
          </motion.div>

          {/* Copy All Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              variant="outline" 
              className="w-full mb-6 gap-2"
              onClick={handleCopyAll}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-success" />
                  Copied All Details
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy All Card Details
                </>
              )}
            </Button>
          </motion.div>

          {/* Safety Message */}
          <motion.div 
            className="p-4 rounded-xl bg-muted/50 border border-border mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-1">Important</p>
                <p className="text-sm text-muted-foreground">
                  This card will expire in {Math.floor(secondsRemaining / 60)} minutes. 
                  If you don't complete the payment, the full amount (₹{(parseFloat(amount) * 83.5).toFixed(2)}) 
                  will be automatically refunded to your UPI account.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <TrustBadge type="secure" />
            <TrustBadge type="refund" />
            <TrustBadge type="instant" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="flex-1 gap-2"
              onClick={handleMarkComplete}
            >
              I've Completed Payment
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              View Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
}