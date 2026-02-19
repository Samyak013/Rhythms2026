import { useState } from "react";
import { useEvents } from "@/hooks/use-events";
import { EventCard } from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Events() {
  const { data: events, isLoading: eventsLoading } = useEvents();
  
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "On-Stage", "On-Ground", "Fine Arts"];

  const filteredEvents = events?.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase()) || 
                         event.description.toLowerCase().includes(search.toLowerCase());
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

  const handleRegister = () => {
    // Registration handled by Google Form
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden pb-12">
      <div className="w-full pt-24 px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#d4c5a9]">
            The <span className="text-primary">Evidence</span>
          </h1>
          <p className="text-[#a89984] text-sm sm:text-base max-w-2xl mx-auto italic px-2">
            "The world is full of obvious things which nobody by any chance ever observes." - Choose your lead.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8 sticky top-20 z-30 bg-[#0e0c0a]/95 backdrop-blur-xl p-3 sm:p-4 md:p-6 border border-primary/10 rounded-none w-full mx-0">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
          <Input 
            placeholder="Search leads..." 
            className="w-full pl-10 bg-[#0a0806] border-primary/20 focus:border-primary text-[#d4c5a9] rounded-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar" style={{ scrollBehavior: 'smooth' }}>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              size="sm"
              className={`rounded-none tracking-widest uppercase text-[10px] sm:text-xs whitespace-nowrap flex-shrink-0 ${
                selectedCategory === cat 
                ? "bg-primary text-primary-foreground" 
                : "border-primary/20 text-[#a89984] hover:border-primary/40 hover:bg-primary/5"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
        </div>

        {filteredEvents && filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto px-0">
            {filteredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                isRegistered={false}
                onRegister={handleRegister}
                isRegistering={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <p className="text-[#a89984] text-base sm:text-lg">No evidence found for your search...</p>
          </div>
        )}
      </div>
    </div>
  );
}
