import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";
import session from "express-session";
import { randomBytes } from "crypto";
import MemoryStore from "memorystore";

const SessionStore = MemoryStore(session);

// Extend session interface
declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Session setup
  app.use(
    session({
      store: new SessionStore({ checkPeriod: 86400000 }),
      secret: process.env.SESSION_SECRET || "rhythms2026_secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: app.get("env") === "production" },
    })
  );

  // === AUTHENTICATION ===

  app.post(api.auth.register.path, async (req, res) => {
    try {
      const input = api.auth.register.input.parse(req.body);
      const existing = await storage.getUserByPrn(input.prn);
      if (existing) {
        return res.status(400).json({ message: "PRN already registered" });
      }
      const user = await storage.createUser(input);
      req.session.userId = user.id;
      res.status(201).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.post(api.auth.login.path, async (req, res) => {
    try {
      const input = api.auth.login.input.parse(req.body);
      const user = await storage.getUserByPrn(input.prn);
      
      // Simple password check as requested (Password = DOB)
      if (!user || user.dob !== input.dob) {
        return res.status(401).json({ message: "Invalid PRN or Date of Birth" });
      }

      req.session.userId = user.id;
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  });

  app.get(api.auth.me.path, async (req, res) => {
    if (!req.session.userId) {
      return res.json(null);
    }
    const user = await storage.getUser(req.session.userId);
    res.json(user || null);
  });

  // === EVENTS ===

  app.get(api.events.list.path, async (req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get(api.events.get.path, async (req, res) => {
    const event = await storage.getEvent(Number(req.params.id));
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  });

  // === REGISTRATIONS ===

  app.post(api.registrations.create.path, async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Please login to register" });
    }

    try {
      const input = api.registrations.create.input.parse(req.body);
      
      const existing = await storage.getRegistration(req.session.userId, input.eventId);
      if (existing) {
        return res.status(400).json({ message: "Already registered for this event" });
      }

      const ticketCode = `RHY-${randomBytes(4).toString("hex").toUpperCase()}`;
      const registration = await storage.createRegistration({
        ...input,
        userId: req.session.userId, // Force userId from session
        ticketCode,
      });

      res.status(201).json(registration);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.get(api.registrations.listMy.path, async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const regs = await storage.getRegistrationsByUser(req.session.userId);
    res.json(regs);
  });

  // === SEED DATA ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getEvents();
  if (existing.length > 0) return;

  const events = [
    // Dance
    { name: "Solo Dance", category: "On-Stage", description: "Showcase your solo moves.", entryFee: 100, prizeFirst: 1000, prizeSecond: 800, teamSize: "Solo", date: "5th March" },
    { name: "Duet Dance", category: "On-Stage", description: "Sync with your partner.", entryFee: 150, prizeFirst: 1000, prizeSecond: 800, teamSize: "Duet", date: "5th March" },
    { name: "Group Dance", category: "On-Stage", description: "Ideally 6-12 members.", entryFee: 500, prizeFirst: 3000, prizeSecond: 2000, teamSize: "Group", date: "6th March" },
    
    // Singing
    { name: "Solo Singing", category: "On-Stage", description: "Melodious voices.", entryFee: 100, prizeFirst: 1000, prizeSecond: 800, teamSize: "Solo", date: "5th March" },
    { name: "Duet Singing", category: "On-Stage", description: "Harmonize together.", entryFee: 150, prizeFirst: 1000, prizeSecond: 800, teamSize: "Duet", date: "5th March" },
    
    // Fashion
    { name: "Fashion Show", category: "On-Stage", description: "Walk the ramp.", entryFee: 1500, prizeFirst: 7000, prizeSecond: 4000, teamSize: "Group", date: "6th March" },
    
    // On-Ground
    { name: "Antakshari", category: "On-Ground", description: "Musical battle.", entryFee: 250, prizeFirst: 1500, prizeSecond: 1000, teamSize: "Group", date: "5th March" },
    { name: "Flashmob", category: "On-Ground", description: "Surprise the crowd.", entryFee: 0, prizeFirst: 0, prizeSecond: 0, teamSize: "Group", date: "5th March" },
    
    // Dramatics
    { name: "Skit", category: "Seminar Hall", description: "Short play.", entryFee: 500, prizeFirst: 1000, prizeSecond: 800, teamSize: "Group", date: "6th March" },
    { name: "Mono Act", category: "Seminar Hall", description: "One person act.", entryFee: 50, prizeFirst: 500, prizeSecond: 250, teamSize: "Solo", date: "6th March" },
    
    // Literary
    { name: "Story Telling", category: "Literary Arts", description: "Spin a yarn.", entryFee: 50, prizeFirst: 500, prizeSecond: 250, teamSize: "Solo", date: "5th March" },
    { name: "Poem Recitation", category: "Literary Arts", description: "Express with words.", entryFee: 50, prizeFirst: 500, prizeSecond: 250, teamSize: "Solo", date: "5th March" },
    { name: "Stand-Up Comedy", category: "Literary Arts", description: "Make us laugh.", entryFee: 100, prizeFirst: 1000, prizeSecond: 500, teamSize: "Solo", date: "6th March" },
    
    // Fine Arts
    { name: "Sketching", category: "Fine Arts", description: "Pencil magic.", entryFee: 50, prizeFirst: 500, prizeSecond: 250, teamSize: "Solo", date: "5th March" },
    { name: "Mandala Art", category: "Fine Arts", description: "Intricate patterns.", entryFee: 50, prizeFirst: 500, prizeSecond: 250, teamSize: "Solo", date: "5th March" },
    { name: "Rangoli", category: "Fine Arts", description: "Colorful designs.", entryFee: 50, prizeFirst: 500, prizeSecond: 250, teamSize: "Group", date: "5th March" },
    
    // Misc
    { name: "Treasure Hunt", category: "Miscellaneous", description: "Find the clues.", entryFee: 150, prizeFirst: 1000, prizeSecond: 800, teamSize: "Group", date: "6th March" },
    { name: "Rose Day", category: "Miscellaneous", description: "Spread love.", entryFee: 50, prizeFirst: 0, prizeSecond: 0, teamSize: "Solo", date: "5th March" },
    { name: "Rellography", category: "Miscellaneous", description: "Reel making contest.", entryFee: 50, prizeFirst: 500, prizeSecond: 250, teamSize: "Solo", date: "5th March" },
    { name: "Attire Spectra", category: "Miscellaneous", description: "Best dressed.", entryFee: 200, prizeFirst: 1000, prizeSecond: 800, teamSize: "Solo", date: "6th March" },
  ];

  for (const event of events) {
    await storage.createEvent(event);
  }
}
