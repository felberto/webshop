import {Injectable} from "@angular/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SellCreateComponent} from "../../sell/sell-create.component";

@Injectable()
export class SellCreateModalService {
  private isOpen = false;

  constructor(
    private modalService: NgbModal,
  ) {
  }

  open(): NgbModalRef {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef = this.modalService.open(SellCreateComponent, {centered: true});
    modalRef.result.then((result) => {
      this.isOpen = false;
    }, (reason) => {
      this.isOpen = false;
    });
    return modalRef;
  }
}
