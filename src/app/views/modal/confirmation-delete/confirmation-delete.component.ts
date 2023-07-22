import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-delete.component.html',
  styleUrls: ['./confirmation-delete.component.scss']
})
export class ConfirmationDeleteComponent {
  constructor(public modal: NgbActiveModal) {}
}
