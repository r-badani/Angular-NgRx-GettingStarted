import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction('[Product] Toggle Product Code');

export const selectCurrentProduct = createAction(
  '[Product] Select Current Product',
  props<{ product: Product }>()
);

export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
)

export const initializeNewProduct = createAction(
  '[Product] Initialize New Product'
)
