import { type Registration, type Event, type User } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TicketCardProps {
  registration: Registration & { event: Event };
  user: User;
}

export function TicketCard({ registration, user }: TicketCardProps) {
  // Combine data for QR Code
  const qrData = JSON.stringify({
    ticket: registration.ticketCode,
    event: registration.event.name,
    user: user.prn,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="relative overflow-hidden bg-black border border-white/20 shadow-2xl max-w-sm mx-auto group">
        {/* Ticket Perforation Effect */}
        <div className="absolute left-0 top-1/2 -translate-x-1/2 w-8 h-8 bg-background rounded-full" />
        <div className="absolute right-0 top-1/2 translate-x-1/2 w-8 h-8 bg-background rounded-full" />
        <div className="absolute top-1/2 left-4 right-4 border-t-2 border-dashed border-white/10" />

        {/* Top Section: Event Details */}
        <div className="p-6 bg-gradient-to-br from-primary/20 to-secondary/10 pb-10">
          <div className="text-center mb-4">
            <h4 className="text-xs tracking-[0.2em] text-muted-foreground uppercase font-mono">Official Entry Pass</h4>
            <h2 className="text-2xl font-bold font-display mt-2 text-white text-shadow-neon">{registration.event.name}</h2>
            <p className="text-secondary font-medium mt-1">{registration.event.date}</p>
          </div>
          
          <div className="space-y-2 mt-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Venue</span>
              <span className="font-mono">{registration.event.venue || "TBA"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Time</span>
              <span className="font-mono">10:00 AM</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: User Details & QR */}
        <div className="p-6 bg-card pt-10">
          <div className="flex justify-between items-end mb-6">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase">Attendee</p>
              <p className="font-bold text-lg">{user.prn}</p>
              <p className="text-xs text-muted-foreground font-mono">{user.college}</p>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <QRCodeSVG value={qrData} size={80} level="M" />
            </div>
          </div>
          
          <div className="text-center pt-4 border-t border-white/10">
             <p className="text-[10px] text-muted-foreground font-mono mb-3">TICKET ID: {registration.ticketCode}</p>
             <Button variant="ghost" className="w-full text-xs hover:bg-primary/10 hover:text-primary">
               <Download className="w-3 h-3 mr-2" /> Download Ticket
             </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
