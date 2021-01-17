import { NgModule } from '@angular/core';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { GaleryComponent } from './components/galery/galery.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [ProductDetailsComponent, GaleryComponent],
	imports: [SharedModule, CoreModule, RouterModule],
	exports: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
