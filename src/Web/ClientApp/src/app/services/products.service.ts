import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ProductItemDto from '../models/products/dto/product-item-dto';
import { ApiHttpService } from './api-http.service';
import PagedResponse from '../models/common/requests/paged-response';
import HttpUtils from '../helpers/http-utils';
import GetAllPagedRequest from '../models/products/requests/get-all-paged-request';

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
