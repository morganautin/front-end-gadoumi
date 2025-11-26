import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import * as ProductsActions from '../state/products/products.actions';
import { selectSelectedProduct, selectProductsLoading } from '../state/products/products.selectors';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CurrencyPipe,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="p-4 sm:p-8">
      @if (loading$ | async) {
        <div class="flex justify-center items-center h-64">
          <mat-spinner></mat-spinner>
        </div>
      } @else if (product$ | async; as product) {
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ product.name }}</mat-card-title>
            <mat-card-subtitle>Note: {{ product.avg_rating | number:'1.1-1' }}/5</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content class="mt-4">
            <p class="text-2xl font-bold text-gray-800">{{ product.price | currency:'EUR' }}</p>
            <p class="mt-4 text-gray-600">{{ product.description }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-flat-button color="primary">Ajouter au panier</button>
            <a mat-stroked-button routerLink="/shop/products">Retour à la liste</a>
          </mat-card-actions>
        </mat-card>
      } @else {
        <p class="text-center text-red-500">Produit non trouvé.</p>
      }
    </div>
  `,
})
export class ProductDetailComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  product$ = this.store.select(selectSelectedProduct);
  loading$ = this.store.select(selectProductsLoading);

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      map(id => this.store.dispatch(ProductsActions.loadProduct({ id: id! })))
    ).subscribe();
  }
}