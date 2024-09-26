<script setup lang="ts" generic="TData extends Object, TValue">
import {
	FlexRender,
	getCoreRowModel,
	useVueTable,
	type SortingState,
	type ColumnDef,
} from "@tanstack/vue-table";
import { Check, ChevronDown, Search } from "lucide-vue-next";
import { paginationOrder, type PaginationOrder } from "~/types/request";
const props = withDefaults(
	defineProps<{
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		total: number;
		perPageOptions?: number[];
		withSearch?: boolean;
		searchText?: string;
		loading?: boolean;
		createText?: string;
		withCreate?: boolean;
	}>(),
	{
		withSearch: true,
		withCreate: false,
		searchText: "Cari data",
		createText: "Tambah data",
		loading: false,
	}
);

const emit = defineEmits<{
	(e: "create"): void;
}>();

const perPageOptions = computed(
	() => props.perPageOptions ?? [10, 25, 50, 100]
);

const search = defineModel<string>("search");
const sortDirection = defineModel<PaginationOrder>("sortDirection");
const sortKey = defineModel<keyof TData>("sortKey");
const sorting = ref<SortingState>([
	{
		desc: sortDirection.value === paginationOrder.DESC,
		id: String(sortKey.value),
	},
]);
const perPage = defineModel("perPage", { default: 1 });
const currentPage = defineModel("currentPage", { default: 1 });

const itemNumberStart = computed(() =>
	props.total === 0
		? 0
		: currentPage.value * perPage.value - perPage.value + 1
);

const itemNumberEnd = computed(() =>
	props.total === 0 ? 0 : itemNumberStart.value + (props.data.length - 1)
);
const table = useVueTable({
	get data() {
		return props.data;
	},
	get columns() {
		return props.columns;
	},
	manualPagination: true,
	manualSorting: true,
	manualFiltering: true,
	getCoreRowModel: getCoreRowModel(),
	get rowCount() {
		return props.total;
	},
	state: {
		get sorting() {
			return sorting.value;
		},
	},
	onSortingChange: updateOrValue => {
		sorting.value =
			typeof updateOrValue === "function"
				? updateOrValue(sorting.value)
				: updateOrValue;
		sortKey.value = sorting.value[0].id as keyof TData;
		sortDirection.value = sorting.value[0].desc
			? paginationOrder.DESC
			: paginationOrder.ASC;
	},
});
const handleUpdatePage = (page: number) => {
	currentPage.value = page;
};
const handleUpdatePerPage = (limit: number) => {
	perPage.value = limit;
	currentPage.value = 1;
};
const handleUpdateSearch = useDebounceFn((value: string | number) => {
	search.value = String(value);
	handleUpdatePage(1);
}, 750);
</script>

<template>
	<div class="space-y-4">
		<div
			class="flex md:items-center md:flex-row flex-col md:space-y-0 space-y-4"
		>
			<div v-if="withSearch" class="flex items-center relative max-w-md">
				<Search class="absolute left-2 w-4 h-4" />
				<Input
					type="text"
					class="pl-8"
					:placeholder="searchText"
					:model-value="search"
					@update:model-value="handleUpdateSearch"
				/>
			</div>
			<Button
				v-if="withCreate"
				class="md:ml-auto"
				@click="emit('create')"
			>
				{{ createText }}
			</Button>
		</div>
		<slot name="filter" />
		<div class="border rounded-md lg:block hidden">
			<Table>
				<TableHeader>
					<TableRow
						v-for="headerGroup in table.getHeaderGroups()"
						:key="headerGroup.id"
					>
						<TableHead
							v-for="header in headerGroup.headers"
							:key="header.id"
							:style="{ width: `${header.getSize()}px` }"
						>
							<FlexRender
								v-if="!header.isPlaceholder"
								:render="header.column.columnDef.header"
								:props="header.getContext()"
							/>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<template v-if="loading">
						<TableRow
							v-for="row in table.getRowModel().rows"
							:key="row.id"
						>
							<TableCell
								v-for="cell in row.getVisibleCells()"
								:key="cell.id"
							>
								<Skeleton class="w-[100px] h-5 rounded-full" />
							</TableCell>
						</TableRow>
					</template>
					<template v-else>
						<template v-if="table.getRowModel().rows?.length">
							<TableRow
								v-for="row in table.getRowModel().rows"
								:key="row.id"
								:data-state="
									row.getIsSelected() ? 'selected' : undefined
								"
							>
								<TableCell
									v-for="cell in row.getVisibleCells()"
									:key="cell.id"
								>
									<FlexRender
										:render="cell.column.columnDef.cell"
										:props="cell.getContext()"
									/>
								</TableCell>
							</TableRow>
						</template>
						<template v-else>
							<TableRow>
								<TableCell
									:colSpan="columns.length"
									class="h-24 text-center"
								>
									Tidak ada hasil
								</TableCell>
							</TableRow>
						</template>
					</template>
				</TableBody>
			</Table>
		</div>
		<div class="lg:hidden flex flex-col gap-4">
			<div
				v-for="row in table.getRowModel().rows"
				:key="row.id"
				class="border p-2 rounded"
			>
				<div
					v-for="cell in row.getVisibleCells()"
					:key="cell.id"
					class="border-b last-of-type:border-0 py-2"
				>
					<div class="grid grid-cols-2 gap-4 text-sm">
						<FlexRender
							:render="cell.column.columnDef.header"
							:props="cell.getContext()"
						/>
						<FlexRender
							:render="cell.column.columnDef.cell"
							:props="cell.getContext()"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full flex lg:flex-row flex-col gap-4">
			<p>
				Menampilkan data {{ itemNumberStart }} sampai
				{{ itemNumberEnd }} dari {{ total }} data
			</p>
			<div class="lg:ml-auto flex gap-4 lg:flex-row flex-col">
				<div class="flex gap-4">
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button
								variant="outline"
								class="lg:ml-auto max-w-max"
							>
								<span>Kolom</span>
								<ChevronDown class="w-4 h-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuCheckboxItem
								v-for="column in table
									.getAllColumns()
									.filter(column => column.getCanHide())"
								:key="column.id"
								class="capitalize"
								:checked="column.getIsVisible()"
								@update:checked="
									value => {
										column.toggleVisibility(!!value);
									}
								"
							>
								<FlexRender :render="column.columnDef.header" />
							</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger
							class="px-4 flex rounded space-x-2 border max-w-max py-2 items-center"
						>
							<span>{{ perPage }}</span>
							<ChevronDown class="w-4 h-4" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								v-for="limit in perPageOptions"
								:key="limit"
								class="dark:data-[highlighted]:bg-white data-[highlighted]:bg-neutral-800 space-x-2 data-[highlighted]:text-white dark:data-[highlighted]:text-neutral-800"
								:class="{
									'text-white bg-neutral-800':
										limit === perPage,
								}"
								@click="handleUpdatePerPage(limit)"
							>
								<Check
									v-if="limit === perPage"
									class="w-4 h-4"
								/>
								<span>
									{{ limit }}
								</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<Pagination
					v-slot="{ page }"
					v-model:page="currentPage"
					:total="total"
					:sibling-count="1"
					show-edges
					:items-per-page="perPage"
					@update:page="handleUpdatePage"
				>
					<PaginationList
						v-slot="{ items }"
						class="flex items-center gap-1"
					>
						<PaginationFirst />
						<PaginationPrev />

						<template v-for="(item, index) in items">
							<PaginationListItem
								v-if="item.type === 'page'"
								:key="index"
								:value="item.value"
								as-child
							>
								<Button
									class="w-10 h-10 p-0"
									:variant="
										item.value === page
											? 'default'
											: 'outline'
									"
								>
									{{ item.value }}
								</Button>
							</PaginationListItem>
							<PaginationEllipsis
								v-else
								:key="item.type"
								:index="index"
							/>
						</template>

						<PaginationNext />
						<PaginationLast />
					</PaginationList>
				</Pagination>
			</div>
		</div>
	</div>
</template>
