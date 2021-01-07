import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment'; // todo: inject BASE_URL const

@Injectable({
	providedIn: 'root',
})
export class ApiHttpService {
	constructor(private http: HttpClient) {}

	get<T>(url: string, options?: unknown) {
		url = this.buildUrl(url);
		return this.http
			.get<T>(url, options)
			.pipe(catchError(this.logError<T>('get', url)));
	}

	post<T>(url: string, body: any, options?: unknown) {
		url = this.buildUrl(url);
		return this.http
			.post<T>(url, body, options)
			.pipe(catchError(this.logError<T>('post', url)));
	}

	put<T>(url: string, body: any, options?: unknown) {
		url = this.buildUrl(url);
		return this.http
			.put<T>(url, body, options)
			.pipe(catchError(this.logError<T>('put', url)));
	}

	delete<T>(url: string, options?: unknown) {
		url = this.buildUrl(url);
		return this.http
			.delete<T>(url, options)
			.pipe(catchError(this.logError<T>('delete', url)));
	}

	private buildUrl(url: string): string {
		return `${environment.baseUrl}/api/${url}`;
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
