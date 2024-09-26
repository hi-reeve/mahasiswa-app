import type { ColumnDef } from "@tanstack/vue-table";
export class ColumnBuilder<TData extends Object, TValue = any> {
	private columns: ColumnDef<TData, TValue>[] = [];

	setColumn(column: ColumnDef<TData, TValue>): this {
		this.columns.push(column);
		return this;
	}

	resetColumn(): this {
		this.columns = [];
		return this;
	}

	build() {
		return this.columns;
	}
}
