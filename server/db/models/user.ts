import { UserLogin } from "../../../types/user";
import { db } from "../";
import { user } from "../schema/user";
import { and, eq } from "drizzle-orm";
export const getUserByEmailPassword = async ({
	email,
}: Pick<UserLogin, "email">) => {
	const users = await db
		.select()
		.from(user)
		.where(and(eq(user.email, email)));

	return users[0];
};
