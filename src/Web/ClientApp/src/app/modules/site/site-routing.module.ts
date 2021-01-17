import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { siteRoutes } from './site.routes';

@NgModule({
	imports: [RouterModule.forChild(siteRoutes)],
	exports: [RouterModule],
})
export class SiteRoutingModule {}
