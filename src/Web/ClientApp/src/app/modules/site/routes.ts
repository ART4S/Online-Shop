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
				children: [
					{ path: '', component: CatalogComponent, pathMatch: 'full' },
					{
						path: ':id',
						children: [{ path: 'details', component: CatalogItemDetailsComponent }],
					},
				],
			},
		],
	},
];
