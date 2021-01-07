export default class PagedResponse<T> {
	pageSize: number;
	currentPage: number;
	totalPages: number;
	hasPrevPage: boolean;
	hasNextPage: number;
	items: T[] = [];
}
