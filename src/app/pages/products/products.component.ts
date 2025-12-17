import { Component, inject, OnInit } from '@angular/core';
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
export class ProductsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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
     * 1️⃣ Restaurer l’état depuis l’URL
     * (chargement initial + Back / Forward)
     */
    this.route.queryParamMap.subscribe((params) => {
      const page = Number(params.get('page') ?? 1);
      const pageSize = Number(params.get('pageSize') ?? 6);

      const minRatingParam = params.get('minRating');
      const minRating =
        minRatingParam === null ? null : Number(minRatingParam);

      const ordering = params.get('ordering');

      this.filters.patchValue(
        {
          page,
          pageSize,
          minRating: Number.isNaN(minRating) ? null : minRating,
          ordering: ordering ? ordering : null,
        },
        { emitEvent: false }
      );

      this.load();
    });

    /**
     * Favoris
     */
    this.store
      .select(selectFavoriteProducts)
      .subscribe((favs) => (this.favoriteProducts = favs));

    /**
     * Ratings produits
     */
    this.products$.subscribe((list: Product[]) => {
      if (!list) return;

      for (const p of list) {
        if (!p.id || this.ratings[p.id] !== undefined) continue;

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

  /**
   * 🔄 Filtres modifiés
   */
  onFiltersChange() {
    this.filters.patchValue({ page: 1 }, { emitEvent: false });
    this.syncUrlFromFilters();
    this.load();
  }

  /**
   * 🔗 Synchronisation URL ← filtres
   */
  syncUrlFromFilters() {
    const v = this.filters.getRawValue();

    const queryParams: any = {
      page: v.page,
      pageSize: v.pageSize,
    };

    if (v.minRating !== null) queryParams.minRating = v.minRating;
    if (v.ordering) queryParams.ordering = v.ordering;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: '',
    });
  }

  /**
   * 📦 Chargement produits
   */
  load() {
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

  /**
   * 📄 Pagination
   */
  nextPage(total: number) {
    const maxPage = this.getTotalPages(total);
    const current = this.filters.value.page!;

    if (current < maxPage) {
      this.filters.patchValue({ page: current + 1 });
      this.syncUrlFromFilters();
      this.load();
    }
  }

  previousPage() {
    const current = this.filters.value.page!;

    if (current > 1) {
      this.filters.patchValue({ page: current - 1 });
      this.syncUrlFromFilters();
      this.load();
    }
  }

  getTotalPages(total: number): number {
    return Math.ceil(total / this.filters.value.pageSize!);
  }

  /**
   * 🛒 Panier
   */
  addToCart(p: Product) {
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

  /**
   * ❤️ Favoris
   */
  toggleFavorite(p: Product) {
    if (this.isFavorite(p.id)) {
      this.store.dispatch(
        FavoritesActions.removeFromFavorites({ productId: p.id })
      );
    } else {
      this.store.dispatch(
        FavoritesActions.addToFavorites({ product: p })
      );
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.some((p) => p.id === productId);
  }
}

