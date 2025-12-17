import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotal } from '../state/cart/cart.selectors';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { NotificationService } from '../../core/notifications/notification.service';

@Component({
  selector: 'app-step1-summary',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './step1-summary.component.html',
  styleUrls: ['./step1-summary.component.css']
})
export class Step1SummaryComponent {
  private store = inject(Store);
  private router = inject(Router);
  private notifications = inject(NotificationService);

  items$ = this.store.select(selectCartItems);
  total$ = this.store.select(selectCartTotal);

  // règles métier
  shipping = 3.90;
  taxRate = 0.2;
  discount = 0;
  promoCode = '';

  getTaxes(subtotal: number): number {
    return subtotal * this.taxRate;
  }

  getFinalTotal(subtotal: number): number {
    return subtotal + this.shipping + this.getTaxes(subtotal) - this.discount;
  }

  applyPromo() {
    if (this.promoCode !== 'PROMO10') {
      this.notifications.error('Code promo invalide');
      return;
    }

    this.discount = 10;
    this.notifications.success('Code promo appliqué');
  }

  goToAddress() {
    this.router.navigate(['/shop/checkout/step2']);
  }
}

