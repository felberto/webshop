import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ItemService} from "../services/item.service";
import {SearchComponent} from "./search.component";
import {FilterPipe} from "../shared/pipes/filter.pipe";
import {AddCartComponent} from "./add-cart.component";
import {AddCartModalService} from "../services/modal/add-cart.modal.service";

@NgModule({
  declarations: [
    SearchComponent,
    AddCartComponent,
    FilterPipe
  ],
  exports: [SearchComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [ItemService, AddCartModalService],
  entryComponents: [AddCartComponent]
})
export class SearchModule {
}
