import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>Mes Commandes</h1>
    <p>Cette page affichera bientôt la liste des commandes.</p> `,
})
export class OrdersComponent {}