import { PostListComponent } from './../post-list/post-list.component';
import { CoreModule } from './../../core/core.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent, PostListComponent]
})
export class DashboardModule { }
