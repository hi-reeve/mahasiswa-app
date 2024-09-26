<script setup lang="ts">
import { Primitive } from "radix-vue";
import { type ButtonProps, buttonVariants } from ".";
import { cn } from "@/lib/utils";

const props = withDefaults(defineProps<ButtonProps>(), {
	as: "button",
});
</script>

<template>
	<Primitive
		:as="as"
		:as-child="asChild"
		:class="cn(buttonVariants({ variant, size }), props.class)"
	>
		<slot />
	</Primitive>
</template>
