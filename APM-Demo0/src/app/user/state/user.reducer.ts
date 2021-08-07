import { createReducer, createAction, on } from '@ngrx/store';

export const userReducer = createReducer(
  { maskUserName: true },
  on(createAction('[User] Toggle mask user name'), (state) => {
    console.log('[User] Toggle mask user name', state.maskUserName);
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
