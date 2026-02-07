import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, Music, ArrowRight, Star, Compass, Shield, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import logoc from "../../assets/logoc.png";
import ufo from "../../assets/ufo.png";

// Seeded random for consistent star/particle positions across renders
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const STARS = Array.from({ length: 120 }, (_, i) => ({
  left: seededRandom(i) * 100,
  top: seededRandom(i + 200) * 100,
  size: seededRandom(i + 400) > 0.85 ? 3 : seededRandom(i + 400) > 0.5 ? 2 : 1,
  dur: 1.5 + seededRandom(i + 600) * 3,
  del: seededRandom(i + 800) * 3,
}));

const SHOOTING_STARS = Array.from({ length: 5 }, (_, i) => ({
  startX: 10 + seededRandom(i + 1000) * 60,
  startY: seededRandom(i + 1100) * 30,
  delay: 1 + i * 1.8 + seededRandom(i + 1200) * 1.5,
}));

const BEAM_PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  x: -20 + seededRandom(i + 1300) * 40,
  delay: 2.8 + seededRandom(i + 1400) * 2,
  dur: 1.2 + seededRandom(i + 1500) * 1,
  size: 2 + seededRandom(i + 1600) * 3,
}));

function UFOLoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 5500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 30%, #0d0b12 0%, #050408 50%, #000000 100%)" }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      {/* Nebula / deep space ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] left-[-10%] top-[-10%] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #6b5ce7, transparent 70%)" }} />
        <div className="absolute w-[500px] h-[500px] right-[-15%] bottom-[-15%] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #e7a85c, transparent 70%)" }} />
      </div>

      {/* Layered starfield */}
      <div className="absolute inset-0 z-[1]">
        {STARS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              background: s.size === 3 ? "rgba(255,240,200,0.9)" : "rgba(255,255,255,0.8)",
              boxShadow: s.size === 3 ? "0 0 4px rgba(255,220,150,0.5)" : "none",
            }}
            animate={{ opacity: [0.1, 0.9, 0.1] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.del, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      {SHOOTING_STARS.map((ss, i) => (
        <motion.div
          key={`ss-${i}`}
          className="absolute z-[2] h-[1px] rounded-full"
          style={{
            left: `${ss.startX}%`,
            top: `${ss.startY}%`,
            width: 60 + i * 15,
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent)",
            transformOrigin: "left center",
            rotate: 25 + i * 5,
          }}
          initial={{ opacity: 0, scaleX: 0, x: 0 }}
          animate={{ opacity: [0, 0.8, 0], scaleX: [0, 1, 1], x: [0, 120, 200] }}
          transition={{ delay: ss.delay, duration: 0.8, ease: "easeOut" }}
        />
      ))}

      {/* UFO + Beam unified container */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ y: -500, x: 400, scale: 0.15, rotate: -30, opacity: 0 }}
        animate={{
          y: [-500, -200, -60],
          x: [400, 100, 0],
          scale: [0.15, 0.6, 1],
          rotate: [-30, -10, 0],
          opacity: [0, 1, 1],
        }}
        transition={{ duration: 2.5, ease: [0.33, 0, 0.2, 1], times: [0, 0.5, 1] }}
      >
        {/* Pulsing energy ring */}
        <motion.div
          className="absolute z-[5] rounded-full border"
          style={{
            width: 280, height: 60,
            left: "50%", top: "28%",
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(255,220,80,0.15)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.6, 0.2, 0.5], scale: [0.8, 1.1, 0.95, 1.05] }}
          transition={{ delay: 2.5, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Multi-layer glow */}
        <motion.div
          className="absolute rounded-full blur-3xl z-[1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.15, 0.25] }}
          transition={{ delay: 1.8, duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 350, height: 350, left: "50%", top: "15%", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(255,220,80,0.35), rgba(180,140,60,0.1) 60%, transparent 80%)" }}
        />
        <motion.div
          className="absolute rounded-full blur-2xl z-[2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.3] }}
          transition={{ delay: 2, duration: 2, ease: "easeOut" }}
          style={{ width: 180, height: 180, left: "50%", top: "15%", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(255,240,150,0.2), transparent 70%)" }}
        />

        {/* UFO image with hover bob */}
        <motion.img
          src={ufo}
          alt="UFO"
          className="h-44 md:h-56 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(255,220,80,0.3)]"
          animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }}
          transition={{ delay: 2.5, duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Small orbiting light */}
        <motion.div
          className="absolute z-[15] w-2 h-2 rounded-full"
          style={{ background: "rgba(255,220,80,0.8)", boxShadow: "0 0 8px rgba(255,220,80,0.6)", top: "22%", left: "50%", transformOrigin: "0px -70px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.4, 0.8], rotate: 360 }}
          transition={{ opacity: { delay: 2.8, duration: 2, repeat: Infinity }, rotate: { delay: 2.8, duration: 4, repeat: Infinity, ease: "linear" } }}
        />

        {/* Screen flash on beam activation */}
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{ background: "rgba(255,240,150,1)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ delay: 2.6, duration: 0.4, ease: "easeOut" }}
        />

        {/* Beam directly connected to UFO — no gap */}
        <motion.div
          className="relative -mt-3 z-[5]"
          style={{ width: 180, height: 350, transformOrigin: "top center" }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Glow at beam origin (under UFO) */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full blur-md z-[6]"
            style={{ background: "rgba(255,230,80,0.5)" }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Outer beam */}
          <div className="absolute inset-0" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)", background: "linear-gradient(to bottom, rgba(255,220,50,0.4), rgba(255,200,50,0.08) 70%, transparent)" }} />
          {/* Core beam */}
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: "polygon(40% 0%, 60% 0%, 82% 100%, 18% 100%)", background: "linear-gradient(to bottom, rgba(255,235,80,0.65), rgba(255,220,50,0.15) 60%, transparent)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Beam edge lines */}
          <motion.div
            className="absolute h-full"
            style={{ left: "28%", width: 1, background: "linear-gradient(to bottom, rgba(255,230,80,0.4), transparent)", transformOrigin: "top" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 2.7, duration: 0.6 }}
          />
          <motion.div
            className="absolute h-full"
            style={{ right: "28%", width: 1, background: "linear-gradient(to bottom, rgba(255,230,80,0.4), transparent)", transformOrigin: "top" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 2.7, duration: 0.6 }}
          />

          {/* Floating particles in beam */}
          {BEAM_PARTICLES.map((p, i) => (
            <motion.div
              key={`bp-${i}`}
              className="absolute rounded-full"
              style={{
                left: `calc(50% + ${p.x}px)`,
                top: 0,
                width: p.size,
                height: p.size,
                background: "rgba(255,230,100,0.7)",
                boxShadow: "0 0 4px rgba(255,220,80,0.4)",
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.8, 0], y: [0, 340] }}
              transition={{ delay: p.delay, duration: p.dur, repeat: Infinity, ease: "easeIn" }}
            />
          ))}

          {/* Ground glow / impact */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-8 rounded-full blur-xl"
            style={{ background: "rgba(255,220,50,0.2)" }}
            initial={{ opacity: 0, scaleX: 0.3 }}
            animate={{ opacity: [0, 0.6, 0.3, 0.5], scaleX: [0.3, 1.1, 0.9, 1] }}
            transition={{ delay: 3, duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [showUFO, setShowUFO] = useState(true);

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {showUFO && <UFOLoadingScreen onComplete={() => setShowUFO(false)} />}
      </AnimatePresence>
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

        {/* Floating Mystery Cards */}
        {[
          { name: "Pyramids of Giza", icon: "△", pos: { top: "10%", left: "6%" }, delay: 0, duration: 7 },
          { name: "Bermuda Triangle", icon: "▽", pos: { top: "22%", right: "5%" }, delay: 1, duration: 8 },
          { name: "Existence of Aliens", icon: "◎", pos: { bottom: "32%", left: "4%" }, delay: 0.5, duration: 6 },
          { name: "Area 51", icon: "⊘", pos: { bottom: "18%", right: "6%" }, delay: 1.5, duration: 7.5 },
          { name: "City of Atlantis", icon: "◇", pos: { top: "58%", left: "10%" }, delay: 2, duration: 6.5 },
          { name: "Black Holes", icon: "●", pos: { top: "14%", right: "18%" }, delay: 0.8, duration: 8.5 },
          { name: "Zodiac Cipher", icon: "⟐", pos: { bottom: "38%", right: "14%" }, delay: 1.2, duration: 7 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute z-[2] hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] backdrop-blur-sm border border-primary/10 shadow-[0_0_15px_rgba(0,0,0,0.3)] select-none pointer-events-none"
            style={item.pos}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.4, 0.7, 0.5], y: [0, -12, 0] }}
            transition={{ opacity: { duration: item.duration, repeat: Infinity, delay: item.delay }, y: { duration: item.duration, repeat: Infinity, ease: "easeInOut", delay: item.delay } }}
          >
            <span className="text-primary/50 text-sm font-mono">{item.icon}</span>
            <span className="text-[10px] font-mono tracking-[0.15em] text-primary/40 uppercase whitespace-nowrap">{item.name}</span>
          </motion.div>
        ))}

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
            <div className="flex flex-col items-center mb-0">
              <h2 className="text-2xl md:text-4xl font-bold tracking-[0.4em] text-[#d4c5a9] mb-6 font-display uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                ACPCE PRESENTS
              </h2>
              <img 
                src={logoc} 
                alt="RHYTHMS 2026" 
                className="h-96 md:h-[450px] lg:h-[550px] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
              />
            </div>
            
            <p className="text-[#a89984] text-base md:text-lg max-w-2xl mx-auto mb-8 font-light italic tracking-[0.15em] leading-relaxed -mt-2">
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
            <Zap className="w-8 h-8 mx-auto text-primary mb-6 opacity-60" />
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
