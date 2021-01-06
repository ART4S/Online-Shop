import { PagedRequest } from '../../common/requests/paged-request';
import { ProductCategory } from '../../common/enums/product-category';

export default class GetAllPagedRequest extends PagedRequest {
  category?: ProductCategory;
	types: string[] = [];
	brands: string[] = [];
}
