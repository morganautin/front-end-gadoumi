import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as Auth from '../../state/auth/auth.actions';
import { selectAuthError, selectAuthLoading, selectIsLoggedIn } from '../../state/auth/auth.selectors';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, AsyncPipe, NgIf
  ],
  template: `
  <mat-card>
    <h2>Login</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Username</mat-label>
        <input matInput formControlName="username">
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password">
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="loading$ | async">Se connecter</button>
    </form>

    <p class="text-red-600" *ngIf="(error$ | async) as err">{{ err }}</p>
    <p class="text-green-700" *ngIf="(isLoggedIn$ | async)">Connecté ✅</p>
  </mat-card>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

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
    this.store.dispatch(Auth.login({ username: username!, password: password! }));
  }
}
