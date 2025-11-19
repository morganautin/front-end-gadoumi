import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from './checkout.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-step2-address',
  imports: [CommonModule, FormsModule],
  templateUrl: './step2-address.component.html',
  styleUrls: ['./step2-address.component.css'],
})
export class Step2AddressComponent {
  name = '';
  address = '';
  city = '';

  constructor(private checkout: CheckoutService, private router: Router) {}

  validateAddress() {
    if (!this.name || !this.address || !this.city) {
      return;
    }

    this.checkout.saveAddress({
      name: this.name,
      address: this.address,
      city: this.city
    });

    this.router.navigate(['/shop/checkout/step3']);
  }
}
