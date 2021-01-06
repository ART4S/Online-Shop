import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ProductBrandDto from '../models/productBrands/product-brand-dto';
import { ApiHttpService } from './api-http.service';
import { PagedRequest } from '../models/common/requests/paged-request';
import HttpUtils from '../helpers/http-utils';
import PagedResponse from '../models/common/requests/paged-response';

@Injectable({
	providedIn: 'root',
})
export class ProductBrandsService {
	private url = 'productBrands';
	private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

	constructor(private api: ApiHttpService) {}

	getAll(): Observable<ProductBrandDto[]> {
		return this.api.get<ProductBrandDto[]>(this.url, {
			headers: this.headers
		});
	}
}
