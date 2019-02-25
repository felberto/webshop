import {Component, OnInit} from "@angular/core";
import {SellCreateModalService} from "../services/sell-create.modal.service";
import {ItemService} from "../services/item.service";
import {AuthenticationService} from "../services/authentication.service";
import {Customer} from "../models/customer";
import {Item} from "../models/item";

@Component({
  selector: 'sell',
  templateUrl: './sell.component.html'
})
export class SellComponent implements OnInit {

  currentUser: Customer;
  items: Item[];

  constructor(private authService: AuthenticationService, private sellCreateModalService: SellCreateModalService, private itemService: ItemService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.itemService.getAllByCustomer(this.currentUser.id).subscribe(res => {
      this.items = res.body;
    })
  }

  openModal() {
    this.sellCreateModalService.open();
  }

}
