import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  prn: text("prn").notNull().unique(),
  dob: text("dob").notNull(), // DDMMYYYY format as requested
  college: text("college").notNull(),
  branch: text("branch").notNull(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // On-Stage, On-Ground, etc.
  description: text("description").notNull(),
  entryFee: integer("entry_fee").notNull(),
  prizeFirst: integer("prize_first"),
  prizeSecond: integer("prize_second"),
  teamSize: text("team_size").notNull(), // Solo, Duet, Group
  venue: text("venue"),
  date: text("date"), // 5th or 6th March
});

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  eventId: integer("event_id").notNull(),
  ticketCode: text("ticket_code").notNull().unique(), // For QR/Unique ID
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
