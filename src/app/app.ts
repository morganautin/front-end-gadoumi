import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from './state/auth/auth.selectors';
import * as AuthActions from './state/auth/auth.actions';
import { selectFavoritesCount } from './state/products/favorites.selectors';

// Imports pour le template
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartIconComponent } from './shop/cart/cart-icon/cart-icon.component';

@Component({
  selector: 'app-root', // Le sélecteur utilisé dans index.html
  standalone: true,
  // On importe ici tout ce qui est utilisé dans app.html
  imports: [
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    MatIconModule,
    CartIconComponent
  ],
  templateUrl: './app.html',
})
export class App { // Le nom de la classe est 'App' comme indiqué dans les erreurs
  private store = inject(Store);

  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  favoritesCount$ = this.store.select(selectFavoritesCount); // <-- La propriété manquante

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}