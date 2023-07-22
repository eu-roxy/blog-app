import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../servicies/post.service';
import { Store, select } from '@ngrx/store';
import { State } from './blog.state';
import * as BlogActions from './blog.actions';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { PaginatedResultInterface } from '../interfaces/paginated-result.interface';
import { PostInterface } from '../interfaces/post.interface';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable()
export class BlogEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadPosts),
      withLatestFrom(this.store.pipe(select('blog'))),
      switchMap(([action, state]) =>
        this.postService.getPosts(action.limit, action.page, action.query).pipe(
          map((response) => BlogActions.loadPostsSuccess(
            { posts: response.results, totalCount: response.totalCount })),
          catchError((error) => of(BlogActions.loadPostsFailure({error})))
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.createPost),
      mergeMap(({ post }) =>
        this.postService.createPost(post.title, post.body).pipe(
          map((post) => {
            this.toastrService.success('Post was successfully created!');
            return BlogActions.createPostSuccess({ post });
          }),
          catchError((error) => {
            this.toastrService.error('Something went wrong on post creation!');
            return of(BlogActions.createPostFailure({error}));
        })
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.updatePost),
      mergeMap(({ id, updatedPost }) =>
        this.postService.updatePost(id, updatedPost.title, updatedPost.body).pipe(
          map((post) => {
            this.toastrService.success('Post was successfully updated!');
            return BlogActions.updatePostSuccess({ post });
          }),
          catchError((error) => {
            this.toastrService.error('Something went wrong on post update!');
            return of(BlogActions.updatePostFailure({error}));
          })
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.deletePost),
      mergeMap(({ id }) =>
        this.postService.deletePost(id).pipe(
          map(() => {
            this.toastrService.success('Post was deleted successfully!');
            return BlogActions.deletePostSuccess({ id })
          }),
          catchError((error) => {
            this.toastrService.error('Something went wrong on post delete!');
            return of(BlogActions.deletePostFailure({error}))
          })
        )
      )
    )
  );

  getPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.getPostById),
      switchMap(({ id }) =>
        this.postService.getPostById(id).pipe(
          map((post) => {
            return BlogActions.getPostByIdSuccess({ post });
          }),
          catchError((error) => of(BlogActions.getPostByIdFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private postService: PostService, private store: Store<{blog: State}>, private toastrService: ToastrService) {}

}
