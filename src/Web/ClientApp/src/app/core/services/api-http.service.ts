import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import AppConfig from 'src/app/app-config';

@Injectable({
	providedIn: 'root',
})
export class ApiHttpService {
	private _baseUrl: string;

	constructor(private _http: HttpClient) {
		this._baseUrl = 'https://localhost:5001';
	}

	get<T>(url: string, options?: unknown) {
		url = this.buildUrl(url);
		return this._http
			.get<T>(url, options)
			.pipe(catchError(this.logError<T>('get', url)));
	}

	post<T>(url: string, body: any, options?: unknown) {
		url = this.buildUrl(url);
		return this._http
			.post<T>(url, body, options)
			.pipe(catchError(this.logError<T>('post', url)));
	}

	put<T>(url: string, body: any, options?: unknown) {
		url = this.buildUrl(url);
		return this._http
			.put<T>(url, body, options)
			.pipe(catchError(this.logError<T>('put', url)));
	}

	delete<T>(url: string, options?: unknown) {
		url = this.buildUrl(url);
		return this._http
			.delete<T>(url, options)
			.pipe(catchError(this.logError<T>('delete', url)));
	}

	private buildUrl(url: string): string {
		return `${this._baseUrl}/api/${url}`;
	}

	private logError<T>(
		methodName: string,
		url: string
	): (err: any, caught: Observable<T>) => Observable<T> {
		return (err: any, caught: Observable<T>) => {
			console.error(`method: ${methodName}, url: '${url}'`);
			console.log(JSON.stringify(err));
			return throwError(err);
		};
	}
}
