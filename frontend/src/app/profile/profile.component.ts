import {Component, OnInit} from "@angular/core";
import {Customer} from "../models/customer";
import {AuthenticationService} from "../services/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {CustomerService} from "../services/customer.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  currentUser: Customer;
  profileForm: FormGroup;
  submitted = false;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private customerService: CustomerService,
              private toastr: ToastrService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(){
    this.profileForm = this.formBuilder.group({
      firstName: [this.currentUser.firstName, Validators.required],
      lastName: [this.currentUser.lastName, Validators.required],
      email: [this.currentUser.email, [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.profileForm.controls;
  }
  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    // Todo:
    this.customerService.update(this.profileForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success("Registration successful", "", {
            positionClass: "toast-bottom-right"
          });
        },
        error => {
          this.toastr.error("Registration failed", "", {
            positionClass: "toast-bottom-right"
          });
        });
  }
}
