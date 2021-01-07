import PagedResponse from '../../requests/common/paged-response';
import ProductItemDto from './product-item-dto';

export default class CatalogVm extends PagedResponse<ProductItemDto> {
	totalCount: number;
}
