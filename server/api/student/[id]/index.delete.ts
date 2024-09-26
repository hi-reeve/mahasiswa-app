import { z } from "zod";
import { deleteStudentById } from "~/server/db/models/student";

export default defineProtectedEventHandler(async event => {
	const { id } = await getValidatedRouterParams(
		event,
		z.object({ id: z.string() }).parse
	);

	await deleteStudentById(id);

	setResponseStatus(event, 200);

	return true;
});
