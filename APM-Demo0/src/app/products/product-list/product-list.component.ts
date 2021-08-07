import {
  State,
  ProductState,
  getToggleState,
  getCurrentProduct,
} from './../state/products.reducers';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err) => (this.errorMessage = err),
    });

    this.store.select(getCurrentProduct).subscribe((product) => {
      console.log(product)
      this.selectedProduct = product;
      console.log(this.selectedProduct);
    });

    this.store.select(getToggleState).subscribe((show: boolean) => {
      this.displayCode = show;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeNewProduct())
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.selectCurrentProduct({ product }));
  }
}
