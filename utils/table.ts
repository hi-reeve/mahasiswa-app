import Button from "~/components/ui/button/Button.vue";
import { ArrowUpAZ, ArrowDownAZ } from "lucide-vue-next";
import type { Column } from "@tanstack/vue-table";
export const createTableHeader = <TData>(
	header: string,
	column?: Column<TData, any>,
	sortable = true
) => {
	if (!column || sortable === false) return h("div", {}, header);

	return h(
		Button,
		{
			size: "sm",
			variant: "ghost",
			onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
		},
		[
			header,
			!column.getIsSorted()
				? undefined
				: column.getIsSorted() === "asc"
				? h(ArrowUpAZ, {
						class: "ml-2 h-4 w-4",
				  })
				: h(ArrowDownAZ, {
						class: "ml-2 h-4 w-4",
				  }),
		]
	);
};
