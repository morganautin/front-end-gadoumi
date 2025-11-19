import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CartItem } from '../state/cart/cart.models';
import * as CartSelectors from '../state/cart/cart.selectors';


@Component({
  selector: 'app-step1-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step1-summary.component.html',
  styleUrls: ['./step1-summary.component.css'],
})
export class Step1SummaryComponent {

  // ❗ Déclaration simple, PAS D’INITIALISATION
  items$!: Observable<CartItem[]>;
  total$!: Observable<number>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    // ❗ Initialisation APRES injection du store
    this.items$ = this.store.select(CartSelectors.selectCartItems);
    this.total$ = this.store.select(CartSelectors.selectCartTotal);
  }

  goToAddress() {
    this.router.navigate(['/shop/checkout/step2']);
  }
}
