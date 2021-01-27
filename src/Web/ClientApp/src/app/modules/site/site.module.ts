import { NgModule } from '@angular/core';
import { SiteComponent } from './pages/site/site.component';
import { SiteRoutingModule } from './site-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { CatalogModule } from '../catalog/catalog.module';
import { ProductDetailsModule } from '../product-details/product-details.module';
import { CartModule } from '../cart/cart.module';

@NgModule({
	declarations: [SiteComponent],
	imports: [
		SiteRoutingModule,
		CoreModule,
		CatalogModule,
		ProductDetailsModule,
		CartModule,
	],
})
export class SiteModule {}
