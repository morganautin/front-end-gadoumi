import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckoutService } from '../checkout/checkout.service';

export const addressFilledGuard: CanActivateFn = () => {
  const checkout = inject(CheckoutService);
  const router = inject(Router);

  const address = checkout.getAddress();

  if (address && address.name && address.address && address.city) {
    return true;
  }

  // Adresse manquante → retour étape adresse
  router.navigate(['/shop/checkout/step2']);
  return false;
};
