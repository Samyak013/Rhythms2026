import { useState } from "react";
import { useEvents, useRegisterEvent, useMyRegistrations } from "@/hooks/use-events";
import { useAuth } from "@/hooks/use-auth";
import { EventCard } from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function Events() {
  const { data: events, isLoading: eventsLoading } = useEvents();
  const { data: myRegistrations } = useMyRegistrations();
  const { user } = useAuth();
  const { mutate: register, isPending: isRegistering } = useRegisterEvent();
  
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "On-Stage", "On-Ground", "Fine Arts", "Literary", "Gaming"];

  const registeredEventIds = new Set(myRegistrations?.map(r => r.eventId));

  const filteredEvents = events?.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (eventsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const handleRegister = (eventId: number) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    register({ eventId, userId: user.id });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
          Event <span className="text-primary">Lineup</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          From the spotlight of the stage to the strokes of a brush. Choose your arena.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 sticky top-24 z-30 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-white/5">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search events..." 
            className="pl-10 bg-card border-white/10 focus:border-primary/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              size="sm"
              className={selectedCategory === cat ? "bg-primary text-primary-foreground" : "border-white/10 text-muted-foreground hover:text-white"}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

          {filteredEvents && filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  isRegistered={registeredEventIds.has(event.id)}
                  onRegister={handleRegister}
                  isRegistering={isRegistering}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-white/10 rounded-xl">
              <p className="text-muted-foreground text-lg">No events found matching your search.</p>
              <Button variant="ghost" className="mt-4 text-primary hover:bg-primary/10" onClick={() => {setSearch(""); setSelectedCategory("All");}}>Clear filters</Button>
            </div>
          )}
    </div>
  );
}
