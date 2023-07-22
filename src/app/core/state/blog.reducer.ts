import { Action, createReducer, on } from '@ngrx/store';
import { State, initialState, postAdapter } from './blog.state';
import * as BlogActions from './blog.actions';

export const blogReducer = createReducer(
  initialState,
  on(BlogActions.loadPostsSuccess, (state, { posts, totalCount }) => {
    return {
      ...postAdapter.setAll(posts, state),
      totalCount,
    };
  }),
  on(BlogActions.createPostSuccess, (state, { post }) => postAdapter.addOne(post, state)),
  on(BlogActions.updatePostSuccess, (state, { post }) => postAdapter.updateOne({ id: post.id, changes: post }, state)),
  on(BlogActions.deletePostSuccess, (state, { id }) => postAdapter.removeOne(id, state)),
  on(BlogActions.loadPosts, (state, { page }) => ({ ...state, currentPage: page })),
  on(BlogActions.getPostByIdSuccess, (state, { post }) => postAdapter.upsertOne(post, state)),
);

export function reducer(state: State | undefined, action: Action) {
  return blogReducer(state, action);
}
