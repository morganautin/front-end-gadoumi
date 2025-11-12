import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as Auth from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Auth.login),
      switchMap(({ username, password }) =>
        this.http.post<{ access: string; refresh: string }>(
          `${environment.apiBaseUrl}auth/token/`,
          { username, password }
        ).pipe(
          map(res => Auth.loginSuccess(res)),
          catchError(err => of(Auth.loginFailure({ error: err?.error?.detail ?? 'Login failed' })))
        )
      )
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Auth.refreshToken),
      switchMap(({ refresh }) =>
        this.http.post<{ access: string }>(
          `${environment.apiBaseUrl}auth/token/refresh/`,
          { refresh }
        ).pipe(
          map(res => Auth.refreshSuccess({ access: res.access })),
          catchError(err => of(Auth.loginFailure({ error: err?.error?.detail ?? 'Refresh failed' })))
        )
      )
    )
  );
}
