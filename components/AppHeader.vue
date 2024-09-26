<script setup lang="ts">
import { CircleUser, PanelLeft } from "lucide-vue-next";
const { user, clear } = useUserSession();

const handleLogout = () => {
	clear().then(() => {
		navigateTo({ name: "login" });
	});
};
</script>

<template>
	<header
		class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
	>
		<Sheet>
			<SheetTrigger as-child>
				<Button size="icon" variant="outline" class="sm:hidden">
					<PanelLeft class="h-5 w-5" />
					<span class="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" class="sm:max-w-xs">
				<nav class="grid gap-6 text-lg font-medium">
					<NuxtLink
						v-for="menu in menus"
						:key="menu.to"
						:to="{ name: menu.to }"
						class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground rounded"
						active-class="text-primary-foreground bg-primary"
					>
						<component :is="menu.icon" class="h-5 w-5" />
						{{ menu.label }}
					</NuxtLink>
				</nav>
			</SheetContent>
		</Sheet>

		<div class="ml-auto"></div>
		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<Button variant="secondary" class="rounded-full space-x-2">
					<span>{{ user?.email }}</span>
					<CircleUser class="h-5 w-5" />
					<span class="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem @click="handleLogout">
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</header>
</template>
