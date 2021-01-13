import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
	BreadCrumb,
	BreadcrumbService,
} from '../../services/breadcrumb.service';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject();

	breadcrumbs: BreadCrumb[] = [];

	constructor(private _breadcrumbService: BreadcrumbService) {
		this._breadcrumbService
			.getBreadCrumbs()
			.pipe(takeUntil(this.destroy$))
			.subscribe(breadcrumbs => {
				this.breadcrumbs = breadcrumbs;
			});
	}

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
