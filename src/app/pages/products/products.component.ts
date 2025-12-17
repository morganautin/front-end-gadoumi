import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  selectProductsCount,
  selectProductsLoading,
} from '../../state/products/products.selectors';
import { selectFavoriteProducts } from '../../state/products/favorites.selectors';
import { Product } from '../../state/products/products.actions';
import * as P from '../../state/products/products.actions';

import * as CartActions from '../../shop/state/cart/cart.actions';
import * as FavoritesActions from '../../state/products/favorites.actions';

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
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { debounceTime, takeUntil, distinctUntilChanged } from 'rxjs/operators';

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
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    HttpClientModule,
  ],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  hasError = false;

  filters = this.fb.group({
    page: 1,
    pageSize: 6,
    minRating: null as number | null,
    ordering: null as string | null,
  });

  products$ = this.store.select(selectProducts);
  count$ = this.store.select(selectProductsCount);
  loading$ = this.store.select(selectProductsLoading);

  favoriteProducts: Product[] = [];
  ratings: Record<number, { avg: number; count: number } | null> = {};

  ngOnInit() {
    /**
     * 🔄 Restaurer état depuis l’URL
     */
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.filters.patchValue(
          {
            page: Number(params.get('page') ?? 1),
            pageSize: Number(params.get('pageSize') ?? 6),
            minRating: params.get('minRating')
              ? Number(params.get('minRating'))
              : null,
            ordering: params.get('ordering'),
          },
          { emitEvent: false }
        );

        this.load();
      });

    /**
     * ⏱ Debounce sur filtres
     */
    this.filters.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(
          (a, b) =>
            a.minRating === b.minRating &&
            a.ordering === b.ordering &&
            a.page === b.page
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.syncUrlFromFilters();
        this.load();
      });

    /**
     * ❤️ Favoris
     */
    this.store
      .select(selectFavoriteProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((favs) => (this.favoriteProducts = favs));

    /**
     * ⭐ Ratings produits
     */
    this.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => {
        if (!list) return;

        for (const p of list) {
          if (!p.id || this.ratings[p.id] !== undefined) continue;

          this.http
            .get<ProductRating>(`/api/products/${p.id}/rating/`)
            .subscribe({
              next: (res) =>
                (this.ratings[p.id] = {
                  avg: res.avg_rating,
                  count: res.count,
                }),
              error: () => (this.ratings[p.id] = null),
            });
        }
      });

    /**
     * ❌ Détection erreur API (simple & TP-compatible)
     */
    combineLatest([this.loading$, this.products$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([loading, products]) => {
        if (!loading && products === null) {
          this.hasError = true;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  syncUrlFromFilters() {
    const v = this.filters.getRawValue();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: v.page,
        pageSize: v.pageSize,
        ...(v.minRating !== null && { minRating: v.minRating }),
        ...(v.ordering && { ordering: v.ordering }),
      },
    });
  }

  load() {
    this.hasError = false;

    const v = this.filters.getRawValue();

    this.store.dispatch(
      P.loadProducts({
        page: v.page!,
        pageSize: v.pageSize!,
        minRating: v.minRating,
        ordering: v.ordering,
      })
    );
  }

  nextPage(total: number) {
    if (this.filters.value.page! < this.getTotalPages(total)) {
      this.filters.patchValue({ page: this.filters.value.page! + 1 });
      this.syncUrlFromFilters();
      this.load();
    }
  }

  previousPage() {
    if (this.filters.value.page! > 1) {
      this.filters.patchValue({ page: this.filters.value.page! - 1 });
      this.syncUrlFromFilters();
      this.load();
    }
  }

  getTotalPages(total: number): number {
    return Math.ceil(total / this.filters.value.pageSize!);
  }

  addToCart(p: Product) {
    this.store.dispatch(
      CartActions.addToCart({
        product: { id: p.id, name: p.name, price: p.price },
        quantity: 1,
      })
    );
  }

  toggleFavorite(p: Product) {
    this.store.dispatch(
      this.isFavorite(p.id)
        ? FavoritesActions.removeFromFavorites({ productId: p.id })
        : FavoritesActions.addToFavorites({ product: p })
    );
  }

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.some((p) => p.id === productId);
  }
}


