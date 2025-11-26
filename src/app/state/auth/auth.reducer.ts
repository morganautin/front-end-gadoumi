import { createReducer, on } from '@ngrx/store';
import * as Auth from './auth.actions';

export interface AuthState {
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  access: null,
  refresh: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(Auth.login, s => ({ ...s, loading: true, error: null })),
  on(Auth.loginSuccess, (s, { access, refresh }) => ({ ...s, loading: false, access, refresh })),
  on(Auth.loginFailure, (s, { error }) => ({ ...s, loading: false, error })),
  on(Auth.refreshToken, s => ({ ...s, loading: true })),
  on(Auth.refreshSuccess, (s, { access }) => ({ ...s, loading: false, access })),

  // 👇 Gérer la déconnexion en réinitialisant l'état
  on(Auth.logout, (state) => ({
    ...initialAuthState
  }))
);
