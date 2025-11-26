import { createAction, props } from '@ngrx/store';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  preferences: Partial<{ newsletter: boolean; defaultMinRating: number; }>;
}

export interface OrderSummary {
  id: string;
  date: string; // Renommé de orderDate à date
  total: number; // Renommé de totalAmount à total
  status: 'en cours' | 'expédiée' | 'livrée' | string; // Ajout de 'string' pour plus de flexibilité
}

export const loadUserProfile = createAction('[User] Load User Profile');
export const loadUserProfileSuccess = createAction('[User] Load User Profile Success', props<{ profile: UserProfile }>());
export const loadUserProfileFailure = createAction('[User] Load User Profile Failure', props<{ error: string }>());

export const updateUserProfile = createAction('[User] Update User Profile', props<{ profile: Partial<UserProfile> }>());
export const updateUserProfileSuccess = createAction('[User] Update User Profile Success', props<{ profile: UserProfile }>());
export const updateUserProfileFailure = createAction('[User] Update User Profile Failure', props<{ error: string }>());

export const loadUserOrders = createAction('[User] Load User Orders');
export const loadUserOrdersSuccess = createAction('[User] Load User Orders Success', props<{ orders: OrderSummary[] }>());
export const loadUserOrdersFailure = createAction('[User] Load User Orders Failure', props<{ error: string }>());