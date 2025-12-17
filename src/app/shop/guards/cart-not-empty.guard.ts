import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../state/cart/cart.selectors';
import { map, take } from 'rxjs/operators';

export const cartNotEmptyGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCartItems).pipe(
    take(1),
    map(items => {
      if (items.length > 0) {
        return true;
      }

      // Panier vide → retour au panier
      router.navigate(['/shop/cart']);
      return false;
    })
  );
};
