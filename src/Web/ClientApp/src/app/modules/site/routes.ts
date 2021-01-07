import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { SiteComponent } from './site.component';

export const routes: Routes = [
	{
		path: '',
		component: SiteComponent,
		children: [
			{ path: '', component: CatalogComponent, pathMatch: 'full' },
			{
				path: 'catalog',
				children: [
					{ path: '', pathMatch: 'full', component: CatalogComponent },
					{ path: ':category', component: CatalogComponent },
				],
			},
		],
	},
];
