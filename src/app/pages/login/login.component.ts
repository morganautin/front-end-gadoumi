import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as Auth from '../../state/auth/auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
  selectIsLoggedIn,
} from '../../state/auth/auth.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    NgIf,
  ],
  template: `
    <div class="login-wrapper">
      <mat-card class="login-card">
        <h2 class="login-title">Connexion</h2>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Nom d'utilisateur</mat-label>
            <input matInput formControlName="username" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Mot de passe</mat-label>
            <input matInput type="password" formControlName="password" />
          </mat-form-field>

          <div class="actions">
            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="loading$ | async"
            >
              Se connecter
            </button>
          </div>
        </form>

        <p class="error" *ngIf="(error$ | async) as err">{{ err }}</p>
        <p class="success" *ngIf="(isLoggedIn$ | async)">Connecté ✅</p>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  form = this.fb.group({
    username: ['demo', Validators.required],
    password: ['demo', Validators.required],
  });

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);
  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  submit() {
    if (this.form.invalid) return;

    const { username, password } = this.form.getRawValue();

    // Vérif front simple : seuls demo/demo sont acceptés
    if (username !== 'demo' || password !== 'demo') {
      this.store.dispatch(
        Auth.loginFailure({ error: 'Identifiants invalides' })
      );
      return;
    }

    // Si OK => on dispatch le login NgRx
    this.store.dispatch(
      Auth.login({ username: username!, password: password! })
    );

    // Et on redirige vers /shop/products quand isLoggedIn passe à true
    this.isLoggedIn$
      .pipe(
        filter((logged) => !!logged),
        take(1)
      )
      .subscribe(() => {
        this.router.navigate(['/shop/products']);
      });
  }
}

