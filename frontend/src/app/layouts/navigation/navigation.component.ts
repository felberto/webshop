import {Component} from '@angular/core';
import {LoginModalService} from "../../services/login.modal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  constructor(private loginModalService: LoginModalService, private router: Router) {
  }

  openModal() {
    this.loginModalService.open();
  }

  navigate(link: string){
    //ToDo: fix
    this.router.navigateByUrl('/' + link);
  }

}
