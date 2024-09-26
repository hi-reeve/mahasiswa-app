import { z } from "zod";
import { updateStudentById } from "~/server/db/models/student";
import { studentUpdateSchema } from "~/validation/student";

export default defineProtectedEventHandler(async event => {
	const { id } = await getValidatedRouterParams(
		event,
		z.object({ id: z.string() }).parse
	);
	const validation = await readValidatedBody(
		event,
		studentUpdateSchema.safeParse
	);

	if (!validation.success) throw validation.error.issues;

	const student = await updateStudentById(id, validation.data);

	setResponseStatus(event, 200);
	return student;
});
