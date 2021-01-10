export default class PagedResponse<T> {
	pageSize: number;
	currentPage: number;
	totalPages: number;
	totalItemsCount: number;
	hasPrevPage: boolean;
	hasNextPage: number;
	items: T[] = [];
}
