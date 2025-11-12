import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] loginSuccess', props<{ access: string; refresh: string }>());
export const loginFailure = createAction('[Auth] loginFailure', props<{ error: string }>());

export const refreshToken = createAction('[Auth] refreshToken', props<{ refresh: string }>());
export const refreshSuccess = createAction('[Auth] refreshSuccess', props<{ access: string }>());
