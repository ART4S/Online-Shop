import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedTimeAgoPipe } from './pipes/extended-time-ago-pipe';

@NgModule({
	declarations: [ExtendedTimeAgoPipe],
	exports: [CommonModule, ExtendedTimeAgoPipe],
	imports: [CommonModule],
})
export class SharedModule {}
