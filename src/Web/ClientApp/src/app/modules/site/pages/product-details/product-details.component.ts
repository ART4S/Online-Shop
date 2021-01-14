import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import ProductInfoDto from 'src/app/core/models/products/product-info-dto';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
	product: ProductInfoDto;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _productService: ProductsService
	) {}

	ngOnInit(): void {
		this._activatedRoute.paramMap
			.pipe(concatMap(x => this._productService.getById(+x.get('id'))))
			.subscribe(product => (this.product = product));
	}
}
