import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SiteModule } from './modules/site/site.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot([]),
		SiteModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
