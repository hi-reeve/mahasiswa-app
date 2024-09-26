import type { EventHandler, EventHandlerRequest } from "h3";

export const defineProtectedEventHandler = <T extends EventHandlerRequest, D>(
	handler: EventHandler<T, D>
): EventHandler<T, D> =>
	defineEventHandler<T>(async event => {
		try {
			await requireUserSession(event);

			const response = await handler(event);
			return response;
		} catch (err) {
			return err;
		}
	});
