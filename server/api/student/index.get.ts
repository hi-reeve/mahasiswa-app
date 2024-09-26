import { getStudents } from "~/server/db/models/student";

import { GetStudentParams } from "~/types/student";

export default defineProtectedEventHandler(async event => {
	const query = await getQuery<GetStudentParams>(event);

	const students = await getStudents(query);

	return students;
});
