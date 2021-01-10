import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductBrandsService } from 'src/app/core/services/product-brands.service';
import { ProductTypesService } from 'src/app/core/services/product-types.service';
import GetAllProductsRequest from 'src/app/core/requests/products/get-all-paged-request';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductCategory } from '../../../../core/enums/product-category';
import { SortDirection } from 'src/app/core/enums/sort-direction';
import FilterItem from 'src/app/core/models/helpers/filter-item';
import PagedResponse from 'src/app/core/requests/common/paged-response';
import ProductItemDto from 'src/app/core/models/products/product-item-dto';

@Component({
	selector: 'app-catalog',
	templateUrl: './catalog.component.html',
	styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
	private _selectedTypes: string[] = [];
	private _selectedBrands: string[] = [];
	private _category: ProductCategory;
	private _currentPage: number = 1;

	catalog: PagedResponse<ProductItemDto>;
	types: FilterItem[] = [];
	brands: FilterItem[] = [];
	categoryName: string;
	sortDirection: SortDirection;
	minPrice: number;
	maxPrice: number;

	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _productsService: ProductsService,
		private _brandsService: ProductBrandsService,
		private _typesService: ProductTypesService
	) {}

	get pageLoaded(): boolean {
		return this.brands.length > 0 && this.types.length > 0 && !!this.catalog;
	}

	get applyedFilters(): FilterItem[] {
		return [
			...this.brands.filter(x => x.selected),
			...this.types.filter(x => x.selected),
		];
	}

	ngOnInit(): void {
		this._activatedRoute.queryParamMap.subscribe(params => {
			this._selectedTypes = this.getTypes(params);
			this._selectedBrands = this.getBrands(params);
			this._category = this.getCategory(params);
			this.categoryName = this.getCategoryName(this._category);
			this.sortDirection = this.getSortDirection(params);
			this.minPrice = this.getMinPrice(params);
			this.maxPrice = this.getMaxPrice(params);

			this.loadProducts();
			this.loadTypes();
			this.loadBrands();
		});
	}

	gotoPage(pageNumber: number): void {
		this._currentPage = pageNumber;
		this.loadProducts();
	}

	private getTypes(params: ParamMap): string[] {
		return this.getFilters('types', params);
	}

	private getBrands(params: ParamMap): string[] {
		return this.getFilters('brands', params);
	}

	private getFilters(paramName: string, params: ParamMap): string[] {
		return (params.get(paramName) ?? '').split(';');
	}

	private getCategory(params: ParamMap): ProductCategory {
		return ProductCategory[params.get('category')];
	}

	private getCategoryName(category: ProductCategory): string {
		const categoryNames = new Map([
			[ProductCategory.mens, 'Mens'],
			[ProductCategory.womens, 'Womens'],
			[ProductCategory.kids, 'Kids'],
		]);

		return categoryNames.get(category) ?? 'All';
	}

	private getSortDirection(params: ParamMap): SortDirection {
		const sortDir = SortDirection[params.get('sort')];
		return sortDir === undefined ? SortDirection.priceup : sortDir;
	}

	private getMinPrice(params: ParamMap): number {
		if (!params.has('minprice')) return null;
		return +params.get('minprice');
	}

	private getMaxPrice(params: ParamMap): number {
		if (!params.has('maxprice')) return null;
		return +params.get('maxprice');
	}

	private loadProducts(): void {
		const request: GetAllProductsRequest = {
			pageNumber: this._currentPage,
			pageSize: 9,
			types: this._selectedTypes,
			brands: this._selectedBrands,
			category: this._category,
			sortDirection: this.sortDirection,
			minPrice: this.minPrice,
			maxPrice: this.maxPrice,
		};

		this._productsService.getAllPaged(request).subscribe(catalog => {
			this.catalog = catalog;
		});
	}

	private loadTypes(): void {
		this._typesService.getAll().subscribe(types => {
			this.types = types.map(x => {
				return {
					id: x.id,
					name: x.name,
					selected: this._selectedTypes.some(id => id == x.id),
					apply: () => this.applyTypeFilter(),
				};
			});
		});
	}

	private loadBrands(): void {
		this._brandsService.getAll().subscribe(brands => {
			this.brands = brands.map(x => {
				return {
					id: x.id,
					name: x.name,
					selected: this._selectedBrands.some(id => id == x.id),
					apply: () => this.applyBrandFilter(),
				};
			});
		});
	}

	private applyTypeFilter(): void {
		this.applyFilters('types', this.types);
	}

	private applyBrandFilter(): void {
		this.applyFilters('brands', this.brands);
	}

	private applyFilters(paramName: string, filters: FilterItem[]) {
		this._currentPage = 1;

		let paramValue: string = filters
			.filter(x => x.selected)
			.map(x => x.id)
			.join(';');

		if (!paramValue) {
			paramValue = null;
		}

		this._router.navigate([], {
			relativeTo: this._activatedRoute,
			queryParams: { [paramName]: paramValue },
			queryParamsHandling: 'merge',
		});
	}
}
