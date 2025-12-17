import { selectFavoriteProducts } from './favorites.selectors';

describe('Favorites Selectors', () => {

  it('should return favorite products list', () => {
    const favoritesState = {
      products: [
        { id: 1, name: 'Stylo', price: 2 },
        { id: 2, name: 'Cahier', price: 4 },
      ],
    };

    const result = selectFavoriteProducts.projector(favoritesState);

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Stylo');
  });

});
