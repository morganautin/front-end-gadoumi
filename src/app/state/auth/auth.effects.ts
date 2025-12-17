import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as Auth from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../core/notifications/notification.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private notifications = inject(NotificationService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Auth.login),
      switchMap(({ username, password }) =>
        this.http.post<{ access: string; refresh: string }>(
          `${environment.apiBaseUrl}auth/token/`,
          { username, password }
        ).pipe(
          map(res => Auth.loginSuccess(res)),
          catchError(err =>
            of(Auth.loginFailure({ error: err?.error?.detail ?? 'Login failed' }))
          )
        )
      )
    )
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Auth.loginFailure),
        tap(({ error }) => {
          this.notifications.error(error || 'Échec de la connexion');
        })
      ),
    { dispatch: false }
  );
}

