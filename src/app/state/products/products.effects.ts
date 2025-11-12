import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as P from './products.actions';
import { Store } from '@ngrx/store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private store = inject(Store);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.loadProducts),
      switchMap(({ page, pageSize, minRating, ordering }) => {
        let params = new HttpParams().set('page', page).set('page_size', pageSize);
        if (minRating != null) params = params.set('min_rating', minRating);
        if (ordering) params = params.set('ordering', ordering);

        return this.http.get<{ count:number; results:P.Product[] }>(
          `${environment.apiBaseUrl}products/`, { params }
        ).pipe(
          map(data => P.loadProductsSuccess({ data })),
          catchError(() => of(P.loadProductsFailure({ error: 'Products fetch failed' })))
        );
      })
    )
  );

  // optionnel : rating d’un produit
  loadRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.loadRating),
      switchMap(({ id }) =>
        this.http.get<{ product_id:number; avg_rating:number; count:number }>(
          `${environment.apiBaseUrl}products/${id}/rating/`
        ).pipe(
          map(r => P.loadRatingSuccess({ id: r.product_id, avg_rating: r.avg_rating, count: r.count })),
          catchError(() => of(P.loadRatingFailure({ error: 'Rating fetch failed' })))
        )
      )
    )
  );
}
