import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 sm:p-8">
      <h1 class="text-3xl font-bold text-gray-800">Page des Avis</h1>
      <p class="mt-4 text-gray-600">Cette page affichera bientôt les avis des utilisateurs.</p>
    </div>
  `,
})
export class ReviewsComponent {}