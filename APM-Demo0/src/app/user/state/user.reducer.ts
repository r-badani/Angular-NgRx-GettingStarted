import { createReducer, createAction, on } from '@ngrx/store';

export const userReducer = createReducer(
  {maskUserName: true},
  on(createAction('[User] Toggle mask user name'), (state) {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    }
  })
)
