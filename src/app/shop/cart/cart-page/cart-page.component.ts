import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import {
  selectCartItems,
  selectCartTotal
} from '../../state/cart/cart.selectors';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {

  items$;
  total$;

  constructor(private store: Store) {
    this.items$ = this.store.select(selectCartItems);
    this.total$ = this.store.select(selectCartTotal);
  }
}
