import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {first} from "rxjs/operators";
import {ItemService} from "../services/item.service";
import {Customer} from "../models/customer";
import {AuthenticationService} from "../services/authentication.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'add-cart',
  templateUrl: './add-cart.component.html'
})
export class AddCartComponent implements OnInit {
  @Input() item;
  currentUser: Customer;

  constructor(private domSanitizer: DomSanitizer, private authService: AuthenticationService, private router: Router, public activeModal: NgbActiveModal, private toastr: ToastrService, private itemService: ItemService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  getImageSrc(item: any): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(atob(item.image));
  }

  addCart() {
    this.itemService.addToCart(this.item.id, this.currentUser.id)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success("Add to cart successful", "", {
            positionClass: "toast-bottom-right"
          });
          this.activeModal.close(this.item);
        },
        error => {
          this.toastr.error("Add to cart failed", "", {
            positionClass: "toast-bottom-right"
          });
        });
  }
}
