import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from './checkout.service';
import { Store, select } from '@ngrx/store';
import { take, switchMap } from 'rxjs/operators';

import * as CartActions from '../state/cart/cart.actions';
import { selectCartTotal } from '../state/cart/cart.selectors';
import * as UserActions from '../../pages/account/profile/user.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step3-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3-confirm.component.html',
  styleUrls: ['./step3-confirm.component.css'],
})
export class Step3ConfirmComponent implements OnInit {
  private checkout = inject(CheckoutService);
  private router = inject(Router);
  private store = inject(Store);

  address: any = null;

  ngOnInit() {
    // On récupère l'adresse de manière asynchrone pour l'afficher dans le template
    this.address = this.checkout.getAddress();
  }

  /**
   * Cette méthode est appelée lors du clic sur le bouton "Confirmer la commande".
   */
  confirmOrder() {
    // 1. On récupère le total du panier.
    this.store.pipe(
      select(selectCartTotal),
      take(1),
      // 2. On utilise switchMap pour chaîner l'appel asynchrone à createOrder.
      switchMap(total => {
        const orderPayload = {
          total: total,
          shippingAddress: this.checkout.getAddress(), // On récupère l'adresse juste avant de créer la commande
        };
        return this.checkout.createOrder(orderPayload);
      }),
    ).subscribe({
      next: () => {
        // 3. Une fois la commande créée avec succès :
        // On vide le panier.
        this.store.dispatch(CartActions.clearCart());
        // On demande à l'application de RECHARGER la liste des commandes.
        this.store.dispatch(UserActions.loadUserOrders());
        // On redirige l'utilisateur vers sa nouvelle liste de commandes.
        this.router.navigate(['/account/orders']);
      },
      error: (err) => console.error('Erreur lors de la création de la commande', err)
    });
  }
}
