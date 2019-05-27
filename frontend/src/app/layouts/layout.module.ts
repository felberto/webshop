import {NgModule} from "@angular/core";
import {NavigationComponent} from "./navigation/navigation.component";
import {CommonModule} from "@angular/common";
import {LoginModalService} from "../services/modal/login.modal.service";
import {LoginModule} from "../login/login.module";
import {LoginComponent} from "../login/login.component";
import {RouterModule} from "@angular/router";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [NavigationComponent],
  imports: [CommonModule, RouterModule, LoginModule, NgbDropdownModule],
  providers: [LoginModalService],
  entryComponents: [LoginComponent]
})
export class LayoutModule {
}
