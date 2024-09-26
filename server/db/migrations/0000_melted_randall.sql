CREATE TABLE IF NOT EXISTS "students" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"nrp" varchar(12) NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"dob" integer NOT NULL,
	CONSTRAINT "students_nrp_unique" UNIQUE("nrp")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
