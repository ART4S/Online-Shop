import { Routes } from '@angular/router';
import { cartRoutes } from '../cart/cart.routes';
import { catalogRoutes } from '../catalog/catalog.routes';
import { SiteComponent } from './pages/site/site.component';

export const siteRoutes: Routes = [
	{
		path: '',
		component: SiteComponent,
		children: [
			{ path: 'catalog', children: catalogRoutes },
			{ path: 'cart', children: cartRoutes },
		],
	},
];
