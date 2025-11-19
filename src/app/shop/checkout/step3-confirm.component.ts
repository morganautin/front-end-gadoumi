import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-step3-confirm',
  standalone: true,
  templateUrl: './step3-confirm.component.html',
  styleUrls: ['./step3-confirm.component.css'],
})
export class Step3ConfirmComponent {
  address: any = null;

  constructor(
    private checkout: CheckoutService,
    private router: Router
  ) {
    this.address = this.checkout.getAddress();
  }

  backHome() {
    this.router.navigate(['/']);
  }
}


