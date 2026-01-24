import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type Registration } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { mockEvents } from "@/lib/mock-events";

// === GET ALL EVENTS ===
export function useEvents() {
  return useQuery({
    queryKey: [api.events.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.events.list.path);
        if (!res.ok) throw new Error("Failed to fetch events");
        return api.events.list.responses[200].parse(await res.json());
      } catch (error) {
        // Fallback to mock data if API is unavailable (e.g., static deployment)
        console.warn("API unavailable, using mock events data");
        return mockEvents;
      }
    },
  });
}

// === GET SINGLE EVENT ===
export function useEvent(id: number) {
  return useQuery({
    queryKey: [api.events.get.path, id],
    queryFn: async () => {
      const url = api.events.get.path.replace(":id", String(id));
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch event");
      return api.events.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// === GET MY REGISTRATIONS (TICKETS) ===
export function useMyRegistrations() {
  return useQuery({
    queryKey: [api.registrations.listMy.path],
    queryFn: async () => {
      const res = await fetch(api.registrations.listMy.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch registrations");
      return api.registrations.listMy.responses[200].parse(await res.json());
    },
  });
}

// === REGISTER FOR EVENT ===
export function useRegisterEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { eventId: number; userId: number }) => {
      const res = await fetch(api.registrations.create.path, {
        method: api.registrations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Registration failed");
        }
        if (res.status === 401) throw new Error("Please login to register");
        throw new Error("Failed to register");
      }
      return api.registrations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.registrations.listMy.path] });
      toast({
        title: "Registration successful!",
        description: "Your ticket has been generated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
