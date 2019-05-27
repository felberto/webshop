import {Injectable} from "@angular/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AddCartComponent} from "../../search/add-cart.component";
import {Item} from "../../models/item";

@Injectable()
export class AddCartModalService {
  private isOpen = false;

  constructor(
    private modalService: NgbModal,
  ) {
  }

  open(item: Item): NgbModalRef {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef = this.modalService.open(AddCartComponent, {centered: true});
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      this.isOpen = false;
    }, (reason) => {
      this.isOpen = false;
    });
    return modalRef;
  }
}
