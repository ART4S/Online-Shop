import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class FilterItem {
	id: string;
	name: string;
	checked: boolean;

	constructor(private updateFn: () => void) {}

	update(): void {
		this.updateFn();
	}
}

@Component({
	selector: 'app-filter-section',
	templateUrl: './filter-section.component.html',
	styleUrls: ['./filter-section.component.scss'],
})
export class FilterSectionComponent implements OnInit {
	@Input() sectionName: string;
	@Input() filterItems: FilterItem[] = [];

	@Output() filterSelect = new EventEmitter<FilterItem>();

	constructor() {}

	ngOnInit(): void {}
}
