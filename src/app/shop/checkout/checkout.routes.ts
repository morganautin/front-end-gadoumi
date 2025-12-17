import { Routes } from '@angular/router';
import { cartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { addressFilledGuard } from '../guards/address-filled.guard';

export const CHECKOUT_ROUTES: Routes = [
  {
    path: 'step1',
    loadComponent: () =>
      import('./step1-summary.component').then(m => m.Step1SummaryComponent),
  },
  {
    path: 'step2',
    loadComponent: () =>
      import('./step2-address.component').then(m => m.Step2AddressComponent),
    canActivate: [cartNotEmptyGuard],
  },
  {
    path: 'step3',
    loadComponent: () =>
      import('./step3-confirm.component').then(m => m.Step3ConfirmComponent),
    canActivate: [cartNotEmptyGuard, addressFilledGuard],
  },
  {
    path: '',
    redirectTo: 'step1',
    pathMatch: 'full',
  },
];
