import { PagedRequest } from '../common/paged-request';
import { ProductCategory } from '../../enums/product-category';
import { SortDirection } from '../../enums/sort-direction';

export default class GetAllPagedRequest extends PagedRequest {
	category?: ProductCategory;
	sortDirection?: SortDirection;
	types: string[] = [];
	brands: string[] = [];
}
