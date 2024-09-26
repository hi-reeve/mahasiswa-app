import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
export const user = pgTable("users", {
	id: varchar("id", { length: 255 })
		.$default(() => createId())
		.notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
});
