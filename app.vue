<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>
<template>
	<NuxtLayout>
		<NuxtPage></NuxtPage>
	</NuxtLayout>
	<Toaster />
	<AppDialog />
</template>
