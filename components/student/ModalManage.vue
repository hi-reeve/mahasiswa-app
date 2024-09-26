<script setup lang="ts">
import {
	type CreateStudentDto,
	type Student,
	type UpdateStudentDto,
} from "~/types/student";
import { studentCreateSchema, studentUpdateSchema } from "~/validation/student";
import { toast } from "vue-sonner";
import { Loader2 } from "lucide-vue-next";
type Props = {
	mode?: "create" | "detail";
	id?: string;
};
const { mode, id } = defineProps<Props>();
const open = defineModel<boolean>("open", { required: true });

const isEdit = ref<boolean>(false);
const validationSchema = computed(() =>
	isEdit.value
		? toTypedSchema(studentUpdateSchema)
		: toTypedSchema(studentCreateSchema)
);

const { data: student, refresh } = useFetch<Student>(
	() => `/api/student/${id}`,
	{
		immediate: false,
	}
);

const { loading: loadingCreate, mutate: mutateCreate } =
	useMutation<CreateStudentDto>(
		body => $fetch("/api/student", { method: "POST", body }),
		{
			onSuccess: async () => {
				toast.success("Data mahasiswa berhasil ditambahkan");
				open.value = false;
			},
			onError: error => {
				toast.error(`Error : ${error.statusMessage}`);
			},
		}
	);

const { loading: loadingUpdate, mutate: mutateUpdate } = useMutation<{
	id: string;
	payload: UpdateStudentDto;
}>(
	({ id, payload }) =>
		$fetch(`/api/student/${id}`, { method: "PUT", body: payload }),
	{
		onSuccess: async () => {
			toast.success("Data mahasiswa berhasil diubah");
			await refresh();
			isEdit.value = false;
		},
		onError: error => {
			toast.error(`Error : ${error.statusMessage}`);
		},
	}
);

const titleText = computed(() => {
	if (mode === "create") return "Tambah data Mahasiswa";
	if (mode === "detail" && isEdit.value) return "Ubah data Mahasiswa";
	return student.value?.name;
});
const onSubmit = (value: unknown) => {
	if (mode === "create") mutateCreate(value as CreateStudentDto);

	if (mode === "detail" && isEdit.value)
		mutateUpdate({
			id: student.value?.id as string,
			payload: value as UpdateStudentDto,
		});
};

const handleEdit = () => {
	isEdit.value = true;
};

const handleCancel = () => {
	if (mode === "create") open.value = false;
	else isEdit.value = false;
};

watch(open, current => {
	if (!current) {
		isEdit.value = false;
	}
});
</script>

<template>
	<Dialog v-model:open="open">
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					{{ titleText }}
				</DialogTitle>
			</DialogHeader>

			<StudentDetail
				v-if="mode === 'detail' && !isEdit && student"
				:student="student"
				@edit="handleEdit"
			/>
			<Form
				v-if="mode === 'create' || (mode === 'detail' && isEdit)"
				id="studentForm"
				v-slot="{ submitForm, setValues }"
				:validation-schema="validationSchema"
				@submit="onSubmit"
			>
				<StudentForm
					:is-edit="isEdit"
					:submit-form="submitForm"
					:set-values="setValues"
					:student="student"
				/>
				<DialogFooter class="mt-8">
					<Button
						type="button"
						variant="secondary"
						@click="handleCancel"
					>
						Batal
					</Button>
					<Button
						type="submit"
						form="studentForm"
						:disabled="loadingCreate || loadingUpdate"
					>
						<Loader2
							v-if="loadingCreate || loadingUpdate"
							class="mr-2 h-4 w-4 animate-spin"
						/>
						Simpan Data Mahasiswa
					</Button>
				</DialogFooter>
			</Form>
		</DialogContent>
	</Dialog>
</template>
