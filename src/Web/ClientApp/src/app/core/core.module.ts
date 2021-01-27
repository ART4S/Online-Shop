import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CarouselItemDirective } from './directives/carousel-item.directive';
import {
	CarouselComponent,
	CarouselItemElement,
} from './components/carousel/carousel.component';

@NgModule({
	exports: [
		HeaderComponent,
		BreadcrumbComponent,
		SpinnerComponent,
		CarouselComponent,
		CarouselItemDirective,
	],
	imports: [CommonModule, HttpClientModule, CoreRoutingModule],
	declarations: [
		HeaderComponent,
		SpinnerComponent,
		BreadcrumbComponent,
		CarouselItemDirective,
		CarouselItemElement,
		CarouselComponent,
	],
})
export class CoreModule {}
