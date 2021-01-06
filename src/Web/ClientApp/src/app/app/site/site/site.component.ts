import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../../models/common/enums/product-category';

@Component({
	selector: 'app-site',
	templateUrl: './site.component.html',
	styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit {
	public get category(): typeof ProductCategory {
		return ProductCategory;
	}

	constructor() {}

	ngOnInit(): void {}
}
