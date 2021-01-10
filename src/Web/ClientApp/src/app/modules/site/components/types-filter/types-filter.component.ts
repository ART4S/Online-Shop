import { Component, Input, OnInit } from '@angular/core';
import FilterItem from 'src/app/core/models/helpers/filter-item';

@Component({
	selector: 'app-types-filter',
	templateUrl: './types-filter.component.html',
	styleUrls: ['./types-filter.component.scss'],
})
export class TypesFilterComponent implements OnInit {
	@Input() types: FilterItem[] = [];

	constructor() {}

	ngOnInit(): void {}
}
