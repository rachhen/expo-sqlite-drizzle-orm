import { sqliteTable } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", (t) => ({
  id: t.integer().primaryKey({ autoIncrement: true }),
  text: t.text().notNull(),
  done: t.integer({ mode: "boolean" }).default(false),
}));

export type Todo = typeof todos.$inferSelect;
