import {Component, OnInit} from "@angular/core";
import {Customer} from "../models/customer";
import {AuthenticationService} from "../services/authentication.service";
import {first} from "rxjs/operators";
import {CustomerService} from "../services/customer.service";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {DeleteProfileService} from "../services/modal/delete.profile.modal.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  currentUser: Customer;

  constructor(private authService: AuthenticationService, private customerService: CustomerService,
              private toastr: ToastrService, private deleteProfileService: DeleteProfileService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(){
    this.customerService.getProfile(this.currentUser.id).subscribe(res => {
      this.currentUser = res.body;
    });
  }

  onSubmit(form: NgForm){
    this.customerService.update(this.currentUser)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success("Data update successful", "", {
            positionClass: "toast-bottom-right"
          });
          this.markFormAsPristine(form);
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.authService.currentUserValue = this.currentUser;
        },
        error => {
          this.toastr.error("Data update failed", "", {
            positionClass: "toast-bottom-right"
          });
        });
  }

  private markFormAsPristine(form: NgForm) {
    Object.keys(form.controls)
      .forEach(fieldName =>
        form.controls[fieldName].markAsPristine()
      );
  }

  deleteProfile(){
    this.deleteProfileService.open();
  }
}
