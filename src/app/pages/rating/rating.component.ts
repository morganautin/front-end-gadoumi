import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf, DecimalPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import * as P from '../../state/products/products.actions';
import {
  selectLastRating,
  selectProductsError,
} from '../../state/products/products.selectors';
import { NotificationService } from '../../core/notifications/notification.service';

interface ProductRating {
  product_id: number;
  avg_rating: number;
  count: number;
}

@Component({
  standalone: true,
  selector: 'app-rating-page',
  imports: [
    ReactiveFormsModule,
    NgIf,
    DecimalPipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './rating.html',
  styleUrls: ['./rating.css'],
})
export class RatingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private notifications = inject(NotificationService);

  form = this.fb.group({
    id: [1, Validators.required],
  });

  lastRating: ProductRating | null = null;
  error: string | null = null; // ✅ AJOUT MANQUANT

  ngOnInit() {
    this.store.select(selectLastRating).subscribe((r) => {
      if (r) {
        this.lastRating = {
          product_id: r.id,
          avg_rating: r.avg_rating,
          count: r.count,
        };
        this.notifications.success('Avis ajouté avec succès');
      }
    });

    this.store.select(selectProductsError).subscribe((e) => {
      this.error = e;
      if (e) {
        this.notifications.error('Impossible de charger la note');
      }
    });
  }

  fetch() {
    this.error = null;

    if (this.form.invalid) return;

    const id = this.form.value.id!;
    this.store.dispatch(P.loadRating({ id }));
  }
}
