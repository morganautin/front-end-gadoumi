import { createReducer, on } from '@ngrx/store';
import * as P from './products.actions';

export interface ProductsState {
  items: P.Product[];
  count: number;
  lastQuery: { page:number; pageSize:number; minRating:number|null; ordering:string|null } | null;
  loading: boolean;
  error: string | null;
}

export const initialProductsState: ProductsState = {
  items: [],
  count: 0,
  lastQuery: null,
  loading: false,
  error: null,
};

export const productsReducer = createReducer(
  initialProductsState,
  on(P.loadProducts, (s, q) => ({ ...s, loading: true, error: null, lastQuery: { ...q } })),
  on(P.loadProductsSuccess, (s, { data }) => ({ ...s, loading: false, count: data.count, items: data.results })),
  on(P.loadProductsFailure, (s, { error }) => ({ ...s, loading: false, error })),
  // rating optionnel : maj locale si on reçoit la moyenne
  on(P.loadRatingSuccess, (s, { id, avg_rating }) => ({
    ...s,
    items: s.items.map(it => it.id === id ? { ...it, avg_rating } : it)
  })),
);
