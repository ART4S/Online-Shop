import { HttpParams } from '@angular/common/http';

export default class HttpUtils {
	static buildQueryParams(object: any): HttpParams {
		let params = new HttpParams();

		Object.keys(object).forEach(x => {
			const key = x.toString();

			let arr;
			if (Array.isArray(object[x])) {
				arr = object[x];
			} else {
				arr = [object[x]];
			}

			arr.forEach(value => (params = params.append(key, value)));
		});

		return params;
	}
}
