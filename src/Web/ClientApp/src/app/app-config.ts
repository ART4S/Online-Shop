import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export default class AppConfig {
	get baseUrl(): string {
		return this._baseUrl;
	}
	private _baseUrl: string;

	constructor() {
		this._baseUrl = environment.production
			? document.getElementsByTagName('base')[0].href
			: 'https://localhost:5001';
	}
}
