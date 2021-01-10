import { Component, Input, OnInit } from '@angular/core';
import { SortDirection } from 'src/app/core/enums/sort-direction';

@Component({
	selector: 'app-catalog-sorter',
	templateUrl: './catalog-sorter.component.html',
	styleUrls: ['./catalog-sorter.component.scss'],
})
export class CatalogSorterComponent implements OnInit {
	@Input() sortDirection: SortDirection;

	get sortDirectionType(): typeof SortDirection {
		return SortDirection;
	}

	constructor() {}

	ngOnInit(): void {}
}
