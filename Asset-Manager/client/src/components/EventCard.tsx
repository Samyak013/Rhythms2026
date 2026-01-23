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
      <Card className="bg-card/50 backdrop-blur-sm border-white/10 overflow-hidden hover:border-primary/50 hover:shadow-[0_0_20px_-5px_var(--primary)] transition-all duration-300 h-full flex flex-col group">
        <div className="h-2 bg-gradient-to-r from-primary to-secondary w-full" />
        
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-4">
            <div>
              <Badge variant="outline" className="mb-2 text-xs border-primary/40 text-primary bg-primary/10">
                {event.category}
              </Badge>
              <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                {event.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="block text-2xl font-bold text-secondary">₹{event.entryFee}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow space-y-4">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {event.description}
          </p>
          
          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{event.venue || "TBA"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>{event.teamSize}</span>
            </div>
            {event.prizeFirst && (
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-secondary" />
                <span className="text-secondary font-medium">1st: ₹{event.prizeFirst}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-4 border-t border-white/5">
          <Button 
            className={`w-full ${isRegistered 
              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/50" 
              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_10px_-2px_var(--primary)]"}`}
            disabled={isRegistered || isRegistering}
            onClick={() => onRegister(event.id)}
            variant={isRegistered ? "outline" : "default"}
          >
            {isRegistered ? "Registered" : isRegistering ? "Registering..." : "Register Now"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
