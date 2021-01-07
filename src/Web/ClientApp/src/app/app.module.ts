import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SiteModule } from './modules/site/site.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, RouterModule.forRoot([]), SiteModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
