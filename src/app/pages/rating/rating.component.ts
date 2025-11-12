import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as P from '../../state/products/products.actions';
import { selectProducts } from '../../state/products/products.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-rating-page',
  imports: [ReactiveFormsModule, AsyncPipe, NgIf, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  template: `
  <mat-card>
    <h3>Product rating</h3>
    <form [formGroup]="form" (ngSubmit)="fetch()">
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Product ID</mat-label>
        <input matInput type="number" formControlName="id">
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">Get rating</button>
    </form>

    <p *ngIf="lastRating">Dernier: id={{ lastRating.id }}, avg={{ lastRating.avg }}</p>
  </mat-card>
  `,
})
export class RatingComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  form = this.fb.group({ id: [1, Validators.required] });

  lastRating: { id:number; avg:number } | null = null;

  fetch() {
    const id = this.form.value.id!;
    this.store.dispatch(P.loadRating({ id }));
    // pour une démo simple : on écoute la liste et on récupère la moyenne quand ça met à jour
    this.store.select(selectProducts).subscribe(list => {
      const found = list.find(p => p.id === id);
      if (found?.avg_rating != null) this.lastRating = { id, avg: found.avg_rating };
    });
  }
}

