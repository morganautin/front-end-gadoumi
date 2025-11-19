import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  selectProductsCount,
  selectProductsLoading,
} from '../../state/products/products.selectors';
import * as P from '../../state/products/products.actions';

import * as CartActions from '../../shop/state/cart/cart.actions';
 // ✅ IMPORT MANQUANT !!

import {
  AsyncPipe,
  NgFor,
  NgIf,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ProductRating {
  product_id: number;
  avg_rating: number;
  count: number;
}

@Component({
  standalone: true,
  selector: 'app-products-page',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    NgFor,
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
  ],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private http = inject(HttpClient);

  filters = this.fb.group({
    page: 1,
    pageSize: 10,
    minRating: null as number | null,
    ordering: null as string | null,
  });

  products$ = this.store.select(selectProducts);
  count$ = this.store.select(selectProductsCount);
  loading$ = this.store.select(selectProductsLoading);

  ratings: Record<number, { avg: number; count: number } | null> = {};

  ngOnInit() {
    this.load();

    this.products$.subscribe((list) => {
      if (!list) return;

      for (const p of list) {
        if (!p.id) continue;
        if (this.ratings[p.id] !== undefined) continue;

        this.http
          .get<ProductRating>(`/api/products/${p.id}/rating/`)
          .subscribe({
            next: (res) => {
              this.ratings[p.id] = {
                avg: res.avg_rating,
                count: res.count,
              };
            },
            error: () => {
              this.ratings[p.id] = null;
            },
          });
      }
    });
  }

  load() {
    const v = this.filters.getRawValue();
    this.store.dispatch(
      P.loadProducts({
        page: v.page ?? 1,
        pageSize: v.pageSize ?? 10,
        minRating: v.minRating === null ? null : Number(v.minRating),
        ordering: v.ordering || null,
      }),
    );
  }

  // 🛒 AJOUT AU PANIER (CORRECT NG-RX)
  addToCart(p: any) {
    console.log("🛒 Ajout au panier :", p);

    this.store.dispatch(
      CartActions.addToCart({
        product: {
          id: p.id,
          name: p.name,
          price: p.price,
        },
        quantity: 1,
      })
    );
  }
}
