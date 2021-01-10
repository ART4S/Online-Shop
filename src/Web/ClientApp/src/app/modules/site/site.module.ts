import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogNavbarComponent } from './components/catalog-navbar/catalog-navbar.component';
import { CatalogItemComponent } from './components/catalog-item/catalog-item.component';
import { CatalogItemDetailsComponent } from './pages/catalog-item-details/catalog-item-details.component';
import { CatalogSorterComponent } from './components/catalog-sorter/catalog-sorter.component';
import { TypesFilterComponent } from './components/types-filter/types-filter.component';
import { BrandsFilterComponent } from './components/brands-filter/brands-filter.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';

@NgModule({
	declarations: [
		SiteComponent,
		CatalogComponent,
		CatalogNavbarComponent,
		CatalogItemComponent,
		CatalogItemDetailsComponent,
		CatalogSorterComponent,
		TypesFilterComponent,
		BrandsFilterComponent,
		PriceFilterComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		SiteRoutingModule,
		CoreModule,
		SharedModule,
	],
})
export class SiteModule {}
