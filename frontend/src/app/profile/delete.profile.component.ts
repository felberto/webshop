import {Component, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.profile.modal-component.html'
})
export class DeleteProfileComponent implements OnInit{
  closeResult: string;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

  delete(){
    // todo
  }
}
