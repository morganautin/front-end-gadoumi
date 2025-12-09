import { Routes } from '@angular/router';
import { FavoritesComponent } from './pages/products/favorites.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/account/profile/profile.component';
import { RatingComponent } from './pages/rating/rating.component';
import { OrdersComponent } from './pages/account/orders/orders.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'shop/products', pathMatch: 'full'
  },
  {
    // 🟦 On délègue toutes les routes commençant par 'shop' au fichier de routes de la boutique.
    path: 'shop',
    loadChildren: () => import('./shop/shop.routes').then(m => m.SHOP_ROUTES)
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    title: 'Mes Favoris'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'account/profile',
    component: ProfileComponent
  },
  {
    path: 'reviews',
    component: RatingComponent
  },
  {
    path: 'account/orders',
    component: OrdersComponent
  }
];