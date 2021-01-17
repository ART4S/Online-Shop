import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { BrandsFilterComponent } from './components/brands-filter/brands-filter.component';
import { CatalogItemComponent } from './components/catalog-item/catalog-item.component';
import { CatalogNavbarComponent } from './components/catalog-navbar/catalog-navbar.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { FormsModule } from '@angular/forms';
import { CatalogSorterComponent } from './components/catalog-sorter/catalog-sorter.component';
import { TypesFilterComponent } from './components/types-filter/types-filter.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		CatalogComponent,
		BrandsFilterComponent,
		CatalogItemComponent,
		CatalogNavbarComponent,
		CatalogSorterComponent,
		PriceFilterComponent,
		TypesFilterComponent,
	],
	imports: [RouterModule, FormsModule, SharedModule, CoreModule],
})
export class CatalogModule {}
