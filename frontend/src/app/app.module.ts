import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule} from "./layouts/layout.module";
import {RegistrationModule} from "./registration/registration.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {ProfileModule} from "./profile/profile.module";
import {AuthGuard} from "./shared/guards/auth.guard";
import {SellModule} from "./sell/sell.module";
import {SellCreateComponent} from "./sell/sell-create.component";
import {FormsModule} from "@angular/forms";
import {SearchModule} from "./search/search.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    LayoutModule,
    RegistrationModule,
    ProfileModule,
    SellModule,
    SearchModule
  ],
  entryComponents: [
    SellCreateComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
