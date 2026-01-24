import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { User, Sparkles, Shirt, Compass } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const days = [
    { day: "Day 1", theme: "Bollywood Day", desc: "Bring back the golden era of cinema.", color: "text-yellow-500" },
    { day: "Day 2", theme: "Mismatch Day", desc: "Chaos is the new order. Mix it up!", color: "text-pink-500" },
    { day: "Day 3", theme: "Traditional Day", desc: "Elegance in ethnic roots.", color: "text-orange-500" },
    { day: "Day 4", theme: "Western Day", desc: "Suit up for the grand finale.", color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="space-y-24"
      >
        {/* Intro Section */}
        <section className="text-center max-w-3xl mx-auto space-y-8">
          <motion.div variants={itemVariants} className="flex flex-col items-center">
             <span className="text-[10px] tracking-[1em] text-primary font-mono uppercase mb-4 opacity-60">
                The Dossier
              </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-[#d4c5a9] tracking-[0.2em]">
              RHYTHMS <span className="text-primary">2026</span>
            </h1>
          </motion.div>
          <motion.p variants={itemVariants} className="text-lg text-[#a89984] leading-relaxed italic opacity-80">
            "Education is what remains when one has forgotten what one has learned."
            <span className="block mt-4 not-italic font-light">
              Rhythms 2026 is a journey into the Victorian shadows of creativity. 
              Step into Baker Street at ACPCE, where the clues of culture and the evidence 
              of talent converge in a grand investigation of the arts.
            </span>
          </motion.p>
        </section>

        {/* Dress Code Section */}
        <section>
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-16 text-center">
            <Compass className="w-8 h-8 text-primary opacity-60" />
            <h2 className="text-3xl font-display font-bold text-[#d4c5a9] tracking-[0.3em] uppercase">The Daily Uniforms</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {days.map((day, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-8 bg-[#0e0c0a]/60 border-primary/10 rounded-none hover:border-primary/30 transition-all duration-500 h-full text-center group">
                  <div className="w-12 h-12 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:border-primary transition-colors">
                    <span className="font-mono text-primary text-sm">0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display mb-3 text-[#d4c5a9] tracking-widest uppercase">{day.theme}</h3>
                  <p className="text-[11px] text-[#a89984]/60 font-mono tracking-wider uppercase">{day.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
