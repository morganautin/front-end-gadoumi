// Contenu de src/app/shop/shop.routes.ts
import { Routes } from '@angular/router';

export const SHOP_ROUTES: Routes = [
  {
    path: 'products',
    loadComponent: () => import('../pages/products/products.component').then(m => m.ProductsComponent),
  },
  {
    path: 'products/:id',
    // TODO: Créer ce composant pour afficher les détails d'un produit
    loadComponent: () => import('./product-detail.component').then(m => m.ProductDetailComponent),
  },
  {
    path: 'cart',
    // C'est la première étape du processus de paiement, qui sert de résumé du panier.
    loadComponent: () => import('./checkout/step1-summary.component').then(m => m.Step1SummaryComponent),
  },
  {
    path: 'checkout',
    // Le chemin correct vers les routes du checkout
    loadChildren: () => import('./checkout/checkout.routes').then(m => m.CHECKOUT_ROUTES),
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];
