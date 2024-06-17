import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

import { Product } from '../product.model';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, RouterLink],
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  @Input() products: Product[] | null = [];
  @Input() total: number | null = 0;
  @Input() showProductCode: boolean | null = false;
  @Output() toggleProductCode = new EventEmitter<void>();
}
