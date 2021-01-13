import { NgModule } from '@angular/core';
import { SiteComponent } from './site.component';
import { SiteRoutingModule } from './site-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { BrandsFilterComponent } from './components/brands-filter/brands-filter.component';
import { CatalogItemComponent } from './components/catalog-item/catalog-item.component';
import { CatalogNavbarComponent } from './components/catalog-navbar/catalog-navbar.component';
import { CatalogSorterComponent } from './components/catalog-sorter/catalog-sorter.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { TypesFilterComponent } from './components/types-filter/types-filter.component';
import { CatalogItemDetailsComponent } from './pages/catalog-item-details/catalog-item-details.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		SiteComponent,
		CatalogComponent,
		BrandsFilterComponent,
		CatalogItemComponent,
		CatalogNavbarComponent,
		CatalogSorterComponent,
		PriceFilterComponent,
		TypesFilterComponent,
		CatalogItemDetailsComponent,
	],
	imports: [SharedModule, FormsModule, SiteRoutingModule, CoreModule],
})
export class SiteModule {}
