export default class ProductInfoDto {
	id: number;
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
