import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

export const productDetailsRoutes: Routes = [
	{
		path: ':id',
		data: { breadcrumb: null },
		children: [
			{
				path: 'details',
				component: ProductDetailsComponent,
				data: { breadcrumb: 'Detail' },
			},
		],
	},
];
