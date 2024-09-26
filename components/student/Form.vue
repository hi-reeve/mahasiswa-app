<script setup lang="ts">
import { vMaska } from "maska/vue";
import { type MaskInputOptions } from "maska";
import type { Student } from "~/types/student";
type Props = {
	isEdit?: boolean;
	student?: Student | null;
};

const { isEdit = false, student } = defineProps<Props>();

const maxDate = dateToDateValue(new Date());
const nrpMaskOptions = reactive<MaskInputOptions>({
	mask: "############",
	eager: true,
});
</script>

<template>
	<div class="space-y-4">
		<FormField v-slot="{ componentField }" name="nrp">
			<FormItem>
				<FormLabel>NRP</FormLabel>
				<FormControl>
					<Input
						v-bind="componentField"
						v-maska="nrpMaskOptions"
						:disabled="isEdit"
						type="text"
						placeholder="Masukkan NRP Mahasiswa"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="name">
			<FormItem>
				<FormLabel>Nama</FormLabel>
				<FormControl>
					<Input
						v-bind="componentField"
						type="text"
						placeholder="Masukkan Nama Mahasiswa"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="email">
			<FormItem>
				<FormLabel>Email</FormLabel>
				<FormControl>
					<Input
						v-bind="componentField"
						type="email"
						placeholder="Masukkan email Mahasiswa"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="address">
			<FormItem>
				<FormLabel>Alamat</FormLabel>
				<FormControl>
					<Textarea
						v-bind="componentField"
						placeholder="Masukkan Alamat Mahasiswa"
					></Textarea>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<DatePicker
			name="dob"
			label="Tanggal Lahir"
			:max="maxDate"
			:disabled="isEdit"
			:model-value="
				student
					? dateToDateValue(epochSecondToMilliseconds(student.dob))
					: undefined
			"
		/>
	</div>
</template>
