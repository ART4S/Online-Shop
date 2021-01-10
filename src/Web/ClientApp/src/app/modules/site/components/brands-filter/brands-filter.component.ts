import { Component, Input, OnInit } from '@angular/core';
import FilterItem from 'src/app/core/models/helpers/filter-item';

@Component({
  selector: 'app-brands-filter',
  templateUrl: './brands-filter.component.html',
  styleUrls: ['./brands-filter.component.scss']
})
export class BrandsFilterComponent implements OnInit {
  @Input() brands: FilterItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
