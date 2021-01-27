import { Injectable } from '@angular/core';

export interface CartItem {
	id: string;
	quantity: number;
}

@Injectable({
	providedIn: 'root',
})
export class CartService {
	items: CartItem[] = [];

	constructor() {
		this.items = JSON.parse(localStorage.getItem('cart-items') || '[]');
	}

	addItem(item: CartItem): void {
		let existingItem = this.items.find(x => x.id == item.id);
		if (!existingItem) {
			this.items.push(item);
		} else {
			existingItem.quantity += item.quantity;
		}

		this.syncInLocalStorage();
	}

	private syncInLocalStorage() {
		localStorage.setItem('cart-items', JSON.stringify(this.items));
	}
}
