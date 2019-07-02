import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.less']
})
export class ErrorModalComponent {
  constructor(public bsModalRef: BsModalRef) {}

}
