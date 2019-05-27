import {Component, OnInit} from "@angular/core";
import {SellCreateModalService} from "../services/modal/sell-create.modal.service";
import {ItemService} from "../services/item.service";
import {AuthenticationService} from "../services/authentication.service";
import {Customer} from "../models/customer";
import {Item} from "../models/item";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {SellEditModalService} from "../services/modal/sell-edit.modal.service";

@Component({
  selector: 'sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  currentUser: Customer;
  items: Item[];

  constructor(private domSanitizer: DomSanitizer, private authService: AuthenticationService, private sellCreateModalService: SellCreateModalService, private sellEditModalService: SellEditModalService, private itemService: ItemService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.itemService.getAllByCustomer(this.currentUser.id).subscribe(res => {
      this.items = res.body;
    })
  }

  getImageSrc(item: any): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(atob(item.image));
  }

  openModal(item: Item) {
    if (item == null) {
      this.sellCreateModalService.open().result.then((data) => {
        this.refreshData(data);
      });
    } else if (item.sold == null) {
      this.sellEditModalService.open(item.id).result.then((data) => {
        this.updateData(data);
      });
    }
  }

  refreshData(data: any) {
    this.items.push(data);
  }

  showEdit(cardEdit, item, card) {
    if(item.sold == null){
      card.setAttribute("style", "cursor: pointer;");
      cardEdit.setAttribute("style", "display: block;");
    }
  }

  hideEdit(cardEdit) {
    cardEdit.setAttribute("style", "display: none;");
  }

  private updateData(item: Item) {
    this.items.forEach((obj => {
      if (obj.id == item.id) {
        this.items[this.items.indexOf(obj)] = item;
      }
    }));
  }
}
