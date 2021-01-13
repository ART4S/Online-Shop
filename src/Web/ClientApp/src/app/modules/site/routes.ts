import { Routes } from '@angular/router';
import { CatalogItemDetailsComponent } from './pages/catalog-item-details/catalog-item-details.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { SiteComponent } from './site.component';

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
						component: CatalogComponent,
						pathMatch: 'full',
						data: { title: 'All', breadcrumb: null },
					},
					{
						path: 'mens',
						component: CatalogComponent,
						data: { category: 'mens', title: "Men's", breadcrumb: 'Mens' },
					},
					{
						path: 'womens',
						component: CatalogComponent,
						data: { category: 'womens', title: "Women's", breadcrumb: 'Womens' },
					},
					{
						path: 'kids',
						component: CatalogComponent,
						data: { category: 'kids', title: "Kid's", breadcrumb: 'Kids' },
					},
					{
						path: ':id',
						children: [{ path: 'details', component: CatalogItemDetailsComponent }],
					},
				],
			},
		],
	},
];
