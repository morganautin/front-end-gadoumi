import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, DatePipe],
  template: `
    <mat-card>
      <mat-card-title>{{ name }}</mat-card-title>
      <mat-card-content>
        <div>Prix : {{ price | currency:'EUR' }}</div>
        <div>Date : {{ created_at | date }}</div>
        <div>Moyenne : {{ avgRating }}</div>
      </mat-card-content>
    </mat-card>
  `,
})
export class ProductCardComponent {
  @Input() name!: string;
  @Input() price!: number;
  @Input() created_at!: string;
  @Input() avgRating!: number;
}
