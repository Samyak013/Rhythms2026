import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { User, Sparkles, Shirt } from "lucide-react";

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
        className="space-y-16"
      >
        {/* Intro Section */}
        <section className="text-center max-w-3xl mx-auto">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-display font-bold mb-6 text-primary">
            RHYTHMS 2026
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
            Rhythms 2026 isn't just a fest; it's a celebration of spirit. This year, we dive into a world of artistic expression.
            Shadows, neon lights, and whispers of creativity set the stage for a cultural extravaganza like no other.
            Expect the unexpected as we transform the campus into an immersive experience.
          </motion.p>
        </section>

        {/* Dress Code Section */}
        <section>
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 justify-center">
            <Shirt className="w-8 h-8 text-secondary" />
            <h2 className="text-3xl font-display font-bold">Dress Code Days</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {days.map((day, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-6 bg-card/40 border-white/10 hover:border-primary/50 transition-colors h-full text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <span className="font-mono font-bold text-lg">{idx + 1}</span>
                  </div>
                  <h3 className={`text-xl font-bold font-display mb-2 ${day.color}`}>{day.theme}</h3>
                  <p className="text-sm text-muted-foreground">{day.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

      </motion.div>
    </div>
  );
}
