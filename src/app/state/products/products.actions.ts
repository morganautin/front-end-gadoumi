import { createAction, props } from '@ngrx/store';

export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  avg_rating?: number;
}

export const loadProducts = createAction(
  '[Products] loadProducts',
  props<{
    page: number;
    pageSize: number;
    minRating: number | null;
    ordering: string | null;
  }>()
);

export const loadProductsSuccess = createAction(
  '[Products] loadProductsSuccess',
  props<{ data: { count: number; results: Product[] } }>()
);

export const loadProductsFailure = createAction(
  '[Products] loadProductsFailure',
  props<{ error: string }>()
);

// 🔹 Chargement de la note d’un produit
export const loadRating = createAction(
  '[Products] loadRating',
  props<{ id: number }>()
);

export const loadRatingSuccess = createAction(
  '[Products] loadRatingSuccess',
  props<{ id: number; avg_rating: number; count: number }>()
);

export const loadRatingFailure = createAction(
  '[Products] loadRatingFailure',
  props<{ error: string }>()
);
