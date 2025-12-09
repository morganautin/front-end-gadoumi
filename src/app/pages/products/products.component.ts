import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  selectProductsCount,
  selectProductsLoading,
} from '../../state/products/products.selectors';
import { selectFavoriteProducts } from '../../state/products/favorites.selectors';
import { Product } from '../../state/products/products.actions'; // Assurez-vous que l'interface Product est exportée ici ou ajustez le chemin
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
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
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

  filters = this.fb.group({
    page: 1,
    pageSize: 10,
    minRating: null as number | null,
    ordering: null as string | null,
  });

  products$ = this.store.select(selectProducts);
  count$ = this.store.select(selectProductsCount);
  loading$ = this.store.select(selectProductsLoading);

  favoriteProducts: Product[] = [];
  ratings: Record<number, { avg: number; count: number } | null> = {};

  ngOnInit() {
    this.load();

    // On s'abonne aux favoris pour savoir lesquels afficher avec un coeur plein
    this.store.select(selectFavoriteProducts).subscribe(favs => this.favoriteProducts = favs);

    this.products$.subscribe((list: Product[]) => {
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
  addToCart(p: Product) { // Spécifier le type de 'p'
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

  // ❤️ GESTION DES FAVORIS (AJOUT/RETRAIT)
  toggleFavorite(p: Product) {
    if (this.isFavorite(p.id)) {
      console.log('💔 Retrait des favoris :', p);
      this.store.dispatch(FavoritesActions.removeFromFavorites({ productId: p.id }));
    } else {
      console.log('❤️ Ajout aux favoris :', p);
      this.store.dispatch(FavoritesActions.addToFavorites({ product: p }));
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.some(p => p.id === productId);
  }
}
