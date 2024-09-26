import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
export const students = pgTable("students", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.$default(() => createId()),
	nrp: varchar("nrp", { length: 12 }).notNull().unique(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	address: text("address").notNull(),
	dob: integer("dob").notNull(),
});
