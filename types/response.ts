export type PaginationResponse<TData> = {
	elements: number;
	pages: number;
	results: TData[];
};
