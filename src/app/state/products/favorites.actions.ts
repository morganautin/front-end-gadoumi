import { createAction, props } from '@ngrx/store';
import { Product } from './products.actions';

export const addToFavorites = createAction(
  '[Favorites] Add to Favorites',
  props<{ product: Product }>()
);

export const removeFromFavorites = createAction(
  '[Favorites] Remove from Favorites',
  props<{ productId: number }>()
);