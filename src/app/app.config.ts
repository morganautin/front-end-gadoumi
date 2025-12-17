import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// reducers existants
import { authReducer } from './state/auth/auth.reducer';
import { productsReducer } from './state/products/products.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { ProductsEffects } from './state/products/products.effects';
import { UserEffects } from './pages/account/profile/user.effects';
import { favoritesFeatureKey, favoritesReducer } from './state/products/favorites.reducer';
import { USER_FEATURE } from './pages/account/profile/user.state';

// cart
import { cartReducer } from './shop/state/cart/cart.reducer';
import { CART_FEATURE_KEY } from './shop/state/cart/cart.selectors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withFetch()),
    provideAnimations(),

    // ✅ Material Snackbar (compatible toutes versions)
    importProvidersFrom(MatSnackBarModule),

    // store racine
    provideStore({
      auth: authReducer,
      products: productsReducer
    }),

    // 🟦 Panier
    provideState(CART_FEATURE_KEY, cartReducer),

    // 🟦 Favoris
    provideState(favoritesFeatureKey, favoritesReducer),

    // 🟦 Utilisateur
    provideState(USER_FEATURE.name, USER_FEATURE.reducer),

    provideEffects([
      AuthEffects,
      ProductsEffects,
      UserEffects,
    ]),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};


