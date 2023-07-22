import { PostInterface } from '../interfaces/post.interface';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<PostInterface> {
  totalCount: number;
}

export const postAdapter = createEntityAdapter<PostInterface>();

export const initialState: State = postAdapter.getInitialState({
  totalCount: 0
});
