import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUserOrders, selectUserLoading } from '../profile/user.selectors';
import * as UserActions from '../profile/user.actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe, NgClass],
  template: `
    <div class="bg-gray-100 p-4 sm:p-8">
      <div class="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Mes Commandes</h1>

        @if (loading$ | async) {
          <p class="text-center text-gray-500">Chargement des commandes...</p>
        } @else {
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Commande</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                @for (order of orders$ | async; track order.id) {
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      <a [routerLink]="['/account/orders', order.id]">{{ order.id }}</a>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.date | date:'dd/MM/yyyy' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <span 
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        [ngClass]="{
                          'bg-yellow-100 text-yellow-800': order.status === 'en cours',
                          'bg-blue-100 text-blue-800': order.status === 'expédiée',
                          'bg-green-100 text-green-800': order.status === 'livrée'
                        }"
                      >
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-800">{{ order.total | currency:'EUR' }}</td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="4" class="px-6 py-4 text-center text-gray-500">Vous n'avez aucune commande pour le moment.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  `,
})
export class OrdersComponent implements OnInit {
  private store = inject(Store);
  orders$ = this.store.select(selectUserOrders);
  loading$ = this.store.select(selectUserLoading);

  ngOnInit() {
    // On déclenche l'action pour charger les commandes à chaque fois que le composant est créé
    this.store.dispatch(UserActions.loadUserOrders());
  }
}