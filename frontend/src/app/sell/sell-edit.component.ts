import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ItemService} from "../services/item.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'sell-edit',
  templateUrl: './sell-edit.component.html'
})
export class SellEditComponent implements OnInit {
  @Input() public item;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private router: Router, private itemService: ItemService, private toastr: ToastrService) {
  }

  ngOnInit() {
    console.log(this.item);
  }
}
