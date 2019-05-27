import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {ItemService} from "../services/item.service";
import {Customer} from "../models/customer";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {first} from "rxjs/operators";
import {CreateItemDto} from "../models/dto/create-item.dto";
import {ToastrService} from "ngx-toastr";
import {Item} from "../models/item";

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  currentUser: Customer;
  cartItems: Item[];
  itemsId: number[] = [];

  constructor(private authService: AuthenticationService, private itemService: ItemService,
              private domSanitizer: DomSanitizer, private toastr: ToastrService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.itemService.getAllCartItems(this.currentUser.id).subscribe(res => {
      this.cartItems = res.body;
    });
  }

  getImageSrc(item: any): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(atob(item.image));
  }

  calculateTotal(): number {
    let total: number = 0;
    if (this.cartItems != null) {
      this.cartItems.forEach(function (item) {
        total = total + item.price;
      });
    }
    return total;
  }

  buy() {
    for (let item of this.cartItems) {
      this.itemsId.push(item.id);
    }
    console.log(this.itemsId);
    this.itemService.buyItems(this.itemsId, this.currentUser.id)
      .pipe(first())
      .subscribe(
        data => {
          this.cartItems = [];
          this.itemsId = [];
          this.toastr.success("Items successfully purchased", "", {
            positionClass: "toast-bottom-right"
          });
        },
        error => {
          this.itemsId = [];
          this.toastr.error("Items purchase failed", "", {
            positionClass: "toast-bottom-right"
          });
        });
  }

  remove(item: CreateItemDto): void {
    this.itemService.removeFromCart(item)
      .pipe(first())
      .subscribe(
        data => {
          CreateItemDto: item = data.body;
          var index = this.cartItems.findIndex(i => i.title == item.title && i.description == item.description);
          this.cartItems.splice(index, 1);
          this.toastr.success("Item successfully removed", "", {
            positionClass: "toast-bottom-right"
          });
        },
        error => {
          this.toastr.error("Item removal failed", "", {
            positionClass: "toast-bottom-right"
          });
        });
  }
}
