import { z } from "zod";

export const studentCreateSchema = z.object({
	nrp: z
		.string()
		.regex(/^[0-9]+$/)
		.length(12),
	name: z.string(),
	email: z.string().email(),
	address: z.string(),
	dob: z.number(),
});

export const studentUpdateSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	address: z.string(),
	dob: z.number(),
});
