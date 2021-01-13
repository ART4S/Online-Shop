import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from './core/services/breadcrumb.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [],
})
export class AppComponent implements OnInit, OnDestroy {
	constructor(private breadcrumbService: BreadcrumbService) {}

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.breadcrumbService.destroy();
	}
}
