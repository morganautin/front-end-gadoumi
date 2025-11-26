import { createReducer, on } from '@ngrx/store';
// L'import de user.actions est correct car il est dans le même dossier
import * as UserActions from './user.actions';

export interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  fullName: string | null;
  preferences: Partial<{ newsletter: boolean; defaultMinRating: number }> | null;
  orders: UserActions.OrderSummary[] | null;
  loading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  id: null,
  username: null,
  email: null,
  fullName: null,
  preferences: null,
  orders: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialUserState,
  // Charger le profil
  on(UserActions.loadUserProfile, state => ({ ...state, loading: true, error: null })),
  on(UserActions.loadUserProfileSuccess, (state, { profile }) => ({ ...state, ...profile, loading: false })),
  on(UserActions.loadUserProfileFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Mettre à jour le profil
  on(UserActions.updateUserProfile, state => ({ ...state, loading: true })),
  on(UserActions.updateUserProfileSuccess, (state, { profile }) => ({
    ...state,
    ...profile,
    preferences: { ...state.preferences, ...profile.preferences },
    loading: false,
  })),
  on(UserActions.updateUserProfileFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Charger les commandes
  on(UserActions.loadUserOrders, state => ({ ...state, loading: true, error: null })),
  on(UserActions.loadUserOrdersSuccess, (state, { orders }) => ({ ...state, loading: false, orders })),
  on(UserActions.loadUserOrdersFailure, (state, { error }) => ({ ...state, loading: false, error, orders: [] }))
);