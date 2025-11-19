import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// reducers existants
import { authReducer } from './state/auth/auth.reducer';
import { productsReducer } from './state/products/products.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { ProductsEffects } from './state/products/products.effects';

// cart
import { cartReducer } from './shop/state/cart/cart.reducer';
import { CART_FEATURE_KEY } from './shop/state/cart/cart.selectors';
import { initialCartState } from './shop/state/cart/cart.models';


/* 🔐 Charger le panier depuis localStorage */
export function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : initialCartState;
  } catch {
    return initialCartState;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withFetch()),
    provideAnimations(),

    // store racine
    provideStore({
      auth: authReducer,
      products: productsReducer
    }),

    // 🟦 Charger l'état du panier AU DÉMARRAGE
    provideState(CART_FEATURE_KEY, loadCartFromStorage()),

    // 🟦 Attacher ensuite le reducer du panier
    provideState(CART_FEATURE_KEY, cartReducer),

    provideEffects([
      AuthEffects,
      ProductsEffects
    ]),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
