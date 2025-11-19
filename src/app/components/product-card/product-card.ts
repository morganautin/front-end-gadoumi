import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, NgIf],
  template: `
    <mat-card>
      <mat-card-title>{{ name }}</mat-card-title>
      <mat-card-subtitle>{{ price }} €</mat-card-subtitle>
      <p>Date de création : {{ created_at }}</p>
      <p *ngIf="avgRating">Note moyenne : {{ avgRating }}/5</p>
    </mat-card>
  `,
})
export class ProductCardComponent {
  @Input() name!: string;
  @Input() price!: number;
  @Input() created_at!: string;
  @Input() avgRating?: number;
}
