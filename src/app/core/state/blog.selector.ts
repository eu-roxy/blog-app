import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, postAdapter } from './blog.state';
import { PostInterface } from '../interfaces/post.interface';

export const selectBlogState = createFeatureSelector<State>('blog');

export const { selectAll: selectAllPosts, selectEntities: selectPostEntities } = postAdapter.getSelectors(
  selectBlogState
);

export const selectPostById = createSelector(
  selectPostEntities,
  (entities: { [key: string]: any }, props: { postId: string }) => entities[props.postId] as PostInterface
);

export const selectTotalCount = createSelector(selectBlogState, (state) => state.totalCount);

