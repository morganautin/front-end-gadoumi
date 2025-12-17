import { selectOrdersByStatus } from './user.selectors';

describe('User Orders Selectors', () => {

  it('should filter orders by status', () => {
    const orders = [
      { id: 1, status: 'pending', total: 20 },
      { id: 2, status: 'shipped', total: 50 },
      { id: 3, status: 'shipped', total: 30 },
    ];

    const result = selectOrdersByStatus('shipped').projector(orders);

    expect(result.length).toBe(2);
    expect(result.every((o: any) => o.status === 'shipped')).toBeTrue();
  });

});


