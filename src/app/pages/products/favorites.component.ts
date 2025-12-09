import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFavoriteProducts } from '../../state/products/favorites.selectors';
import * as FavoritesActions from '../../state/products/favorites.actions';
import { Product } from '../../state/products/products.actions';
import { AsyncPipe, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,    
    CurrencyPipe, // Ce pipe est utilisé dans le template ci-dessous
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Mes Favoris</h1>
      <div *ngIf="favorites$ | async as products">
        <div *ngIf="products.length > 0; else emptyFavorites" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <mat-card *ngFor="let p of products" class="product-card">
            <mat-card-title class="product-title">{{ p.name }}</mat-card-title>
            <mat-card-content class="product-content">
              <div>Prix: {{ p.price | currency : 'EUR' }}</div>
            </mat-card-content>
            <mat-card-actions>
                <button mat-icon-button (click)="removeFromFavorites(p.id)" aria-label="Retirer des favoris">
                    <mat-icon>delete</mat-icon>
                </button>
            </mat-card-actions>
          </mat-card>
        </div>
        <ng-template #emptyFavorites>
          <p>Vous n'avez aucun produit dans vos favoris.</p>
        </ng-template>
      </div>
    </div>
  `,
})
export class FavoritesComponent {
  private store = inject(Store);
  favorites$ = this.store.select(selectFavoriteProducts);

  removeFromFavorites(productId: number) {
    this.store.dispatch(FavoritesActions.removeFromFavorites({ productId }));
  }
}