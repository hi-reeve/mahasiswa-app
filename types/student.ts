import type { students } from "~/server/db/schema/student";
import type { PaginationParams } from "./request";
import type { z } from "zod";
import type { studentUpdateSchema } from "~/validation/student";

export type CreateStudentDto = typeof students.$inferInsert;

export type Student = typeof students.$inferSelect;

export type UpdateStudentDto = z.infer<typeof studentUpdateSchema>;

export type GetStudentParams = PaginationParams<
	{
		search?: string;
		dob?: [number, number];
	},
	Student
>;
