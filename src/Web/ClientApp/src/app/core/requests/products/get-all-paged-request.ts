import { PagedRequest } from '../common/paged-request';
import { ProductCategory } from '../../enums/product-category';

export default class GetAllPagedRequest extends PagedRequest {
	category?: ProductCategory;
	types: string[] = [];
	brands: string[] = [];
}
