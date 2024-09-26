import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import "dotenv/config";
const { Client } = pg;
const PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
const client = new Client({
	host: process.env.DB_HOST,
	port: PORT,
	user: process.env.DB_USER,
	ssl: process.env.DB_SSL === "true" ? true : false,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

client.connect();
export const db = drizzle(client);
