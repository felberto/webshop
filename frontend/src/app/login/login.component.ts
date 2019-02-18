import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private customerService: CustomerService, private authService: AuthenticationService, private toastr: ToastrService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private router: Router) {

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe(data => {
          if (data != null) {
            this.toastr.success("Login successful", "", {
              positionClass: "toast-bottom-right"
            });
            this.activeModal.close('login');
            this.router.navigate(['profile']);
          } else {
            this.toastr.error("Login failed", "", {
              positionClass: "toast-bottom-right"
            });
          }
        }, err => {
          this.toastr.error("Login failed", "", {
            positionClass: "toast-bottom-right"
          });
        }
      )
  }

  register() {
    this.activeModal.close('register');
    this.router.navigate(['register']);
  }
}
