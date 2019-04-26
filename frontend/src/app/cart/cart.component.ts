import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {ItemService} from "../services/item.service";
import {Customer} from "../models/customer";
import {Item} from "../models/item";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  currentUser: Customer;
  cartItems: Item[];

  constructor (private authService: AuthenticationService, private itemService: ItemService,
               private domSanitizer: DomSanitizer){
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.itemService.getAllCartItems(this.currentUser.id).subscribe(res => {
      this.cartItems = res.body;
      // console.log(this.cartItems);
    });
  }

  getImageSrc(item: any): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(atob(item.image));
  }
}
