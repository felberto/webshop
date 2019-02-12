import {Component} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/customer";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  customer: Customer = new Customer();

  constructor(private customerService: CustomerService, public activeModal: NgbActiveModal, private router: Router) {

  }

  login() {
    
  }

  register(){
    this.activeModal.close('register');
    this.router.navigate(['register']);
  }
}
