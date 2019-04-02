import {Component, OnInit} from "@angular/core";
import {Customer} from "../models/customer";
import {AuthenticationService} from "../services/authentication.service";
import {first} from "rxjs/operators";
import {CustomerService} from "../services/customer.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  currentUser: Customer;

  constructor(private authService: AuthenticationService, private customerService: CustomerService,
              private toastr: ToastrService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(){
    this.customerService.getProfile(this.currentUser.id).subscribe(res => {
      this.currentUser = res.body;
    });
  }

  onSubmit(){
    // stop here if form is invalid
    // if (this.profileForm.invalid) {
    //   return;
    // }
    // Todo: update function
    this.customerService.update(this.currentUser.id, this.currentUser)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success("Data update successful", "", {
            positionClass: "toast-bottom-right"
          });
        },
        error => {
          this.toastr.error("Data update failed", "", {
            positionClass: "toast-bottom-right"
          });
        });
  }
}
