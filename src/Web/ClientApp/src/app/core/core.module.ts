import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
	exports: [HeaderComponent, SpinnerComponent],
	imports: [CommonModule, HttpClientModule, CoreRoutingModule],
	declarations: [HeaderComponent, SpinnerComponent],
})
export class CoreModule {}
