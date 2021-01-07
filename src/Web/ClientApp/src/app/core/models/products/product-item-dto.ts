import { ProductCategory } from '../../enums/product-category';

export default class ProductItemDto {
	id: string;
	name: string;
	description: string;
	price: number;
	createDate: Date;
	updateDate: Date;
	pictureUrl: string;
	category: ProductCategory
}
