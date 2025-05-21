import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema definition
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  full_name: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  organization: text("organization"),
  designation: text("designation"),
  phone: text("phone"),
  is_active: boolean("is_active").default(true),
  is_superadmin: boolean("is_superadmin").default(false),
  last_login: timestamp("last_login"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Schema for user insertion
export const insertUserSchema = createInsertSchema(users).pick({
  full_name: true,
  email: true,
  username: true,
  password: true,
  organization: true,
  designation: true,
  phone: true,
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// These would be types in TypeScript, but in JavaScript we'll just document them with comments
// InsertUser - Object matching the insertUserSchema
// User - Object matching the users table structure
// LoginCredentials - Object with email and password fields