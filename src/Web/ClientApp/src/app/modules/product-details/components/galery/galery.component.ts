import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-galery',
	templateUrl: './galery.component.html',
	styleUrls: ['./galery.component.scss'],
})
export class GaleryComponent implements OnInit {
	@Input() pictureUrls: string[] = [];

	selectedPictureUrl: string;

	constructor() {}

	ngOnInit(): void {
		if (this.pictureUrls.length) {
			this.selectedPictureUrl = this.pictureUrls[0];
		}
	}

	setPicture(pictureUrl: string): void {
		this.selectedPictureUrl = pictureUrl;
	}
}
