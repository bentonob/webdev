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

// Define the adventure node choice schema with branching
export const adventureChoiceSchema = z.object({
  text: z.string(),
  effects: effectsSchema,
  nextNodeId: z.string() // ID of the next node this choice leads to
});

export type AdventureChoice = z.infer<typeof adventureChoiceSchema>;

// Define adventure node schema
export const adventureNodeSchema = z.object({
  id: z.string(), // Unique ID for this node
  text: z.string(), // Narrative text for this scene
  imagePrompt: z.string().optional(), // Optional description of scene for AI image generation
  choices: z.array(adventureChoiceSchema),
  isEndNode: z.boolean().default(false) // If true, this is an ending node (no more choices)
});

export type AdventureNode = z.infer<typeof adventureNodeSchema>;

// Define adventure scenario schema 
export const adventureScenarioSchema = z.object({
  apocalypseType: apocalypseScenarios,
  startNodeId: z.string(), // ID of the first node
  nodes: z.record(z.string(), adventureNodeSchema) // Map of node IDs to nodes
});

export type AdventureScenario = z.infer<typeof adventureScenarioSchema>;

// Define game state schema for the adventure format
export const gameStateSchema = z.object({
  stats: effectsSchema,
  apocalypseType: apocalypseScenarios,
  currentNodeId: z.string(),
  visitedNodeIds: z.array(z.string()), // History of visited nodes
  adventureScenario: adventureScenarioSchema,
  survivalTime: z.string().optional(),
  deathDescription: z.string().optional()
});

export type GameState = z.infer<typeof gameStateSchema>;

// Keep the old schema for backward compatibility
export const choiceSchema = z.object({
  text: z.string(),
  effects: effectsSchema
});

export type Choice = z.infer<typeof choiceSchema>;

export const questionSchema = z.object({
  text: z.string(),
  choices: z.array(choiceSchema)
});

export type Question = z.infer<typeof questionSchema>;
