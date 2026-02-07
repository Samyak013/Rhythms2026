import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, Music, ArrowRight, Star, Compass, Shield, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import logoc from "../../assets/logoc.png";
import ufo from "../../assets/ufo.png";

// Seeded random for consistent positions
function sr(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// Pre-compute star data
const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: sr(i) * 100,
  y: sr(i + 200) * 100,
  s: sr(i + 400) > 0.9 ? 3 : sr(i + 400) > 0.5 ? 2 : 1,
  d: 2 + sr(i + 600) * 3,
  dl: sr(i + 800) * 2,
}));

// Warp streaks for hyperspace effect
const WARP_LINES = Array.from({ length: 30 }, (_, i) => {
  const angle = (i / 30) * Math.PI * 2;
  const dist = 20 + sr(i + 900) * 30;
  return {
    x: 50 + Math.cos(angle) * dist,
    y: 50 + Math.sin(angle) * dist,
    angle: (angle * 180) / Math.PI,
    len: 40 + sr(i + 1000) * 80,
    delay: sr(i + 1100) * 0.4,
  };
});

function UFOLoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"warp" | "arrive" | "beam">("warp");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("arrive"), 1800);
    const t2 = setTimeout(() => setPhase("beam"), 3200);
    const t3 = setTimeout(onComplete, 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{ background: "#000" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* === PHASE 1: Warp speed starfield === */}
      <AnimatePresence>
        {phase === "warp" && (
          <motion.div
            className="absolute inset-0 z-[1]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Central bright point */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: 6, height: 6, background: "#fff", boxShadow: "0 0 40px 15px rgba(255,255,255,0.3)" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            {/* Warp streaks radiating from center */}
            {WARP_LINES.map((w, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${w.x}%`,
                  top: `${w.y}%`,
                  width: 2,
                  height: w.len,
                  background: `linear-gradient(to bottom, transparent, rgba(200,220,255,0.7), transparent)`,
                  transformOrigin: "center top",
                  rotate: w.angle + 90,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1, 1.5], opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.2, delay: w.delay, repeat: Infinity, repeatDelay: 0.2, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Ambient stars (visible in arrive + beam phases) === */}
      {phase !== "warp" && (
        <div className="absolute inset-0 z-[1]">
          {STARS.map((s, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${s.x}%`, top: `${s.y}%`,
                width: s.s, height: s.s,
                background: s.s === 3 ? "rgba(255,240,200,0.9)" : "rgba(255,255,255,0.7)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.3] }}
              transition={{ duration: s.d, repeat: Infinity, delay: s.dl, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* === PHASE 2 & 3: UFO + Beam === */}
      {phase !== "warp" && (
        <div className="relative z-10 flex flex-col items-center">
          {/* Arrival shockwave ring */}
          <motion.div
            className="absolute z-[3] rounded-full border-2"
            style={{
              width: 300, height: 300,
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              borderColor: "rgba(255,255,255,0.4)",
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: [0, 3], opacity: [0.8, 0] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* White flash on arrival */}
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none bg-white"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Glow halo behind UFO */}
          <motion.div
            className="absolute rounded-full blur-3xl z-[1]"
            style={{
              width: 350, height: 350,
              left: "50%", top: "40%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(255,220,80,0.25), transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.5, 0.3], scale: [0.5, 1.1, 1] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* UFO — materializes with scale pop */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0, opacity: 0, y: -20 }}
            animate={{ scale: [0, 1.15, 1], opacity: [0, 1, 1], y: [-20, 0, 0] }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], times: [0, 0.6, 1] }}
          >
            <motion.img
              src={ufo}
              alt="UFO"
              className="h-40 md:h-52 object-contain drop-shadow-[0_0_40px_rgba(255,220,80,0.4)]"
              animate={phase === "beam" ? { y: [0, -8, 0] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* === PHASE 3: Light beam === */}
          {phase === "beam" && (
            <motion.div
              className="relative -mt-2 z-[5] flex flex-col items-center"
              style={{ width: 200 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Bright source glow at beam top */}
              <motion.div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full blur-lg z-[6]"
                style={{ background: "rgba(255,230,80,0.7)" }}
                animate={{ opacity: [0.5, 0.9, 0.5], scaleX: [0.9, 1.1, 0.9] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Beam body — expands downward */}
              <motion.div
                className="relative overflow-hidden"
                style={{ width: 200, height: 380, transformOrigin: "top center" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Outer beam */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)",
                    background: "linear-gradient(to bottom, rgba(255,220,50,0.35), rgba(255,200,50,0.06) 75%, transparent)",
                  }}
                />
                {/* Inner core beam — pulsing */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(38% 0%, 62% 0%, 84% 100%, 16% 100%)",
                    background: "linear-gradient(to bottom, rgba(255,235,80,0.6), rgba(255,220,50,0.1) 65%, transparent)",
                  }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Light scan line sweeping down beam */}
                <motion.div
                  className="absolute w-full h-10"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(255,240,100,0.25), transparent)" }}
                  animate={{ y: [-40, 380] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                />
              </motion.div>

              {/* Ground impact glow */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-72 h-10 rounded-full blur-2xl"
                style={{ background: "rgba(255,220,50,0.2)" }}
                initial={{ opacity: 0, scaleX: 0.2 }}
                animate={{ opacity: [0, 0.5, 0.3, 0.5], scaleX: [0.2, 1, 0.85, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </div>
      )}
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
      <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden bg-[#0a0806] py-20">
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
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold tracking-[0.3em] md:tracking-[0.4em] text-[#d4c5a9] mb-4 font-display uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                ACPCE PRESENTS
              </h2>
              <img 
                src={logoc} 
                alt="RHYTHMS 2026" 
                className="h-56 sm:h-72 md:h-[420px] lg:h-[550px] w-full max-w-[90vw] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
              />
            </div>
            
            <p className="text-[#a89984] text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8 font-light italic tracking-[0.1em] sm:tracking-[0.15em] leading-relaxed -mt-2 px-2">
              "When you have eliminated the impossible, whatever remains, however improbable, must be the truth."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center w-full px-4">
              <Link href="/events" className="w-full sm:w-auto">
                <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-none shadow-xl transition-all duration-500">
                  Begin Investigation <Compass className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-primary/20 text-[#a89984] hover:bg-primary/5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase rounded-none">
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
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16 text-center relative z-10">
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
      <section className="py-16 md:py-32 relative overflow-hidden bg-[#0a0806]">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-6 md:mb-10 tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-[#d4c5a9]">
            Enrol in the Agency
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#a89984] mb-8 md:mb-14 tracking-[0.05em] md:tracking-[0.1em] max-w-2xl mx-auto leading-relaxed px-2">
            The city of London... or rather, ACPCE, calls for its brightest minds. Registrations are now open for the inquisitive.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-[#d4c5a9] text-[#0a0806] hover:bg-[#c4b599] px-8 sm:px-16 py-5 sm:py-8 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.5em] rounded-none shadow-2xl transition-all duration-700 hover:scale-105">
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
