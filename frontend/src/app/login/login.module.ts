import {NgModule} from "@angular/core";
import {CustomerService} from "../services/customer.service";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./login.component";

@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [LoginComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [CustomerService]
})
export class LoginModule {
}
