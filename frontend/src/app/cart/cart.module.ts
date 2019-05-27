import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ItemService} from "../services/item.service";
import {CartComponent} from "./cart.component";

@NgModule({
  declarations: [
    CartComponent
  ],
  exports: [CartComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [ItemService]
})
export class CartModule {
}
