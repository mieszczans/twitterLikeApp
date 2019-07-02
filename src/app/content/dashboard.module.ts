import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PostDetailsResolverService } from './services/post-details-resolver.service';
import { PostService } from './services/post.service';
import { PostListComponent } from './post-list/post-list.component';
import { CoreModule } from '../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    DashboardRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    PostListComponent,
    PostDetailsComponent,
    ErrorModalComponent
  ],
  providers: [
    PostService,
    PostDetailsResolverService,
    BsModalService,
    BsModalRef
  ],
  entryComponents: [ErrorModalComponent]
})
export class DashboardModule { }
