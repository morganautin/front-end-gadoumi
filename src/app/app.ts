import { Component, signal } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';

// 🔹 Import du composant standalone du panier
import { CartIconComponent } from './shop/cart/cart-icon/cart-icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CartIconComponent, // ⬅️ obligatoire pour éviter NG8001
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-shop');

  constructor(private router: Router) {}

  logout() {
    // Simple retour à l'accueil
    this.router.navigate(['/']);
  }
}
