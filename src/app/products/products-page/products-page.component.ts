import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import { sumProducts } from 'src/app/utils/sum-products';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products: Product[] = [];
  total = 0;
  loading = true;
  showProductCode = false;
  errorMessage = '';

  constructor(private productsService: ProductsService, private store: Store) {
    this.store.subscribe(store => console.log(store));
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.total = sumProducts(products);
        this.loading = false;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    this.showProductCode = !this.showProductCode;
  }
}
