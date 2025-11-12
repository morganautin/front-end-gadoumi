import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field>
        <mat-label>Username</mat-label>
        <input matInput formControlName="username" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" />
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">Se connecter</button>
    </form>
  `,
})
export class LoginFormComponent {
  private fb = new FormBuilder();

  @Output() submitForm = new EventEmitter<{ username: string; password: string }>();

  form = this.fb.group({
    username: ['demo', Validators.required],
    password: ['demo', Validators.required],
  });

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
