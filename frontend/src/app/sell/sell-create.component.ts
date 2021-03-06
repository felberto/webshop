import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ItemService} from "../services/item.service";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../services/authentication.service";
import {Customer} from "../models/customer";
import {CreateItemDto} from "../models/dto/create-item.dto";

@Component({
  selector: 'sell-create',
  templateUrl: './sell-create.component.html'
})
export class SellCreateComponent implements OnInit {

  createItem: FormGroup;
  item: CreateItemDto = new CreateItemDto();
  currentUser: Customer;

  constructor(private authService: AuthenticationService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private router: Router, private itemService: ItemService, private toastr: ToastrService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.createItem.controls;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.item.image = btoa(event.target.result);
    });

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.createItem = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  create() {
    this.item.title = this.createItem.get('title').value;
    this.item.description = this.createItem.get('description').value;
    this.item.price = this.createItem.get('price').value;
    this.item.seller = this.currentUser;

    this.itemService.save(this.item)
      .subscribe(data => {
          if (data != null) {
            this.toastr.success("Save successful", "", {
              positionClass: "toast-bottom-right"
            });
            this.activeModal.close(this.item);
            this.router.navigate(['sell']);
          } else {
            this.toastr.error("Save failed", "", {
              positionClass: "toast-bottom-right"
            });
          }
        }, err => {
          this.toastr.error("Save failed", "", {
            positionClass: "toast-bottom-right"
          });
        }
      )
  }
}
