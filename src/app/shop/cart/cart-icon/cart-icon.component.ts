import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCartCount } from '../../state/cart/cart.selectors';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cart-icon',
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './cart-icon.html',
  styleUrls: ['./cart-icon.css'],
})
export class CartIconComponent {
  private store = inject(Store);

  // Observable du nombre d'articles dans le panier
  count$ = this.store.select(selectCartCount);
}
