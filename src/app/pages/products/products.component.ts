import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectProducts, selectProductsCount, selectProductsLoading } from '../../state/products/products.selectors';
import * as P from '../../state/products/products.actions';
import { AsyncPipe, NgFor, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-products-page',
  imports: [
    ReactiveFormsModule, AsyncPipe, NgIf, NgFor,
    CurrencyPipe, DatePipe,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule
  ],
  template: `
  <section class="space-y-4">
    <form class="flex flex-wrap gap-3 items-end" [formGroup]="filters" (ngSubmit)="load()">
      <mat-form-field appearance="outline">
        <mat-label>Page</mat-label>
        <input matInput type="number" formControlName="page">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Page size</mat-label>
        <input matInput type="number" formControlName="pageSize">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Min rating</mat-label>
        <input matInput type="number" formControlName="minRating">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Ordering</mat-label>
        <mat-select formControlName="ordering">
          <mat-option [value]="null">—</mat-option>
          <mat-option value="price">price ↑</mat-option>
          <mat-option value="-price">price ↓</mat-option>
          <mat-option value="created_at">date ↑</mat-option>
          <mat-option value="-created_at">date ↓</mat-option>
        </mat-select>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="loading$ | async">Charger</button>
    </form>

    <p *ngIf="(count$ | async) as c">Total: {{ c }}</p>
    <p *ngIf="loading$ | async">Chargement…</p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      <mat-card *ngFor="let p of (products$ | async)">
        <mat-card-title>{{ p.name }}</mat-card-title>
        <mat-card-content>
          <div>Prix: {{ p.price | currency:'EUR' }}</div>
          <div>Date: {{ p.created_at | date }}</div>
          <div>Moyenne: {{ p.avg_rating ?? '—' }}</div>
        </mat-card-content>
      </mat-card>
    </div>
  </section>
  `,
})
export class ProductsComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  filters = this.fb.group({
    page: 1,
    pageSize: 10,
    minRating: null as number | null,
    ordering: null as string | null,
  });

  products$ = this.store.select(selectProducts);
  count$ = this.store.select(selectProductsCount);
  loading$ = this.store.select(selectProductsLoading);

  ngOnInit() { this.load(); } // charge au premier affichage

  load() {
    const v = this.filters.getRawValue();
    this.store.dispatch(P.loadProducts({
      page: v.page ?? 1,
      pageSize: v.pageSize ?? 10,
      minRating: v.minRating === null ? null : Number(v.minRating),
      ordering: v.ordering || null,
    }));
  }
}

