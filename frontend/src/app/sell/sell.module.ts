import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SellComponent} from "./sell.component";
import {SellCreateModalService} from "../services/sell-create.modal.service";
import {SellCreateComponent} from "./sell-create.component";
import {ItemService} from "../services/item.service";

@NgModule({
  declarations: [
    SellComponent,
    SellCreateComponent
  ],
  exports: [SellComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [SellCreateModalService, ItemService]
})
export class SellModule {
}
