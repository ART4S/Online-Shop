import { Component, OnInit } from '@angular/core';
import ProductBrandDto from 'src/app/models/productBrands/product-brand-dto';
import ProductItemDto from 'src/app/models/products/dto/product-item-dto';
import ProductTypeDto from 'src/app/models/productTypes/product-type-dto';
import { ProductsService } from 'src/app/services/products.service';
import { ProductBrandsService } from 'src/app/services/product-brands.service';
import { ProductTypesService } from 'src/app/services/product-types.service';
import PagedResponse from 'src/app/models/common/requests/paged-response';
import GetAllProductsRequest from 'src/app/models/products/requests/get-all-paged-request';
import { ActivatedRoute, Navigation, Params, Router } from '@angular/router';
import { ProductCategory } from '../../../models/common/enums/product-category';

@Component({
	selector: 'app-catalog',
	templateUrl: './catalog.component.html',
	styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
	catalog: PagedResponse<ProductItemDto>;
	catalogPageNumbers: number[] = [];
	types: FilterItem[] = [];
	brands: FilterItem[] = [];

	constructor(
		private _router: Router,
		private _currentRoute: ActivatedRoute,
		private _productsService: ProductsService,
		private _brandsService: ProductBrandsService,
		private _typesService: ProductTypesService
	) {}

	get filtersLoaded(): boolean {
		return this.brands.length > 0 && this.types.length > 0;
	}

	private get selectedTypes(): string[] {
		return this._currentRoute.snapshot.queryParamMap.has('types')
			? this._currentRoute.snapshot.queryParamMap.get('types').split(';')
			: [];
	}

	private get selectedBrands(): string[] {
		return this._currentRoute.snapshot.queryParamMap.has('brands')
			? this._currentRoute.snapshot.queryParamMap.get('brands').split(';')
			: [];
	}

	private get selectedCategory(): ProductCategory {
		const category: string = this._currentRoute.snapshot.paramMap.get('category');

		switch (category) {
			case 'mens':
				return ProductCategory.Mens;
			case 'womens':
				return ProductCategory.Womens;
			case 'kids':
				return ProductCategory.Kids;
			default:
				return null;
		}
	}

	ngOnInit(): void {
		this._currentRoute.queryParams.subscribe(() => {
			this.loadProducts();
			this.loadBrands();
			this.loadTypes();
		});

		this._currentRoute.params.subscribe(() => {
			this.loadProducts();
		});
	}

	loadProducts(pageNumber: number = 1): void {
		const request: GetAllProductsRequest = {
			pageNumber: pageNumber,
			pageSize: 10,
			types: this.selectedTypes,
			brands: this.selectedBrands,
			category: this.selectedCategory,
		};

		this._productsService.getAllPaged(request).subscribe(response => {
			this.catalog = response;

			const range = 1;
			const minPageNumber = Math.max(response.currentPage - range, 1);
			const maxPageNumber = Math.min(
				response.currentPage + range,
				response.totalPages
			);

			const pageNumbers: number[] = [];
			for (let i = minPageNumber; i <= maxPageNumber; i++) {
				pageNumbers.push(i);
			}

			this.catalogPageNumbers = pageNumbers;
		});
	}

	private loadBrands(): void {
		this._brandsService.getAll().subscribe(brands => {
			const items = brands as FilterItem[];
			items.forEach(x => (x.checked = this.selectedBrands.some(id => id == x.id)));
			this.brands = items;
		});
	}

	private loadTypes(): void {
		this._typesService.getAll().subscribe(types => {
			const items = types as FilterItem[];
			items.forEach(x => (x.checked = this.selectedTypes.some(id => id == x.id)));
			this.types = items;
		});
	}

	gotoPage(pageNumber: number): void {
		this.loadProducts(pageNumber);
	}

	applyTypeFilter(): void {
		let params: Params = { ...this._currentRoute.snapshot.queryParams };

		params.types = this.types
			.filter(x => x.checked)
			.map(x => x.id)
			.join(';');

		if (!params.types.length) delete params.types;

		this._router.navigate([], {
			relativeTo: this._currentRoute,
			queryParams: params,
		});
	}

	applyBrandFilter(): void {
		let params: Params = { ...this._currentRoute.snapshot.queryParams };

		params.brands = this.brands
			.filter(x => x.checked)
			.map(x => x.id)
			.join(';');

		if (!params.brands.length) delete params.brands;

		this._router.navigate([], {
			relativeTo: this._currentRoute,
			queryParams: params,
		});
	}
}

class FilterItem {
	id: string;
	name: string;
	checked: boolean;
}
