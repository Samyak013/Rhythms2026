import { mysqlTable, text, serial, int, timestamp, varchar } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS (MySQL) ===

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  prn: varchar("prn", { length: 100 }).notNull().unique(),
  dob: varchar("dob", { length: 8 }).notNull(), // DDMMYYYY format as requested
  college: varchar("college", { length: 255 }).notNull(),
  branch: varchar("branch", { length: 255 }).notNull(),
});

export const events = mysqlTable("events", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // On-Stage, On-Ground, etc.
  description: text("description").notNull(),
  entryFee: int("entry_fee").notNull(),
  prizeFirst: int("prize_first"),
  prizeSecond: int("prize_second"),
  teamSize: varchar("team_size", { length: 50 }).notNull(), // Solo, Duet, Group
  venue: varchar("venue", { length: 255 }),
  date: varchar("date", { length: 50 }), // 5th or 6th March
});

export const registrations = mysqlTable("registrations", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  eventId: int("event_id").notNull(),
  ticketCode: varchar("ticket_code", { length: 100 }).notNull().unique(), // For QR/Unique ID
  registeredAt: timestamp("registered_at").defaultNow(),
});

// === RELATIONS ===

export const usersRelations = relations(users, ({ many }) => ({
  registrations: many(registrations),
}));

export const eventsRelations = relations(events, ({ many }) => ({
  registrations: many(registrations),
}));

export const registrationsRelations = relations(registrations, ({ one }) => ({
  user: one(users, {
    fields: [registrations.userId],
    references: [users.id],
  }),
  event: one(events, {
    fields: [registrations.eventId],
    references: [events.id],
  }),
}));

// === BASE SCHEMAS ===

export const insertUserSchema = createInsertSchema(users).omit({ id: true }).extend({
  name: z.string().min(2, "Name is required"),
  dob: z.string().length(8, "DOB must be in DDMMYYYY format"),
  prn: z.string().min(5, "PRN is required"),
});

export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertRegistrationSchema = createInsertSchema(registrations).omit({ id: true, ticketCode: true, registeredAt: true });

// === EXPLICIT API CONTRACT TYPES ===

export type User = typeof users.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Registration = typeof registrations.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = Pick<InsertUser, "prn" | "dob">;

// Combined type for tickets (Registration + Event details)
export type TicketDetail = Registration & {
  event: Event;
  user: User;
};
