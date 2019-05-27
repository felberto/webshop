import {NgModule} from "@angular/core";
import {RegistrationComponent} from "./registration.component";
import {CustomerService} from "../services/customer.service";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  exports: [RegistrationComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule],
  providers: [CustomerService]
})
export class RegistrationModule {
}
