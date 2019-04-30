import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ItemService} from "../services/item.service";
import {ToastrService} from "ngx-toastr";
import {first} from "rxjs/operators";
import {EditItemDto} from "../models/dto/edit-item.dto";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'sell-edit',
  templateUrl: './sell-edit.component.html'
})
export class SellEditComponent implements OnInit {
  @Input() public itemId;
  item: EditItemDto;
  isDataAvailable:boolean = false;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private router: Router, private itemService: ItemService, private toastr: ToastrService, private spinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.fetchData().then(() =>
      this.isDataAvailable = true);
    this.spinnerService.hide();
  }

  fetchData() {
    return this.itemService.get(this.itemId).then(res => {
      this.item = res;
    });
  }

  onSubmit(form: NgForm) {
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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.item.image = btoa(event.target.result);
    });

    reader.readAsDataURL(file);
  }

  private markFormAsPristine(form: NgForm) {
    Object.keys(form.controls)
      .forEach(fieldName =>
        form.controls[fieldName].markAsPristine()
      );
  }

}
