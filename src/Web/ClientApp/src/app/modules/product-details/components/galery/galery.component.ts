import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-galery',
	templateUrl: './galery.component.html',
	styleUrls: ['./galery.component.scss'],
})
export class GaleryComponent implements OnInit {
	@Input() selectedPictureUrl;
	@Input() pictureUrls: string[] = [];

	constructor() {}

	ngOnInit(): void {}
}
