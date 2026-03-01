import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Award, Star, Crown } from "lucide-react";
import titleSponsorLogo from "@/../../client/assets/titlesponsor.png";
import sponsor1Logo from "@/../../client/assets/sponsor1.jpeg";
import sponsor2Logo from "@/../../client/assets/sponsor2.jpeg";
import sponsor3Logo from "@/../../client/assets/sponsor3.jpeg";

export default function Sponsors() {
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

  // Sponsor details with actual logos
  const titleSponsors = [
    { name: "Title Sponsor", tier: "Platinum", logo: titleSponsorLogo },
  ];

  const sponsors = [
    { name: "Sponsor 1", tier: "Partner", logo: sponsor1Logo },
    { name: "Sponsor 2", tier: "Partner", logo: sponsor2Logo },
    { name: "Sponsor 3", tier: "Partner", logo: sponsor3Logo },
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
              Our Partners
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-[#d4c5a9] tracking-[0.2em]">
              OUR <span className="text-primary">SPONSORS</span>
            </h1>
          </motion.div>
          <motion.p variants={itemVariants} className="text-lg text-[#a89984] leading-relaxed italic opacity-80">
            "Great partnerships make great events possible."
            <span className="block mt-4 not-italic font-light">
              We extend our heartfelt gratitude to our esteemed sponsors who make RHYTHMS 2026 a reality.
              Their support enables us to bring this extraordinary celebration of talent and creativity to life.
            </span>
          </motion.p>
        </section>

        {/* Title/Platinum Sponsors */}
        <section>
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-8 md:mb-16 text-center">
            <Crown className="w-10 h-10 text-primary opacity-60" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#d4c5a9] tracking-[0.15em] md:tracking-[0.3em] uppercase">
              Title Sponsor
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
            {titleSponsors.map((sponsor, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-12 bg-gradient-to-br from-primary/20 via-[#0e0c0a]/80 to-[#0e0c0a]/60 border-primary/30 rounded-none hover:border-primary/50 transition-all duration-500 text-center group">
                  <div className="flex items-center justify-center">
                    {sponsor.logo ? (
                      <img src={sponsor.logo} alt={sponsor.name} className="h-32 object-contain" />
                    ) : (
                      <div className="h-32 w-full flex items-center justify-center border-2 border-dashed border-primary/30 rounded">
                        <span className="text-xs text-[#a89984]/50 uppercase tracking-wider">Logo Coming Soon</span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sponsors */}
        <section>
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-8 md:mb-16 text-center">
            <Award className="w-8 h-8 text-primary opacity-60" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-[#d4c5a9] tracking-[0.15em] md:tracking-[0.3em] uppercase">
              Sponsors
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {sponsors.map((sponsor, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-8 bg-[#0e0c0a]/60 border-primary/10 rounded-none hover:border-primary/30 transition-all duration-500 h-full text-center group">
                  <div className="flex items-center justify-center h-full">
                    {sponsor.logo ? (
                      <img src={sponsor.logo} alt={sponsor.name} className="h-24 object-contain" />
                    ) : (
                      <div className="h-24 w-full flex items-center justify-center border-2 border-dashed border-primary/20 rounded">
                        <span className="text-xs text-[#a89984]/50 uppercase tracking-wider">Logo Coming Soon</span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Become a Sponsor CTA */}
        <section>
          <motion.div variants={itemVariants} className="relative">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-[#0e0c0a]/80 to-[#0e0c0a]/60 border-primary/30 rounded-none shadow-[0_0_30px_-5px_var(--primary)]">
              <div className="text-center space-y-6">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-[#d4c5a9] tracking-[0.2em] uppercase">
                  Become a Sponsor
                </h2>
                <p className="text-[#a89984] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                  Join us in making RHYTHMS 2026 an unforgettable celebration. 
                  Partner with us to showcase your brand to thousands of talented students and professionals.
                </p>
                <div className="pt-4">
                  <a 
                    href="/contact" 
                    className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm uppercase tracking-[0.3em] rounded-none hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
