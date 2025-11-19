import { createReducer, on } from '@ngrx/store';
import { CartState, initialCartState, CartItem } from './cart.models';
import * as CartActions from './cart.actions';

export const cartReducer = createReducer(
  initialCartState,

  // ➕ Ajouter un produit au panier
  on(CartActions.addToCart, (state, { product, quantity }) => {
    const existing = state.items.find((item) => item.id === product.id);

    let updatedItems: CartItem[];

    if (existing) {
      // produit déjà dans le panier → on augmente la quantité
      updatedItems = state.items.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
    } else {
      // nouveau produit → on l'ajoute
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
      };

      updatedItems = [...state.items, newItem];
    }

    // recalcul total
    const totalPrice = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const count = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      ...state,
      items: updatedItems,
      totalPrice,
      count,
    };
  }),

  // 🗑️ Supprimer un produit
  on(CartActions.removeFromCart, (state, { productId }) => {
    const updatedItems = state.items.filter((item) => item.id !== productId);

    const totalPrice = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const count = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      ...state,
      items: updatedItems,
      totalPrice,
      count,
    };
  }),

  // 🧹 Vider le panier
  on(CartActions.clearCart, () => ({
    items: [],
    totalPrice: 0,
    count: 0,
  }))
);
