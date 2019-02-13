import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.customerService.save(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {

          this.toastr.success("Customer successfully registered", "", {
            positionClass: "toast-bottom-right"
          });
          this.router.navigate(['/']);
        },
        error => {
          this.toastr.error("Customer registration failed", "", {
            positionClass: "toast-bottom-right"
          });
          this.loading = false;
        });
  }
}
