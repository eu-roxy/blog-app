import { createAction, props } from '@ngrx/store';
import { PaginatedResultInterface } from '../interfaces/paginated-result.interface';
import { PostInterface } from '../interfaces/post.interface';

export const loadPosts = createAction('[Blog] Load Posts', props<{ limit: number; page: number; query?: string }>());
export const loadPostsSuccess = createAction(
  '[Blog] Load Posts Success',
  props<{ posts: PostInterface[]; totalCount: number }>(),
);
export const loadPostsFailure = createAction('[Blog] Load Posts Failure', props<{ error: any }>());

export const createPost = createAction('[Blog] Add Post', props<{ post: PostInterface }>());
export const createPostSuccess = createAction('[Blog] Add Post Success', props<{ post: PostInterface }>());
export const createPostFailure = createAction('[Blog] Add Post Failure', props<{ error: any }>());

export const getPostById = createAction('[Blog] Get Post By Id', props<{ id: string }>());
export const getPostByIdSuccess = createAction('[Blog] Get Post By Id Success', props<{ post: PostInterface }>());
export const getPostByIdFailure = createAction('[Blog] Get Post By Id Failure', props<{ error: any }>());

export const updatePost = createAction('[Blog] Update Post', props<{ id: string; updatedPost: PostInterface }>());
export const updatePostSuccess = createAction('[Blog] Update Post Success', props<{ post: PostInterface }>());
export const updatePostFailure = createAction('[Blog] Update Post Failure', props<{ error: any }>());

export const deletePost = createAction('[Blog] Delete Post', props<{ id: string }>());
export const deletePostSuccess = createAction('[Blog] Delete Post Success', props<{ id: string }>());
export const deletePostFailure = createAction('[Blog] Delete Post Failure', props<{ error: any }>());
