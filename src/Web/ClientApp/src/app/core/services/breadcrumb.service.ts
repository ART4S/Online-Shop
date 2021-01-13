import { Injectable } from '@angular/core';
import {
	ActivatedRoute,
	ActivatedRouteSnapshot,
	NavigationEnd,
	Router,
} from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

export interface BreadCrumb {
	name: string;
	url: string;
}

@Injectable({
	providedIn: 'root',
})
export class BreadcrumbService {
	private destroy$ = new Subject();

	private _breadcrumbs: BreadCrumb[] = [];

	constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {
		this._router.events
			.pipe(
				takeUntil(this.destroy$),
				filter(x => x instanceof NavigationEnd),
				map(() => this.buildBreadCrumbs())
			)
			.subscribe(x => (this._breadcrumbs = x));
	}

	getBreadCrumbs(): Observable<BreadCrumb[]> {
		return of(this._breadcrumbs);
	}

	private buildBreadCrumbs(): BreadCrumb[] {
		const breadcrumbs: BreadCrumb[] = [{ name: 'Home', url: '' }];
		let currentRoute: ActivatedRouteSnapshot = this._activatedRoute.snapshot;
		let url = '';

		while (currentRoute.children.length) {
			const childRoute = currentRoute.firstChild;
			if (childRoute.url.length) {
				url += `/${childRoute.url[0]}`;
			}

			const name = childRoute.data.breadcrumb;
			if (name) {
				breadcrumbs.push({ name: name, url: url });
			}

			currentRoute = childRoute;
		}

		return breadcrumbs;
	}

	destroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
