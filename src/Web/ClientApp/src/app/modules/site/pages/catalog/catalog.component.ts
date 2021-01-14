import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductBrandsService } from 'src/app/core/services/product-brands.service';
import { ProductTypesService } from 'src/app/core/services/product-types.service';
import GetAllProductsRequest from 'src/app/core/requests/products/get-all-paged-request';
import {
	ActivatedRoute,
	ActivatedRouteSnapshot,
	ActivationEnd,
	NavigationEnd,
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
	private destroy$ = new Subject();

	private _selectedTypes: string[] = [];
	private _selectedBrands: string[] = [];
	private _category: ProductCategory;
	private _currentPage: number = 1;
	private _pageSize: number = 9;

	catalog: PagedResponse<ProductItemDto>;
	types: FilterItem[] = [];
	brands: FilterItem[] = [];
	title: string;
	sortDirection: SortDirection;
	minPrice: number;
	maxPrice: number;

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
			return `${(this.catalog.currentPage - 1) * this._pageSize + 1}-${
				(this.catalog.currentPage - 1) * this._pageSize +
				Math.min(this._pageSize, this.catalog.pageSize)
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
			.subscribe((e: NavigationEnd) => {
				const shanpshot = this._activatedRoute.snapshot;
				
				this._selectedTypes = this.getTypes(shanpshot);
				this._selectedBrands = this.getBrands(shanpshot);
				this._category = this.getCategory(shanpshot);
				this.title = this.getTitle(shanpshot);
				this.sortDirection = this.getSortDirection(shanpshot);
				this.minPrice = this.getMinPrice(shanpshot);
				this.maxPrice = this.getMaxPrice(shanpshot);

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

	private getTypes(route: ActivatedRouteSnapshot): string[] {
		return this.getFilters(route, 'types');
	}

	private getBrands(route: ActivatedRouteSnapshot): string[] {
		return this.getFilters(route, 'brands');
	}

	private getFilters(
		route: ActivatedRouteSnapshot,
		paramName: string
	): string[] {
		if (!route.queryParamMap.has(paramName)) return [];
		return route.queryParamMap.get(paramName).split(';');
	}

	private getCategory(route: ActivatedRouteSnapshot): ProductCategory {
		const category: string = route.data.category;
		return ProductCategory[category];
	}

	private getTitle(route: ActivatedRouteSnapshot): string {
		return route.data.title;
	}

	private getSortDirection(route: ActivatedRouteSnapshot): SortDirection {
		const sortDir = SortDirection[route.queryParamMap.get('sort')];
		return sortDir === undefined ? SortDirection.priceup : sortDir;
	}

	private getMinPrice(route: ActivatedRouteSnapshot): number {
		if (!route.queryParamMap.has('minprice')) return null;
		return +route.queryParamMap.get('minprice');
	}

	private getMaxPrice(route: ActivatedRouteSnapshot): number {
		if (!route.queryParamMap.has('maxprice')) return null;
		return +route.queryParamMap.get('maxprice');
	}

	private loadProducts(): void {
		const request: GetAllProductsRequest = {
			pageNumber: this._currentPage,
			pageSize: this._pageSize,
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
