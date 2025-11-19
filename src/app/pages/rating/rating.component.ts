import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf, DecimalPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
  ],
  templateUrl: './rating.html',
  styleUrls: ['./rating.css'],
})
export class RatingComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  form = this.fb.group({
    id: [1, Validators.required],
  });

  loading = false;
  error: string | null = null;
  lastRating: ProductRating | null = null;

  fetch() {
    this.error = null;
    this.lastRating = null;

    if (this.form.invalid) return;

    const id = this.form.value.id!;
    this.loading = true;

    // ⬇️ URL vue dans tes DevTools : /api/products/1/rating/
    this.http
      .get<ProductRating>(`/api/products/${id}/rating/`)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.lastRating = res;
        },
        error: () => {
          this.loading = false;
          this.error = 'Aucune note trouvée pour cet ID.';
        },
      });
  }
}


