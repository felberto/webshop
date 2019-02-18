import {NgModule} from "@angular/core";
import {CustomerService} from "../services/customer.service";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./login.component";
import {AuthenticationService} from "../services/authentication.service";

@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [LoginComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [CustomerService, AuthenticationService]
})
export class LoginModule {
}
