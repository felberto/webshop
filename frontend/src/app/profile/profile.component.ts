import {Component} from "@angular/core";
import {Customer} from "../models/customer";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

  currentUser: Customer;

  constructor(private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

}
