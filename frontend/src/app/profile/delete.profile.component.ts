import {Component, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from "../services/authentication.service";
import {Customer} from "../models/customer";
import {CustomerService} from "../services/customer.service";
import {first} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.profile.modal-component.html'
})
export class DeleteProfileComponent implements OnInit{

  currentUser: Customer;

  constructor(private activeModal: NgbActiveModal, private authService: AuthenticationService,
              private customerService: CustomerService, private toastr: ToastrService, private router: Router) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  deactivateProfile(){
    this.customerService.deactivateProfile(this.currentUser.id)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success("Profile deleted", "", {
            positionClass: "toast-bottom-right"
          });
          this.authService.logout();
          this.router.navigate(['']);
          },
          error => {
            this.toastr.error("Data update failed", "", {
              positionClass: "toast-bottom-right"
            });
          });
  }
}
