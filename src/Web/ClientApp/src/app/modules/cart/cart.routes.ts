import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';

export const cartRoutes: Routes = [
	{ path: '', pathMatch: 'full', component: CartComponent },
];
