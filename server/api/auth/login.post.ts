import { UserLogin } from "~/types/user";
import { compare } from "bcrypt";
import { getUserByEmailPassword } from "~/server/db/models/user";
export default defineEventHandler(async event => {
	try {
		const { email, password } = await readBody<UserLogin>(event);

		const user = await getUserByEmailPassword({
			email,
		});

		const isValid = await compare(password, user.password);

		if (!user || !isValid)
			throw createError({
				statusCode: 401,
				statusMessage: "Invalid email or password",
			});

		await setUserSession(event, {
			user: {
				id: user.id,
				email: user.email,
			},
		});

		setResponseStatus(event, 200);
		return true;
	} catch (error) {
		throw createError({
			statusCode: 401,
			statusMessage: "Invalid email or password",
		});
	}
});
