import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CatalogItemComponent } from './components/catalog-item/catalog-item.component';
import { FilterSectionComponent } from './components/filter-section/filter-section.component';
import { CatalogItemDetailsComponent } from './pages/catalog-item-details/catalog-item-details.component';

@NgModule({
	declarations: [
		SiteComponent,
		CatalogComponent,
		FilterButtonComponent,
		NavbarComponent,
		CatalogItemComponent,
		FilterSectionComponent,
		CatalogItemDetailsComponent,
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
