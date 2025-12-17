import { cartReducer, initialState } from './cart.reducer';
import * as CartActions from './cart.actions';

describe('CartReducer', () => {

  it('should add item and update total', () => {
    const action = CartActions.addToCart({
      product: { id: 1, name: 'Stylo', price: 2 },
      quantity: 2,
    });

    const state = cartReducer(initialState, action);

    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.total).toBe(4);
  });

  it('should update quantity and recalc total', () => {
    const startState = {
      ...initialState,
      items: [{ id: 1, name: 'Stylo', price: 2, quantity: 1 }],
      total: 2,
    };

    const action = CartActions.updateQuantity({
      productId: 1,
      quantity: 3,
    });

    const state = cartReducer(startState, action);

    expect(state.items[0].quantity).toBe(3);
    expect(state.total).toBe(6);
  });

  it('should remove item and recalc total', () => {
    const startState = {
      ...initialState,
      items: [{ id: 1, name: 'Stylo', price: 2, quantity: 2 }],
      total: 4,
    };

    const action = CartActions.removeFromCart({ productId: 1 });

    const state = cartReducer(startState, action);

    expect(state.items.length).toBe(0);
    expect(state.total).toBe(0);
  });

});
