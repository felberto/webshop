import {Component, OnInit} from "@angular/core";
import {Item} from "../models/item";
import {ItemService} from "../services/item.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  items: Item[];

  constructor(private itemService: ItemService, private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.itemService.getAllAvailable().subscribe(res => {
      this.items = res.body;
    })
  }

  getImageSrc(item: any): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(atob(item.image));
  }
}
