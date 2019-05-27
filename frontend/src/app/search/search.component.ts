import {Component, OnInit} from "@angular/core";
import {Item} from "../models/item";
import {ItemService} from "../services/item.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {AddCartModalService} from "../services/modal/add-cart.modal.service";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  items: Item[];

  constructor(private itemService: ItemService, private domSanitizer: DomSanitizer, private addCartModalService: AddCartModalService) {
  }

  ngOnInit(): void {
    this.itemService.getAllAvailable().subscribe(res => {
      this.items = res.body;
    })
  }

  getImageSrc(item: any): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(atob(item.image));
  }

  openModal(item: Item) {
    this.addCartModalService.open(item).result.then((data) => {
      //this.refreshData(data);
    });
  }
}
