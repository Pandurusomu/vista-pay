import { motion } from "framer-motion";
import { ArrowRight, CreditCard, Globe, Shield, Zap, RefreshCcw, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { TrustBadge } from "@/components/ui/TrustBadge";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Landing() {
  const features = [
    {
      icon: Globe,
      title: "Pay Internationally",
      description: "Access Netflix, Spotify, ChatGPT, and more without an international card"
    },
    {
      icon: Zap,
      title: "Instant via UPI",
      description: "Pay with any UPI app you already use. No new accounts needed."
    },
    {
      icon: Clock,
      title: "Time-Bound Safety",
      description: "Card expires in 10 minutes. Unused balance auto-refunds."
    },
    {
      icon: Shield,
      title: "Zero Risk",
      description: "Only create card for exact amount. No overcharges possible."
    }
  ];

  const steps = [
    { num: "01", title: "Select Service", desc: "Choose what you're paying for" },
    { num: "02", title: "Pay via UPI", desc: "Scan QR with any UPI app" },
    { num: "03", title: "Get Virtual Card", desc: "10-minute card generated instantly" },
    { num: "04", title: "Complete Payment", desc: "Use card details on the platform" },
  ];

  return (
    <PageContainer>
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container py-20 md:py-32">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="flex justify-center gap-2 mb-6">
              <TrustBadge type="secure" />
              <TrustBadge type="refund" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Pay for{" "}
              <span className="text-gradient">International Services</span>
              {" "}with UPI
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Get a 10-minute virtual international card instantly. Pay for Netflix, Spotify, 
              ChatGPT, and more without owning an international credit card.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/start">
                <Button size="lg" className="gap-2 px-8">
                  Start Payment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="gap-2">
                  View Dashboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Problem Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Problem We Solve
            </h2>
            <p className="text-lg text-muted-foreground">
              Millions of Indians can't access international digital services because they 
              don't have an international credit card. Traditional solutions are expensive, 
              slow, and often unavailable.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-card shadow-card border border-border/50 hover:shadow-elevated transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Four simple steps to international payments
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center relative"
              >
                <div className="text-6xl font-bold text-primary/10 mb-4">{step.num}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div 
            className="max-w-2xl mx-auto text-center p-8 md:p-12 rounded-3xl gradient-primary text-primary-foreground"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <CreditCard className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Pay Internationally?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Get your first virtual card in under 2 minutes. No signup required.
            </p>
            <Link to="/start">
              <Button size="lg" variant="secondary" className="gap-2">
                Start Your First Payment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">TimeBound</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <TrustBadge type="protected" />
              <span>© 2024 TimeBound. Prototype Demo.</span>
            </div>
          </div>
        </div>
      </footer>
    </PageContainer>
  );
}