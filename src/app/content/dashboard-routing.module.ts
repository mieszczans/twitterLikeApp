import { PostDetailsResolverService } from './services/post-details-resolver.service';
import { PostDetailsComponent } from './post-details/post-details.component';
import { NotFoundComponent } from '../core/not-found/not-found.component';
import { PostListComponent } from './post-list/post-list.component';
import { LoginComponent } from '../core/auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthenticateGuard } from '../core/guards/authenticate.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthenticateGuard],
    children: [
      {
        path: '',
        redirectTo: 'wall'
      },
      {
        path: 'wall',
        component: PostListComponent
      }
    ]
  },
  {
    canActivate: [AuthenticateGuard],
    path: 'wall/:id',
    component: PostDetailsComponent,
    resolve: { postDetails: PostDetailsResolverService},
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
