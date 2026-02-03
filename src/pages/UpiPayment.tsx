import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, QrCode, Smartphone, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { TrustBadge } from "@/components/ui/TrustBadge";

type PaymentState = "pending" | "processing" | "success";

export default function UpiPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentState, setPaymentState] = useState<PaymentState>("pending");
  const { platform, purpose, amount, currency } = location.state || {
    platform: { name: "Netflix", icon: "🎬" },
    purpose: "subscription",
    amount: "15.99",
    currency: "USD"
  };

  const inrAmount = (parseFloat(amount) * 83.5).toFixed(2);

  // Simulate payment confirmation
  const simulatePayment = () => {
    setPaymentState("processing");
    setTimeout(() => {
      setPaymentState("success");
      setTimeout(() => {
        navigate("/card-activation", { state: { platform, purpose, amount, currency } });
      }, 1500);
    }, 2000);
  };

  return (
    <PageContainer>
      <Header />
      
      <div className="container py-8 md:py-12">
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success text-success-foreground text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 h-1 bg-primary rounded" />
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              2
            </div>
            <div className="flex-1 h-1 bg-muted rounded" />
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm font-medium">
              3
            </div>
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/start")}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">Pay via UPI</h1>
          <p className="text-muted-foreground mb-8">
            Scan the QR code or use any UPI app to complete payment.
          </p>

          {/* Payment Summary Card */}
          <motion.div 
            className="p-4 rounded-xl bg-muted/50 border border-border mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center text-2xl shadow-sm">
                {platform?.icon || "🎬"}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{platform?.name || "Netflix"}</p>
                <p className="text-sm text-muted-foreground capitalize">{purpose}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">${amount}</p>
                <p className="text-sm text-muted-foreground">≈ ₹{inrAmount}</p>
              </div>
            </div>
          </motion.div>

          {/* QR Code Section */}
          <motion.div 
            className="p-6 rounded-2xl bg-card border border-border shadow-card text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {paymentState === "pending" && (
              <>
                <div className="w-48 h-48 mx-auto mb-4 bg-muted rounded-xl flex items-center justify-center">
                  <div className="relative">
                    <QrCode className="w-32 h-32 text-foreground" />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                      animate={{ x: [-100, 100] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Scan with any UPI app
                </p>
                <div className="flex justify-center gap-2 mb-6">
                  {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                    <span key={app} className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                      {app}
                    </span>
                  ))}
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-3">Or click below to simulate payment</p>
                  <Button onClick={simulatePayment} className="w-full gap-2">
                    <Smartphone className="w-4 h-4" />
                    Simulate UPI Payment
                  </Button>
                </div>
              </>
            )}

            {paymentState === "processing" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4"
                >
                  <RefreshCcw className="w-full h-full text-primary" />
                </motion.div>
                <p className="font-semibold text-lg mb-2">Processing Payment</p>
                <p className="text-sm text-muted-foreground">Please wait while we confirm your payment...</p>
              </motion.div>
            )}

            {paymentState === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </motion.div>
                <p className="font-semibold text-lg mb-2">Payment Successful!</p>
                <p className="text-sm text-muted-foreground">Generating your virtual card...</p>
              </motion.div>
            )}
          </motion.div>

          {/* Trust Badges */}
          <div className="flex justify-center gap-2">
            <TrustBadge type="secure" />
            <TrustBadge type="protected" />
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
}