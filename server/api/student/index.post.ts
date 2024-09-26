import { createStudent } from "~/server/db/models/student";

import { studentCreateSchema } from "~/validation/student";

export default defineProtectedEventHandler(async event => {
	const validation = await readValidatedBody(
		event,
		studentCreateSchema.safeParse
	);

	if (!validation.success) throw validation.error.issues;

	const student = await createStudent(validation.data);

	setResponseStatus(event, 201);
	return student;
});
