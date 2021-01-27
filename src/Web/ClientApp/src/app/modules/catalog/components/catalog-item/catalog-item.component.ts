import { Component, Input, OnInit } from '@angular/core';
import ProductItemDto from 'src/app/core/models/products/product-item-dto';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
	selector: 'app-catalog-item',
	templateUrl: './catalog-item.component.html',
	styleUrls: ['./catalog-item.component.scss'],
})
export class CatalogItemComponent implements OnInit {
	@Input() item: ProductItemDto;

	constructor(private _cartService: CartService) {}

	ngOnInit(): void {}

	addToCart(): void {
		this._cartService.addItem({ id: this.item.id, quantity: 1 });
	}
}
