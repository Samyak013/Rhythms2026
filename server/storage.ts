import { users, events, registrations, type User, type InsertUser, type Event, type Registration } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByPrn(prn: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: typeof events.$inferInsert): Promise<Event>; // For seeding

  createRegistration(registration: typeof registrations.$inferInsert): Promise<Registration>;
  getRegistrationsByUser(userId: number): Promise<(Registration & { event: Event })[]>;
  getRegistration(userId: number, eventId: number): Promise<Registration | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByPrn(prn: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.prn, prn));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // MySQL doesn't support .returning() — insert then fetch by insertId
    const result = await db.insert(users).values(insertUser);
    const insertId = (result as any)[0].insertId;
    const [user] = await db.select().from(users).where(eq(users.id, insertId));
    return user;
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(event: typeof events.$inferInsert): Promise<Event> {
    const result = await db.insert(events).values(event);
    const insertId = (result as any)[0].insertId;
    const [newEvent] = await db.select().from(events).where(eq(events.id, insertId));
    return newEvent;
  }

  async createRegistration(registration: typeof registrations.$inferInsert): Promise<Registration> {
    const result = await db.insert(registrations).values(registration);
    const insertId = (result as any)[0].insertId;
    const [reg] = await db.select().from(registrations).where(eq(registrations.id, insertId));
    return reg;
  }

  async getRegistrationsByUser(userId: number): Promise<(Registration & { event: Event })[]> {
    const results = await db
      .select({
        registration: registrations,
        event: events,
      })
      .from(registrations)
      .innerJoin(events, eq(registrations.eventId, events.id))
      .where(eq(registrations.userId, userId));

    return results.map((r) => ({ ...r.registration, event: r.event }));
  }

  async getRegistration(userId: number, eventId: number): Promise<Registration | undefined> {
    const [reg] = await db
      .select()
      .from(registrations)
      .where(and(eq(registrations.userId, userId), eq(registrations.eventId, eventId)));
    return reg;
  }
}

export const storage = new DatabaseStorage();
