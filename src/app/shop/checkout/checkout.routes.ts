import { Routes } from '@angular/router';

export const CHECKOUT_ROUTES: Routes = [
  {
    path: 'step1',
    loadComponent: () => import('./step1-summary.component').then(m => m.Step1SummaryComponent), // Correct
  },
  {
    path: 'step2',
    loadComponent: () => import('./step2-address.component').then(m => m.Step2AddressComponent), // Correct
  },
  {
    path: 'step3',
    loadComponent: () => import('./step3-confirm.component').then(m => m.Step3ConfirmComponent), // Correct
  },
  {
    path: '',
    redirectTo: 'step1',
    pathMatch: 'full',
  },
];