export const paginationOrder = {
	ASC: "ASC",
	DESC: "DESC",
} as const;
export type PaginationOrder =
	(typeof paginationOrder)[keyof typeof paginationOrder];
export type PaginationParams<TCustomParams, TSortKey, TKey = keyof TSortKey> = {
	sortBy?: TKey;
	sortOrder?: PaginationOrder;
	page?: number;
	perPage?: number;
} & TCustomParams;
