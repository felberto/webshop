import {Component, OnInit, SecurityContext} from "@angular/core";
import {SellCreateModalService} from "../services/sell-create.modal.service";
import {ItemService} from "../services/item.service";
import {AuthenticationService} from "../services/authentication.service";
import {Customer} from "../models/customer";
import {Item} from "../models/item";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  currentUser: Customer;
  items: Item[];

  constructor(private domSanitizer: DomSanitizer, private authService: AuthenticationService, private sellCreateModalService: SellCreateModalService, private itemService: ItemService) {
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

  openModal() {
    this.sellCreateModalService.open().result.then((data) => {
      this.refreshData(data);
    });
  }

  refreshData(data: any) {
    this.items.push(data);
  }
}
