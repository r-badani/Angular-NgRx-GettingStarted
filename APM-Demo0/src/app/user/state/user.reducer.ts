import {
  createReducer,
  createAction,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { User } from '../user';

export interface UserState {
  currentUser: User;
  maskUserName: boolean;
}

const initialState: UserState = {
  currentUser: null,
  maskUserName: false,
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const isUserNameMasked = createSelector(
  getUserFeatureState,
  (state) => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state.currentUser
);

export const userReducer = createReducer<UserState>(
  initialState,
  on(createAction('[User] Toggle mask user name'), (state): UserState => {
    console.log('[User] Toggle mask user name', state.maskUserName);
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
