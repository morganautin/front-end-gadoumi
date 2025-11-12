import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');
export const selectProducts = createSelector(selectProductsState, s => s.items);
export const selectProductsCount = createSelector(selectProductsState, s => s.count);
export const selectProductsLoading = createSelector(selectProductsState, s => s.loading);
export const selectProductsError = createSelector(selectProductsState, s => s.error);
export const selectLastQuery = createSelector(selectProductsState, s => s.lastQuery);
