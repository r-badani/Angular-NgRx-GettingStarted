import {
  createAction,
  createFeatureSelector,
  createReducer,
  on,
  createSelector,
} from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';
import { selectCurrentProduct, toggleProductCode } from './product.actions';

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
  (state) => state.showProductCode
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  (state) => state.currentProduct
);

export const productReducer = createReducer<ProductState>(
  initialState,
  on(toggleProductCode, (state): ProductState => {
    console.log(state);
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(selectCurrentProduct, (state, action) => {
    return {
      ...state,
      currentProduct: action.product
    }
  })
);
