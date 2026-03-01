import { type Event } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin, Trophy, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { getRegistrationURL } from "@/config/registration";

interface EventCardProps {
  event: Event;
  isRegistered: boolean;
  onRegister: (id: number) => void;
  isRegistering: boolean;
}

export function EventCard({ event, isRegistered, onRegister, isRegistering }: EventCardProps) {
  const registrationURL = getRegistrationURL(event.name);
  
  const prizeDisplay = event.prizeFirst === 0 ? "₹0" : event.prizeFirst ? `₹${event.prizeFirst}` : "₹—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-[#0e0c0a]/60 backdrop-blur-md border-primary/10 rounded-none overflow-hidden hover:border-primary/40 hover:shadow-[0_0_30px_-10px_var(--primary)] transition-all duration-700 h-full flex flex-col group relative">
        <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <CardHeader className="pb-4 pt-6 px-4 sm:px-6 border-b border-primary/5">
          <h3 className="text-lg sm:text-xl font-bold font-display text-[#d4c5a9] group-hover:text-primary transition-colors tracking-wider">
            {event.name}
          </h3>
        </CardHeader>

        <CardContent className="flex-grow space-y-4 pt-6 px-4 sm:px-6">
          {/* Description */}
          <div>
            <p className="text-[#a89984] text-xs sm:text-sm leading-relaxed italic opacity-75">
              {event.description}
            </p>
          </div>
          
          <div className="space-y-3 text-xs sm:text-sm">
            {/* Date */}
            <div className="flex items-start gap-2 sm:gap-3">
              <Calendar className="w-4 h-4 sm:w-4 sm:h-4 text-primary/70 flex-shrink-0 mt-0.5" />
              <div className="text-[#a89984] font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
                Date: <span className="text-[#d4c5a9] font-semibold">{event.date}</span>
              </div>
            </div>

            {/* Time */}
            {event.time && (
              <div className="flex items-start gap-2 sm:gap-3">
                <Clock className="w-4 h-4 sm:w-4 sm:h-4 text-primary/70 flex-shrink-0 mt-0.5" />
                <div className="text-[#a89984] font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
                  Time: <span className="text-[#d4c5a9] font-semibold">{event.time}</span>
                </div>
              </div>
            )}

            {/* Venue */}
            {event.venue && (
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-4 sm:h-4 text-primary/70 flex-shrink-0 mt-0.5" />
                <div className="text-[#a89984] font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
                  Venue: <span className="text-[#d4c5a9] font-semibold">{event.venue}</span>
                </div>
              </div>
            )}

            {/* Prize Pool */}
            <div className="flex items-start gap-2 sm:gap-3">
              <Trophy className="w-4 h-4 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-[#a89984] font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
                Prize Pool: <span className="text-primary font-bold">{prizeDisplay}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-6 pb-6 px-4 sm:px-6 border-t border-primary/5">
          <a href={registrationURL} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button 
              className="w-full rounded-none tracking-[0.2em] uppercase text-[10px] sm:text-xs h-10 sm:h-12 transition-all duration-500 bg-primary text-primary-foreground hover:bg-primary/80 shadow-lg"
              variant="default"
            >
              Register Now
            </Button>
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
