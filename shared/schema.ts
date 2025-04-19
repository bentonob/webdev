import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Keep the users table for authentication if needed later
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Define apocalypse schema
export const apocalypseScenarios = z.object({
  type: z.string(),
  emoji: z.string(),
  description: z.string()
});

export type ApocalypseScenario = z.infer<typeof apocalypseScenarios>;

// Define effects schema
export const effectsSchema = z.object({
  health: z.number(),
  morale: z.number(),
  supplies: z.number(),
  stealth: z.number()
});

export type Effects = z.infer<typeof effectsSchema>;

// Define choice schema
export const choiceSchema = z.object({
  text: z.string(),
  effects: effectsSchema
});

export type Choice = z.infer<typeof choiceSchema>;

// Define question schema
export const questionSchema = z.object({
  text: z.string(),
  choices: z.array(choiceSchema)
});

export type Question = z.infer<typeof questionSchema>;

// Define game state schema
export const gameStateSchema = z.object({
  stats: effectsSchema,
  apocalypseType: apocalypseScenarios,
  questions: z.array(questionSchema),
  currentQuestion: z.number(),
  survivalTime: z.string().optional(),
  deathDescription: z.string().optional()
});

export type GameState = z.infer<typeof gameStateSchema>;
