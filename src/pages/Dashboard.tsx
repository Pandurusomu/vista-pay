import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plus,
  RefreshCcw,
  TrendingUp,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { TrustBadge } from "@/components/ui/TrustBadge";

// Mock transaction data
const mockTransactions = [
  {
    id: "1",
    platform: { name: "Netflix", icon: "🎬" },
    amount: 15.99,
    inrAmount: 1335.17,
    status: "completed",
    date: "2024-01-15",
    time: "14:32"
  },
  {
    id: "2",
    platform: { name: "ChatGPT Plus", icon: "🤖" },
    amount: 20.00,
    inrAmount: 1670.00,
    status: "completed",
    date: "2024-01-10",
    time: "09:15"
  },
  {
    id: "3",
    platform: { name: "Spotify", icon: "🎵" },
    amount: 9.99,
    inrAmount: 834.17,
    status: "refunded",
    date: "2024-01-08",
    time: "18:45"
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [showEmpty, setShowEmpty] = useState(false);

  const transactions = showEmpty ? [] : mockTransactions;
  const totalSpent = transactions
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + t.inrAmount, 0);

  const StatusBadge = ({ status }: { status: string }) => {
    const config = {
      completed: { icon: CheckCircle2, text: "Completed", class: "bg-success/10 text-success" },
      refunded: { icon: RefreshCcw, text: "Refunded", class: "bg-warning/10 text-warning" },
      pending: { icon: Clock, text: "Pending", class: "bg-muted text-muted-foreground" },
      expired: { icon: XCircle, text: "Expired", class: "bg-destructive/10 text-destructive" },
    }[status] || { icon: Clock, text: status, class: "bg-muted text-muted-foreground" };
    
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </span>
    );
  };

  return (
    <PageContainer>
      <Header />
      
      <div className="container py-8 md:py-12">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Header */}
          <motion.div 
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
            variants={fadeInUp}
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-muted-foreground">Manage your virtual card payments</p>
            </div>
            <Button onClick={() => navigate("/start")} className="gap-2">
              <Plus className="w-4 h-4" />
              New Payment
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            variants={fadeInUp}
          >
            <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Total Cards</span>
              </div>
              <p className="text-2xl font-bold">{transactions.length}</p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Completed</span>
              </div>
              <p className="text-2xl font-bold">
                {transactions.filter(t => t.status === "completed").length}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Total Spent</span>
              </div>
              <p className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</p>
            </div>
          </motion.div>

          {/* Toggle for demo */}
          <motion.div variants={fadeInUp} className="mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowEmpty(!showEmpty)}
              className="text-xs text-muted-foreground"
            >
              {showEmpty ? "Show transactions" : "Show empty state"}
            </Button>
          </motion.div>

          {/* Transaction History */}
          <motion.div 
            className="rounded-2xl bg-card border border-border shadow-card overflow-hidden"
            variants={fadeInUp}
          >
            <div className="p-6 border-b border-border">
              <h2 className="font-semibold text-lg">Payment History</h2>
            </div>

            {transactions.length === 0 ? (
              /* Empty State */
              <motion.div 
                className="p-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No payments yet</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Start your first international payment and it will appear here.
                </p>
                <Button onClick={() => navigate("/start")} className="gap-2">
                  Make Your First Payment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ) : (
              /* Transaction List */
              <div className="divide-y divide-border">
                {transactions.map((tx, index) => (
                  <motion.div
                    key={tx.id}
                    className="p-4 md:p-6 hover:bg-muted/30 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                        {tx.platform.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{tx.platform.name}</span>
                          <StatusBadge status={tx.status} />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {tx.date} at {tx.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${tx.amount}</p>
                        <p className="text-sm text-muted-foreground">₹{tx.inrAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="flex justify-center gap-2 mt-8"
            variants={fadeInUp}
          >
            <TrustBadge type="secure" />
            <TrustBadge type="protected" />
          </motion.div>
        </motion.div>
      </div>
    </PageContainer>
  );
}