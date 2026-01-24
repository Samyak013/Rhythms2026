import { useMyRegistrations } from "@/hooks/use-events";
import { useAuth } from "@/hooks/use-auth";
import { TicketCard } from "@/components/TicketCard";
import { Loader2, Ticket as TicketIcon } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Tickets() {
  const { data: registrations, isLoading } = useMyRegistrations();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl">Please login to view your tickets.</p>
        <Link href="/login"><Button>Login</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
         <span className="text-[10px] tracking-[1em] text-primary font-mono uppercase mb-4 block opacity-60">
            The Evidence
          </span>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-[#d4c5a9] tracking-[0.2em] uppercase">My <span className="text-primary">Passes</span></h1>
        <p className="text-[#a89984] text-sm italic opacity-60">Your credentials for the grand investigation.</p>
      </div>

      {registrations && registrations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {registrations.map((reg) => (
            <TicketCard key={reg.id} registration={reg} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-[#0e0c0a]/60 backdrop-blur-3xl border border-primary/10 rounded-none max-w-2xl mx-auto">
          <div className="w-20 h-20 border border-primary/20 flex items-center justify-center mx-auto mb-8">
            <TicketIcon className="w-8 h-8 text-primary opacity-40" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-[#d4c5a9] tracking-widest uppercase">No Solved Cases</h3>
          <p className="text-[#a89984] text-xs tracking-widest uppercase mb-10 opacity-60">You haven't registered for any clues yet.</p>
          <Link href="/events">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-none h-14 px-12 uppercase tracking-[0.4em] text-xs shadow-xl transition-all duration-500">
              Browse Leads
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
