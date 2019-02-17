import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ProfileComponent} from "./profile.component";
import {AuthenticationService} from "../services/authentication.service";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  exports: [ProfileComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [AuthenticationService]
})
export class ProfileModule {
}
