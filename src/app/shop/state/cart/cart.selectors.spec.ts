import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.models';

export const CART_FEATURE_KEY = 'cart';

export const selectCartState =
  createFeatureSelector<CartState>(CART_FEATURE_KEY);

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

export const selectCartTotal = createSelector(
  selectCartState,
  (state) => state.totalPrice
);

export const selectCartCount = createSelector(
  selectCartState,
  (state) => state.count
);

// ✅ AJOUT IMPORTANT (TP)
export const selectCartTotalItems = createSelector(
  selectCartItems,
  items => items.reduce((sum, i) => sum + i.quantity, 0)
);

