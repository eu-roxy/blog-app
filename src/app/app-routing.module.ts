import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsTableComponent } from './views/posts-table/posts-table.component';
import { PostFormComponent } from './views/post-form/post-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts',
  },
  {
    path: 'posts',
    component: PostsTableComponent,
  },
  {
    path: 'post',
    component: PostFormComponent,
  },
  {
    path: 'post/:postId',
    component: PostFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
