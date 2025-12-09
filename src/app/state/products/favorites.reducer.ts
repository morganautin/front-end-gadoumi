import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';
import { Product } from './products.actions';

export const favoritesFeatureKey = 'favorites';

export interface FavoritesState {
  products: Product[];
}

export const initialState: FavoritesState = {
  products: [],
};

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.addToFavorites, (state, { product }) => {
    // On vérifie que le produit n'est pas déjà dans les favoris pour éviter les doublons
    if (state.products.find((p) => p.id === product.id)) {
      return state;
    }
    return { ...state, products: [...state.products, product] };
  }),
  on(FavoritesActions.removeFromFavorites, (state, { productId }) => ({
    ...state,
    products: state.products.filter((p) => p.id !== productId),
  }))
);