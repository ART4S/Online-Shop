import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
	exports: [CartComponent],
	declarations: [CartComponent],
	imports: [SharedModule, CommonModule],
})
export class CartModule {}
