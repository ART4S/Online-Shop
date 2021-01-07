import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductBrandsService } from 'src/app/core/services/product-brands.service';
import { ProductTypesService } from 'src/app/core/services/product-types.service';
import GetAllProductsRequest from 'src/app/core/requests/products/get-all-paged-request';
import { ActivatedRoute, Navigation, Params, Router } from '@angular/router';
import { ProductCategory } from '../../../../core/enums/product-category';
import CatalogVm from 'src/app/core/models/products/catalog-vm';

class FilterItem {
	id: string;
	name: string;
	checked: boolean;

	constructor(private _onUnchecked: () => void) {}

	remove(): void {
		this.checked = false;
		this._onUnchecked();
	}
}

@Component({
	selector: 'app-catalog',
	templateUrl: './catalog.component.html',
	styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
	catalog: CatalogVm;
	catalogPageNumbers: number[] = [];
	types: FilterItem[] = [];
	brands: FilterItem[] = [];

	get applyedFilters(): FilterItem[] {
		return [
			...this.brands.filter(x => x.checked),
			...this.types.filter(x => x.checked),
		];
	}

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
			const items = [];

			brands.forEach(x => {
				const item = new FilterItem(() => this.applyBrandFilter());
				item.id = x.id;
				item.name = x.name;
				item.checked = this.selectedBrands.some(id => id == x.id);
				items.push(item);
			});

			this.brands = items;
		});
	}

	private loadTypes(): void {
		this._typesService.getAll().subscribe(types => {
			const items = [];

			types.forEach(x => {
				const item = new FilterItem(() => this.applyTypeFilter());
				item.id = x.id;
				item.name = x.name;
				item.checked = this.selectedTypes.some(id => id == x.id);
				items.push(item);
			});

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
