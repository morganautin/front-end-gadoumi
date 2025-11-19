import { createAction, props } from '@ngrx/store';

// Ajouter au panier
export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: any; quantity: number }>()
);

// Supprimer un produit du panier
export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);

// Vider le panier
export const clearCart = createAction('[Cart] Clear Cart');

// Mettre à jour la quantité d’un produit
export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
);
