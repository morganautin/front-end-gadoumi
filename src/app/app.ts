import { Component, signal, inject } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

// 🔹 Import du composant standalone du panier
import { CartIconComponent } from './shop/cart/cart-icon/cart-icon.component';
import { selectIsLoggedIn } from './state/auth/auth.selectors';
import * as AuthActions from './state/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CartIconComponent,
    AsyncPipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-shop');
  private store = inject(Store);
  private router = inject(Router);

  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  logout() {
    // On déclenche l'action de déconnexion pour nettoyer l'état et le localStorage
    this.store.dispatch(AuthActions.logout());
    // On redirige l'utilisateur vers la page de connexion
    this.router.navigate(['/login']);
  }
}
