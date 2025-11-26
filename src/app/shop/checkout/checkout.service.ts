import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private address: any = null;

  saveAddress(data: any) {
    this.address = data;
  }

  getAddress() {
    return this.address;
  }

  createOrder(orderData: any) {
    return fetch('/api/orders/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
  }
}
