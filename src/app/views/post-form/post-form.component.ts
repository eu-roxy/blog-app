import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { createPost, getPostById, updatePost, updatePostSuccess } from 'src/app/core/state/blog.actions';
import { selectPostById } from 'src/app/core/state/blog.selector';
import { ToastrService } from 'ngx-toastr';
import { PostInterface } from 'src/app/core/interfaces/post.interface';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  subscriptions: Subscription[] = [];
  postId!: string;
  public post$!: Observable<PostInterface>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        if (params['postId']) {
          this.postId = params['postId'];
          this.store.dispatch(getPostById({ id: this.postId }));
          this.loadPost();
        } else {
        }
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  public loadPost(): void {
    this.subscriptions.push(
      this.store.pipe(select(selectPostById, { postId: this.postId })).subscribe((post: PostInterface) => {
        if (post) {
          this.postForm.get('title')?.setValue(post.title);
          this.postForm.get('body')?.setValue(post.body);
        }
      }),
    );
  }

  public onSubmit() {
    if (this.postForm.valid) {
      if (this.postId) {
        console.log('save with id');
        this.store.dispatch(updatePost({ id: this.postId, updatedPost: this.postForm.value }));
        this.router.navigate(['posts']);
      } else {
        this.store.dispatch(createPost({ post: this.postForm.value }));
        this.router.navigate(['posts']);
      }
    } else {
      this.toastrService.warning('Invalid form. Check the required fields');
    }
  }
}
