import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorites from './favorites.reducer';

export const selectFavoritesState =
  createFeatureSelector<fromFavorites.FavoritesState>(
    fromFavorites.favoritesFeatureKey
  );

export const selectFavoriteProducts = createSelector(
  selectFavoritesState,
  (state) => state.products
);

export const selectFavoritesCount = createSelector(selectFavoriteProducts, (products) => products.length);