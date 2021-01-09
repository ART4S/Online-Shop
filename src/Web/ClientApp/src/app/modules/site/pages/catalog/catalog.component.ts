import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductBrandsService } from 'src/app/core/services/product-brands.service';
import { ProductTypesService } from 'src/app/core/services/product-types.service';
import GetAllProductsRequest from 'src/app/core/requests/products/get-all-paged-request';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { ProductCategory } from '../../../../core/enums/product-category';
import CatalogVm from 'src/app/core/models/products/catalog-vm';
import { FilterItem } from '../../components/filter-section/filter-section.component';
import { SortDirection } from 'src/app/core/enums/sort-direction';

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

	catalog: CatalogVm;
	types: FilterItem[] = [];
	brands: FilterItem[] = [];
	categoryName: string;
	sortDirection: SortDirection;

	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _productsService: ProductsService,
		private _brandsService: ProductBrandsService,
		private _typesService: ProductTypesService
	) {}

	get sortDirectionType(): typeof SortDirection {
		return SortDirection;
	}

	get applyedFilters(): FilterItem[] {
		return [
			...this.brands.filter(x => x.checked),
			...this.types.filter(x => x.checked),
		];
	}

	get filtersLoaded(): boolean {
		return this.brands.length > 0 && this.types.length > 0;
	}

	ngOnInit(): void {
		this._activatedRoute.queryParamMap.subscribe(params => {
			this._selectedTypes = this.getTypes(params);
			this._selectedBrands = this.getBrands(params);
			this._category = this.getCategory(params);
			this.categoryName = this.getCategoryName(this._category);
			this.sortDirection = this.getSortDirection(params);

			this.loadProducts();
			this.loadTypes();
			this.loadBrands();
		});
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
		const categories = new Map([
			['mens', ProductCategory.mens],
			['womens', ProductCategory.womens],
			['kids', ProductCategory.kids],
		]);

		const category: string = params.get('category');

		return categories.get(category);
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
		return sortDir === undefined ? SortDirection.pricedown : sortDir;
	}

	loadProducts(): void {
		const request: GetAllProductsRequest = {
			pageNumber: this._currentPage,
			pageSize: 9,
			types: this._selectedTypes,
			brands: this._selectedBrands,
			category: this._category,
			sortDirection: this.sortDirection,
		};

		this._productsService.getAllPaged(request).subscribe(catalog => {
			this.catalog = catalog;
		});
	}

	private loadTypes(): void {
		this._typesService.getAll().subscribe(types => {
			const items = [];

			types.forEach(x => {
				const item = new FilterItem(() => this.applyTypeFilter());
				item.id = x.id;
				item.name = x.name;
				item.checked = this._selectedTypes.some(id => id == x.id);
				items.push(item);
			});

			this.types = items;
		});
	}

	private loadBrands(): void {
		this._brandsService.getAll().subscribe(brands => {
			const items = [];

			brands.forEach(x => {
				const item = new FilterItem(() => this.applyBrandFilter());
				item.id = x.id;
				item.name = x.name;
				item.checked = this._selectedBrands.some(id => id == x.id);
				items.push(item);
			});

			this.brands = items;
		});
	}

	gotoPage(pageNumber: number): void {
		this._currentPage = pageNumber;
		this.loadProducts();
	}

	applyTypeFilter(): void {
		this.applyFilters('types', this.types);
	}

	applyBrandFilter(): void {
		this.applyFilters('brands', this.brands);
	}

	private applyFilters(paramName: string, filters: FilterItem[]) {
		this._currentPage = 1;

		let paramValue: string = filters
			.filter(x => x.checked)
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
