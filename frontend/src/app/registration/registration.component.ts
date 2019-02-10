import {Component} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/customer";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {

  customer: Customer;

  constructor(private customerService: CustomerService) {

  }

  register() {
    this.customerService.save(this.customer).subscribe(() => {

    })
  }
}
