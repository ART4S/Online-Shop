import { Routes } from '@angular/router';
import { productDetailsRoutes } from '../product-details/product-details.routes';
import { CatalogComponent } from './pages/catalog/catalog.component';

export const catalogRoutes: Routes = [
	{
		path: '',
		data: { breadcrumb: 'Catalog' },
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: CatalogComponent,
				data: { title: 'All', breadcrumb: null },
			},
			{
				path: 'mens',
				data: { breadcrumb: 'Mens' },
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: CatalogComponent,
						data: { category: 'mens', title: "Men's", breadcrumb: null },
					},
					...productDetailsRoutes,
				],
			},
			{
				path: 'womens',
				data: { breadcrumb: 'Womens' },
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: CatalogComponent,
						data: { category: 'womens', title: "Women's", breadcrumb: null },
					},
					...productDetailsRoutes,
				],
			},
			{
				path: 'kids',
				data: { breadcrumb: 'Kids' },
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: CatalogComponent,
						data: { category: 'kids', title: "Kid's", breadcrumb: null },
					},
					...productDetailsRoutes,
				],
			},
			...productDetailsRoutes,
		],
	},
];
