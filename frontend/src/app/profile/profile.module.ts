import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ProfileComponent} from "./profile.component";
import {AuthenticationService} from "../services/authentication.service";
import {EmailValidator} from "../shared/validators/EmailValidator";
import {DeleteProfileComponent} from "./delete.profile.component";
import {DeleteProfileService} from "../services/modal/delete.profile.modal.service";

@NgModule({
  declarations: [
    ProfileComponent,
    EmailValidator,
    DeleteProfileComponent
  ],
  exports: [ProfileComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [AuthenticationService, DeleteProfileService],
  entryComponents: [DeleteProfileComponent]
})
export class ProfileModule {
}
