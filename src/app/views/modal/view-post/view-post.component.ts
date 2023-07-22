import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostInterface } from 'src/app/core/interfaces/post.interface';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent {
  post!: PostInterface;

  constructor(public modal: NgbActiveModal) {}
}
