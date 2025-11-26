import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from './checkout.service';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as CartActions from '../state/cart/cart.actions';
import { selectCartTotal } from '../state/cart/cart.selectors';
import * as UserActions from '../../pages/account/profile/user.actions';

@Component({
  selector: 'app-step3-confirm',
  standalone: true,
  templateUrl: './step3-confirm.component.html',
  styleUrls: ['./step3-confirm.component.css'],
})
export class Step3ConfirmComponent {
  private checkout = inject(CheckoutService);
  private router = inject(Router);
  private store = inject(Store);

  address: any = null;

  constructor() {
    this.address = this.checkout.getAddress();
  }

  /**
   * Cette méthode est appelée lors du clic sur le bouton "Confirmer la commande".
   */
  confirmOrder() {
    // 1. On récupère la valeur ACTUELLE du total du panier, une seule fois.
    this.store.pipe(select(selectCartTotal), take(1)).subscribe(total => {
      // 2. On prépare les données à envoyer à l'API
      const orderPayload = {
        total: total,
        shippingAddress: this.address,
        // On pourrait aussi ajouter les items du panier ici si l'API le demandait
      };

      // 3. On simule l'enregistrement de la commande en envoyant les données.
      this.checkout.createOrder(orderPayload).then(() => {
        // 4. On vide le panier.
        this.store.dispatch(CartActions.clearCart());
        // 5. On demande à l'application de RECHARGER la liste des commandes.
        this.store.dispatch(UserActions.loadUserOrders());
        // 6. On redirige l'utilisateur vers sa nouvelle liste de commandes.
        this.router.navigate(['/account/orders']);
      });
    });
  }
}
