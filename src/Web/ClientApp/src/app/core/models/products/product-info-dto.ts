export default class ProductInfoDto {
	id: string;
	name: string;
	price?: number;
	description: string;
	details: string;
	pictureUrl: string;
	pictureUrls: string[];
	brandId: string;
	brandName: string;
	currencyCode: string = 'USD'; // TODO: remove
}
