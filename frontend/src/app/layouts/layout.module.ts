import {NgModule} from "@angular/core";
import {NavigationComponent} from "./navigation/navigation.component";
import {CommonModule} from "@angular/common";
import {LoginModalService} from "../services/login.modal.service";
import {LoginModule} from "../login/login.module";
import {LoginComponent} from "../login/login.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [NavigationComponent],
  imports: [CommonModule, RouterModule, LoginModule],
  providers: [LoginModalService],
  entryComponents: [LoginComponent]
})
export class LayoutModule {
}
