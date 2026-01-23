import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, Music, ArrowRight, Star, Search, Compass, Shield } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-8"
        >
          <Search className="w-16 h-16 text-primary animate-pulse" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
          />
        </motion.div>
        <h2 className="font-display text-xl tracking-[0.4em] text-primary mb-2 uppercase">
          Analysing Clues...
        </h2>
        <div className="w-48 h-0.5 bg-white/5 relative overflow-hidden">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-primary"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0806]">
        {/* Sherlock Victorian Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(60,40,20,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
          
          {/* Victorian Silhouettes / Smoke */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="mb-8"
          >
            <h2 className="text-primary tracking-[0.8em] font-mono text-[10px] md:text-xs uppercase opacity-60">
              The Game is Afoot
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <div className="flex flex-col items-center mb-10">
              <span className="text-xs tracking-[1em] text-primary/40 font-mono uppercase mb-4">
                A.C. Patil College of Engineering Presents
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-[#d4c5a9] tracking-widest drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                RHYTHMS
                <span className="block text-primary text-shadow-victorian mt-[-5px] md:mt-[-10px]">2026</span>
              </h1>
            </div>
            
            <p className="text-[#a89984] text-base md:text-lg max-w-2xl mx-auto mb-14 font-light italic tracking-[0.15em] leading-relaxed">
              "When you have eliminated the impossible, whatever remains, however improbable, must be the truth."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/events">
                <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground min-w-[240px] h-14 text-sm uppercase tracking-[0.3em] rounded-none shadow-xl transition-all duration-500">
                  Begin Investigation <Compass className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-primary/20 text-[#a89984] hover:bg-primary/5 min-w-[240px] h-14 text-sm tracking-[0.3em] uppercase rounded-none">
                  The Case File
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Corner elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border-l border-t border-primary/20 opacity-40 hidden md:block" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-r border-b border-primary/20 opacity-40 hidden md:block" />
      </section>

      {/* Stats Section with Victorian Icons */}
      <section className="bg-[#0e0c0a] border-y border-primary/10 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative z-10">
          <motion.div whileHover={{ y: -10 }} className="p-8 group cursor-default">
            <Calendar className="w-8 h-8 mx-auto text-primary mb-6 opacity-60" />
            <h3 className="text-xl font-bold font-display text-[#d4c5a9] tracking-[0.2em]">March 5-6, 2026</h3>
            <p className="text-[#a89984]/50 mt-4 font-mono text-[10px] tracking-[0.3em] uppercase">The Event Horizon</p>
          </motion.div>
          <motion.div whileHover={{ y: -10 }} className="p-8 group cursor-default">
            <Search className="w-8 h-8 mx-auto text-primary mb-6 opacity-60" />
            <h3 className="text-xl font-bold font-display text-[#d4c5a9] tracking-[0.2em]">20+ Mysteries</h3>
            <p className="text-[#a89984]/50 mt-4 font-mono text-[10px] tracking-[0.3em] uppercase">The Challenges</p>
          </motion.div>
          <motion.div whileHover={{ y: -10 }} className="p-8 group cursor-default">
            <Shield className="w-8 h-8 mx-auto text-primary mb-6 opacity-60" />
            <h3 className="text-xl font-bold font-display text-[#d4c5a9] tracking-[0.2em]">Grand Reward</h3>
            <p className="text-[#a89984]/50 mt-4 font-mono text-[10px] tracking-[0.3em] uppercase">₹1 Lakh Prize</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-[#0a0806]">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-10 tracking-[0.3em] text-[#d4c5a9]">
            Enrol in the Agency
          </h2>
          <p className="text-lg text-[#a89984] mb-14 tracking-[0.1em] max-w-2xl mx-auto leading-relaxed">
            The city of London... or rather, ACPCE, calls for its brightest minds. Registrations are now open for the inquisitive.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-[#d4c5a9] text-[#0a0806] hover:bg-[#c4b599] px-16 py-8 text-sm uppercase tracking-[0.5em] rounded-none shadow-2xl transition-all duration-700 hover:scale-105">
              Secure Entry
            </Button>
          </Link>
        </div>
        
        {/* Subtle background fog effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      </section>
    </div>
  );
}
