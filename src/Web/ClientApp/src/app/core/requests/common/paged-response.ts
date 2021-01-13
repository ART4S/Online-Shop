export default class PagedResponse<T> {
	pageSize: number;
	currentPage: number;
	totalPages: number;
	totalItemsCount: number;
	items: T[] = [];
}
