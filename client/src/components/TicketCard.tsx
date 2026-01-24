import { type Registration, type Event, type User } from "@shared/schema";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Download, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      <Card className="bg-[#0e0c0a]/60 backdrop-blur-xl border-primary/10 rounded-none overflow-hidden relative group max-w-sm mx-auto shadow-2xl">
        <div className="absolute top-0 right-0 w-12 h-12 border-r border-t border-primary/20" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l border-b border-primary/20" />
        
        {/* Ticket Perforation Effect */}
        <div className="absolute left-0 top-1/2 -translate-x-1/2 w-6 h-6 bg-[#050505] rounded-full border border-primary/10 z-10" />
        <div className="absolute right-0 top-1/2 translate-x-1/2 w-6 h-6 bg-[#050505] rounded-full border border-primary/10 z-10" />
        <div className="absolute top-1/2 left-4 right-4 border-t border-dashed border-primary/10" />

        <CardHeader className="text-center pb-4 pt-10">
          <Badge variant="outline" className="mb-4 mx-auto text-[10px] tracking-widest border-primary/30 text-primary bg-primary/5 rounded-none uppercase">
            {registration.event.category}
          </Badge>
          <h3 className="text-2xl font-bold font-display text-[#d4c5a9] tracking-wider uppercase">
            {registration.event.name}
          </h3>
          <p className="text-[10px] text-primary font-mono mt-2 tracking-[0.4em] uppercase opacity-60">Official Credentials</p>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-8 py-10">
          <div className="p-4 bg-white/5 border border-primary/10 relative group-hover:border-primary/40 transition-colors duration-700">
            <QRCodeSVG 
              value={qrData} 
              size={180}
              bgColor="transparent"
              fgColor="hsl(45, 50%, 45%)"
              level="H"
            />
          </div>
          
          <div className="text-center space-y-4 w-full px-6">
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#a89984] uppercase border-b border-primary/5 pb-2">
              <span className="opacity-40">Agent</span>
              <span className="text-[#d4c5a9]">{user.name}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#a89984] uppercase border-b border-primary/5 pb-2">
              <span className="opacity-40">Identity (PRN)</span>
              <span className="text-[#d4c5a9]">{user.prn}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#a89984] uppercase border-b border-primary/5 pb-2">
              <span className="opacity-40">Case Code</span>
              <span className="text-primary font-bold">{registration.ticketCode}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-primary/5 border-t border-primary/10 py-6 text-center flex flex-col gap-2">
           <div className="flex items-center justify-center gap-2 text-[10px] text-primary font-mono tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>{registration.event.date}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-[10px] text-[#a89984] font-mono tracking-widest uppercase opacity-40">
              <MapPin className="w-3.5 h-3.5" />
              <span>{registration.event.venue || "TBA"}</span>
            </div>
            <Button variant="ghost" className="w-full text-[10px] tracking-widest uppercase text-primary/60 hover:text-primary mt-4">
              <Download className="w-3 h-3 mr-2" /> Download File
            </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
