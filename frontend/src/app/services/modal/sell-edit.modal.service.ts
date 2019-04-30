import {Injectable, Input} from "@angular/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SellEditComponent} from "../../sell/sell-edit.component";
import {Item} from "../../models/item";

@Injectable()
export class SellEditModalService {
  private isOpen = false;

  constructor(
    private modalService: NgbModal,
  ) {
  }

  open(itemId: number): NgbModalRef {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef = this.modalService.open(SellEditComponent, {centered: true});
    modalRef.componentInstance.itemId = itemId;
    modalRef.result.then((result) => {
      this.isOpen = false;
    }, (reason) => {
      this.isOpen = false;
    });
    return modalRef;
  }
}
