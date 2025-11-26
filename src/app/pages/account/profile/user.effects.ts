import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import * as AuthActions from '../../../state/auth/auth.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  // Effet pour charger le profil utilisateur après une connexion réussie
  loadProfileOnLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess), // On écoute l'action de succès de la connexion
      map(() => UserActions.loadUserProfile()) // Quand ça arrive, on déclenche le chargement du profil
    )
  );

  // Effet pour charger le profil depuis l'API
  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserProfile),
      switchMap(() =>
        this.http.get<UserActions.UserProfile>('/api/me/').pipe(
          map(profile => UserActions.loadUserProfileSuccess({ profile })),
          catchError(error => of(UserActions.loadUserProfileFailure({ error: error.message })))
        )
      )
    )
  );
  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserProfile),
      switchMap(({ profile }) =>
        this.http.patch<UserActions.UserProfile>('/api/me/', profile).pipe(
          map(updatedProfile => UserActions.updateUserProfileSuccess({ profile: updatedProfile })),
          catchError(error => of(UserActions.updateUserProfileFailure({ error: error.message })))
        )
      )
    )
  );

  loadUserOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserOrders),
      switchMap(() =>
        this.http.get<UserActions.OrderSummary[]>('/api/me/orders/').pipe(
          map(orders => UserActions.loadUserOrdersSuccess({ orders })),
          catchError(error => of(UserActions.loadUserOrdersFailure({ error: error.message })))
        )
      )
    )
  );
}