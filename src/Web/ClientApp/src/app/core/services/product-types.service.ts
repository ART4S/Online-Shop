import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ProductTypeDto from '../models/productTypes/product-type-dto';
import { ApiHttpService } from './api-http.service';

@Injectable({
	providedIn: 'root',
})
export class ProductTypesService {
	private url = 'productTypes';
	private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

	constructor(private api: ApiHttpService) {}

	getAll(): Observable<ProductTypeDto[]> {
		return this.api.get<ProductTypeDto[]>(this.url, {
			headers: this.headers,
		});
	}
}
