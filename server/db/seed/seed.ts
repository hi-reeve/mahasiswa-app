// tsx seed.ts

import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";
import pg from "pg";
import { students } from "../schema/student";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
import { dateToEpochSecond } from "~/utils/date";
type Student = typeof students.$inferInsert;
const { Client } = pg;
const PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
const client = new Client({
	host: process.env.DB_HOST,
	port: PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

client.connect();
const db = drizzle(client);
const generateUserRows = (count: number): Student[] => {
	const rows: Student[] = [];

	for (let i = 0; i < count; i++) {
		rows.push({
			id: createId(),
			address: faker.location.streetAddress(),
			dob: dateToEpochSecond(
				faker.date.between({
					from: new Date(1990, 0, 1),
					to: new Date(2005, 0, 1),
				})
			),
			email: faker.internet.email(),
			name: faker.person.fullName(),
			nrp: faker.string.numeric(12),
		});
	}

	return rows;
};

async function seed() {
	console.log("Seeding...");
	console.time("DB has been seeded!");

	// database teardown
	await db.delete(students);

	// database setup
	const newUserRows = generateUserRows(50);
	await db.insert(students).values(newUserRows).returning();
}

seed()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Seeding done!");
		process.exit(0);
	});
