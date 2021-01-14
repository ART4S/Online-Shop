import { Route, Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SiteComponent } from './site.component';

const productDetailsRoute: Route = {
	path: ':id',
	data: { breadcrumb: null },
	children: [
		{
			path: 'details',
			component: ProductDetailsComponent,
			data: { breadcrumb: 'Product details' },
		},
	],
};

export const routes: Routes = [
	{
		path: '',
		component: SiteComponent,
		children: [
			{
				path: 'catalog',
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
								data: { category: 'mens', title: "Men's" },
							},
							productDetailsRoute,
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
							productDetailsRoute,
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
								data: { category: 'kids', title: "Kid's" },
							},
							productDetailsRoute,
						],
					},
					productDetailsRoute,
				],
			},
		],
	},
];
