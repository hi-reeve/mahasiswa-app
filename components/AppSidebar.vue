<script setup lang="ts">
import { LayoutDashboard, Users } from "lucide-vue-next";
</script>

<template>
	<aside
		class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex"
	>
		<nav class="flex flex-col items-center gap-4 px-2 py-4">
			<div
				class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg md:h-8 md:w-8 md:text-base"
			>
				<LayoutDashboard
					class="h-5 w-5 transition-all group-hover:scale-110 text-muted-foreground"
				/>
				<span class="sr-only">Zero One Student</span>
			</div>

			<TooltipProvider v-for="menu in menus" :key="menu.to">
				<Tooltip>
					<TooltipTrigger as-child>
						<NuxtLink
							:to="{ name: menu.to }"
							class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							active-class="text-primary-foreground bg-primary"
						>
							<component :is="menu.icon" class="h-5 w-5" />
							<span class="sr-only">{{ menu.label }}</span>
						</NuxtLink>
					</TooltipTrigger>
					<TooltipContent side="right">
						{{ menu.label }}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</nav>
	</aside>
</template>
