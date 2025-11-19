import { createReducer, on } from '@ngrx/store';
import * as P from './products.actions';

export interface ProductsState {
  items: P.Product[];
  count: number;
  lastQuery: {
    page: number;
    pageSize: number;
    minRating: number | null;
    ordering: string | null;
  } | null;
  loading: boolean;
  error: string | null;

  // 👇 nouveau : dernier rating récupéré via /products/:id/rating/
  lastRating: {
    id: number;
    avg_rating: number;
    count: number;
  } | null;
}

export const initialProductsState: ProductsState = {
  items: [],
  count: 0,
  lastQuery: null,
  loading: false,
  error: null,
  lastRating: null,
};

export const productsReducer = createReducer(
  initialProductsState,

  // chargement liste produits
  on(P.loadProducts, (s, q) => ({
    ...s,
    loading: true,
    error: null,
    lastQuery: { ...q },
  })),

  on(P.loadProductsSuccess, (s, { data }) => ({
    ...s,
    loading: false,
    count: data.count,
    items: data.results,
  })),

  on(P.loadProductsFailure, (s, { error }) => ({
    ...s,
    loading: false,
    error,
  })),

  // 👇 chargement d'un rating (on peut aussi activer le spinner)
  on(P.loadRating, (s) => ({
    ...s,
    loading: true,
    error: null,
  })),

  // rating optionnel : on stocke la dernière moyenne obtenue
  // ET on met à jour l'item correspondant si présent dans la liste
  on(P.loadRatingSuccess, (s, { id, avg_rating, count }) => ({
    ...s,
    loading: false,
    lastRating: { id, avg_rating, count },
    items: s.items.map((it) =>
      it.id === id ? { ...it, avg_rating } : it
    ),
  })),

  on(P.loadRatingFailure, (s, { error }) => ({
    ...s,
    loading: false,
    error,
  }))
);
