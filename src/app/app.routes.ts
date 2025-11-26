import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { provideUserFeature } from './pages/account/profile/user.state';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop/products',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.routes').then(m => m.SHOP_ROUTES),
  },
  {
    path: 'reviews',
    loadComponent: () => import('./pages/rating/rating.component').then(m => m.RatingComponent),
  },
  {
    path: 'account',
    canActivate: [authGuard],
    providers: [
      provideUserFeature(), // On active le state et les effects pour l'utilisateur ici
    ],
    children: [
      {
        path: 'profile',
        loadComponent: () => import('./pages/account/profile/profile.component').then(m => m.ProfileComponent),
      },
      {
        path: 'orders',
        loadComponent: () => import('./pages/account/orders/orders.component').then(m => m.OrdersComponent),
      },
      // Les futures routes comme 'orders/:id' viendront ici
    ],
  },
];