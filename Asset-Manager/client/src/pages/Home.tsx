import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, Music, ArrowRight, Star } from "lucide-react";
import heroBg from "@assets/hero.jpg"; // Using placeholder logic for now

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Mysterious Ambient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(40,0,0,0.2),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
          
          {/* Subtle slow moving particles effect would go here if we had a library, using CSS circles instead */}
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" 
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "2em" }}
            animate={{ opacity: 1, letterSpacing: "1em" }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="mb-8"
          >
            <h2 className="text-secondary tracking-[1em] font-mono text-[10px] md:text-xs uppercase opacity-40">
              The Legend Unfolds
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center mb-10">
              <span className="text-xs tracking-[1em] text-muted-foreground font-mono uppercase mb-2 ml-4">
                ACPCE
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white tracking-widest drop-shadow-[0_0_30px_rgba(0,0,0,1)]">
                RHYTHMS
                <span className="block text-primary text-shadow-mystery mt-[-5px] md:mt-[-10px] opacity-90">2026</span>
              </h1>
            </div>
            
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-14 font-light italic tracking-[0.2em] leading-relaxed opacity-60">
              Step into the shadows of creativity. An enigmatic celebration of the arts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/events">
                <Button size="lg" className="bg-transparent border border-primary/40 hover:border-primary text-white min-w-[220px] h-14 text-sm uppercase tracking-[0.3em] transition-all duration-500 hover:bg-primary/10 shadow-[0_0_20px_-10px_var(--primary)]">
                  Enter The Void <ArrowRight className="ml-2 w-4 h-4 opacity-50" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-white min-w-[220px] h-14 text-sm tracking-[0.3em] uppercase transition-all duration-500">
                  The Mystery
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown / Info Strip */}
      <section className="bg-black/80 border-y border-white/5 py-16 backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 border border-white/0 hover:border-white/5 transition-all duration-500 group"
          >
            <Calendar className="w-6 h-6 mx-auto text-primary mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xl font-bold font-display text-white tracking-[0.2em]">March 5-6, 2026</h3>
            <p className="text-muted-foreground mt-3 font-mono text-[10px] tracking-[0.3em] uppercase opacity-40">Mark your calendars</p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 border border-white/0 hover:border-white/5 transition-all duration-500 group"
          >
            <Music className="w-6 h-6 mx-auto text-primary mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xl font-bold font-display text-white tracking-[0.2em]">20+ Events</h3>
            <p className="text-muted-foreground mt-3 font-mono text-[10px] tracking-[0.3em] uppercase opacity-40">The Convergence</p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 border border-white/0 hover:border-white/5 transition-all duration-500 group"
          >
            <Star className="w-6 h-6 mx-auto text-primary mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xl font-bold font-display text-white tracking-[0.2em]">₹1 Lakh+</h3>
            <p className="text-muted-foreground mt-3 font-mono text-[10px] tracking-[0.3em] uppercase opacity-40">Prize Pool</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-black">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-[0.3em]"
          >
            Ready to Perform?
          </motion.h2>
          <p className="text-lg text-muted-foreground mb-12 tracking-[0.1em] opacity-50 max-w-2xl mx-auto italic">
            Registrations are open for the chosen ones. Don't miss your chance to shine on the grand stage.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 px-12 py-7 text-sm uppercase tracking-[0.5em] rounded-none transition-all duration-700 hover:scale-105">
              Register Now
            </Button>
          </Link>
        </div>
        
        {/* Decorative elements - more subtle */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[200px]" />
      </section>
    </div>
  );
}
