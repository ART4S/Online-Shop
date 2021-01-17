import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-catalog-navbar',
	templateUrl: './catalog-navbar.component.html',
	styleUrls: ['./catalog-navbar.component.scss'],
})
export class CatalogNavbarComponent implements OnInit {
	@Input() currentPage: number;
	@Input() totalPages: number;

	@Output() pageChange = new EventEmitter<number>();

	constructor() {}

	ngOnInit(): void {}

	get pages(): number[] {
		const range = 3;
		let minPageNumber = Math.max(this.currentPage - Math.floor(range / 2), 1);
		let maxPageNumber = Math.min(
			this.currentPage + Math.floor(range / 2),
			this.totalPages
		);

		if (this.totalPages >= range && maxPageNumber - minPageNumber < range) {
			if (minPageNumber === 1) maxPageNumber = range;
			if (maxPageNumber === this.totalPages)
				minPageNumber = this.totalPages - range + 1;
		}

		const pages: number[] = [];
		for (let i = minPageNumber; i <= maxPageNumber; i++) {
			pages.push(i);
		}

		return pages;
	}

	get hasPrevPage(): boolean {
		return this.currentPage > 1;
	}

	get hasNextPage(): boolean {
		return this.currentPage < this.totalPages;
	}

	gotoPage(page: number): void {
		this.pageChange.emit(page);
	}
}
