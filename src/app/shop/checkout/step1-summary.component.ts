import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotal } from '../state/cart/cart.selectors';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';

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
  styleUrls: ['./step1-summary.component.css'] // J'ai ajouté un fichier CSS pour le style
})
export class Step1SummaryComponent {
  private store = inject(Store);
  private router = inject(Router);

  // On récupère les données du panier depuis le store NgRx
  items$ = this.store.select(selectCartItems);
  total$ = this.store.select(selectCartTotal);

  /**
   * Navigue vers la prochaine étape du checkout (l'adresse).
   */
  goToAddress() {
    // Le chemin complet est /shop (défini dans app.routes) + /checkout (défini dans shop.routes) + /step2 (défini dans checkout.routes)
    this.router.navigate(['/shop/checkout/step2']);
  }
}