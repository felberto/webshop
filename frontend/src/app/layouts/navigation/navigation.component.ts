import {Component} from '@angular/core';
import {LoginModalService} from "../../services/login.modal.service";
import {Router} from "@angular/router";
import {Customer} from "../../models/customer";
import {AuthenticationService} from "../../services/authentication.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  currentUser: Customer;

  constructor(private toastr: ToastrService, private loginModalService: LoginModalService, private authService: AuthenticationService, private router: Router) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);

  }

  openModal() {
    this.loginModalService.open();
  }

  navigate(link: string) {
    //ToDo: fix
    this.router.navigateByUrl('/' + link);
  }

  logout(){
    this.authService.logout();
    this.toastr.success("Logout successful", "", {
      positionClass: "toast-bottom-right"
    });
    this.router.navigate(['']);
  }

}
