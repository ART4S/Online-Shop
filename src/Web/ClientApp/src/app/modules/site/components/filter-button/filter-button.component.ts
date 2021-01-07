import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
	selector: 'app-filter-button',
	templateUrl: './filter-button.component.html',
	styleUrls: ['./filter-button.component.scss'],
})
export class FilterButtonComponent implements OnInit {
	@Input() description: string;
	@Output() click = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}
}
