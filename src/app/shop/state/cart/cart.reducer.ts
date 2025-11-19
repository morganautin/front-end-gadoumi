import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartState, CartItem, initialCartState } from './cart.models';

/* ----------------------------------------
   🔄 Charger l'état du panier depuis localStorage
-----------------------------------------*/
function loadCartFromStorage(): CartState {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : initialCartState;
  } catch {
    return initialCartState;
  }
}

/* ----------------------------------------
   💾 Sauvegarder dans localStorage
-----------------------------------------*/
function saveCartState(state: CartState) {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch {}
}

/* ----------------------------------------
   🧮 Recalculer total & quantité
-----------------------------------------*/
function computeTotals(items: CartItem[]) {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return { totalPrice, count };
}

/* ----------------------------------------
   🧠 REDUCER NG-RX AVEC PERSISTENCE
-----------------------------------------*/
export const cartReducer = createReducer(

  // 🔥 On démarre avec l’état du localStorage
  loadCartFromStorage(),

  // ➕ Ajouter au panier
  on(CartActions.addToCart, (state, { product, quantity }) => {
    const existing = state.items.find(i => i.id === product.id);

    let items: CartItem[];

    if (existing) {
      items = state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      items = [
        ...state.items,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity
        }
      ];
    }

    const totals = computeTotals(items);
    const newState = { ...state, items, ...totals };

    saveCartState(newState);
    return newState;
  }),

  // ➖ Mettre à jour la quantité
  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    let items = state.items.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );

    items = items.filter(i => i.quantity > 0);

    const totals = computeTotals(items);
    const newState = { ...state, items, ...totals };

    saveCartState(newState);
    return newState;
  }),

  // 🗑 Supprimer un produit
  on(CartActions.removeFromCart, (state, { productId }) => {
    const items = state.items.filter(item => item.id !== productId);
    const totals = computeTotals(items);

    const newState = { ...state, items, ...totals };

    saveCartState(newState);
    return newState;
  }),

  // 🔄 Vider le panier
  on(CartActions.clearCart, () => {
    saveCartState(initialCartState);
    return { ...initialCartState };
  })
);
