import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { USER_FEATURE } from './user.state';


// 1. Sélectionne la "feature" (la tranche) 'user' de l'état global
export const selectUserFeature = createFeatureSelector<UserState>(USER_FEATURE.name);

// 2. À partir de la feature, sélectionne le profil utilisateur complet
export const selectUserProfile = createSelector(selectUserFeature, (state) => state);

// 3. Sélectionne uniquement la liste des commandes
export const selectUserOrders = createSelector(selectUserFeature, (state) => state.orders);

// 4. Sélectionne l'état de chargement
export const selectUserLoading = createSelector(selectUserFeature, (state) => state.loading);