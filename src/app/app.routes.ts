import { Routes } from '@angular/router';

// 🔹 Pages principales existantes
import { HomeComponent } from './home.component';
import { DevIndexComponent } from './dev/dev-index.component';
import { DevAuthComponent } from './dev/dev-auth.component';
import { DevProductsComponent } from './dev/dev-products.component';
import { DevProductRatingComponent } from './dev/dev-product-rating.component';
import { AppPlaceholderComponent } from './app-placeholder.component';

// 🔹 Nouvelles pages (TP)
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { RatingComponent } from './pages/rating/rating.component';

// 🔹 Page Panier (lazy import car standalone)
export const routes: Routes = [
  // ----------------------------------------------------
  // 🔹 ROUTES PRINCIPALES
  // ----------------------------------------------------
  { path: '', component: HomeComponent, pathMatch: 'full' },

  // Dev tools
  { path: 'dev', component: DevIndexComponent },
  { path: 'dev/auth', component: DevAuthComponent },
  { path: 'dev/products', component: DevProductsComponent },
  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },

  { path: 'app', component: AppPlaceholderComponent },

  // ----------------------------------------------------
  // 🔹 ROUTES DU SHOP
  // ----------------------------------------------------
  { path: 'login', component: LoginComponent },
  { path: 'shop/products', component: ProductsComponent },
  { path: 'shop/rating', component: RatingComponent },

  // 🛒 ROUTE DU PANIER (standalone → lazy load)
  {
    path: 'shop/cart',
    loadComponent: () =>
      import('./shop/cart/cart-page/cart-page.component').then(
        (m) => m.CartPageComponent
      ),
  },

  // ----------------------------------------------------
  // 🔹 FALLBACK
  // ----------------------------------------------------
  { path: '**', redirectTo: '' },
];
