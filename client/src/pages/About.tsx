import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { User, Sparkles, Shirt, Compass, Camera, Instagram, Award, Users } from "lucide-react";

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
    { day: "25 Feb", theme: "Mismatch Day", desc: "Chaos is the new order. Mix it up!", color: "text-pink-500" },
    { day: "26 Feb", theme: "Group Day", desc: "Unite in style and creativity.", color: "text-blue-500" },
    { day: "27 Feb", theme: "No Bag Day", desc: "Travel light, live free.", color: "text-green-500" },
    { day: "2 Mar", theme: "Character Day", desc: "Become your favorite persona.", color: "text-yellow-500" },
    { day: "5 Mar", theme: "Traditional Day", desc: "Elegance in ethnic roots.", color: "text-orange-500" },
    { day: "6 Mar", theme: "Western Day", desc: "Suit up for the grand finale.", color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="space-y-12 md:space-y-24"
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
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-8 md:mb-16 text-center">
            <Compass className="w-8 h-8 text-primary opacity-60" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-[#d4c5a9] tracking-[0.15em] md:tracking-[0.3em] uppercase">The Daily Uniforms</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {days.map((day, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-5 sm:p-8 bg-[#0e0c0a]/60 border-primary/10 rounded-none hover:border-primary/30 transition-all duration-500 h-full text-center group">
                  <div className="w-12 h-12 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:border-primary transition-colors">
                    <span className="font-mono text-primary text-sm">{day.day}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display mb-3 text-[#d4c5a9] tracking-widest uppercase">{day.theme}</h3>
                  <p className="text-[11px] text-[#a89984]/60 font-mono tracking-wider uppercase">{day.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Theme Days Participation Alert */}
        <section>
          <motion.div variants={itemVariants} className="relative">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-[#0e0c0a]/80 to-[#0e0c0a]/60 border-primary/30 rounded-none shadow-[0_0_30px_-5px_var(--primary)]">
              <div className="text-center space-y-6">
                <div className="flex justify-center items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-[#d4c5a9] tracking-[0.2em] uppercase">
                    Theme Days Alert
                  </h2>
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                </div>
                
                <p className="text-xl md:text-2xl font-bold text-primary tracking-wide">
                  Dress up. Click. Post. WIN 🏆
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-8">
                  <div className="flex items-start gap-4 text-left">
                    <Camera className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[#d4c5a9] font-medium text-sm md:text-base">
                        Post a Story or Reel on theme days
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 text-left">
                    <Instagram className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[#d4c5a9] font-medium text-sm md:text-base">
                        Tag @acpcerhythms
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 text-left">
                    <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[#d4c5a9] font-medium text-sm md:text-base">
                        Exciting prizes & official page features
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 text-left">
                    <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[#d4c5a9] font-medium text-sm md:text-base">
                        Solo | Group | All allowed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-primary/20">
                  <p className="text-[#a89984] text-sm font-mono tracking-wider uppercase">
                    Don't miss your chance to shine!
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
