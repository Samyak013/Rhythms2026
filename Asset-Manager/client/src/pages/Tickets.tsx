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
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">My <span className="text-primary">Passes</span></h1>
        <p className="text-muted-foreground">Digital entry tickets for your registered events.</p>
      </div>

      {registrations && registrations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {registrations.map((reg) => (
            <TicketCard key={reg.id} registration={reg} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card/30 rounded-2xl border border-white/5">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <TicketIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No tickets yet</h3>
          <p className="text-muted-foreground mb-6">You haven't registered for any events.</p>
          <Link href="/events">
            <Button size="lg" className="bg-primary hover:bg-primary/90">Browse Events</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
