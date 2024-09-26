import {
	CreateStudentDto,
	GetStudentParams,
	UpdateStudentDto,
} from "~/types/student";
import { db } from "..";
import { students } from "../schema/student";
import { and, asc, count, desc, eq, ilike, or, SQL } from "drizzle-orm";
import { paginationOrder } from "~/types/request";

export const createStudent = async (student: CreateStudentDto) => {
	return db.insert(students).values(student).returning();
};

export const getStudents = async (filter: GetStudentParams) => {
	const queryFilters: Array<SQL | undefined> = [];
	const query = db.select().from(students);
	const perPage = filter.perPage ? Number(filter.perPage) : 10;
	const page = filter.page ? Number(filter.page) : 1;

	if (filter.search)
		queryFilters.push(
			or(
				ilike(students.name, `%${filter.search}%`),
				ilike(students.nrp, `%${filter.search}%`)
			)
		);
	const sortOrder = filter.sortOrder ?? paginationOrder.ASC;
	const orderBy = filter.sortBy ? students[filter.sortBy] : students.name;

	const offset = (page - 1) * perPage;
	const results = await query
		.where(and(...queryFilters))
		.limit(perPage)
		.offset(offset)
		.orderBy(
			sortOrder === paginationOrder.ASC ? asc(orderBy) : desc(orderBy)
		);

	const countResult = await db
		.select({ count: count() })
		.from(students)
		.where(and(...queryFilters));

	const elements = countResult[0]?.count;

	const totalPages = Math.ceil(elements / perPage);

	return {
		results,
		pages: totalPages,
		elements,
	};
};

export const getStudentById = async (id: string) => {
	return db.select().from(students).where(eq(students.id, id));
};

export const updateStudentById = async (
	id: string,
	student: UpdateStudentDto
) => {
	return db
		.update(students)
		.set(student)
		.where(eq(students.id, id))
		.returning();
};

export const deleteStudentById = async (id: string) => {
	return db.delete(students).where(eq(students.id, id));
};
