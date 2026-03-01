import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function Schedule() {
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

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="space-y-12 md:space-y-24"
      >
        {/* Header Section */}
        <section className="text-center max-w-3xl mx-auto space-y-8">
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <span className="text-[10px] tracking-[1em] text-primary font-mono uppercase mb-4 opacity-60">
              Rhythms Schedule
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-[#d4c5a9] tracking-[0.2em]">
              EVENT <span className="text-primary">SCHEDULE</span>
            </h1>
          </motion.div>
          <motion.p variants={itemVariants} className="text-lg text-[#a89984] leading-relaxed italic opacity-80">
            "Mark your calendars for three days of celebrations, performances, and unforgettable moments."
          </motion.p>
        </section>

        {/* Day 1: 4th March 2026 */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/10 via-[#0e0c0a]/80 to-[#0e0c0a]/60 border-primary/30 rounded-none">
            <h3 className="text-lg md:text-xl font-bold text-primary mb-6 tracking-widest uppercase flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Day 1 - 4th March 2026
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { event: "Story Telling", time: "10:00 AM - 11:00 AM", venue: "" },
                { event: "Poem Recitation / Shayari", time: "11:00 AM - 12:00 PM", venue: "" },
                { event: "Sketching, Doodling", time: "11:30 AM - 1:00 PM", venue: "" },
                { event: "Treasure Hunt", time: "12:00 PM - 1:30 PM", venue: "Activity Area" },
                { event: "Rangoli", time: "12:00 PM - 2:00 PM", venue: "Activity Area" },
                { event: "Attire Spectra", time: "1:30 PM - 2:30 PM", venue: "Activity Area" },
                { event: "Reelography", time: "1:30 PM - 2:30 PM", venue: "Activity Area" },
                { event: "Mandala", time: "2:00 PM - 3:00 PM", venue: "" },
                { event: "Short Film Competition", time: "2:00 PM Onwards", venue: "Seminar Hall (Room No -125)" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 py-3 px-4 border-l-2 border-primary/30 hover:border-primary/60 transition-all duration-300 hover:bg-primary/5 rounded-sm group">
                  <span
                    className="text-left text-[#d4c5a9] font-medium hover:text-primary transition-colors duration-200 flex items-center gap-2"
                  >
                    {item.event}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[#a89984]/70 text-xs md:text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.time}
                    </span>
                    {item.venue && (
                      <span className="flex items-center gap-1 text-[#a89984]/60">
                        <MapPin className="w-3 h-3" /> {item.venue}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Day 2: 5th March 2026 */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/10 via-[#0e0c0a]/80 to-[#0e0c0a]/60 border-primary/30 rounded-none">
            <h3 className="text-lg md:text-xl font-bold text-primary mb-6 tracking-widest uppercase flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Day 2 - 5th March 2026
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { event: "Rhythms Curtain Raiser & Stage Opening Ceremony", time: "11:00 AM - 11:15 AM", venue: "On Stage" },
                { event: "Rhythms Inauguration & Prize Distribution", time: "11:30 AM - 1:30 PM", venue: "Seminar Hall (Room No -125)" },
                { event: "Rose Day", time: "2:00 PM - 2:30 PM", venue: "On Stage" },
                { event: "Flashmob", time: "2:30 PM - 3:00 PM", venue: "On Ground" },
                { event: "Antakshri", time: "3:00 PM - 4:00 PM", venue: "On Ground" },
                { event: "Singing", time: "4:00 PM - 5:30 PM", venue: "On Stage" },
                { event: "Solo / Duet Dance", time: "5:30 PM - 6:30 PM", venue: "On Stage" },
                { event: "Concert", time: "6:30 PM - 7:30 PM", venue: "On Stage" },
                { event: "DJ", time: "7:30 PM - 9:00 PM", venue: "On Ground" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 py-3 px-4 border-l-2 border-primary/30 hover:border-primary/60 transition-all duration-300 hover:bg-primary/5 rounded-sm group">
                  <span
                    className="text-left text-[#d4c5a9] font-medium hover:text-primary transition-colors duration-200 flex items-center gap-2"
                  >
                    {item.event}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[#a89984]/70 text-xs md:text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.time}
                    </span>
                    <span className="flex items-center gap-1 text-[#a89984]/60">
                      <MapPin className="w-3 h-3" /> {item.venue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Day 3: 6th March 2026 */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/10 via-[#0e0c0a]/80 to-[#0e0c0a]/60 border-primary/30 rounded-none">
            <h3 className="text-lg md:text-xl font-bold text-primary mb-6 tracking-widest uppercase flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Day 3 - 6th March 2026
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { event: "Swarsandhya", time: "11:00 AM - 12:30 PM", venue: "Seminar Hall (Room No -125)" },
                { event: "Lunch Break", time: "12:30 PM - 2:00 PM", venue: "" },
                { event: "Dramatics", time: "2:00 PM - 2:30 PM", venue: "On Ground" },
                { event: "Prize Distribution", time: "2:30 PM - 4:30 PM", venue: "On Stage" },
                { event: "Group Dance", time: "4:30 PM - 6:00 PM", venue: "On Stage" },
                { event: "Fashion Show", time: "6:00 PM - 7:30 PM", venue: "On Stage" },
                { event: "BTS Video", time: "7:30 PM - 7:45 PM", venue: "On Stage" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 py-3 px-4 border-l-2 border-primary/30 hover:border-primary/60 transition-all duration-300 hover:bg-primary/5 rounded-sm group">
                  <span
                    className="text-left text-[#d4c5a9] font-medium hover:text-primary transition-colors duration-200 flex items-center gap-2"
                  >
                    {item.event}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[#a89984]/70 text-xs md:text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.time}
                    </span>
                    {item.venue && (
                      <span className="flex items-center gap-1 text-[#a89984]/60">
                        <MapPin className="w-3 h-3" /> {item.venue}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Tips Section */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-[#0e0c0a]/80 to-[#0e0c0a]/60 border-primary/30 rounded-none">
            <div className="text-center space-y-6">
              <h2 className="text-xl md:text-2xl font-display font-bold text-[#d4c5a9] tracking-[0.2em] uppercase">
                Pro Tips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="text-left">
                  <h3 className="text-primary font-bold mb-2 tracking-wide">Arrive Early</h3>
                  <p className="text-[#a89984]/70 text-sm">Be at least 15 minutes early for each event to collect your credentials.</p>
                </div>
                <div className="text-left">
                  <h3 className="text-primary font-bold mb-2 tracking-wide">Carry Documents</h3>
                  <p className="text-[#a89984]/70 text-sm">Keep your college ID and registration details handy throughout the fest.</p>
                </div>
                <div className="text-left">
                  <h3 className="text-primary font-bold mb-2 tracking-wide">Stay Hydrated</h3>
                  <p className="text-[#a89984]/70 text-sm">Refreshment stalls are available throughout the campus on all three days.</p>
                </div>
                <div className="text-left">
                  <h3 className="text-primary font-bold mb-2 tracking-wide">Follow Updates</h3>
                  <p className="text-[#a89984]/70 text-sm">Watch our social media for any last-minute schedule changes or announcements.</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
