import { HttpParams } from '@angular/common/http';

export default class HttpUtils {
	static buildQueryParams(object: any): HttpParams {
		let httpParams = new HttpParams();

		Object.keys(object).forEach(x => {
			const key = x.toString();

			let params;
			if (Array.isArray(object[x])) {
				params = object[x];
			} else {
				params = [object[x]];
			}

			params.forEach(value => (httpParams = httpParams.append(key, value)));
		});

		return httpParams;
	}
}
