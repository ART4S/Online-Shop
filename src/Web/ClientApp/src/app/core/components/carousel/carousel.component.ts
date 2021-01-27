import {
	animate,
	AnimationBuilder,
	AnimationPlayer,
	style,
} from '@angular/animations';
import {
	AfterViewInit,
	Component,
	ContentChildren,
	Directive,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { CarouselItemDirective } from '../../directives/carousel-item.directive';

@Directive({
	selector: '.carousel__item',
})
export class CarouselItemElement {}

@Component({
	selector: 'carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	exportAs: 'carousel',
})
export class CarouselComponent implements AfterViewInit {
	@ViewChildren(CarouselItemElement, { read: ElementRef })
	private itemsElements: QueryList<ElementRef>;

	@ViewChild('carousel')
	private carousel: ElementRef;

	private slideWidth: number;

	private player: AnimationPlayer;

	private currentSlide = 0;

	@Input() displayItemsCount = 1;

	carouselStyle = {};

	@Input() timing = '400ms ease-in';

	@Output() selectItem = new EventEmitter<number>();

	@ContentChildren(CarouselItemDirective)
	items: QueryList<CarouselItemDirective>;

	constructor(private builder: AnimationBuilder) {}

	ngAfterViewInit() {
		this.displayItemsCount = Math.min(this.displayItemsCount, this.items.length);

		this.slideWidth =
			this.itemsElements.first.nativeElement.getBoundingClientRect().width *
			this.displayItemsCount;

		this.carouselStyle = {
			width: `${this.slideWidth}px`,
		};

		this.gotoSlide(this.currentSlide);
	}

	hasNext(): boolean {
		return (
			this.items &&
			this.currentSlide < Math.ceil(this.items.length / this.displayItemsCount) - 1
		);
	}

	hasPrev(): boolean {
		return this.currentSlide > 0;
	}

	next(): void {
		this.gotoSlide(this.currentSlide + 1);
	}

	prev(): void {
		this.gotoSlide(this.currentSlide - 1);
	}

	private gotoSlide(slide: number) {
		const i = Math.ceil(this.items.length / this.displayItemsCount);
		if (
			slide < 0 ||
			slide > Math.ceil(this.items.length / this.displayItemsCount) - 1
		) {
			return;
		}

		const offset = -1 * this.slideWidth * slide;

		const animation = this.builder.build([
			animate(
				this.timing,
				style({
					transform: `translateX(${offset}px)`,
				})
			),
		]);

		this.player = animation.create(this.carousel.nativeElement);

		this.player.play();

		this.currentSlide = slide;

		this.selectItem.emit(slide);
	}
}
