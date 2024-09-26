<script setup lang="ts">
import { Edit } from "lucide-vue-next";
import type { Student } from "~/types/student";

type Props = {
	student?: Student;
};
const { student } = defineProps<Props>();
const emit = defineEmits<{
	(e: "edit"): void;
}>();

const handleEdit = () => {
	emit("edit");
};
</script>

<template>
	<div class="space-y-4">
		<div class="flex flex-col">
			<p class="font-bold">NRP</p>
			<p>{{ student?.nrp }}</p>
		</div>
		<div class="flex flex-col">
			<p class="font-bold">Nama</p>
			<p>{{ student?.name }}</p>
		</div>
		<div class="flex flex-col">
			<p class="font-bold">Email</p>
			<p>{{ student?.email }}</p>
		</div>
		<div class="flex flex-col">
			<p class="font-bold">Alamat</p>
			<p>{{ student?.address }}</p>
		</div>
		<div v-if="student" class="flex flex-col">
			<p class="font-bold">Tanggal Lahir</p>
			<p>{{ formatDate(epochSecondToMilliseconds(student.dob)) }}</p>
		</div>
		<div class="mt-4">
			<Button @click="handleEdit">
				<Edit class="h-4 w-4 mr-2" />
				Ubah Data Mahasiswa
			</Button>
		</div>
	</div>
</template>
