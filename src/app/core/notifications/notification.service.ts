import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { styled } from 'storybook/theming';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['notif-success'],
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      panelClass: ['notif-error'],
    });
  }

  info(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }
}
