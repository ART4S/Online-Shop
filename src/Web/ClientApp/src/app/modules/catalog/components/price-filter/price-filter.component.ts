import { Component, Input, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';

@Component({
	selector: 'app-price-filter',
	templateUrl: './price-filter.component.html',
	styleUrls: ['./price-filter.component.scss'],
})
export class PriceFilterComponent implements OnInit {
	@Input() minPrice: string;
	@Input() maxPrice: string;

	constructor(private _router: Router) {}

	ngOnInit(): void {}

	applyFilter(): void {
		if (!this.minPrice) this.minPrice = null;
		if (!this.maxPrice) this.maxPrice = null;

		let min = -1;
		let max = -1;

		if (this.minPrice) {
			min = +this.minPrice;

			if (isNaN(min) || min < 0) {
				this.minPrice = '0';
			}
		}

		if (this.maxPrice) {
			max = +this.maxPrice;

			if (isNaN(max) || max < min) {
				this.maxPrice = null;
			}
		}

		const params: Params = {
			minprice: this.minPrice,
			maxprice: this.maxPrice,
		};

		this._router.navigate([], {
			queryParams: params,
			queryParamsHandling: 'merge',
		});
	}
}
