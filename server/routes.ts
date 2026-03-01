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
  
  // Only seed if we don't have all 21 events yet
  if (existing.length >= 21) {
    return;
  }
  
  // Seed all events
  const events = [
    // 4th March 2026
    { name: "Story Telling", category: "On-Ground", description: "Spin a yarn", entryFee: 0, prizeFirst: 500, prizeSecond: null, teamSize: "1-2", venue: "TBA", date: "4th March 2026", time: "10:00 am – 11:00 am" },
    { name: "Poem Recitation", category: "On-Ground", description: "Express with words", entryFee: 0, prizeFirst: 500, prizeSecond: null, teamSize: "1", venue: "TBA", date: "4th March 2026", time: "11:00 am – 12:00 pm" },
    { name: "Sketching", category: "Fine Arts", description: "Pencil magic", entryFee: 0, prizeFirst: 500, prizeSecond: null, teamSize: "1", venue: "TBA", date: "4th March 2026", time: "11:30 am – 01:00 pm" },
    { name: "Treasure Hunt", category: "On-Ground", description: "Find the clues", entryFee: 0, prizeFirst: 1000, prizeSecond: null, teamSize: "4-6", venue: "Activity Area", date: "4th March 2026", time: "12:00 pm – 01:30 pm" },
    { name: "Rangoli", category: "Fine Arts", description: "Colorful designs", entryFee: 0, prizeFirst: 500, prizeSecond: null, teamSize: "1-3", venue: "Activity Area", date: "4th March 2026", time: "12:00 pm – 02:00 pm" },
    { name: "Attire Spectra", category: "On-Ground", description: "Best dressed", entryFee: 0, prizeFirst: 1000, prizeSecond: null, teamSize: "1", venue: "Activity Area", date: "4th March 2026", time: "01:30 pm – 02:30 pm" },
    { name: "Reelography", category: "On-Ground", description: "Reel making contest", entryFee: 0, prizeFirst: 500, prizeSecond: null, teamSize: "2-4", venue: "Activity Area", date: "4th March 2026", time: "01:30 pm – 02:30 pm" },
    { name: "Mandala Art", category: "Fine Arts", description: "Intricate patterns", entryFee: 0, prizeFirst: 500, prizeSecond: null, teamSize: "1", venue: "TBA", date: "4th March 2026", time: "02:00 pm – 03:00 pm" },
    { name: "Short Film Competition", category: "On-Ground", description: "Short film screening", entryFee: 0, prizeFirst: 0, prizeSecond: null, teamSize: "3-5", venue: "Seminar Hall (Room No-125)", date: "4th March 2026", time: "02:00 pm onwards" },

    // 5th March 2026
    { name: "Rose Day", category: "On-Ground", description: "Spread love", entryFee: 0, prizeFirst: 0, prizeSecond: null, teamSize: "1", venue: "On Stage", date: "5th March 2026", time: "02:00 pm – 02:30 pm" },
    { name: "Flashmob", category: "On-Ground", description: "Surprise the crowd", entryFee: 0, prizeFirst: 0, prizeSecond: null, teamSize: "6-12", venue: "On Ground", date: "5th March 2026", time: "02:30 pm – 03:00 pm" },
    { name: "Antakshari", category: "On-Ground", description: "Musical battle", entryFee: 0, prizeFirst: 1500, prizeSecond: null, teamSize: "6-10", venue: "On Ground", date: "5th March 2026", time: "03:00 pm – 04:00 pm" },
    { name: "Solo Singing", category: "On-Stage", description: "Melodious voices", entryFee: 0, prizeFirst: 1000, prizeSecond: null, teamSize: "1", venue: "On Stage", date: "5th March 2026", time: "04:00 pm – 05:30 pm" },
    { name: "Duet Singing", category: "On-Stage", description: "Harmonize together", entryFee: 0, prizeFirst: 1000, prizeSecond: null, teamSize: "2", venue: "On Stage", date: "5th March 2026", time: "04:00 pm – 05:30 pm" },
    { name: "Solo Dance", category: "On-Stage", description: "Showcase your solo moves", entryFee: 0, prizeFirst: 1000, prizeSecond: null, teamSize: "1", venue: "On Stage", date: "5th March 2026", time: "05:30 pm – 06:30 pm" },
    { name: "Duet Dance", category: "On-Stage", description: "Sync with your partner", entryFee: 0, prizeFirst: 1000, prizeSecond: null, teamSize: "2", venue: "On Stage", date: "5th March 2026", time: "05:30 pm – 06:30 pm" },

    // 6th March 2026
    { name: "Swarsandhya", category: "On-Stage", description: "Classical / semi-classical singing", entryFee: 0, prizeFirst: 0, prizeSecond: null, teamSize: "1", venue: "Seminar Hall (Room No-125)", date: "6th March 2026", time: "11:00 am – 12:30 pm" },
    { name: "Dramatics / Skit", category: "On-Stage", description: "Short play", entryFee: 0, prizeFirst: 1000, prizeSecond: null, teamSize: "3-8", venue: "Seminar Hall (Room No-125)", date: "6th March 2026", time: "02:00 pm – 02:30 pm" },
    { name: "Mono Act", category: "On-Stage", description: "One person act", entryFee: 0, prizeFirst: 500, prizeSecond: null, teamSize: "1", venue: "Seminar Hall (Room No-125)", date: "6th March 2026", time: "02:00 pm – 02:30 pm" },
    { name: "Group Dance", category: "On-Stage", description: "Ideally 6–12 members", entryFee: 0, prizeFirst: 3000, prizeSecond: null, teamSize: "6-12", venue: "On Stage", date: "6th March 2026", time: "04:30 pm – 06:00 pm" },
    { name: "Fashion Show", category: "On-Stage", description: "Walk the ramp", entryFee: 0, prizeFirst: 7000, prizeSecond: null, teamSize: "8-12", venue: "On Stage", date: "6th March 2026", time: "06:00 pm – 07:30 pm" },
  ];

  for (const event of events) {
    await storage.createEvent(event);
  }
  console.log(`Seeded ${events.length} events`);
}
