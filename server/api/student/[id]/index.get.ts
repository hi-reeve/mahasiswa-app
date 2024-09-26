import { z } from "zod";
import { getStudentById } from "~/server/db/models/student";

export default defineEventHandler(async event => {
	const { id } = await getValidatedRouterParams(
		event,
		z.object({ id: z.string() }).parse
	);
	const student = await getStudentById(id);

	return student[0];
});
