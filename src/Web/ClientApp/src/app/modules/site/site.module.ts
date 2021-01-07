import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';

@NgModule({
	declarations: [SiteComponent, CatalogComponent, FilterButtonComponent],
	imports: [
		CommonModule,
		FormsModule,
		SiteRoutingModule,
		CoreModule,
		SharedModule,
	],
})
export class SiteModule {}
