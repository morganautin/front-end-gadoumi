import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css'],
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
      this.submitForm.emit(
        this.form.getRawValue() as { username: string; password: string }
      );
    }
  }
}
