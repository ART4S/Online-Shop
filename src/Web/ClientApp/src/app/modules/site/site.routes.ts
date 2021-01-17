import { Routes } from '@angular/router';
import { catalogRoutes } from '../catalog/catalog.routes';
import { SiteComponent } from './pages/site/site.component';

export const siteRoutes: Routes = [
	{
		path: '',
		component: SiteComponent,
		children: [{ path: 'catalog', children: catalogRoutes }],
	},
];
