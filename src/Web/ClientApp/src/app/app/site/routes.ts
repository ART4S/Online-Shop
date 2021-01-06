import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { HomeComponent } from './home/home.component';
import { SiteComponent } from './site/site.component';

export const routes: Routes = [
	{
		path: '',
		component: SiteComponent,
		children: [
			{ path: '', component: HomeComponent, pathMatch: 'full' },
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
