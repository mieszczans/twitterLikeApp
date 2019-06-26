import { NotFoundComponent } from '../core/not-found/not-found.component';
import { PostListComponent } from './post-list/post-list.component';
import { LoginComponent } from '../core/auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // redirectTo: 'login', pathMatch: 'full',
    children: [
      {
        path: '',
        component: PostListComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
