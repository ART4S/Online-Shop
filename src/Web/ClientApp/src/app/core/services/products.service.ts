import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import HttpUtils from '../utils/http-utils';
import GetAllPagedRequest from '../requests/products/get-all-paged-request';
import CatalogVm from '../models/products/catalog-vm';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	private url = 'products';
	private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

	constructor(private api: ApiHttpService) {}
	getAllPaged(request: GetAllPagedRequest): Observable<CatalogVm> {
		return this.api.get<CatalogVm>(this.url, {
			headers: this.headers,
			params: HttpUtils.buildQueryParams(request),
		});
	}
}
