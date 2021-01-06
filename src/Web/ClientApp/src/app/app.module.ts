import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';
import { SiteModule } from './app/site/site.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [AppComponent, PageNotFoundComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		SiteModule,
		AppRoutingModule,
		NoopAnimationsModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
