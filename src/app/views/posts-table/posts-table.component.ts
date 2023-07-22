import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as BlogActions from '../../core/state/blog.actions';
import { selectAllPosts, selectTotalCount } from '../../core/state/blog.selector';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PostInterface } from '../../core/interfaces/post.interface';
import { ConfirmationDeleteComponent } from '../modal/confirmation-delete/confirmation-delete.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewPostComponent } from '../modal/view-post/view-post.component';

@Component({
  selector: 'app-posts-table',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
})
export class PostsTableComponent implements OnInit {
  posts$!: Observable<PostInterface[]>;
  currentPage = 1;
  totalPages = 1;
  limit = 10;
  totalCount = 0;
  pages: number[] = [];

  private searchInput$ = new Subject<string>();
  private currentSearch!: string;

  constructor(
    private store: Store,
    private modalService: NgbModal,
  ) {
    this.searchInput$.pipe(debounceTime(100), distinctUntilChanged()).subscribe((searchTerm) => {
      this.currentSearch = searchTerm;
      this.store.dispatch(BlogActions.loadPosts({ limit: 10, page: 1, query: this.currentSearch }));
    });
  }

  public ngOnInit(): void {
    this.loadPosts();

    this.posts$ = this.store.select(selectAllPosts);
    this.store.select(selectTotalCount).subscribe((totalCount) => {
      this.totalCount = totalCount;
      this.totalPages = Math.ceil(totalCount / this.limit);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
  }

  public loadPosts(): void {
    this.store.dispatch(
      BlogActions.loadPosts({ limit: this.limit, page: this.currentPage, query: this.currentSearch }),
    );
  }

  public loadPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPosts();
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPosts();
    }
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPosts();
    }
  }

  public deletePost(postId: string): void {
    const modalRef = this.modalService.open(ConfirmationDeleteComponent);
    modalRef.closed.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(BlogActions.deletePost({ id: postId }));
      }
    });
  }

  public onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;

    if (query !== null && typeof query == 'string') {
      this.searchInput$.next(query);
    }
  }

  public viewPost(post: PostInterface): void {
    const modalRef = this.modalService.open(ViewPostComponent);
    modalRef.componentInstance.post = post;
  }
}
