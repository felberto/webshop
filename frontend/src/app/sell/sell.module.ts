import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SellComponent} from "./sell.component";
import {SellCreateModalService} from "../services/modal/sell-create.modal.service";
import {SellCreateComponent} from "./sell-create.component";
import {ItemService} from "../services/item.service";
import {SellEditComponent} from "./sell-edit.component";
import {SellEditModalService} from "../services/modal/sell-edit.modal.service";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

@NgModule({
  declarations: [
    SellComponent,
    SellCreateComponent,
    SellEditComponent
  ],
  exports: [SellComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, NgxSpinnerModule],
  providers: [SellCreateModalService, SellEditModalService, ItemService, NgxSpinnerService],
  entryComponents: [SellCreateComponent, SellEditComponent]
})
export class SellModule {
}
