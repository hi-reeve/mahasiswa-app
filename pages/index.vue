<script setup lang="ts">
import { type UserLogin } from "~/types/user";
import { toast } from "vue-sonner";
import { AlertCircle, Loader2 } from "lucide-vue-next";
import { loginSchema } from "~/validation/auth";

definePageMeta({
	name: "login",
	middleware: "guest",
});

useHeadSafe({
	title: "Login",
});

const { ready, fetch } = useUserSession();
const validationSchema = toTypedSchema(loginSchema);
const { handleSubmit, resetForm } = useForm({
	validationSchema,
});
const emailRef = ref<HTMLInputElement>();
const { focused: focusEmail } = useFocus(emailRef, { initialValue: true });
const { mutate, loading, error } = useMutation<UserLogin, boolean>(
	body =>
		$fetch("/api/auth/login", {
			method: "POST",
			body,
			credentials: "include",
		}),
	{
		onSuccess: async data => {
			if (data && ready.value) {
				await fetch();
				toast.success("Login successful");
				await navigateTo({ name: "dashboard" });
			}
		},
		onError: () => {
			resetForm();
			focusEmail.value = true;
		},
	}
);
const onSubmit = handleSubmit(values => {
	mutate(values);
});
</script>

<template>
	<form class="w-full h-screen grid place-content-center" @submit="onSubmit">
		<Card class="max-w-screen-sm min-w-[400px] w-full">
			<CardHeader>
				<CardTitle class="text-2xl"> Login </CardTitle>
				<CardDescription v-if="error">
					<Alert variant="destructive">
						<AlertCircle class="w-4 h-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>
							{{ error?.statusMessage }}
						</AlertDescription>
					</Alert>
				</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-4">
				<div class="grid gap-2">
					<FormField v-slot="{ componentField }" name="email">
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									ref="emailRef"
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									v-bind="componentField"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
				</div>
				<div class="grid gap-2">
					<FormField v-slot="{ componentField }" name="password">
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									id="password"
									type="password"
									required
									v-bind="componentField"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
				</div>
			</CardContent>
			<CardFooter>
				<Button class="w-full" :disabled="loading">
					<Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
					Sign in
				</Button>
			</CardFooter>
		</Card>
	</form>
</template>
