import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, Music, ArrowRight, Star } from "lucide-react";
import heroBg from "@assets/hero.jpg"; // Using placeholder logic for now

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=2000"
            alt="Cinematic Mystery Background"
            className="w-full h-full object-cover opacity-20 scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h2 className="text-secondary tracking-[1em] font-mono text-xs md:text-sm mb-6 uppercase opacity-60">
              The Legend Unfolds
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white mb-6 tracking-widest drop-shadow-2xl">
              RHYTHMS
              <span className="block text-primary text-shadow-mystery mt-[-10px] md:mt-[-20px]">2026</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light italic tracking-wide">
              Step into the unknown. A celebration of art, culture, and the enigmatic spirit of youth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/events">
                <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground min-w-[200px] h-16 text-lg uppercase tracking-widest shadow-[0_0_30px_-5px_var(--primary)] transition-all hover:scale-105 rounded-none">
                  Unveil Events <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-secondary/40 text-secondary hover:bg-secondary/10 min-w-[200px] h-16 text-lg tracking-widest backdrop-blur-sm rounded-none">
                  Discover
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown / Info Strip */}
      <section className="bg-card/30 border-y border-white/5 py-12 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-4">
            <Calendar className="w-8 h-8 mx-auto text-secondary mb-4" />
            <h3 className="text-2xl font-bold font-display text-white">March 5-6, 2026</h3>
            <p className="text-muted-foreground mt-2">Mark your calendars</p>
          </div>
          <div className="p-4">
            <Music className="w-8 h-8 mx-auto text-primary mb-4" />
            <h3 className="text-2xl font-bold font-display text-white">20+ Events</h3>
            <p className="text-muted-foreground mt-2 font-mono text-[10px] tracking-widest uppercase opacity-50">Cultural, Literary, & Fine Arts</p>
          </div>
          <div className="p-4">
            <Star className="w-8 h-8 mx-auto text-secondary mb-4" />
            <h3 className="text-2xl font-bold font-display text-white">₹1 Lakh+</h3>
            <p className="text-muted-foreground mt-2 font-mono text-[10px] tracking-widest uppercase opacity-50">Total Prize Pool</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to Perform?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Registrations are open for all college students. Don't miss your chance to shine on the biggest stage.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-10 py-8 text-xl rounded-full shadow-[0_0_30px_-5px_var(--secondary)]">
              Register Now
            </Button>
          </Link>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </section>
    </div>
  );
}
