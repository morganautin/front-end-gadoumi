import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from './checkout.service';
import { Store, select } from '@ngrx/store';
import { take, switchMap } from 'rxjs/operators';

import * as CartActions from '../state/cart/cart.actions';
import { selectCartTotal } from '../state/cart/cart.selectors';
import * as UserActions from '../../pages/account/profile/user.actions';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/notifications/notification.service';

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
  private notifications = inject(NotificationService);

  address: any = null;

  shipping = 3.90;
  taxRate = 0.2;
  discount = 0;
  subtotal = 0;

  ngOnInit() {
    this.address = this.checkout.getAddress();

    this.store
      .select(selectCartTotal)
      .pipe(take(1))
      .subscribe(total => {
        this.subtotal = total;
      });
  }

  getTaxes(): number {
    return this.subtotal * this.taxRate;
  }

  getFinalTotal(): number {
    return this.subtotal + this.shipping + this.getTaxes() - this.discount;
  }

  confirmOrder() {
    this.store.pipe(
      select(selectCartTotal),
      take(1),
      switchMap(total => {
        const orderPayload = {
          total,
          shippingAddress: this.checkout.getAddress(),
        };
        return this.checkout.createOrder(orderPayload);
      }),
    ).subscribe({
      next: () => {
        this.notifications.success('Commande validée avec succès');
        this.store.dispatch(CartActions.clearCart());
        this.store.dispatch(UserActions.loadUserOrders());
        this.router.navigate(['/account/orders']);
      },
      error: () => {
        this.notifications.error('Stock insuffisant pour finaliser la commande');
      },
    });
  }
}


