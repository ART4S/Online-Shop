import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [HeaderComponent],
	exports: [HeaderComponent],
	imports: [CommonModule, HttpClientModule, CoreRoutingModule],
})
export class CoreModule {}
