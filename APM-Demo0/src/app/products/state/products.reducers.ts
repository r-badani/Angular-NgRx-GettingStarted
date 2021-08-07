import { createAction, createFeatureSelector, createReducer, on, createSelector } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
  products: ProductState;
}
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getToggleState = createSelector(
  getProductFeatureState,
  state => state.showProductCode
)

export const productReducer = createReducer<ProductState>(
  initialState,
  on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
    console.log(state);
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  })
);
