import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// ⬇️ branche tes slices NgRx
import { authReducer } from './state/auth/auth.reducer';
import { productsReducer } from './state/products/products.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { ProductsEffects } from './state/products/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withFetch()),
    provideAnimations(),

    // ⬇️ Enregistrement du store + effects
    provideStore({ auth: authReducer, products: productsReducer }),
    provideEffects([AuthEffects, ProductsEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
