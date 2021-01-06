import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site/site.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ExtendedTimeAgoPipe } from '../common/extended-time-ago-pipe';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		SiteComponent,
		ExtendedTimeAgoPipe,
		CatalogComponent,
		HomeComponent,
	],
	imports: [CommonModule, ReactiveFormsModule, FormsModule, SiteRoutingModule],
})
export class SiteModule {}
