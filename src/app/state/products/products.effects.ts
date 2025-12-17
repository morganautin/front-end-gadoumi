import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as P from './products.actions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../core/notifications/notification.service';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private notifications = inject(NotificationService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.loadProducts),
      switchMap(({ page, pageSize, minRating, ordering }) => {
        let params = new HttpParams()
          .set('page', page)
          .set('page_size', pageSize);

        if (minRating != null) params = params.set('min_rating', minRating);
        if (ordering) params = params.set('ordering', ordering);

        return this.http
          .get<{ count: number; results: P.Product[] }>(
            `${environment.apiBaseUrl}products/`,
            { params }
          )
          .pipe(
            map(data => P.loadProductsSuccess({ data })),
            catchError(() =>
              of(P.loadProductsFailure({ error: 'Impossible de charger les produits' }))
            )
          );
      })
    )
  );

  loadProductsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(P.loadProductsFailure),
        tap(({ error }) => {
          this.notifications.error(error);
        })
      ),
    { dispatch: false }
  );
}

