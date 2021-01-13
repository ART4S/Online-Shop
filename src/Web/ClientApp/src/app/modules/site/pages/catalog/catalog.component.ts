import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductBrandsService } from 'src/app/core/services/product-brands.service';
import { ProductTypesService } from 'src/app/core/services/product-types.service';
import GetAllProductsRequest from 'src/app/core/requests/products/get-all-paged-request';
import {
	ActivatedRoute,
	NavigationEnd,
	ParamMap,
	Router,
} from '@angular/router';
import { ProductCategory } from '../../../../core/enums/product-category';
import { SortDirection } from 'src/app/core/enums/sort-direction';
import FilterItem from 'src/app/core/models/helpers/filter-item';
import PagedResponse from 'src/app/core/requests/common/paged-response';
import ProductItemDto from 'src/app/core/models/products/product-item-dto';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-catalog',
	templateUrl: './catalog.component.html',
	styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
	private _selectedTypes: string[] = [];
	private _selectedBrands: string[] = [];
	private _category: ProductCategory;
	private _currentPage: number = 1;

	private destroy$ = new Subject();

	catalog: PagedResponse<ProductItemDto>;
	types: FilterItem[] = [];
	brands: FilterItem[] = [];
	title: string;
	sortDirection: SortDirection;
	minPrice: number;
	maxPrice: number;
	pageSize: number = 9;

	get pageLoaded(): boolean {
		return this.brands.length > 0 && this.types.length > 0 && !!this.catalog;
	}

	get applyedFilters(): FilterItem[] {
		return [
			...this.brands.filter(x => x.selected),
			...this.types.filter(x => x.selected),
		];
	}

	get displayItemsMessage(): string {
		if (this.catalog.totalItemsCount)
			return `${(this.catalog.currentPage - 1) * this.pageSize + 1}-${
				(this.catalog.currentPage - 1) * this.pageSize +
				Math.min(this.pageSize, this.catalog.pageSize)
			} from ${this.catalog.totalItemsCount}`;
		return '0 items';
	}

	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _productsService: ProductsService,
		private _brandsService: ProductBrandsService,
		private _typesService: ProductTypesService
	) {
		this.init();
	}

	private init(): void {
		this._router.events
			.pipe(
				takeUntil(this.destroy$),
				filter(x => x instanceof NavigationEnd)
			)
			.subscribe(() => {
				this._selectedTypes = this.getTypes();
				this._selectedBrands = this.getBrands();
				this._category = this.getCategory();
				this.title = this.getTitle();
				this.sortDirection = this.getSortDirection();
				this.minPrice = this.getMinPrice();
				this.maxPrice = this.getMaxPrice();

				this.loadProducts();
				this.loadTypes();
				this.loadBrands();
			});
	}

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.destroy$.next();
	}

	gotoPage(pageNumber: number): void {
		this._currentPage = pageNumber;
		this.loadProducts();
	}

	private getTypes(): string[] {
		return this.getFilters('types');
	}

	private getBrands(): string[] {
		return this.getFilters('brands');
	}

	private getFilters(paramName: string): string[] {
		const params: ParamMap = this._activatedRoute.snapshot.queryParamMap;
		if (!params.has(paramName)) return [];
		return params.get(paramName).split(';');
	}

	private getCategory(): ProductCategory {
		const category: string = this._activatedRoute.snapshot.data.category;
		return ProductCategory[category];
	}

	private getTitle(): string {
		return this._activatedRoute.snapshot.data.title;
	}

	private getSortDirection(): SortDirection {
		const params: ParamMap = this._activatedRoute.snapshot.queryParamMap;
		const sortDir = SortDirection[params.get('sort')];
		return sortDir === undefined ? SortDirection.priceup : sortDir;
	}

	private getMinPrice(): number {
		const params: ParamMap = this._activatedRoute.snapshot.queryParamMap;
		if (!params.has('minprice')) return null;
		return +params.get('minprice');
	}

	private getMaxPrice(): number {
		const params: ParamMap = this._activatedRoute.snapshot.queryParamMap;
		if (!params.has('maxprice')) return null;
		return +params.get('maxprice');
	}

	private loadProducts(): void {
		const request: GetAllProductsRequest = {
			pageNumber: this._currentPage,
			pageSize: this.pageSize,
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
