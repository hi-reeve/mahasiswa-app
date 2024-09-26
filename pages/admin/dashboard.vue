<script setup lang="ts">
import { Eye, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { ColumnBuilder } from "~/builder/column";
import Button from "~/components/ui/button/Button.vue";
import { useAlertDialogStore } from "~/store/alert-dialog";
import { type Student, type GetStudentParams } from "~/types/student";
import { createTableHeader } from "~/utils/table";

definePageMeta({ name: "dashboard", layout: "admin" });

useHeadSafe({
	title: "Manage Student",
});

const alertDialogStore = useAlertDialogStore();
const filter = reactive<GetStudentParams>({
	perPage: 10,
	page: 1,
});

const search = useDebounce(ref(), 750);
const { data, status, refresh } = useFetch("/api/student", {
	params: filter,
});

const { mutate } = useMutation(
	({ id }) => $fetch(`/api/student/${id}`, { method: "DELETE" }),
	{
		onSuccess: () => {
			toast.success("Berhasil menghapus data mahasiswa");
			alertDialogStore.closeDialog();
			refresh();
		},
		onError: error => {
			toast.error(`Error : ${error.statusMessage}`);
		},
	}
);

const handleDelete = (id: string) => {
	mutate({ id });
};

watch(search, () => {
	filter.search = search.value;
});

const columns = computed(() => {
	const builder = new ColumnBuilder<Student>();

	return builder
		.setColumn({
			accessorKey: "nrp",
			header: () => createTableHeader("NRP"),
		})
		.setColumn({
			accessorKey: "name",
			header: () => createTableHeader("Nama"),
		})
		.setColumn({
			accessorKey: "email",
			header: () => createTableHeader("Email"),
		})
		.setColumn({
			accessorKey: "address",
			header: () => createTableHeader("Phone"),
		})
		.setColumn({
			accessorKey: "dob",
			header: () => createTableHeader("Tanggal Lahir"),
			cell: ({ row }) => h("span", {}, formatDate(row.getValue("dob"))),
		})
		.setColumn({
			accessorKey: "action",
			header: () => createTableHeader("Action"),
			enableHiding: false,
			cell: ({ row }) => {
				return h("div", { class: "flex gap-4" }, [
					h(
						Button,
						{
							size: "icon",
							variant: "secondary",
							onClick: () => {
								modalState.open = true;
								modalState.mode = "detail";
								modalState.selectedStudent = row.original;
							},
						},
						{ default: () => h(Eye) }
					),
					h(
						Button,
						{
							size: "icon",
							variant: "destructive",
							onClick: () => {
								alertDialogStore.openDialog({
									title: "Hapus Data",
									message:
										"Apakah anda yakin ingin menghapus data ini?",
									confirmText: "Hapus",
									onConfirm: () => {
										handleDelete(row.original.id);
									},
								});
							},
						},
						{
							default: () => h(Trash2),
						}
					),
				]);
			},
		})
		.build();
});

const modalState = reactive<{
	open: boolean;
	mode: "create" | "detail";
	selectedStudent?: Student;
}>({
	open: false,
	mode: "create",
	selectedStudent: undefined,
});

const onCreate = () => {
	modalState.open = true;
	modalState.mode = "create";
	modalState.selectedStudent = undefined;
};
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle> Students </CardTitle>
		</CardHeader>
		<CardContent>
			<DataTable
				v-model:current-page="filter.page"
				v-model:per-page="filter.perPage"
				v-model:search="search"
				:columns="columns"
				:data="data?.results ?? []"
				:total="data?.elements ?? 0"
				:loading="status === 'pending'"
				with-create
				create-text="Tambah mahasiswa baru"
				search-text="Cari NRP/Nama"
				@create="onCreate"
			>
			</DataTable>
		</CardContent>
	</Card>

	<StudentModalManage
		v-model:open="modalState.open"
		:mode="modalState.mode"
		:id="modalState.selectedStudent?.id"
	/>
</template>
