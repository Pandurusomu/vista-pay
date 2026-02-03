import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { TrustBadge } from "@/components/ui/TrustBadge";

const platforms = [
  { id: "netflix", name: "Netflix", icon: "🎬", color: "bg-red-500/10" },
  { id: "spotify", name: "Spotify", icon: "🎵", color: "bg-green-500/10" },
  { id: "chatgpt", name: "ChatGPT Plus", icon: "🤖", color: "bg-teal-500/10" },
  { id: "youtube", name: "YouTube Premium", icon: "📺", color: "bg-red-500/10" },
  { id: "other", name: "Other Service", icon: "🌐", color: "bg-primary/10" },
];

const purposes = [
  { id: "subscription", name: "Subscription" },
  { id: "one-time", name: "One-time Purchase" },
  { id: "trial", name: "Free Trial Signup" },
];

export default function StartPayment() {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleContinue = () => {
    if (selectedPlatform && selectedPurpose && amount) {
      navigate("/upi-payment", { 
        state: { 
          platform: platforms.find(p => p.id === selectedPlatform),
          purpose: selectedPurpose,
          amount,
          currency 
        }
      });
    }
  };

  const isValid = selectedPlatform && selectedPurpose && parseFloat(amount) > 0;

  return (
    <PageContainer>
      <Header />
      
      <div className="container py-8 md:py-12">
        <motion.div 
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              1
            </div>
            <div className="flex-1 h-1 bg-muted rounded" />
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm font-medium">
              2
            </div>
            <div className="flex-1 h-1 bg-muted rounded" />
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm font-medium">
              3
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">Start Your Payment</h1>
          <p className="text-muted-foreground mb-8">
            Select the service you want to pay for and enter the amount.
          </p>

          <div className="space-y-8">
            {/* Platform Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Select Platform</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <motion.button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedPlatform === platform.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-xl mb-2`}>
                      {platform.icon}
                    </div>
                    <span className="font-medium text-sm">{platform.name}</span>
                    {selectedPlatform === platform.id && (
                      <motion.div 
                        className="absolute top-2 right-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check className="w-4 h-4 text-primary" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Purpose Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Payment Purpose</Label>
              <div className="flex flex-wrap gap-2">
                {purposes.map((purpose) => (
                  <motion.button
                    key={purpose.id}
                    onClick={() => setSelectedPurpose(purpose.id)}
                    className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium ${
                      selectedPurpose === purpose.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {purpose.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Payment Amount</Label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {currency === "USD" ? "$" : "₹"}
                  </span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 text-lg h-12"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="relative">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="appearance-none h-12 px-4 pr-8 rounded-lg border border-input bg-background text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              {amount && (
                <motion.p 
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ≈ ₹{(parseFloat(amount || "0") * 83.5).toFixed(2)} INR
                </motion.p>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-4">
              <TrustBadge type="secure" />
              <TrustBadge type="refund" />
              <TrustBadge type="instant" />
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={!isValid}
              size="lg"
              className="w-full gap-2"
            >
              Continue to UPI Payment
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
}