import { defineConfig } from "drizzle-kit";
import "dotenv/config";
const PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
export default defineConfig({
	schema: "./server/db/schema/*",
	dbCredentials: {
		host: process.env.DB_HOST ?? "",
		port: PORT,
		ssl: process.env.DB_SSL === "true" ? true : false,
		user: process.env.DB_USER,
		password:
			process.env.DB_PASSWORD === ""
				? undefined
				: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE ?? "",
	},
	verbose: true,
	out: "./server/db/migrations",
	dialect: "postgresql",
});
