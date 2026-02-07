import { type Event } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Event;
  isRegistered: boolean;
  onRegister: (id: number) => void;
  isRegistering: boolean;
}

export function EventCard({ event, isRegistered, onRegister, isRegistering }: EventCardProps) {
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
        
        <CardHeader className="pb-3 pt-6 px-4 sm:px-6">
          <div className="flex justify-between items-start gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <Badge variant="outline" className="mb-2 text-[10px] tracking-widest border-primary/30 text-primary bg-primary/5 rounded-none uppercase inline-block">
                {event.category}
              </Badge>
              <h3 className="text-lg sm:text-xl font-bold font-display text-[#d4c5a9] group-hover:text-primary transition-colors tracking-wider break-words">
                {event.name}
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="block text-xl sm:text-2xl font-bold text-primary opacity-80 whitespace-nowrap">₹{event.entryFee}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow space-y-4 sm:space-y-6 pt-2 px-4 sm:px-6">
          <p className="text-[#a89984] text-xs sm:text-sm line-clamp-3 leading-relaxed italic opacity-70">
            {event.description}
          </p>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-[9px] sm:text-[10px] text-[#a89984] font-mono uppercase tracking-widest">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/60 flex-shrink-0" />
              <span className="truncate">{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/60 flex-shrink-0" />
              <span className="truncate">{event.venue || "TBA"}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/60 flex-shrink-0" />
              <span className="truncate">{event.teamSize}</span>
            </div>
            {event.prizeFirst && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                <span className="text-primary font-bold truncate">₹{event.prizeFirst}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-4 sm:pt-6 pb-6 sm:pb-8 border-t border-primary/5 px-4 sm:px-6">
          <Button 
            className={`w-full rounded-none tracking-[0.2em] uppercase text-[10px] sm:text-xs h-10 sm:h-12 transition-all duration-500 ${isRegistered 
              ? "bg-primary/10 text-primary border border-primary/30" 
              : "bg-primary text-primary-foreground hover:bg-primary/80 shadow-lg"}`}
            disabled={isRegistered || isRegistering}
            onClick={() => onRegister(event.id)}
            variant={isRegistered ? "outline" : "default"}
          >
            {isRegistered ? "Solved" : isRegistering ? "Registering..." : "Enter the Arena"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
