import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import HttpUtils from '../utils/http-utils';
import GetAllPagedRequest from '../requests/products/get-all-paged-request';
import PagedResponse from '../requests/common/paged-response';
import ProductItemDto from '../models/products/product-item-dto';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	private url = 'products';
	private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

	constructor(private api: ApiHttpService) {}
	getAllPaged(
		request: GetAllPagedRequest
	): Observable<PagedResponse<ProductItemDto>> {
		return this.api.get<PagedResponse<ProductItemDto>>(this.url, {
			headers: this.headers,
			params: HttpUtils.buildQueryParams(request),
		});
	}
}
