import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { PaginatedResultInterface } from '../interfaces/paginated-result.interface';
import { PostInterface } from '../interfaces/post.interface';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private apollo: Apollo) {}

  getPosts(limit: number, page: number, query?: string | null) {
    const offset = (page - 1) * limit;
    const options: { [key: string]: any } = {
      paginate: { limit, page },
    };

    if (query) {
      options['search'] = {
        q: query,
      };
    }

    return this.apollo
      .query<any>({
        query: gql`
          query GetPosts($options: PageQueryOptions!) {
            posts(options: $options) {
              data {
                id
                title
                body
              }
              meta {
                totalCount
              }
            }
          }
        `,
        variables: { options: options },
      })
      .pipe(
        map((result) => {
          return {
            results: result.data.posts.data,
            totalCount: result.data.posts.meta.totalCount,
          };
        }),
      );
  }

  getPostById(id: string): Observable<any> {
    const GET_POST_BY_ID = gql`
      query GetPostById($id: ID!) {
        post(id: $id) {
          id
          title
          body
        }
      }
    `;

    return this.apollo
      .watchQuery<any>({
        query: GET_POST_BY_ID,
        variables: { id },
      })
      .valueChanges.pipe(map((result) => result.data.post));
  }

  createPost(title: string, body: string): Observable<any> {
    const CREATE_POST = gql`
      mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
          id
          title
          body
        }
      }
    `;

    return this.apollo
      .mutate<any>({
        mutation: CREATE_POST,
        variables: { input: { title, body } },
      })
      .pipe(map((result) => result.data.createPost));
  }

  updatePost(id: string, title: string, body: string): Observable<any> {
    const UPDATE_POST = gql`
      mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
        updatePost(id: $id, input: $input) {
          id
          title
          body
        }
      }
    `;

    return this.apollo
      .mutate<any>({
        mutation: UPDATE_POST,
        variables: { id, input: { title, body } },
      })
      .pipe(map((result) => result.data.updatePost));
  }

  deletePost(id: string): Observable<any> {
    const DELETE_POST = gql`
      mutation DeletePost($id: ID!) {
        deletePost(id: $id)
      }
    `;

    return this.apollo
      .mutate<any>({
        mutation: DELETE_POST,
        variables: { id },
      })
      .pipe(map((result) => result.data.deletePost));
  }
}
