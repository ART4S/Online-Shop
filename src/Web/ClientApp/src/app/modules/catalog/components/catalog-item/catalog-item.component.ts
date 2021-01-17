import { Component, Input, OnInit } from '@angular/core';
import ProductItemDto from 'src/app/core/models/products/product-item-dto';

@Component({
	selector: 'app-catalog-item',
	templateUrl: './catalog-item.component.html',
	styleUrls: ['./catalog-item.component.scss'],
})
export class CatalogItemComponent implements OnInit {
	@Input() item: ProductItemDto;

	constructor() {}

	ngOnInit(): void {}
}
