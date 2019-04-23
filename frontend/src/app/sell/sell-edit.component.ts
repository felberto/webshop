import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ItemService} from "../services/item.service";
import {ToastrService} from "ngx-toastr";
import {first} from "rxjs/operators";

@Component({
  selector: 'sell-edit',
  templateUrl: './sell-edit.component.html'
})
export class SellEditComponent {
  @Input() public item;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private router: Router, private itemService: ItemService, private toastr: ToastrService) {
  }

  onSubmit(form: NgForm){
    this.itemService.update(this.item, this.item.id)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success("Data update successful", "", {
            positionClass: "toast-bottom-right"
          });
          this.activeModal.close(this.item);
          this.markFormAsPristine(form);
        },
        error => {
          this.toastr.error("Data update failed", "", {
            positionClass: "toast-bottom-right"
          });
        });
  }

  private markFormAsPristine(form: NgForm) {
    Object.keys(form.controls)
      .forEach(fieldName =>
        form.controls[fieldName].markAsPristine()
      );
  }
}
