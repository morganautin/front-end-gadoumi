import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DevIndexComponent } from './dev/dev-index.component';
import { DevAuthComponent } from './dev/dev-auth.component';
import { DevProductsComponent } from './dev/dev-products.component';
import { DevProductRatingComponent } from './dev/dev-product-rating.component';
import { AppPlaceholderComponent } from './app-placeholder.component';

// 🔹 Import des nouvelles pages
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { RatingComponent } from './pages/rating/rating.component';

export const routes: Routes = [
  // Pages principales existantes
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'dev', component: DevIndexComponent },
  { path: 'dev/auth', component: DevAuthComponent },
  { path: 'dev/products', component: DevProductsComponent },
  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },
  { path: 'app', component: AppPlaceholderComponent },

  // 🔹 Nouvelles routes du TP
  { path: 'login', component: LoginComponent },
  { path: 'shop/products', component: ProductsComponent },
  { path: 'shop/rating', component: RatingComponent },

  // Redirections
  { path: '**', redirectTo: '' },
];
