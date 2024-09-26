export default defineNuxtRouteMiddleware(async () => {
	const { loggedIn, fetch, user } = useUserSession();
	await fetch();

	if (!loggedIn.value) return navigateTo({ name: "login" });
});
