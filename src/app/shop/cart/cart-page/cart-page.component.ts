import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CartItem } from '../../state/cart/cart.models';
import * as CartActions from '../../state/cart/cart.actions';
import * as CartSelectors from '../../state/cart/cart.selectors';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  // ✅ Déclaration simple
  items$!: Observable<CartItem[]>;
  total$!: Observable<number>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    // ✅ Initialisation ici, une fois `store` injecté
    this.items$ = this.store.select(CartSelectors.selectCartItems);
    this.total$ = this.store.select(CartSelectors.selectCartTotal);
  }

  increase(item: CartItem) {
    this.store.dispatch(
      CartActions.updateQuantity({
        productId: item.id,
        quantity: item.quantity + 1
      })
    );
  }

  decrease(item: CartItem) {
    const newQty = item.quantity - 1;

    if (newQty <= 0) {
      this.remove(item);
      return;
    }

    this.store.dispatch(
      CartActions.updateQuantity({
        productId: item.id,
        quantity: newQty
      })
    );
  }

  remove(item: CartItem) {
    this.store.dispatch(
      CartActions.removeFromCart({ productId: item.id })
    );
  }

  // 🔹 Bouton "Valider la commande"
  goToCheckout() {
    this.router.navigate(['/shop/checkout/step1']);
  }
}
